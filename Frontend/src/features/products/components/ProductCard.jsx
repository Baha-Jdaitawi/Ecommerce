import { Link } from "react-router-dom"


export const ProductCard = ({ product }) => {

    const { id, name, price, category, image_url, stock } = product

    return (

        <div>


            <Link to={`/products/${id}`}>

                <img src={image_url || '/placeholder.png'} alt={name} />

            </Link>

            <span>{name}</span>
            <h3>{name}</h3>
            <p>${price}</p>
            {stock === 0 && <span>Out of stock</span>}


<button disabled={stock === 0}>
        Add to Cart
      </button>



        </div>


    )
}