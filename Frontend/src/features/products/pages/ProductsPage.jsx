import { useState,useEffect } from "react";
import { useProducts } from "../hooks/useProducts";
import { ProductGrid } from "../components/ProductCard";

export const ProductsPage=()=>{

const {products,error,loading,fetchProducts}=useProducts()
const[search,setSearch]=useState("")
const[category,setCategory]=useState("")

useEffect(()=>{

fetchProducts({search,category})



},[search],[category])

if(loading) return <p>is loading...</p>
if(error) return <p>{error}</p>

return (

<div>

<input placeholder="Search products" value={search} type="text" onChange={(e)=>setSearch(e.target.value)}/>

<select value={category} onChange={(e)=>setCategory(e.target.value)}>

<option value="">All categories</option>

<option value="clothing">Clothing</option>
<option value="electronics">electronics</option>
<option value="accessories">accessories</option>


</select>

<ProductGrid products={products}/>


</div>



)






}

