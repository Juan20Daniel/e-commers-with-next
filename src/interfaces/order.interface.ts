export interface Order {
    id: string;
    subTotal: number;
    tax: number;
    total: number;
    itemInOrder: number;
    isPaid: boolean;
    createdAt: Date;
    userId: string;
}