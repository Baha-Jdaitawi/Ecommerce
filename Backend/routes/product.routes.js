import express from 'express';
import multer from 'multer';
import { getProducts, getProduct, addProduct, editProduct, removeProduct } from '../controllers/product.controller.js';
import authMiddleware from '../middleware/auth.middleware.js';
import adminMiddleware from '../middleware/admin.middleware.js';

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
});

const upload = multer({ storage });

router.get('/', getProducts);
router.get('/:id', getProduct);
router.post('/', authMiddleware, adminMiddleware, upload.single('image'), addProduct);
router.put('/:id', authMiddleware, adminMiddleware, upload.single('image'), editProduct);
router.delete('/:id', authMiddleware, adminMiddleware, removeProduct);

export default router;