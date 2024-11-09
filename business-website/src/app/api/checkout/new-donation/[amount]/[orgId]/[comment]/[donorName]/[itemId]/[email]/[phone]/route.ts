"use server"
// import { NextResponse } from "next/server";
import { redirect } from "next/navigation";
import axios from "axios";
import { NextResponse } from "next/server";

type DonationProps = {
    amount: string;
    comment: string;
    donorName?: string;
    orgId: string;
    itemId?: string;
    email?: string;
    phone?: string;
}

export async function GET(request: Request, context: { params: DonationProps }) {
    const { amount, comment, itemId, donorName, email, orgId, phone } = context.params
    const donation = await axios.post(`http://3.128.24.35:5000/api/donation/create-donation/${amount}&${orgId}&${comment}&${donorName}&${itemId && itemId}${email && `&${email}`}${phone && `&${phone}`}`)
    if (!donation) { return new NextResponse(`There was an unexpected error!`, { status: 400 }); }

    return redirect("https://nexagrid.vercel.app/payment-success");
}
