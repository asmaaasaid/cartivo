import type { TOrderItem } from "@customTypes/order";

const getKey = (userId: string | number) => `cartivo_order_${userId}`;

export const readOrder = (userId: string | number): TOrderItem[] => {
  try {
    const rawData = localStorage.getItem(getKey(userId));
    const rawDataParsed: unknown = rawData ? JSON.parse(rawData) : [];

    return Array.isArray(rawDataParsed) ? (rawDataParsed as TOrderItem[]) : [];
  } catch {
    return [];
  }
};

export const writeOrder = (userId: string | number, orders: TOrderItem[]) => {
  localStorage.setItem(getKey(userId), JSON.stringify(orders));
};
