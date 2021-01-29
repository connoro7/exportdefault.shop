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

/**
 * Creates a single product
 * @route  POST /api/products
 * @access Private, admin only
 * @protected
 */
const createProduct = asyncHandler(async (request, response) => {
  const product = new Product({
    name: 'productName',
    price: 0,
    user: request.user._id,
    image: '/images/placeholder.jpg',
    brand: 'productBrand',
    category: 'productCategory',
    countInStock: 0,
    numReviews: 0,
    description: 'product description goes here',
  })

  const createdProduct = await product.save()
  response.status(201).json(createdProduct)
})

/**
 * Updates a single product
 * @route PUT /api/products/:id
 * @access Private, admin only
 * @protected
 */
const updateProduct = asyncHandler(async (request, response) => {
  // Don't need to grab user or numReviews
  const { name, price, description, image, brand, category, countInStock } = request.body

  const product = await Product.findById(request.params.id)

  if (product) {
    product.name = name
    product.price = price
    product.description = description
    product.image = image
    product.brand = brand
    product.category = category
    product.countInStock = countInStock
    const updatedProduct = await product.save()
    response.json(updatedProduct)
  } else {
    response.status(404)
    throw new Error('Product not found')
  }
})

/**
 * Create a new review
 * @route POST /api/products/:id/reviews
 * @access Private
 * @protected
 */
const createProductReview = asyncHandler(async (request, response) => {
  const { rating, comment } = request.body

  const product = await Product.findById(request.params.id)

  if (product) {
    const alreadyReviewed = product.reviews.find((review) => review.user.toString() === request.user._id.toString())

    if (alreadyReviewed) {
      response.status(400)
      throw new Error('Cannot create multiple reviews')
    }
    const review = {
      name: request.user.name,
      rating: Number(rating),
      comment,
      user: request.user._id,
    }

    product.reviews.push(review)

    product.numReviews = product.reviews.length

    product.rating = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length

    await product.save()
    response.status(201).json({ message: 'Review created' })
  } else {
    response.status(404)
    throw new Error('Product not found')
  }
})

export { getProducts, getProductById, deleteProduct, createProduct, updateProduct, createProductReview }
