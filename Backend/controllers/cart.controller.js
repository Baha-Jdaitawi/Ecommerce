import { getCartByUserId, addToCart, updateCartItem, removeFromCart, clearCart } from '../models/cart.model.js';

export const getCart = async (req, res) => {
  try {
    const cart = await getCartByUserId(req.user.id);
    res.status(200).json({ cart });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const addItem = async (req, res) => {
  try {
    const { product_id, quantity } = req.body;
    const item = await addToCart(req.user.id, product_id, quantity || 1);
    res.status(201).json({ item });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateItem = async (req, res) => {
  try {
    const { quantity } = req.body;
    const item = await updateCartItem(req.params.id, req.user.id, quantity);
    if (!item) {
      return res.status(404).json({ message: 'Cart item not found' });
    }
    res.status(200).json({ item });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const removeItem = async (req, res) => {
  try {
    await removeFromCart(req.params.id, req.user.id);
    res.status(200).json({ message: 'Item removed' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const clearUserCart = async (req, res) => {
  try {
    await clearCart(req.user.id);
    res.status(200).json({ message: 'Cart cleared' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};