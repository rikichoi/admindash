import { model, Schema } from "mongoose";

type Donation = {
    refundStatus: boolean;
    amount: number;
    orgName?: string;
    comment: string;
    donorName?: string;
    itemName?: string;
    // orgId: string;
    itemId: string;
    createdAt: Date;
    updatedAt: Date;
}

const DonationSchema = new Schema({
    refundStatus: { type: Boolean, required: true },
    amount: { type: Number, required: true },
    orgName: { type: String, required: false },
    comment: { type: String, required: true },
    donorName: { type: String, required: false },
    itemName: { type: String, required: false },
    itemId: { type: String, required: true },
    // orgId: { type: String, required: true },
    items: [{ type: Schema.Types.ObjectId, ref: 'Item' }],
    // organisations: [{ type: Schema.Types.ObjectId, ref: 'Organisation' }],
}, { timestamps: true });

export default model<Donation>("Donation", DonationSchema);