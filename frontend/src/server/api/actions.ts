"use server"

export async function getTransactions() {
    const transactions = (await fetch(`http://${process.env.NEXT_PUBLIC_ENDPOINT_URL}/api/donation/get-stripe-donations`)).json()
    return transactions
}

export async function getDonations() {
    const donations = (await fetch(`http://${process.env.NEXT_PUBLIC_ENDPOINT_URL}/api/donation/get-donations`, { cache: "no-store" })).json()
    return donations
}