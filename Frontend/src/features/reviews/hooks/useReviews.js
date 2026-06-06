import { useState } from 'react';
import { getReviewsService, addReviewService, deleteReviewService } from '../services/reviewService.js';

export const useReviews=()=>{

const [reviews, setReviews] = useState([]);
const [loading, setLoading] = useState(false);
const [error, setError] = useState(null);

 const fetchReviews = async (product_id) => {
    try {
      setLoading(true);
      setError(null);
      const data = await getReviewsService(product_id);
      setReviews(data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch reviews');
    } finally {
      setLoading(false);
    }
  };

  const addReview = async (product_id, rating, comment) => {
    try {
      setLoading(true);
      setError(null);
      const review = await addReviewService(product_id, rating, comment);
      setReviews((prev) => [...prev, review]);
      return review;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add review');
    } finally {
      setLoading(false);
    }
  };


const deleteReview = async (id) => {
    try {
      setLoading(true);
      setError(null);
      await deleteReviewService(id);
      setReviews((prev) => prev.filter((review) => review.id !== id));
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete review');
    } finally {
      setLoading(false);
    }
  };  

return { reviews, loading, error, fetchReviews, addReview, deleteReview };





}