import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import useProducts from '../hooks/useProducts.js';
import ProductGrid from '../components/ProductGrid.jsx';

const HomePage = () => {
  const { products, loading, error, fetchProducts } = useProducts();

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="bg-white min-h-screen">

      <section className="bg-black text-white min-h-[90vh] flex flex-col items-center justify-center text-center px-6">
        <p className="text-red-500 text-sm font-semibold tracking-[0.3em] uppercase mb-4">New Collection</p>
        <h1 className="font-['Bebas_Neue'] text-[8rem] md:text-[12rem] leading-none tracking-widest text-white">
          REIGN
        </h1>
        <p className="text-gray-400 text-lg md:text-xl max-w-xl mt-4 font-light tracking-wide">
          Built for the relentless. Designed for the bold.
        </p>
        <Link
          to="/products"
          className="mt-10 bg-white text-black font-semibold tracking-widest uppercase px-10 py-4 text-sm hover:bg-red-500 hover:text-white transition-all duration-300"
        >
          Shop Now
        </Link>
      </section>

      <section className="px-6 md:px-16 py-20">
        <div className="flex items-center justify-between mb-10">
          <h2 className="font-['Bebas_Neue'] text-5xl tracking-widest text-black">
            FEATURED
          </h2>
          <Link
            to="/products"
            className="text-sm font-semibold tracking-widest uppercase border-b-2 border-black hover:border-red-500 hover:text-red-500 transition-colors"
          >
            View All
          </Link>
        </div>

        {loading && (
          <div className="flex justify-center py-20">
            <div className="w-10 h-10 border-4 border-black border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {error && <p className="text-red-500 text-center">{error}</p>}

        <ProductGrid products={products.slice(0, 4)} />
      </section>

      <section className="bg-black text-white px-6 md:px-16 py-24 flex flex-col md:flex-row items-center justify-between gap-10">
        <div>
          <p className="text-red-500 text-sm font-semibold tracking-[0.3em] uppercase mb-3">Limited Edition</p>
          <h2 className="font-['Bebas_Neue'] text-6xl md:text-8xl tracking-widest leading-none">
            PUSH YOUR<br />LIMITS
          </h2>
        </div>
        <Link
          to="/products"
          className="bg-white text-black font-semibold tracking-widest uppercase px-10 py-4 text-sm hover:bg-red-500 hover:text-white transition-all duration-300 whitespace-nowrap"
        >
          Explore All
        </Link>
      </section>

    </div>
  );
};

export default HomePage;