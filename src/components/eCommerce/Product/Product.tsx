import { Button, Spinner } from "react-bootstrap";
import styles from "./styles.module.css";
const { product, productImg, cardOverlay } = styles;
import type { TProduct } from "@customTypes/product";
import { useAppDispatch } from "@store/hooks";
import { addToCart } from "@store/cart/cartSlice";
import { memo, useEffect, useState } from "react";


const Product = memo( ({id, title, img, price, max, quantity}: TProduct) => {
  const dispatch = useAppDispatch();
  const [isBtnDisabled, setIsBtnDisabled] = useState(false);

  const currentRemainingQuantity = max - (quantity ?? 0)
  const quantityReachedToMax = currentRemainingQuantity <=0 ? true : false

  useEffect( ()=>{
    if(!isBtnDisabled){
      return;
    }

    setIsBtnDisabled(true);
    const debounce = setTimeout(() => {
      setIsBtnDisabled(false)
    }, 500);

    return ()=> clearTimeout(debounce)
  } ,[isBtnDisabled]);

  const addToCartHandler = ()=>{
    dispatch(addToCart(id));
    setIsBtnDisabled(true);
  }



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
      <p>{quantityReachedToMax ? "you have reach to the limit" : `you can add ${currentRemainingQuantity} items` }</p>
      <Button
       variant="info"
       style={{ color: "white" }}
       onClick={addToCartHandler}
       disabled={isBtnDisabled || quantityReachedToMax}>
        {isBtnDisabled ? <> <Spinner/> Loading... </> : "add to cart"}
       
      </Button>
      </div>
      
    </div>
  );
});

export default Product;