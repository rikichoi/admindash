import { model, Schema } from "mongoose";

type Organisation = {
    ABN: string,
    activeStatus: boolean,
    description: string,
    image: string,
    name: string,
    phone: number,
    summary: string,
    website: string,
    totalDonationsCount: number,
    totalDonationItemsCount: number,
    totalDonationsValue: number,
}

const OrganisationSchema = new Schema<Organisation>({
    ABN: { type: String, required: false },
    activeStatus: { type: Boolean, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    name: { type: String, required: true, unique: true },
    phone: { type: Number, required: true },
    summary: { type: String, required: true },
    website: { type: String, required: true },
    totalDonationsCount: { type: Number, required: true },
    totalDonationItemsCount: { type: Number, required: true },
    totalDonationsValue: { type: Number, required: true },
}, { timestamps: true });

export default model<Organisation>("Organisation", OrganisationSchema);