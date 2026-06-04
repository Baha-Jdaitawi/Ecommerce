import express from 'express';
import { addReview, getProductReviews, removeReview } from '../controllers/review.controller.js';
import authMiddleware from '../middleware/auth.middleware.js';
import adminMiddleware from '../middleware/admin.middleware.js';

const router = express.Router();

router.get('/:product_id', getProductReviews);
router.post('/:product_id', authMiddleware, addReview);
router.delete('/:id', authMiddleware, adminMiddleware, removeReview);

export default router;