import { Form, Button } from "react-bootstrap";
import styles from './styles.module.css'
import type { TProduct } from "@customTypes/product";
import { memo } from "react";

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
    <>
      <div className="d-flex justify-content-between align-items-center border-bottom py-4">
        <div>
          <img className={styles.productImg} src={img} alt={title} />
        </div>
        <div className="ms-5 d-flex flex-column ">
          <h4>{title}</h4>
          <h5>{price.toFixed(2)} EGP</h5>
          <Button
            variant="secondary"
            style={{ color: "white" }}
            className="mt-auto"
            onClick={()=> removeItemHandler(id)}
          >
            Remove
          </Button>
        </div>
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
    </>
  );
});

export default CartItem
