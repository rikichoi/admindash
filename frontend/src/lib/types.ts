export type Organisation = {
    imageUrls: string[],
    _id: string,
    ABN: string,
    activeStatus: boolean,
    description: string,
    image: string[],
    name: string,
    phone: number,
    summary: string,
    website: string,
    totalDonationsCount: number,
    totalDonationItemsCount: number,
    totalDonationsValue: number,
}

export type Item = {
    _id: string;
    summary: string;
    description: string;
    name: string;
    donationGoalValue: number;
    totalDonationValue: number;
    activeStatus: boolean;
    itemImage: string;
    imageUrl?: string;
    orgId: string;
    createdAt: Date;
    updatedAt: Date;
}

export type Donation = {
    _id: string;
    refundStatus: boolean;
    amount: number;
    comment: string;
    donorName?: string;
    email?: string;
    phone: number;
    orgId: { _id: string, name: string };
    itemId?: { _id: string, name: string };
    createdAt: Date;
    updatedAt: Date;
}