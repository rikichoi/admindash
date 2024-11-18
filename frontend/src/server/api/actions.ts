"use server"
import { CreateOrganisationSchema } from "@/lib/validation";
import { redirect } from "next/navigation";
import axios from "axios"
import { TransactionResponse } from "@/app/models/transactions";

//Stripe transactions functions
export async function getTransactions() {
    const response = await fetch(`http://${process.env.NEXT_PUBLIC_ENDPOINT_URL}/api/donation/get-stripe-donations`);
    const transactions: TransactionResponse = await response.json()
    return transactions.data
}

// Donation functions
export async function getDonations() {
    try {
        const donations = (await fetch(`http://${process.env.NEXT_PUBLIC_ENDPOINT_URL}/api/donation/get-donations`, { cache: "no-store" })).json()
        return donations
    } catch (error) {
        console.log(error)
        return null
    }
}

// Item functions
export async function postItem(formData: FormData, orgId: string) {
    await axios
        .post(`http://${process.env.NEXT_PUBLIC_ENDPOINT_URL}/api/item/create-item`, formData, {
            headers: { "Content-Type": "multipart/form-data" },
        })
    redirect(`/?_id=${orgId}`)
}

export async function editItem(formData: FormData, itemId: string, orgId: string) {
    await axios
        .patch(`http://${process.env.NEXT_PUBLIC_ENDPOINT_URL}/api/item/edit-item/${itemId}`, formData, {
            headers: { "Content-Type": "multipart/form-data" },
        })
    redirect(`/?_id=${orgId}`)
}

export async function deleteItem(itemId: string, orgId: string) {
    await axios.delete(`http://${process.env.NEXT_PUBLIC_ENDPOINT_URL}/api/item/delete-item/${itemId}`)
    redirect(`/?_id=${orgId}`)
}

// Organisation functions
export async function postOrganisation(data: CreateOrganisationSchema) {
    const { ABN, activeStatus, description, image, name, phone, summary,
        totalDonationItemsCount, totalDonationsCount, totalDonationsValue, website
    } = data
    await axios
        .post(`http://${process.env.NEXT_PUBLIC_ENDPOINT_URL}/api/organisation/create-organisation`, {
            activeStatus,
            ABN: parseInt(ABN),
            description,
            image,
            name,
            phone: parseInt(phone),
            summary,
            totalDonationItemsCount: parseInt(totalDonationItemsCount),
            totalDonationsCount: parseInt(totalDonationsCount),
            totalDonationsValue: parseInt(totalDonationsValue),
            website,
        })
    redirect("/")
}

export async function editOrganisation(data: FormData, orgId: string) {

    await axios
        .patch(
            `http://${process.env.NEXT_PUBLIC_ENDPOINT_URL}/api/organisation/edit-organisation/${orgId}`,
            data, { headers: { "Content-Type": "multipart/form-data" }, }
        )
    redirect(`/`)
}

export async function deleteOrganisation(orgId: string) {
    await axios
        .delete(
            `http://${process.env.NEXT_PUBLIC_ENDPOINT_URL}/api/organisation/delete-organisation/${orgId}`
        )
    redirect("/")
}

export async function createOrganisation(formData: FormData) {
    try {
        await axios
            .post(
                `http://${process.env.NEXT_PUBLIC_ENDPOINT_URL}/api/organisation/create-organisation`,
                formData,
                {
                    headers: { "Content-Type": "multipart/form-data" },
                }
            )
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    } catch (error) {
        console.log(error)
    }
}