import { NextFunction, Request, Response } from "express";
import { createOrganisationSchema } from "../lib/validation";
import { ZodError } from "zod";
import createHttpError from "http-errors";
import Organisation from "../models/organisation";
import { isValidObjectId } from "mongoose";

export const getOrganisations = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const organisations = await Organisation.find().exec();
        res.status(200).json(organisations)
    } catch (error) {
        next(error)
    }
}

export const createOrganisation = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = await createOrganisationSchema.safeParseAsync(req.body)
        if (data.success) {
            const organisation = await Organisation.create({
                ABN: data.data?.ABN,
                activeStatus: data.data?.activeStatus,
                description: data.data?.description,
                image: data.data?.image,
                name: data.data?.name,
                phone: data.data?.phone,
                summary: data.data?.summary,
                totalDonationItemsCount: data.data?.totalDonationItemsCount,
                totalDonationsCount: data.data?.totalDonationsCount,
                totalDonationsValue: data.data?.totalDonationsValue,
                website: data.data?.website,
            });
            if (organisation) {
                res.status(201).json({ message: 'Organisation created successfully' });
            } else {
                res.status(400).json({ message: 'Invalid Organisation data' });
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
}

export const editOrganisation = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const orgId = req.params.orgId
        const data = await createOrganisationSchema.safeParseAsync(req.body)
        if (!isValidObjectId(orgId)) {
            throw createHttpError(400, "Invalid orgId")
        }
        if (data.success) {
            const organisation = await Organisation.findOne({ _id: orgId }).exec();
            if (!organisation) { throw createHttpError(404, "Organisation does not exist") }
            else {
                organisation.ABN = (data.data.ABN || organisation.ABN)
                organisation.activeStatus = (data.data.activeStatus || organisation.activeStatus)
                organisation.description = (data.data.description || organisation.description)
                organisation.image = (data.data.image || organisation.image)
                organisation.name = (data.data.name || organisation.name)
                organisation.phone = (data.data.phone || organisation.phone)
                organisation.summary = (data.data.summary || organisation.summary)
                organisation.website = (data.data.website || organisation.website)
                organisation.totalDonationsCount = (data.data.totalDonationsCount || organisation.totalDonationsCount)
                organisation.totalDonationItemsCount = (data.data.totalDonationItemsCount || organisation.totalDonationItemsCount)
                organisation.totalDonationsValue = (data.data.totalDonationsValue || organisation.totalDonationsValue)
                const edittedOrganisation = await organisation.save();
                res.status(200).json(edittedOrganisation)
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
}

export const deleteOrganisation = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const name = req.params.name;
        const organisation = Organisation.find({ name: name }).exec();
        if (!organisation) {
            res.status(400).json({ message: 'Organisation does not exist' });
        } else {
            await Organisation.deleteOne({ name: name }).exec()
            res.status(201).json({ message: 'Organisation deleted successfully' });
        }
    }
    catch (error) {
        next(error)
    }
}