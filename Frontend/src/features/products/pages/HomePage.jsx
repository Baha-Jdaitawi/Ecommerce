import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import useProducts from '../hooks/useProducts.js';
import ProductGrid from '../components/ProductGrid.jsx';

function HomePage() {
  const { products, loading, error, fetchProducts } = useProducts();

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      <div>
        <h1>Welcome to our Store</h1>
        <p>Discover the best products at the best prices</p>
        <Link to="/products">Shop Now</Link>
      </div>

      <div>
        <h2>Featured Products</h2>
        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        <ProductGrid products={products} />
      </div>
    </div>
  );
}

export default HomePage;