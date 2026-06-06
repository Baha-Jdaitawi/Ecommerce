import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import useProducts from '../../products/hooks/useProducts.js';

const AdminProducts = () => {
  const { products, loading, error, fetchProducts, deleteProduct } = useProducts();

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-10 h-10 border-4 border-black border-t-transparent rounded-full animate-spin" />
    </div>
  );

  if (error) return <p className="text-red-500 text-center py-20">{error}</p>;

  return (
    <div className="bg-white min-h-screen px-6 md:px-16 py-16">

      <div className="flex items-center justify-between mb-12">
        <div>
          <p className="text-red-500 text-sm font-semibold tracking-[0.3em] uppercase mb-2">Admin</p>
          <h1 className="font-['Bebas_Neue'] text-6xl tracking-widest text-black">PRODUCTS</h1>
        </div>
        <Link
          to="/admin/products/new"
          className="bg-black text-white font-semibold tracking-widest uppercase px-8 py-4 text-sm hover:bg-red-500 transition-colors duration-300"
        >
          Add New
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b-2 border-black">
              <th className="text-left py-4 px-2 font-semibold tracking-widest uppercase text-xs">Image</th>
              <th className="text-left py-4 px-2 font-semibold tracking-widest uppercase text-xs">Name</th>
              <th className="text-left py-4 px-2 font-semibold tracking-widest uppercase text-xs">Category</th>
              <th className="text-left py-4 px-2 font-semibold tracking-widest uppercase text-xs">Price</th>
              <th className="text-left py-4 px-2 font-semibold tracking-widest uppercase text-xs">Stock</th>
              <th className="text-left py-4 px-2 font-semibold tracking-widest uppercase text-xs">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                <td className="py-4 px-2">
                  <img
                    src={product.image_url || '/placeholder.png'}
                    alt={product.name}
                    className="w-14 h-14 object-cover bg-gray-100"
                  />
                </td>
                <td className="py-4 px-2 font-semibold tracking-wide uppercase text-xs">{product.name}</td>
                <td className="py-4 px-2 text-gray-400 tracking-widest uppercase text-xs">{product.category}</td>
                <td className="py-4 px-2 font-bold">${product.price}</td>
                <td className="py-4 px-2">
                  <span className={`text-xs font-semibold tracking-widest uppercase ${product.stock === 0 ? 'text-red-500' : 'text-black'}`}>
                    {product.stock === 0 ? 'Out of Stock' : product.stock}
                  </span>
                </td>
                <td className="py-4 px-2">
                  <div className="flex items-center gap-4">
                    <Link
                      to={`/admin/products/${product.id}/edit`}
                      className="text-xs font-semibold tracking-widest uppercase hover:text-red-500 transition-colors border-b border-black hover:border-red-500"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => deleteProduct(product.id)}
                      className="text-xs font-semibold tracking-widest uppercase text-red-500 hover:text-red-700 transition-colors border-b border-red-500"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default AdminProducts;