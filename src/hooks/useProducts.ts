import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { useEffect } from "react";
import { actGetProductsByCatPrefix, productsCleanUp } from "@store/products/productsSlice";


const useProducts = () => {
    
  const params = useParams();
  const productPrefix = params.prefix;
  const dispatch = useAppDispatch();
   const {loading, error, records} = useAppSelector((state)=> state.products);
  const cartItems = useAppSelector(state => state.cart.items);
  const wishlistItemsId = useAppSelector(state => state.wishlist.itemsId);

    const productsFullInfo = records.map((el) => ({
    ...el,
    quantity: cartItems[el.id] || 0,
    isLiked: wishlistItemsId.includes(el.id),
  }));

  useEffect(() => {
    const promise = dispatch(actGetProductsByCatPrefix(params.prefix as string));
    return ()=>{
      dispatch(productsCleanUp());
      promise.abort()
    }
  }, [dispatch, params]);

  return {loading, error, productsFullInfo, productPrefix}
}

export default useProducts
