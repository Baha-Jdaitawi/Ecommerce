import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import useProducts from '../../products/hooks/useProducts.js';

const AdminProducts = () => {
  const { products, loading, error, fetchProducts, deleteProduct } = useProducts();

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Manage Products</h1>
      <Link to="/admin/products/new">Add New Product</Link>

      <table>
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>
                <img src={product.image_url || '/placeholder.png'} alt={product.name} width={50} />
              </td>
              <td>{product.name}</td>
              <td>{product.category}</td>
              <td>${product.price}</td>
              <td>{product.stock}</td>
              <td>
                <Link to={`/admin/products/${product.id}/edit`}>Edit</Link>
                <button onClick={() => deleteProduct(product.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminProducts;