import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useProducts from '../hooks/useProducts.js';
import useReviews from '../../reviews/hooks/useReviews.js';
import useAuth from '../../auth/hooks/useAuth.js';
import useCart from '../../cart/hooks/useCart.js';
import ReviewCard from '../../reviews/components/ReviewCard.jsx';
import ReviewForm from '../../reviews/components/ReviewForm.jsx';

const ProductDetailPage = () => {
  const { id } = useParams();
  const { product, loading, error, fetchProduct } = useProducts();
  const { reviews, fetchReviews, deleteReview } = useReviews();
  const { user } = useAuth();
  const { addItem } = useCart();

  useEffect(() => {
    fetchProduct(id);
    fetchReviews(id);
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

        <button
          disabled={product.stock === 0}
          onClick={() => addItem(product.id, 1)}
        >
          Add to Cart
        </button>
      </div>

      <div>
        <h2>Reviews</h2>
        {reviews.length === 0 && <p>No reviews yet.</p>}
        {reviews.map((review) => (
          <ReviewCard key={review.id} review={review} onDelete={deleteReview} />
        ))}

        {user && <ReviewForm product_id={id} />}
        {!user && <p>Login to leave a review</p>}
      </div>
    </div>
  );
};

export default ProductDetailPage;