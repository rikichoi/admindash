"use server"
// import { NextResponse } from "next/server";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

type DonationProps = {
    amount: string;
    comment: string;
    donorName?: string;
    orgId: string;
    itemId?: string;
    email?: string;
    phone?: string;
    payment_intent: string;
}

export async function GET(request: Request, context: { params: DonationProps }) {
    const paymentIdIndex = request.url.indexOf("paymentId=");
    const paymentId = request.url.substring(paymentIdIndex);
    const { amount, comment, itemId, donorName, email, orgId, phone } = context.params
    const formatted_payment_intent1 = paymentId.slice(26);
    const formatted_payment_intent2 = formatted_payment_intent1.slice(0, 27);

    const donation = await fetch(`http://${process.env.NEXT_PUBLIC_ENDPOINT_URL}/api/donation/create-donation/${amount}&${orgId}&${comment}&${donorName}&${itemId && itemId}${email && `&${email}`}${phone && `&${phone}`}&${formatted_payment_intent2}`, {
        method: "POST"
    })

    if (!donation) { return (redirect("/payment-error"), new NextResponse(`There was an unexpected error!`, { status: 400 })); }

    return redirect("https://nexagrid.vercel.app/payment-success");
}
