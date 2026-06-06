import { api } from '../../../api/axios.js';

export const checkoutApi = (items, shipping_address) => {
  return api.post('/orders/checkout', { items, shipping_address });
};

export const getUserOrdersApi = () => {
  return api.get('/orders');
};

export const getOrderApi = (id) => {
  return api.get(`/orders/${id}`);
};