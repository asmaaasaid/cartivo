import type { TLoading } from "@customTypes/shared"
import type React from "react"
import CategorySkeleton from "../Skeletons/CategorySkeletons/CategorySkeleton"
import CartSkeleton from "../Skeletons/CartSkeleton/CartSkeleton"
import ProductSkeleton from "../Skeletons/ProductSkeleton/ProductSkeleton"
import LottieHandler from "../LottieHandler/LottieHandler"

const skeletonsTypes = {
    cart: CartSkeleton,
    category: CategorySkeleton,
    product: ProductSkeleton
}
type LoadingProps = {
    loading: TLoading,
    error: null | string,
    children: React.ReactNode,
    type?: keyof typeof skeletonsTypes,
}

const Loading = ({loading, error, children, type = "category"}: LoadingProps) => {
    const Component = skeletonsTypes[type]
    if(loading === 'pending'){
        return <Component/>
    }
    if(loading === 'failed'){
        return <div>
            <LottieHandler type="errorAnimation" message={error as string}/>
        </div>
    }
  return <> {children} </>
}

export default Loading
