import { NextFunction, Request, Response } from "express";
import { createItemSchema, itemImageSchema } from "../lib/validation";
import Item from "../models/item";
import createHttpError from "http-errors";
import { ZodError } from "zod";
import { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { envSanitisedSchema } from '../lib/validation';
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { isValidObjectId } from "mongoose";

const s3 = new S3Client({
    credentials: {
        accessKeyId: envSanitisedSchema.ACCESS_KEY,
        secretAccessKey: envSanitisedSchema.SECRET_ACCESS_KEY,
    },
    region: envSanitisedSchema.BUCKET_REGION
})

export const createItem = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const data = await createItemSchema.safeParseAsync(req.body);
        const imageData = await itemImageSchema.safeParseAsync(req.file)
        if (data.success && imageData.success) {
            const itemExists = await Item.findOne({ name: data.data.name });
            if (itemExists) { res.status(400).json({ message: 'Item already exists' }) };

            try {
                const command = new PutObjectCommand({
                    Bucket: envSanitisedSchema.BUCKET_NAME,
                    Key: imageData.data.originalname,
                    Body: imageData.data.buffer,
                    ContentType: imageData.data.mimetype
                })

                await s3.send(command)

                const item = await Item.create({
                    summary: data.data.summary,
                    description: data.data.description,
                    name: data.data.name,
                    donationGoalValue: data.data.donationGoalValue,
                    totalDonationValue: data.data.totalDonationValue,
                    activeStatus: data.data.activeStatus,
                    orgId: data.data.orgId,
                    itemImage: imageData.data.originalname,
                });
                if (item) {
                    res.status(201).json({ message: 'Item created successfully' });
                } else {
                    res.status(400).json({ message: 'Invalid item data' });
                }
            }
            catch (error) {
                throw createHttpError(400, `Failed to upload image. Error message: ${error}`)
            }



        } else {
            throw createHttpError(400, `Invalid data,  ${data.error ? `Data details: ${data.error.message}` : ""}  ${imageData.error && `Image details: ${imageData.error.message}`}`);
        }

    } catch (error) {
        if (error instanceof ZodError) {
            throw createHttpError(404, `error: 'Invalid data', details: ${error.message} `)
        }
        else {
            next(error)
        }
    }
};

export const editItem = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const itemId = req.params.itemId;
        const data = await createItemSchema.safeParseAsync(req.body);
        // const imageData = await itemImageSchema.safeParseAsync(req.file)
        if (itemId && data.success) {
            if (!isValidObjectId(itemId)) {
                throw createHttpError(400, "Invalid userId")
            }
            const itemExists = await Item.findOne({ _id: itemId });
            if (!itemExists) { res.status(400).json({ message: 'Item does not exist' }) };

            //update image if new image is provided
            // const command = new PutObjectCommand({
            //     Bucket: envSanitisedSchema.BUCKET_NAME,
            //     Key: imageData.data.originalname,
            //     Body: imageData.data.buffer,
            //     ContentType: imageData.data.mimetype
            // })

            // await s3.send(command)
            if (itemExists) {
                itemExists.summary = data.data.summary
                itemExists.description = data.data.description
                itemExists.name = data.data.name
                itemExists.donationGoalValue = parseInt(data.data.donationGoalValue)
                itemExists.totalDonationValue = parseInt(data.data.totalDonationValue)
                itemExists.activeStatus = JSON.parse(data.data.activeStatus)
                itemExists.orgId = data.data.orgId

                await itemExists.save();

                res.status(200).json({ message: 'Item updated successfully' });
            } else {
                res.status(400).json({ message: 'Invalid item data' });
            }
        }
        // catch (error) {
        //     throw createHttpError(400, `Failed to upload image. Error message: ${error}`)
        // }

    } catch (error) {
        if (error instanceof ZodError) {
            throw createHttpError(404, `error: 'Invalid data', details: ${error.message} `)
        }
        else {
            next(error)
        }
    }
};

export const getOrgItems = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const orgId = req.params.orgId
        const items = await Item.find({ orgId: orgId }).exec();
        const itemsWithUrls = await Promise.all(items.map(async (e) => {
            const command = new GetObjectCommand({ Bucket: envSanitisedSchema.BUCKET_NAME, Key: e.itemImage });
            const url = await getSignedUrl(s3, command, { expiresIn: 3600 });
            e.imageUrl = url;
            return e;
        }));
        res.status(200).json(itemsWithUrls)
    } catch (error) {
        next(error)
    }
}

export const getItems = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const items = await Item.find().exec();

        res.status(200).json(items)
    } catch (error) {
        next(error)
    }
}

export const deleteItem = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const itemId = req.params.itemId;
        const item = await Item.findOne({ _id: itemId }).exec();
        if (item) {
            await Item.deleteOne({ _id: itemId }).exec()
            const command = new DeleteObjectCommand({
                Bucket: envSanitisedSchema.BUCKET_NAME,
                Key: item.itemImage,
            })
            await s3.send(command)
            res.status(201).json({ message: `Item: ${item} deleted successfully` });
        } else {
            res.status(400).json({ message: 'Item does not exist' });

        }
    } catch (error) {
        next(error)
    }
}

