export type ITransaction = {
    id: string;
    title: string;
    price: number;
    category: string;
    type: TransactionType;
    data: Date;
}

export type TransactionType = "INCOME" | "OUTCOME";

export type TotalCard = {
    total: number;
    income: number;
    outcome: number;
}