import type { TProduct } from "./product";

export type TOrderItem = {
    id: number;
    userId: number;
    items: TProduct[];
    subtotal: number;
}