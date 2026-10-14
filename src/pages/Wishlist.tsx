import Heading from "@components/common/Heading/Heading"
import { useAppDispatch, useAppSelector } from "@store/hooks"
import { actGetWishlist, productsFullInfoCleanUp } from "@store/wishlist/wishlistSlice"
import { useEffect } from "react"
import Loading from "@components/feedback/Loading/Loading";
import GridList from "@components/common/GridList/GridList";
import type { TProduct } from "@customTypes/product";
import Product from "@components/eCommerce/Product/Product";


const Wishlist = () => {
    const dispatch = useAppDispatch()
    const {loading, error, productsFullInfo} = useAppSelector((state)=> state.wishlist);
    const cartItems = useAppSelector(state => state.cart.items);

    useEffect(()=>{
        dispatch(actGetWishlist())
        return ()=> {
            dispatch(productsFullInfoCleanUp())
        }
    },[dispatch]);

    
    const records = productsFullInfo.map((el) => ({
    ...el,
    quantity: cartItems[el.id] || 0,
    isLiked: true,
  }));
  return (
    <>
      <Heading>wishlist</Heading>
      <Loading loading={loading} error={error}>
        <GridList<TProduct>
          records={records}
          renderItem={(record) => <Product {...record} />}
        />
      </Loading>
    </>
  );
}

export default Wishlist
