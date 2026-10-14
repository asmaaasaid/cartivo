import Logo from '@assets/svg/wishlist.svg?react';
import styles from './styles.module.css';
import { useAppSelector } from '@store/hooks';

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const HeaderWishlist = () => {
  const [isAnimate, setIsAnimate] = useState(false)
  const totalQuantity = useAppSelector(state => state.wishlist.itemsId);
  const quantityStyle = `${styles.totalNum } ${isAnimate ? styles.pumpAnimate : "" }`
  const navigate = useNavigate();

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
    <div className={styles.container} onClick={()=> navigate("/wishlist")}>
      <Logo title='logo icon'/>
      {
        totalQuantity.length > 0 && <div className={quantityStyle}> {totalQuantity.length} </div>
      }
    </div>
  )
}

export default HeaderWishlist