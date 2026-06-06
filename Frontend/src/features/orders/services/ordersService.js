import { checkoutApi, getUserOrdersApi, getOrderApi } from '../api/orderApi.js';

export const checkoutService = async (items, shipping_address) => {
  const response = await checkoutApi(items, shipping_address);
  return response.data;
};

export const getUserOrdersService = async () => {
  const response = await getUserOrdersApi();
  return response.data.orders;
};

export const getOrderService = async (id) => {
  const response = await getOrderApi(id);
  return response.data.order;
};