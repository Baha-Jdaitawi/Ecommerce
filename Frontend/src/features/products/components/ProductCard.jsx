import { Link } from 'react-router-dom';
import useCart from '../../cart/hooks/useCart.js';
import useAuth from '../../auth/hooks/useAuth.js';
import { getImageUrl } from '../../../api/axios.js';

const ProductCard = ({ product }) => {
  const { id, name, price, category, image_url, stock } = product;
  const { addItem } = useCart();
  const { user } = useAuth();

  return (
    <div className="group relative bg-white">

      {/* Image */}
      <div className="relative overflow-hidden bg-gray-100 aspect-square">
        <img
          src={getImageUrl(image_url)}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {stock === 0 && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="text-white font-semibold tracking-widest uppercase text-sm">Sold Out</span>
          </div>
        )}
        <div className="absolute top-3 left-3">
          <span className="bg-black text-white text-xs font-semibold tracking-widest uppercase px-3 py-1">
            {category}
          </span>
        </div>
      </div>

      {/* Info */}
      <div className="pt-4 pb-2">
        <Link to={`/products/${id}`}>
          <h3 className="font-semibold text-black tracking-wide uppercase text-sm hover:text-red-500 transition-colors">
            {name}
          </h3>
        </Link>
        <p className="text-black font-bold text-lg mt-1">${price}</p>
      </div>

      {/* Button */}
      {user ? (
        <button
          disabled={stock === 0}
          onClick={() => addItem(id, 1)}
          className="w-full bg-black text-white text-xs font-semibold tracking-widest uppercase py-3 mt-2 hover:bg-red-500 transition-colors duration-300 disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          {stock === 0 ? 'Sold Out' : 'Add to Cart'}
        </button>
      ) : (
        <Link
          to="/login"
          className="block w-full bg-black text-white text-xs font-semibold tracking-widest uppercase py-3 mt-2 hover:bg-red-500 transition-colors duration-300 text-center"
        >
          Login to Buy
        </Link>
      )}

    </div>
  );
};

export default ProductCard;