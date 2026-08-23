import { Button } from "react-bootstrap";
import styles from "./styles.module.css";
const { product, productImg, cardOverlay } = styles;
import type { TProduct } from "@customTypes/product";
const Product = ({ title, img, price}: TProduct) => {
  return (
    <div className={` ${product} relative card border-0 overflow-hidden text-bg-dark `}>
      <div className={productImg}>
        <img
          src={img}
          alt={title}
        />
      </div>
      <div className={` ${cardOverlay} card-img-overlay  flex-column text-center d-flex justify-content-center align-items-center `}>
        <h2 title={title}>{title}</h2>
      <h3> {price} </h3>
      <Button variant="info" style={{ color: "white" }}>
        Add to cart
      </Button>
      </div>
      
    </div>
  );
};

export default Product;