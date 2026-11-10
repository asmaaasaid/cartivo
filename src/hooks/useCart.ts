import {
  actGetProductsByItems,
  cartFullInfoCleanUp,
  cartItemChangeQuantity,
  cartItemRemove,
} from "@store/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { useCallback, useEffect } from "react";
import { resetOrderStatus } from "@store/orders/ordersSlice";

const useCart = () => {
  const dispatch = useAppDispatch();

  const placeOrederStatus = useAppSelector(state => state.orders.loading);

  const { items, productsFullInfo, loading, error } = useAppSelector(
    (state) => state.cart,
  );

  const userAccessToken = useAppSelector((state) => state.auth.accessToken);

  

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

  useEffect(() => {
    const promise = dispatch(actGetProductsByItems());
    return () => {
      promise.abort()
      dispatch(cartFullInfoCleanUp());
      dispatch(resetOrderStatus());
    };
  }, [dispatch]);

  return {
    loading,
    error,
    products,
    changeQuantityHandler,
    removeItemHndler,
    userAccessToken,
    placeOrederStatus,
  };
};

export default useCart;
