import styles from './styles.module.css'
import HeaderCounter from '../HeaderCounter/HeaderCounter'
import { useAppSelector } from '@store/hooks';
import { getCartTotalQuantitySelector } from "@store/cart/selectors";
import WishlistIcon from '@assets/svg/wishlist.svg?react';
import CartIcon from '@assets/svg/cart.svg?react'

const HeaderLefBar = () => {
      const wishlistTotalQuantity = useAppSelector(state => state.wishlist.itemsId.length);
      const cartTotalQuantity = useAppSelector( getCartTotalQuantitySelector )
  return (
    <div className= {styles.headerLeftBar}>
              <HeaderCounter
                to="wishlist"
                totalQuantity={wishlistTotalQuantity}
                svgIcon={<WishlistIcon title="wishlist" />}
              />
              <HeaderCounter
                to="cart"
                totalQuantity={cartTotalQuantity}
                svgIcon={<CartIcon title="cart" />}
              />
            </div>
  )
}

export default HeaderLefBar
