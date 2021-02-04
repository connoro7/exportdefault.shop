import express from 'express'
const router = express.Router()
import { getProducts, getProductById, deleteProduct, updateProduct, createProduct, createProductReview, getTopRatedProducts } from '../controllers/productController.js'
import { protect, isAdmin } from '../middleware/authMiddleware.js'

router.route('/').get(getProducts).post(protect, isAdmin, createProduct)
router.get('/top', getTopRatedProducts)
router.route('/:id').get(getProductById).delete(protect, isAdmin, deleteProduct).put(protect, isAdmin, updateProduct)
router.route('/:id/reviews').post(protect, createProductReview)

export default router
