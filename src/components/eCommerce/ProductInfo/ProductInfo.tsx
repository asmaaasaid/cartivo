import styles from './styles.module.css'
type productInfoProps = {
    title: string;
    img: string;
    price: number;
    quantity?: number,
    direction?: 'row' | 'column';
    style?: React.CSSProperties;
    children?: React.ReactNode;
}

const ProductInfo = ({
  title,
  img,
  price,
  direction = "row",
  quantity,
  style,
  children,
}: productInfoProps) => {
  return (
    <div className={`${styles[`product-${direction}`]}`} style={style}>
      <div>
        <img
          className={`${styles[`productImg-${direction}`]}`}
          src={img}
          alt={title}
        />
      </div>
      <div className={`${styles[`productInfo-${direction}`]}`}>
        <h2 title={title}>{title}</h2>
        <h3>{price.toFixed(2)} EGP</h3>
        {quantity && (<h3>total quantity {quantity}</h3>)}
        {quantity && (<h3>total price {(quantity*price).toFixed(2)}</h3>)}
        {children}
      </div>
    </div>
  );
};

export default ProductInfo
