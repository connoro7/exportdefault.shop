import express from 'express'
const router = express.Router()
import { addOrderItems, getOrderById, updateOrderToPaid } from '../controllers/orderController.js'
import { protect } from '../middleware/authMiddleware.js'

router.route('/').post(protect, addOrderItems)

router.route('/:id/pay').put(protect, updateOrderToPaid)

// getOrderById route must be the last route in this file
router.route('/:id').get(protect, getOrderById)

export default router
