"use server"

import axios from "axios"

export async function getTransactions() {
    const transactions = (await fetch(`http://${process.env.next_public_endpoint_url}/api/donation/get-stripe-donations`)).json()
    return transactions
}

export async function getDonations() {
    const donations = (await fetch(`http://${process.env.next_public_endpoint_url}/api/donation/get-donations`, { cache: "no-store" })).json()
    return donations
}

export async function createOrganisation(formData: FormData) {
    await axios
        .post(
            `http://${process.env.next_public_endpoint_url}/api/organisation/create-organisation`,
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