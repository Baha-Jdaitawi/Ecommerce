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

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed'), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }
});

const handleUpload = (req, res, next) => {
  upload.single('image')(req, res, (err) => {
    if (err) {
      return res.status(400).json({ message: err.message });
    }
    next();
  });
};

router.get('/', getProducts);
router.get('/:id', getProduct);
router.post('/', authMiddleware, adminMiddleware, handleUpload, addProduct);
router.put('/:id', authMiddleware, adminMiddleware, handleUpload, editProduct);
router.delete('/:id', authMiddleware, adminMiddleware, removeProduct);

export default router;