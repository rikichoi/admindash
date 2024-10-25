export type Organisation = {
    _id: string,
    ABN: string,
    activeStatus: boolean,
    description: string,
    image: string,
    name: string,
    phone: number,
    summary: string,
    website: string,
    totalDonationsCount: number,
    totalDonationItemsCount: number,
    totalDonationsValue: number,
}

export type Item = {
    summary: string;
    description: string;
    name: string;
    donationGoalValue: number;
    totalDonationValue: number;
    activeStatus: boolean;
    itemImage: string;
    imageUrl?: string;
    createdAt: Date;
    updatedAt: Date;
}