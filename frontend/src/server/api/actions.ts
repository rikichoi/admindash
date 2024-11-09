"use server"

export async function getTransactions() {
    const transactions = (await fetch(`http://3.128.24.35:5000/api/donation/get-stripe-donations`)).json()
    return transactions
}

export async function getDonations() {
    const donations = (await fetch(`http://3.128.24.35:5000/api/donation/get-donations`, { cache: "no-store" })).json()
    return donations
}