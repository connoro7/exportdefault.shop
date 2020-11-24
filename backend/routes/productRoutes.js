import express from 'express'
import asyncHandler from 'express-async-handler'
const router = express.Router()
import Product from '../models/productModel.js'

/**
 * Fetch all products
 * @route GET /api/products
 * @access Public
 */
router.get(
  '/',
  asyncHandler(async (request, response) => {
    const products = await Product.find({})
    response.json(products)
  })
)

/**
 * Fetch single products
 * @route GET /api/products/:id
 * @access Public
 */
router.get(
  '/:id',
  asyncHandler(async (request, response) => {
    const product = await Product.findById(request.params.id)

    if (product) {
      response.json(product)
    } else {
      response.status(404)
      throw new Error('Product not found')
    }
  })
)

export default router
