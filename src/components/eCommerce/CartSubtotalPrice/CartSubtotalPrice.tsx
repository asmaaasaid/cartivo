import type { TProduct } from "@customTypes/product";
// import actPlaceOrder from "@store/orders/act/actPlaceOrder";
import { actPlaceOrder } from "@store/orders/ordersSlice";
import { useState } from "react";
import { Button, Modal, Spinner } from "react-bootstrap";
import {useAppDispatch} from "@store/hooks"
import { clearCartAfterPlaceOrder } from "@store/cart/cartSlice";

type CartSubtotalPriceProps = {
  products: TProduct[];
  userAccessToken: string | null;
};

const CartSubtotalPrice = ({
  products,
  userAccessToken,
}: CartSubtotalPriceProps) => {
  const dispatch = useAppDispatch();

  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const subtotal = products.reduce((acc, product) => {
    if (!product.quantity) return acc;
    return acc + product.price * product.quantity;
  }, 0);
  
  // modal handler close & open
  const modalHandler = ()=>{
    setShow(!show);
    setError(null);
  }

  const placeOrderHandler = ()=>{
    setLoading(true)
    dispatch(actPlaceOrder(subtotal))
      .unwrap()
      .then(() => {
        dispatch(clearCartAfterPlaceOrder());
        setShow(false)
      })
      .catch((error) => { setError(error) })
      .finally(() => { setLoading(false)});
  };

  
  return (
    <>
    {/* place order modal */}
    <Modal show={show} onHide={modalHandler} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>placing order</Modal.Title>
        </Modal.Header>
        <Modal.Body>are you sure you want to place this order 
          with subtotal of {subtotal.toFixed(2)} EGP
          {!loading && error && (<p> {error} </p>)}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={modalHandler}>
            Close
          </Button>
          <Button variant="primary" onClick={placeOrderHandler}>
            {loading ? ( <>
            <Spinner></Spinner> loading...
            </> ) : "confirm"}
          </Button>
        </Modal.Footer>
      </Modal>
      <div className="py-5 fw-semibold fs-5 d-flex justify-content-between">
        <span>Subtotal: </span>
        <span>{subtotal.toFixed(2)} EGP</span>
      </div>

      {userAccessToken && (
        <div className="py-5 fw-semibold fs-5 d-flex justify-content-between">
          <span> </span>
          <Button  onClick={modalHandler}>
            place order
          </Button>
        </div>
      )}
    </>
  );
};

export default CartSubtotalPrice;
