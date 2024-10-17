// import { NextResponse } from "next/server";
import { redirect } from "next/navigation";
import axios from "axios";

type DonationProps = {
    searchParams: {
        amount: number;
        orgName?: string;
        comment: string;
        donorName?: string;
        // orgId: string;
        itemId: string;
        email?: string;
        phone?: number;
    }
}
// router.post("/create-donation/:amount&:orgName&:comment&:donorName&:itemId&:email&:phone", DonationController.createDonation);

// localhost:5000/api/donation/create-donation/2131451&sadasdasd&sadasdasd&asdasd&6710740785124d1c61e37396&zxczxcz@gmail.com&6123
export async function GET({ searchParams: { amount, comment, itemId, donorName, orgName, email, phone } }: DonationProps) {

    // Get user's information
    const donation = await axios.post(`http://localhost:5000/api/donation/create-donation/${amount}&${orgName}&${comment}&${donorName}&${itemId}${email && `&${email}`}${phone && `&${phone}`}`)

    console.log(donation)
    return redirect("http://localhost:3000/payment-success");
}
