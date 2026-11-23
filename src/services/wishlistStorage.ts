const getKey = (userId: string | number) => `cartivo_wishlist_${userId}`;

export const readWishlist = (userId: string | number): number[] => {
  try {
    const rawData = localStorage.getItem(getKey(userId));
    const rawDataParsed: unknown = rawData ? JSON.parse(rawData) : [];

    return Array.isArray(rawDataParsed)
      ? rawDataParsed.filter((el): el is number => typeof el === "number")
      : [];
  } catch {
    return [];
  }
};

export const writeWishlist = (userId: string | number, ids: number[]) => {
  localStorage.setItem(getKey(userId), JSON.stringify(ids));
};
