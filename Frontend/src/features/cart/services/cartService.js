import { getCartApi, addToCartApi, updateItemApi, deleteItemApi, clearCartApi } from "../api/cartApi";

export const getCartService = async () => {
    const response = await getCartApi()
    return response.data.cart

}

export const addToCartService = async (product_id, quantity) => {

    const response = await addToCartApi(product_id, quantity)
    return response.data.item

}

export const updateItemCartService = async (id, quantity) => {

    const response = await updateItemApi(id,quantity)
    return response.data.item

}

export const removeItemService = async (id) => {

    const response = await deleteItemApi(id)
    return response.data.message

}

export const clearCartService=async()=>{

const response=await clearCartApi()
return response.data.message


}