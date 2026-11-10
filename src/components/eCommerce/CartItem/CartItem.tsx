import { Form, Button } from "react-bootstrap";
import styles from "./styles.module.css";
import type { TProduct } from "@customTypes/product";
import { memo } from "react";
import ProductInfo from "../ProductInfo/ProductInfo";

type CartItemProps = TProduct & {
  changeQuantityHandler: (id: number, quantity: number) => void;
  removeItemHandler: (id: number) => void;
};

const CartItem = memo( ({
  id,
  img,
  title,
  price,
  max,
  quantity,
  changeQuantityHandler,
  removeItemHandler
}: CartItemProps) => {
  const renderOption = Array(max)
    .fill(0)
    .map((_, index) => {
      const quantity = index + 1;
      return (
        <option key={quantity} value={quantity}>
          {quantity}
        </option>
      );
    });

  const changeQuantity = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newQuantity = parseInt(e.target.value);
    changeQuantityHandler(id, newQuantity);
  };
  return (
    <div className={styles.cartItem}>
     <ProductInfo title={title} img={img} price={price} direction="column" />
     <Button
            variant="secondary"
            style={{ color: "white" }}
            className="mt-auto"
            onClick={()=> removeItemHandler(id)}
          >
            Remove
          </Button>
       
        <div>
          <span className="d-block mb-1">Quantity</span>
          <Form.Select
            aria-label="Default select example"
            value={quantity}
            onChange={changeQuantity}
          >
            {renderOption}
          </Form.Select>
        </div>
    </div>
  );
});

export default CartItem
