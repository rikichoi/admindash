"use server"

import axios from "axios"

export async function getTransactions() {
    const transactions = (await fetch(`http://${process.env.NEXT_PUBLIC_ENDPOINT_URL}/api/donation/get-stripe-donations`)).json()
    return transactions
}

export async function getDonations() {
    const donations = (await fetch(`http://${process.env.NEXT_PUBLIC_ENDPOINT_URL}/api/donation/get-donations`, { cache: "no-store" })).json()
    return donations
}

export async function createOrganisation(formData: FormData) {
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
}