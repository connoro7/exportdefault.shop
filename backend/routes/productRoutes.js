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
app.get(
  '/:id',
  asyncHandler(async (request, response) => {
    const product = await Product.findById(req.params.id)

    if (product) {
      response.json(product)
    } else {
      res.status(404).json({ message: 'Product not found' })
    }
  })
)

export default router
