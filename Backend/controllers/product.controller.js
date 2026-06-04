import { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct } from '../models/product.model.js';

export const getProducts = async (req, res) => {
  try {
    const { category, search } = req.query;
    const products = await getAllProducts(category, search);
    res.status(200).json({ products });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const getProduct = async (req, res) => {
  try {
    const product = await getProductById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json({ product });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const addProduct = async (req, res) => {
  try {
    const { name, description, price, stock, category } = req.body;
    const image_url = req.file ? `/uploads/${req.file.filename}` : null;
    const product = await createProduct(name, description, price, stock, category, image_url);
    res.status(201).json({ product });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const editProduct = async (req, res) => {
  try {
    const { name, description, price, stock, category } = req.body;
    const image_url = req.file ? `/uploads/${req.file.filename}` : req.body.image_url;
    const product = await updateProduct(req.params.id, name, description, price, stock, category, image_url);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json({ product });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const removeProduct = async (req, res) => {
  try {
    await deleteProduct(req.params.id);
    res.status(200).json({ message: 'Product deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};