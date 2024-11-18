export interface Transaction {
    id: string;
    object: string;
    amount: number;
    available_on: number;
    created: number;
    currency: string;
    description: string | null;
    exchange_rate: number | null;
    fee: number;
    fee_details: string[];
    net: number;
    reporting_category: string;
    source: string;
    status: string;
    type: string;
}

export interface TransactionResponse {
    object: string;
    url: string;
    has_more: boolean;
    data: Transaction[];
}
