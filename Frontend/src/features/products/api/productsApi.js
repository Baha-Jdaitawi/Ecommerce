import { api } from '../../../api/axios.js';

export const getProductsApi = (params) => {
  return api.get('/products', { params });
};

export const getProductApi = (id) => {
  return api.get(`/products/${id}`);
};

export const createProductApi = (formData) => {
  return api.post('/products', formData);
};

export const editProductApi = (id, formData) => {
  return api.put(`/products/${id}`, formData);
};

export const deleteProductApi = (id) => {
  return api.delete(`/products/${id}`);
};