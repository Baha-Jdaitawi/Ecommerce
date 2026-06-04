import { createReview, getReviewsByProductId, hasUserReviewed, deleteReview } from '../models/review.model.js';

export const addReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const product_id = req.params.product_id;

    const alreadyReviewed = await hasUserReviewed(req.user.id, product_id);
    if (alreadyReviewed) {
      return res.status(400).json({ message: 'You already reviewed this product' });
    }

    const review = await createReview(req.user.id, product_id, rating, comment);
    res.status(201).json({ review });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const getProductReviews = async (req, res) => {
  try {
    const reviews = await getReviewsByProductId(req.params.product_id);
    res.status(200).json({ reviews });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const removeReview = async (req, res) => {
  try {
    await deleteReview(req.params.id);
    res.status(200).json({ message: 'Review deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};