"use server"

import axios from "axios"
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
        const organisations = (await axios.get("https://3.128.24.35:5000/api/organisation/get-organisations")).data
        return organisations
    } catch (error) {
        console.log(error)
    }
}

export async function getOrganisationItems(orgId: string): Promise<Item[] | undefined> {
    try {
        const organisations = (await fetch(`https://3.128.24.35:5000/api/item/get-org-items/${orgId}`)).json()
        return organisations
    } catch (error) {
        console.log(error)
    }
}

export async function getDonations(): Promise<Donation[] | undefined> {
    try {
        const donations = (await fetch("https://3.128.24.35:5000/api/donation/get-donations")).json()
        return donations
    } catch (error) {
        console.log(error)
    }
}