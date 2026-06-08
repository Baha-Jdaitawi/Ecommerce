import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useProducts from '../hooks/useProducts.js';
import useReviews from '../../reviews/hooks/useReviews.js';
import useAuth from '../../auth/hooks/useAuth.js';
import useCart from '../../cart/hooks/useCart.js';
import ReviewCard from '../../reviews/components/ReviewCard.jsx';
import ReviewForm from '../../reviews/components/ReviewForm.jsx';
import { getImageUrl } from '../../../api/axios.js';

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

  if (loading) return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-10 h-10 border-4 border-black border-t-transparent rounded-full animate-spin" />
    </div>
  );

  if (error) return <p className="text-red-500 text-center py-20">{error}</p>;
  if (!product) return <p className="text-center py-20">Product not found.</p>;

  return (
    <div className="bg-white min-h-screen">

      {/* Product Section */}
      <div className="px-6 md:px-16 py-16 grid grid-cols-1 md:grid-cols-2 gap-16">

        {/* Image */}
        <div className="bg-gray-100 aspect-square overflow-hidden">
          <img
            src={getImageUrl(product.image_url)}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Info */}
        <div className="flex flex-col justify-center">
          <span className="bg-black text-white text-xs font-semibold tracking-widest uppercase px-3 py-1 w-fit mb-4">
            {product.category}
          </span>

          <h1 className="font-['Bebas_Neue'] text-6xl tracking-widest text-black leading-none mb-4">
            {product.name}
          </h1>

          <p className="text-3xl font-bold text-black mb-6">${product.price}</p>

          <p className="text-gray-500 text-sm leading-relaxed mb-8 tracking-wide">
            {product.description}
          </p>

          {product.stock === 0 ? (
            <p className="text-red-500 font-semibold tracking-widest uppercase text-sm mb-6">Out of Stock</p>
          ) : (
            <p className="text-gray-400 text-sm tracking-widest uppercase mb-6">{product.stock} in stock</p>
          )}

          <button
            disabled={product.stock === 0}
            onClick={() => addItem(product.id, 1)}
            className="bg-black text-white font-semibold tracking-widest uppercase py-4 text-sm hover:bg-red-500 transition-colors duration-300 disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            {product.stock === 0 ? 'Sold Out' : 'Add to Cart'}
          </button>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="px-6 md:px-16 py-16 border-t border-gray-200">
        <h2 className="font-['Bebas_Neue'] text-5xl tracking-widest text-black mb-10">REVIEWS</h2>

        {reviews.length === 0 && (
          <p className="text-gray-400 tracking-widest uppercase text-sm mb-10">No reviews yet. Be the first!</p>
        )}

        <div className="flex flex-col gap-6 mb-12">
          {reviews.map((review) => (
            <ReviewCard key={review.id} review={review} onDelete={deleteReview} />
          ))}
        </div>

        {user && <ReviewForm product_id={id} />}
        {!user && (
          <p className="text-gray-400 text-sm tracking-widest uppercase">
            Login to leave a review
          </p>
        )}
      </div>

    </div>
  );
};

export default ProductDetailPage;