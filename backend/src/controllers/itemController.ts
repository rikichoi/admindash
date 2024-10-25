import { NextFunction, Request, Response } from "express";
import { createItemSchema, itemImageSchema } from "../lib/validation";
import Item from "../models/item";
import createHttpError from "http-errors";
import { ZodError } from "zod";
import { S3Client, PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { envSanitisedSchema } from '../lib/validation';
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

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

export const getItems = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const items = await Item.find().exec();
        const itemsWithUrls = await Promise.all(items.map(async (e) => {
            const command = new GetObjectCommand({ Bucket: envSanitisedSchema.BUCKET_NAME, Key: e.itemImage });
            const url = await getSignedUrl(s3, command, { expiresIn: 3600 });
            e.imageUrl = url;
            return e;
        }));
        console.log(itemsWithUrls)
        res.status(200).json(itemsWithUrls)
    } catch (error) {
        next(error)
    }
}

export const deleteItem = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const name = req.params.name;
        const item = Item.find({ name: name }).exec();
        if (!item) {
            res.status(400).json({ message: 'Item does not exist' });
        } else {
            await Item.deleteOne({ name: name }).exec()
            res.status(201).json({ message: 'Item deleted successfully' });
        }
    } catch (error) {
        next(error)
    }
}

