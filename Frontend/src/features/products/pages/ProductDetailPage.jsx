import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useProducts from '../hooks/useProducts.js';

function ProductDetailPage() {
  const { id } = useParams();
  const { product, loading, error, fetchProduct } = useProducts();

  useEffect(() => {
    fetchProduct(id);
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!product) return <p>Product not found.</p>;

  return (
    <div>
      <img src={product.image_url || '/placeholder.png'} alt={product.name} />

      <div>
        <span>{product.category}</span>
        <h1>{product.name}</h1>
        <p>${product.price}</p>
        <p>{product.description}</p>
        {product.stock === 0 ? (
          <p>Out of stock</p>
        ) : (
          <p>{product.stock} in stock</p>
        )}

        <button disabled={product.stock === 0}>
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductDetailPage;