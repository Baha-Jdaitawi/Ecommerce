import express from 'express';
import { checkout, getUserOrders, getOrder } from '../controllers/order.controller.js';
import authMiddleware from '../middleware/auth.middleware.js';

const router = express.Router();

router.use(authMiddleware);

router.post('/checkout', checkout);
router.get('/', getUserOrders);
router.get('/:id', getOrder);

export default router;