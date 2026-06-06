import { getCartService, addToCartService, updateItemService, removeItemService, clearCartService } from '../services/cartService.js';
import { useState } from 'react';

export const useCart = () => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
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
      const item = await addToCartService(product_id, quantity);
      setCart((prev) => [...prev, item]);
      return item;
    } catch (error) {
      setError(error?.response?.data?.message || 'Failed to add item');
    } finally {
      setLoading(false);
    }
  };

  const updateItem = async (id, quantity) => {
    try {
      setLoading(true);
      setError(null);
      const updatedItem = await updateItemService(id, quantity);
      setCart((prev) => prev.map((item) => item.id === id ? updatedItem : item));
    } catch (error) {
      setError(error?.response?.data?.message || 'Failed to update item');
    } finally {
      setLoading(false);
    }
  };

  const deleteItem = async (id) => {
    try {
      setLoading(true);
      setError(null);
      await removeItemService(id);
      setCart((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      setError(error?.response?.data?.message || 'Failed to remove item');
    } finally {
      setLoading(false);
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

  return { cart, loading, error, getCart, addItem, updateItem, deleteItem, clearCart };
};