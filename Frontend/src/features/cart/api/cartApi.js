import { api } from "../../../api.js/axios.js";

export const getCartApi=()=>{

return api.get("/cart")

}

export const addToCartApi=(product_id,quantity)=>{

return api.post("/cart",{product_id,quantity})

}

export const updateItemApi=(id,quantity)=>{

return api.put(`/cart/${id}`,{quantity})


}

export const deleteItemApi=(id)=>{

return api.delete(`/cart/${id}`)

}

export const clearCartApi=()=>{

return api.delete("/cart/clear")



}