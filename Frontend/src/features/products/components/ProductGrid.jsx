import ProductCard from './ProductCard.jsx';

const ProductGrid = ({ products }) => {
  if (!products || products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <p className="font-['Bebas_Neue'] text-4xl tracking-widest text-gray-300">NO PRODUCTS FOUND</p>
        <p className="text-gray-400 text-sm mt-2 tracking-wide">Try a different search or category</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;