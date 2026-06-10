import { getCartService, addToCartService, updateItemService, removeItemService, clearCartService } from '../services/cartService.js';
import { useState } from 'react';

export const useCart = () => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState(null);

  const getCart = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getCartService();
      setCart(data);
    } catch (error) {
      setError(error?.response?.data?.message || 'Failed to get cart');
    } finally {
      setLoading(false);
    }
  };

  const addItem = async (product_id, quantity) => {
    try {
      setLoading(true);
      setError(null);
      await addToCartService(product_id, quantity);
      const updatedCart = await getCartService();
      setCart(updatedCart);
    } catch (error) {
      setError(error?.response?.data?.message || 'Failed to add item');
    } finally {
      setLoading(false);
    }
  };

  const updateItem = async (id, quantity) => {
    try {
      setUpdating(true);
      setError(null);
      await updateItemService(id, quantity);
      const updatedCart = await getCartService();
      setCart(updatedCart);
    } catch (error) {
      setError(error?.response?.data?.message || 'Failed to update item');
    } finally {
      setUpdating(false);
    }
  };

  const deleteItem = async (id) => {
    try {
      setUpdating(true);
      setError(null);
      await removeItemService(id);
      setCart((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      setError(error?.response?.data?.message || 'Failed to remove item');
    } finally {
      setUpdating(false);
    }
  };

  const clearCart = async () => {
    try {
      setLoading(true);
      setError(null);
      await clearCartService();
      setCart([]);
    } catch (error) {
      setError(error?.response?.data?.message || 'Failed to clear cart');
    } finally {
      setLoading(false);
    }
  };

  return { cart, loading, updating, error, getCart, addItem, updateItem, deleteItem, clearCart };
};

export default useCart;