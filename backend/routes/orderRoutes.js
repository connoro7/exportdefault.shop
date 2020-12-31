import express from 'express'
const router = express.Router()
import { addOrderItems, getOrderById } from '../controllers/orderController.js'
import { protect } from '../middleware/authMiddleware.js'

router.route('/').post(protect, addOrderItems)

// getOrderById route must be the last route in this file
router.route('/:id').get(protect, getOrderById)

export default router
