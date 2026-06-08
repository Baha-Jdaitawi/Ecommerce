import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useProducts from '../../products/hooks/useProducts.js';
import { getImageUrl } from '../../../api/axios.js';

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

  if (loading) return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-10 h-10 border-4 border-black border-t-transparent rounded-full animate-spin" />
    </div>
  );

  return (
    <div className="bg-white min-h-screen px-6 md:px-16 py-16">

      <div className="mb-12">
        <p className="text-red-500 text-sm font-semibold tracking-[0.3em] uppercase mb-2">Admin</p>
        <h1 className="font-['Bebas_Neue'] text-6xl tracking-widest text-black">EDIT PRODUCT</h1>
      </div>

      <form onSubmit={handleSubmit} className="max-w-2xl flex flex-col gap-6">

        <div>
          <label className="text-xs font-semibold tracking-widest uppercase text-black block mb-2">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="border-2 border-black px-4 py-3 text-sm outline-none focus:border-red-500 transition-colors w-full"
          />
        </div>

        <div>
          <label className="text-xs font-semibold tracking-widest uppercase text-black block mb-2">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            className="border-2 border-black px-4 py-3 text-sm outline-none focus:border-red-500 transition-colors w-full resize-none"
          />
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="text-xs font-semibold tracking-widest uppercase text-black block mb-2">Price</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              className="border-2 border-black px-4 py-3 text-sm outline-none focus:border-red-500 transition-colors w-full"
            />
          </div>
          <div>
            <label className="text-xs font-semibold tracking-widest uppercase text-black block mb-2">Stock</label>
            <input
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              required
              className="border-2 border-black px-4 py-3 text-sm outline-none focus:border-red-500 transition-colors w-full"
            />
          </div>
        </div>

        <div>
          <label className="text-xs font-semibold tracking-widest uppercase text-black block mb-2">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="border-2 border-black px-4 py-3 text-sm outline-none focus:border-red-500 transition-colors w-full bg-white cursor-pointer"
          >
            <option value="">Select Category</option>
            <option value="clothing">Clothing</option>
            <option value="electronics">Electronics</option>
            <option value="accessories">Accessories</option>
            <option value="shoes">Shoes</option>
          </select>
        </div>

        <div>
          <label className="text-xs font-semibold tracking-widest uppercase text-black block mb-2">Image</label>
          {product?.image_url && (
            <img src={getImageUrl(product.image_url)} alt="current" className="w-24 h-24 object-cover bg-gray-100 mb-3" />
          )}
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            className="text-sm text-gray-400 file:mr-4 file:py-2 file:px-6 file:border-2 file:border-black file:text-xs file:font-semibold file:tracking-widest file:uppercase file:bg-white file:text-black hover:file:bg-black hover:file:text-white file:transition-colors file:cursor-pointer"
          />
        </div>

        {error && <p className="text-red-500 text-sm tracking-wide">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="bg-black text-white font-semibold tracking-widest uppercase py-4 text-sm hover:bg-red-500 transition-colors duration-300 disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          {loading ? 'Saving...' : 'Save Changes'}
        </button>

      </form>
    </div>
  );
};

export default AdminEditProduct;