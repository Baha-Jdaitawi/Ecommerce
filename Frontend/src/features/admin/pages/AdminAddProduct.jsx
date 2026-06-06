import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useProducts from '../../products/hooks/useProducts.js';

const AdminAddProduct = () => {
  const { createProduct, loading, error } = useProducts();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    category: ''
  });
  const [image, setImage] = useState(null);

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

    const result = await createProduct(data);
    if (result) navigate('/admin/products');
  };

  return (
    <div className="bg-white min-h-screen px-6 md:px-16 py-16">

      <div className="mb-12">
        <p className="text-red-500 text-sm font-semibold tracking-[0.3em] uppercase mb-2">Admin</p>
        <h1 className="font-['Bebas_Neue'] text-6xl tracking-widest text-black">ADD PRODUCT</h1>
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
          {loading ? 'Adding...' : 'Add Product'}
        </button>

      </form>
    </div>
  );
};

export default AdminAddProduct;