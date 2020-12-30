import asyncHandler from 'express-async-handler'
import Order from '../models/orderModel.js'

/**
 * Create new order
 * @route POST /api/orders
 * @access Private
 * @protected
 */
const addOrderItems = asyncHandler(async (request, response) => {
  const { orderItems, shippingAddress, paymentMethod, subtotal, shippingPrice, taxPrice, totalPrice } = request.body

  // Bad request: orderItems has been initialized but length = 0
  if (orderItems && orderItems === 0) {
    response.status(400)
    throw new Error('No order items')
    return
  } else {
    // Else, create a new order in the database
    const order = new Order({
      orderItems,
      shippingAddress,
      paymentMethod,
      subtotal,
      shippingPrice,
      taxPrice,
      totalPrice,
      user: request.user._id,
    })
    const createdOrder = await order.save()

    response.status(201).json(createdOrder)
  }

  response.json(products)
})

/**
 * Get order by ID
 * @route GET /api/orders/:id
 * @access Private
 * @protected
 */
const getOrderById = asyncHandler(async (request, response) => {
  const order = await (await Order.findById(request.params.id)).populate('user', 'name email')

  if (order) {
    response.json(order)
  } else {
    response.status(404)
    throw new Error('Order not found')
  }
})

export { addOrderItems, getOrderById }
