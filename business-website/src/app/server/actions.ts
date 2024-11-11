"use server"

import { Donation, Item, Organisation } from "../lib/types"

export async function getNews() {
    try {
        const news = (await fetch(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${process.env.NEWS_API_KEY}&pageSize=3`)).json()
        return news
    } catch (error) {
        console.log(error)
    }
}

export async function getOrganisations(): Promise<Organisation[] | undefined> {
    try {
        const organisations = (await fetch(`http://${process.env.NEXT_PUBLIC_ENDPOINT_URL}/api/organisation/get-organisations`, { "cache": "no-cache" })).json()
        return organisations
    } catch (error) {
        console.log(error)
    }
}

export async function getOrganisationItems(orgId: string): Promise<Item[] | undefined> {
    try {
        const organisations = (await fetch(`http://${process.env.NEXT_PUBLIC_ENDPOINT_URL}/api/item/get-org-items/${orgId}`)).json()
        return organisations
    } catch (error) {
        console.log(error)
    }
}

export async function getDonations(): Promise<Donation[] | undefined> {
    try {
        const donations = (await fetch(`http://${process.env.NEXT_PUBLIC_ENDPOINT_URL}/api/donation/get-donations`)).json()
        return donations
    } catch (error) {
        console.log(error)
    }
}