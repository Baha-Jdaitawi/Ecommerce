import {
    getProductService,
    getProductsService,
    createProductService,
    editProductService,
    deleteProductService
} from "../services/productServices.js";

import { useState } from "react";

export const useProducts = () => {

    const [products, setProducts] = useState([])
    const [product, setProduct] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const fetchProducts = async (params) => {

        try {

            setLoading(true)
            setError(null)
            const data = await getProductsService(params)
            setProducts(data.products)

        } catch (error) {
            setError(error?.response?.data?.message || "Failed to fetch products")

        } finally {

            setLoading(false)
        }
    }

    const fetchProduct = async (id) => {

        try {

            setLoading(true)
            setError(null)
            const data = await getProductService(id)
            setProduct(data.product)

        } catch (error) {
            setError(error?.response?.data?.message)
        } finally {
            setLoading(false)
        }
    }


    const createProduct = async (formData) => {

        try {
            setLoading(true)
            setError(null)
            const data = await createProductService(formData)
            setProducts((prev) => [...prev, data.product])
            return data

        } catch (error) {

            setError(error?.response?.data?.message || "Failed to create product")

        } finally {

            setLoading(false)
        }

    }

    const editProduct = async (id, formData) => {

        try {

            setLoading(true)
            setError(null)


            const data = await editProductService(id, formData)

            setProducts((prev) =>

                prev.map((product) => product.id === id ? data.product : product))

            return data

        } catch (error) {

            setError(error?.response?.data?.message || "Failed to edit product")



        } finally {

            setLoading(false)



        }






    }


    const deleteProduct = async (id) => {


        try {

            setLoading(true)
            setError(null)
            const data = await deleteProductService(id)

            setProducts((prev) => prev.filter((product) => product.id !== id))



        } catch (error) {

            setError(error?.response?.data?.message || "Failed to delete product")


        } finally {

            setLoading(false)



        }


    }


    return { loading, error, fetchProducts, fetchProduct, createProduct, editProduct, deleteProduct }



}






















