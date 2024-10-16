// import { NextResponse } from "next/server";
import { redirect } from "next/navigation";
import axios from "axios";
import { NextResponse } from "next/server";

type DonationProps = {
    amount: string;
    orgName?: string;
    comment: string;
    donorName?: string;
    // orgId: string;
    itemId: string;
    email?: string;
    phone?: string;
}

export async function GET(request: Request, context: { params: DonationProps }) {
    const { amount, comment, itemId, donorName, email, orgName, phone } = context.params
    const donation = await axios.post(`http://localhost:5000/api/donation/create-donation/${amount}&${orgName}&${comment}&${donorName}&${itemId}${email && `&${email}`}${phone && `&${phone}`}`)
    if (!donation) { return new NextResponse(`There was an unexpected error!`, { status: 400 }); }

    return redirect("http://localhost:3000/payment-success");
}
