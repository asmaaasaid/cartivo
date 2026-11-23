export type TOrderProduct = {
    id: number;
    title: string;
    img: string;
    price: number;
    quantity: number;
}
export type TOrderItem = {
    id: number;
    userId: number | string;
    items: TOrderProduct[];
    subtotal: number;
    createdAt: string;
}