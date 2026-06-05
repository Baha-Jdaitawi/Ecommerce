import {
    getProductsApi,
    getProductApi,
    createProductApi,
    editProductApi,
    deleteProductApi
} from "../api/productsApi";

export const getProductsService = async (params) => {
    const response = await getProductsApi(params)
    return response.data
}

export const getProductService = async (id) => {
    const response = await getProductApi(id)
    return response.data

}

export const createProductService = async (formData) => {
    const response = await createProductApi(formData)

    return response.data
}

export const editProductService = async (id, formData) => {
    const response = await editProductApi(id, formData)

    return response.data

}

export const deleteProductService = async (id) => {

    const response = await deleteProductApi(id)

    return response.data

}