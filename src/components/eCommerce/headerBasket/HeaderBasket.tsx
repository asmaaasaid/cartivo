import Logo from '@assets/svg/cart.svg?react'
import styles from './styles.module.css';
import { useAppSelector } from '@store/hooks';
import { getCartTotalQuantitySelector } from '@store/cart/cartSlice';
import { useEffect, useState } from 'react';

const HeaderBasket = () => {
  const [isAnimate, setIsAnimate] = useState(false)
  const totalQuantity = useAppSelector( getCartTotalQuantitySelector )
  const quantityStyle = `${styles.basketQuantity } ${isAnimate ? styles.pumpCartQuantity : "" }`

  useEffect(()=>{
    if(!totalQuantity){
      return
    }
    setIsAnimate(true)

    const debounce = setTimeout(() => {
      setIsAnimate(false)
    }, 500);

    return ()=> clearTimeout(debounce)
  },[totalQuantity])

  return (
    <div className={styles.basketContainer}>
      <Logo title='logo icon'/>
      <div className={quantityStyle}> {totalQuantity} </div>
    </div>
  )
}

export default HeaderBasket