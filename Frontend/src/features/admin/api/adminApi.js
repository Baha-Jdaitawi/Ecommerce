import { api } from '../../../api/axios.js';

export const getStatsApi = () => {
  return api.get('/admin/stats');
};

export const getAdminOrdersApi = () => {
  return api.get('/admin/orders');
};

export const updateOrderStatusApi = (id, status) => {
  return api.put(`/admin/orders/${id}/status`, { status });
};

export const getAllUsersApi = () => {
  return api.get('/admin/users');
};