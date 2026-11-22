import { mapProduct, type TApiProduct, type TProduct } from "@customTypes/product";
import { api } from "@services/api";

const getProductsByIds =async (ids: (number | string)[], signal?: AbortSignal): Promise<TProduct[]> =>{
    const response = await Promise.allSettled(
        ids.map((id)=> api.get<TApiProduct>(`/products/${id}`, {signal} ))
    )

    const products: TProduct[] = [];
    for(const res of response){
        if(res.status === 'fulfilled'){
            products.push(mapProduct(res.value.data))
        }
    }

    return products
}

export default getProductsByIds