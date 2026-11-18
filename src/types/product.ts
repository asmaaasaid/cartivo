export type TReview = {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string
}

export type TApiProduct = {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand?: string;
  tags: string[];
  thumbnail: string;
  images: string[];
  reviews?: TReview[];
}


// export type TProduct = {
//   id: number;
//   title: string;
//   cat_prefix?: string;
//   img: string;
//   price: number;
//   quantity?: number;
//   max: number,
//   isLiked?: boolean,
//   isAuthenticated?: boolean
// };

export type TProduct = {
  id: number;
  title: string;
  description: string;
  category: string;
  img: string;          
  images: string[];
  price: number;
  discountPercentage: number;
  rating: number;
  brand?: string;
  tags: string[];
  max: number;          
  reviews?: TReview[];
  quantity?: number;
  isLiked?: boolean;
  isAuthenticated?: boolean;
};

export const mapProduct = (p: TApiProduct): TProduct=>({
  id: p.id,
  title: p.title,
  description: p.description,
  category: p.category,
  img: p.thumbnail,
  images: p.images,
  price: p.price,
  discountPercentage: p.discountPercentage,
  rating: p.rating,
  brand: p.brand,
  tags: p.tags,
  max: p.stock,
  reviews: p.reviews,
})