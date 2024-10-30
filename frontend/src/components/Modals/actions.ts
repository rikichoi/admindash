"use server"
import { CreateOrganisationSchema } from "@/lib/validation";
import axios from "axios";
import { redirect } from "next/navigation";

// Item functions
export async function postItem(formData: FormData, orgId: string) {
    await axios
        .post("http://localhost:5000/api/item/create-item", formData, {
            headers: { "Content-Type": "multipart/form-data" },
        })
    redirect(`/?_id=${orgId}`)
}

export async function editItem(formData: FormData, itemId: string, orgId: string) {
    await axios
        .patch(`http://localhost:5000/api/item/edit-item/${itemId}`, formData, {
            headers: { "Content-Type": "multipart/form-data" },
        })
    redirect(`/?_id=${orgId}`)
}

export async function deleteItem(itemId: string, orgId: string) {
    await axios.delete(`http://localhost:5000/api/item/delete-item/${itemId}`)
    redirect(`/?_id=${orgId}`)
}

// Organisation functions
export async function postOrganisation(data: CreateOrganisationSchema) {
    const { ABN, activeStatus, description, image, name, phone, summary,
        totalDonationItemsCount, totalDonationsCount, totalDonationsValue, website
    } = data
    console.log
    await axios
        .post("http://localhost:5000/api/organisation/create-organisation", {
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

export async function editOrganisation(data: CreateOrganisationSchema, orgId: string) {
    const {
        activeStatus,
        description,
        image,
        name,
        phone,
        summary,
        totalDonationItemsCount,
        totalDonationsCount,
        totalDonationsValue,
        website,
        ABN,
    } = data;
    await axios
        .patch(
            `http://localhost:5000/api/organisation/edit-organisation/${orgId}`,
            {
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
            }
        )
    redirect(`/?_id=${orgId}`)
}

export async function deleteOrganisation(orgId: string) {
    await axios
        .delete(
            `http://localhost:5000/api/organisation/delete-organisation/${orgId}`
        )
    redirect("/")
}