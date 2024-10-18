import { NextFunction, Request, Response } from "express";
import { createItemSchema } from "../lib/validation";
import Item from "../models/item";
import createHttpError from "http-errors";
import { ZodError } from "zod";

export const createItem = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const data = await createItemSchema.safeParseAsync(req.body);
        if (data.success) {
            const itemExists = await Item.findOne({ name: data.data.name });
            if (itemExists) { res.status(400).json({ message: 'Item already exists' }) };

            const item = await Item.create({
                summary: data.data.summary,
                description: data.data.description,
                name: data.data.name,
                donationGoalValue: data.data.donationGoalValue,
                totalDonationValue: data.data.totalDonationValue,
                activeStatus: data.data.activeStatus,
                itemImage: data.data.itemImage,
            });
            if (item) {
                res.status(201).json({ message: 'Item created successfully' });
            } else {
                res.status(400).json({ message: 'Invalid item data' });
            }
        } else {
            throw createHttpError(400, `'Invalid data', details: ${data.error.message}`);
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
        res.status(200).json(items)
    } catch (error) {
        next(error)
    }
}