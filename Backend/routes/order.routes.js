import express from 'express';
import { checkout, getUserOrders, getOrder, getOrderBySession, stripeWebhook } from '../controllers/order.controller.js';
import authMiddleware from '../middleware/auth.middleware.js';

const router = express.Router();


router.post('/webhook', express.raw({ type: 'application/json' }), stripeWebhook);

router.use(authMiddleware);

router.post('/checkout', checkout);
router.get('/', getUserOrders);
router.get('/session/:sessionId', getOrderBySession);
router.get('/:id', getOrder);

export default router;