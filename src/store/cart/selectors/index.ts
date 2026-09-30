import type { RootState } from "@store/index";
import { createSelector } from "@reduxjs/toolkit";
const getCartTotalQuantitySelector = createSelector(
    (state: RootState)=> state.cart.items,
    (items)=>{
        const totalQuantity = Object.values(items).reduce(
    (accumlator, currentValue) => {
      return accumlator + currentValue;
    },
    0,
  )
  return totalQuantity
    } 
)

export {getCartTotalQuantitySelector}
