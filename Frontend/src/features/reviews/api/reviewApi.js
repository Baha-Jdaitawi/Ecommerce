import { api } from '../../../api/axios.js';

export const getReviewsApi = (product_id) => {
  return api.get(`/reviews/${product_id}`);
};

export const addReviewApi = (product_id, rating, comment) => {
  return api.post(`/reviews/${product_id}`, { rating, comment });
};

export const deleteReviewApi = (id) => {
  return api.delete(`/reviews/${id}`);
};