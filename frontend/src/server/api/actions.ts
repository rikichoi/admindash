"use server"

export async function getTransactions() {
    const transactions = (await fetch("http://localhost:5000/api/donation/get-stripe-donations")).json()
    return transactions
}