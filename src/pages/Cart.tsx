import Heading from "@components/common/Heading/Heading";
import CartItemList from "@components/eCommerce/CartItemList/CartItemList";
import CartSubtotalPrice from "@components/eCommerce/CartSubtotalPrice/CartSubtotalPrice";
import Loading from "@components/feedback/Loading/Loading";
import LottieHandler from "@components/feedback/LottieHandler/LottieHandler";
import useCart from "@hooks/useCart";

const Cart = () => {
  const { loading, error, products, changeQuantityHandler, removeItemHndler } =
    useCart();
  return (
    <>
      <Heading title="cart" />
      <Loading loading={loading} error={error} type="cart">
        {products.length === 0 ? (
         <LottieHandler type="cartEmptyState" message="your cart is empty"/>
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
};

export default Cart;
