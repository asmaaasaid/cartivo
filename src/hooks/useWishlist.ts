import { useAppDispatch, useAppSelector } from "@store/hooks";
import {
  actGetWishlist,
  wishlistFullInfoCleanUp,
} from "@store/wishlist/wishlistSlice";
import { useEffect } from "react";

const useWishlist = () => {
  const dispatch = useAppDispatch();
  const { loading, error, productsFullInfo } = useAppSelector(
    (state) => state.wishlist,
  );
  const cartItems = useAppSelector((state) => state.cart.items);

  useEffect(() => {
    const promise = dispatch(actGetWishlist());
    return () => {
      dispatch(wishlistFullInfoCleanUp());
      promise.abort()
    };
  }, [dispatch]);

  const records = productsFullInfo.map((el) => ({
    ...el,
    quantity: cartItems[el.id] || 0,
    isLiked: true,
  }));
  
  return { loading, error, records };
};

export default useWishlist;
