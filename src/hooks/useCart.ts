import {
  actGetProductsByItems,
  cartFullInfoCleanUp,
  cartItemChangeQuantity,
  cartItemRemove,
} from "@store/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { useCallback, useEffect } from "react";

const useCart = () => {
  const dispatch = useAppDispatch();
  const { items, productsFullInfo, loading, error } = useAppSelector(
    (state) => state.cart,
  );

  useEffect(() => {
    const promise = dispatch(actGetProductsByItems());
    return () => {
      dispatch(cartFullInfoCleanUp());
      promise.abort()
    };
  }, [dispatch]);

  const products = productsFullInfo.map((el) => ({
    ...el,
    quantity: items[el.id],
  }));

  const changeQuantityHandler = useCallback(
    (id: number, quantity: number) => {
      dispatch(cartItemChangeQuantity({ id, quantity }));
    },
    [dispatch],
  );

  const removeItemHndler = useCallback(
    (id: number) => {
      dispatch(cartItemRemove({ id }));
    },
    [dispatch],
  );

  return { loading, error, products, changeQuantityHandler, removeItemHndler };
};

export default useCart;
