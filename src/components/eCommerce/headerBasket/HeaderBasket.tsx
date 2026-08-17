import Logo from '@assets/svg/cart.svg?react'
import styles from './styles.module.css';
const HeaderBasket = () => {
  return (
    <div className={styles.basketContainer}>
      <Logo title='logo icon'/>
      <div className={styles.basketQuantity}>0</div>
    </div>
  )
}

export default HeaderBasket