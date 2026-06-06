import { getReviewsApi, addReviewApi, deleteReviewApi } from '../api/reviewApi.js';

export const getReviewsService = async (product_id) => {
  const response = await getReviewsApi(product_id);
  return response.data.reviews;
};


export const addReviewService = async (product_id, rating, comment) => {
  const response = await addReviewApi(product_id, rating, comment);
  return response.data.review;
};

export const deleteReviewService = async (id) => {
  const response = await deleteReviewApi(id);
  return response.data.message;
};