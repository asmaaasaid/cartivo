import Heading from "@components/common/Heading/Heading";
import CartItemList from "@components/eCommerce/CartItemList/CartItemList";
import CartSubtotalPrice from "@components/eCommerce/CartSubtotalPrice/CartSubtotalPrice";
import Loading from "@components/feedback/Loading/Loading";
import useCart from "@hooks/useCart";

const Cart = () => {
  const { loading, error, products, changeQuantityHandler, removeItemHndler } =
    useCart();
  return (
    <>
      <Heading title="cart" />
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
};

export default Cart;
