import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'

/**
 * Fetch all products
 * @route GET /api/products
 * @access Public
 */
const getProducts = asyncHandler(async (request, response) => {
  const products = await Product.find({})

  response.json(products)
})

/**
 * Fetches single product
 * @route GET /api/products/:id
 * @access Public
 */
const getProductById = asyncHandler(async (request, response) => {
  const product = await Product.findById(request.params.id)

  if (product) {
    response.json(product)
  } else {
    response.status(404)
    throw new Error('Product not found')
  }
})

/**
 * Deletes a single product
 * @route DELETE /api/products/:id
 * @access Private, admin only
 * @protected
 */
const deleteProduct = asyncHandler(async (request, response) => {
  const product = await Product.findById(request.params.id)

  if (product) {
    await product.remove()
    response.json({ message: 'Product removed' })
  } else {
    response.status(404)
    throw new Error('Product not found')
  }
})

export { getProducts, getProductById, deleteProduct }
