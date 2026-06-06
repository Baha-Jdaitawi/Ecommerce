import { useEffect, useState } from 'react';
import useProducts from '../hooks/useProducts.js';
import ProductGrid from '../components/ProductGrid.jsx';

const ProductsPage = () => {
  const { products, loading, error, fetchProducts } = useProducts();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');

  useEffect(() => {
    fetchProducts({ search, category });
  }, [search, category]);

  return (
    <div className="bg-white min-h-screen">

      {/* Header */}
      <div className="bg-black text-white px-6 md:px-16 py-16">
        <p className="text-red-500 text-sm font-semibold tracking-[0.3em] uppercase mb-2">Explore</p>
        <h1 className="font-['Bebas_Neue'] text-7xl md:text-9xl tracking-widest">PRODUCTS</h1>
      </div>

      {/* Filters */}
      <div className="px-6 md:px-16 py-8 flex flex-col md:flex-row gap-4 border-b border-gray-200">
        <input
          type="text"
          placeholder="SEARCH..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border-2 border-black px-4 py-3 text-sm font-semibold tracking-widest uppercase outline-none focus:border-red-500 transition-colors w-full md:w-80"
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border-2 border-black px-4 py-3 text-sm font-semibold tracking-widest uppercase outline-none focus:border-red-500 transition-colors bg-white cursor-pointer"
        >
          <option value="">All Categories</option>
          <option value="clothing">Clothing</option>
          <option value="electronics">Electronics</option>
          <option value="accessories">Accessories</option>
          <option value="shoes">Shoes</option>
        </select>
      </div>

      {/* Products */}
      <div className="px-6 md:px-16 py-12">
        {loading && (
          <div className="flex justify-center py-20">
            <div className="w-10 h-10 border-4 border-black border-t-transparent rounded-full animate-spin" />
          </div>
        )}
        {error && <p className="text-red-500 text-center">{error}</p>}
        <ProductGrid products={products} />
      </div>

    </div>
  );
};

export default ProductsPage;
