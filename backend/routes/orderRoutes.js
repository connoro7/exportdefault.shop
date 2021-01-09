import express from 'express'
const router = express.Router()
import { addOrderItems, getOrderById, updateOrderToPaid, getMyOrders } from '../controllers/orderController.js'
import { protect } from '../middleware/authMiddleware.js'

router.route('/').post(protect, addOrderItems)
router.route('/myorders').get(protect, getMyOrders)
router.route('/:id/pay').put(protect, updateOrderToPaid)

// getOrderById route must be the last route in this file
router.route('/:id').get(protect, getOrderById)

export default router
