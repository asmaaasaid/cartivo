import type { TProduct } from "@customTypes/product"


type CartSubtotalPriceProps = {products : TProduct[]}
const CartSubtotalPrice = ({products}: CartSubtotalPriceProps) => {
  const subtotal = products.reduce((acc, product) => {
    if(!product.quantity) return acc;
    return acc + product.price * product.quantity;
  }, 0);
  return (
    <div className='py-5 fw-semibold fs-5 d-flex justify-content-between'>
      <span>Subtotal: </span>
      <span>{subtotal.toFixed(2)} EGP</span>
    </div>
  )
}

export default CartSubtotalPrice
