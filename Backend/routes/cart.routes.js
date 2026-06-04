import express from 'express';
import { getCart, addItem, updateItem, removeItem, clearUserCart } from '../controllers/cart.controller.js';
import authMiddleware from '../middleware/auth.middleware.js';

const router = express.Router();

router.use(authMiddleware);

router.get('/', getCart);
router.post('/', addItem);
router.put('/:id', updateItem);
router.delete('/clear', clearUserCart);
router.delete('/:id', removeItem);

export default router;