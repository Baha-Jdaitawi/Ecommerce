import { ProductCard } from "./ProductCard"

export const ProductGrid=async({products})=>{

if(!products||products.length===0) return "No products found"


return (

<div>

{

products.map((product)=>(<ProductCard key={product.id} product={product}/>))}

</div>

)

}