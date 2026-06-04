import express from 'express';
import { getDashboardStats, getOrders, changeOrderStatus, getAllUsers } from '../controllers/admin.controller.js';
import authMiddleware from '../middleware/auth.middleware.js';
import adminMiddleware from '../middleware/admin.middleware.js';

const router = express.Router();

router.use(authMiddleware);
router.use(adminMiddleware);

router.get('/stats', getDashboardStats);
router.get('/orders', getOrders);
router.put('/orders/:id/status', changeOrderStatus);
router.get('/users', getAllUsers);

export default router;