import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useProducts from '../../products/hooks/useProducts.js';

const AdminEditProduct = () => {
  const { id } = useParams();
  const { product, fetchProduct, editProduct, loading, error } = useProducts();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    category: ''
  });
  const [image, setImage] = useState(null);

  useEffect(() => {
    fetchProduct(id);
  }, [id]);

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        description: product.description || '',
        price: product.price,
        stock: product.stock,
        category: product.category || ''
      });
    }
  }, [product]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('name', formData.name);
    data.append('description', formData.description);
    data.append('price', formData.price);
    data.append('stock', formData.stock);
    data.append('category', formData.category);
    if (image) data.append('image', image);

    const result = await editProduct(id, data);
    if (result) navigate('/admin/products');
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Edit Product</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </div>

        <div>
          <label>Description</label>
          <textarea name="description" value={formData.description} onChange={handleChange} />
        </div>

        <div>
          <label>Price</label>
          <input type="number" name="price" value={formData.price} onChange={handleChange} required />
        </div>

        <div>
          <label>Stock</label>
          <input type="number" name="stock" value={formData.stock} onChange={handleChange} required />
        </div>

        <div>
          <label>Category</label>
          <input type="text" name="category" value={formData.category} onChange={handleChange} required />
        </div>

        <div>
          <label>Image</label>
          {product?.image_url && <img src={product.image_url} alt="current" width={100} />}
          <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} />
        </div>

        {error && <p>{error}</p>}

        <button type="submit" disabled={loading}>
          {loading ? 'Saving...' : 'Save Changes'}
        </button>
      </form>
    </div>
  );
};

export default AdminEditProduct;