import Heading from "@components/common/Heading/Heading"
import CartItemList from "@components/eCommerce/CartItemList/CartItemList"
import CartSubtotalPrice from "@components/eCommerce/CartSubtotalPrice/CartSubtotalPrice"
import Loading from "@components/feedback/Loading/Loading"
import { actGetProductsByItems, cartItemChangeQuantity, cartItemRemove } from "@store/cart/cartSlice"
import { useAppDispatch, useAppSelector } from "@store/hooks"
import { useCallback, useEffect } from "react"


const Cart = () => {
    const dispatch = useAppDispatch()
    const {items, productsFullInfo, loading, error} = useAppSelector( (state) => state.cart )

    useEffect(() => {
      dispatch(actGetProductsByItems());
    }, [dispatch]);

    const products = productsFullInfo.map( (el)=>( {
        ...el,
        quantity: items[el.id]
    } ) )

    const changeQuantityHandler = useCallback(
      (id: number, quantity: number) => {
        dispatch(cartItemChangeQuantity({ id, quantity }));
      },
      [dispatch],
    );

    const removeItemHndler = useCallback((id: number)=>{
      dispatch(cartItemRemove({ id }));
    },[dispatch])
  return (
    <>
      <Heading>your cart</Heading>
      <Loading loading={loading} error={error}>
        {products.length === 0 ? (
          <p className="text-center">Your cart is empty</p>
        ) : (
          <>
            <CartItemList
              products={products}
              changeQuantityHandler={changeQuantityHandler}
              removeItemHandler={removeItemHndler}
            />{" "}
            <CartSubtotalPrice products={products} />
          </>
        )}
      </Loading>
    </>
  );
}

export default Cart
