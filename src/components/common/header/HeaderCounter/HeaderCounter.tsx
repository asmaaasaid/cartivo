
import styles from './styles.module.css';
// import { useAppSelector } from '@store/hooks';
// import { getCartTotalQuantitySelector } from '@store/cart/cartSlice';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

type HeaderCounterProps = {
  totalQuantity: number;
  svgIcon: React.ReactNode;
  to: string
}
const HeaderCounter = ({totalQuantity, svgIcon, to}: HeaderCounterProps) => {
  const [isAnimate, setIsAnimate] = useState(false)
  // const totalQuantity = useAppSelector( getCartTotalQuantitySelector )
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
    <div className={styles.container} onClick={() => navigate(to)}>
      {svgIcon}
      {totalQuantity > 0 && (
        <div className={quantityStyle}> {totalQuantity} </div>
      )}
    </div>
  );
}

export default HeaderCounter