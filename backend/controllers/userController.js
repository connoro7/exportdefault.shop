import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'
import generateToken from '../utils/generateJWT.js'

/**
 * Authenticates user
 * @route POST /api/users/login
 * @access Public
 * @see userSchema.methods.matchPassword
 * @throws 401 Unauthorized: If user does not exist || password does not match password stored in DB
 */
const authUser = asyncHandler(async (request, response) => {
  const { email, password } = request.body

  // Looks for a user in the database with an email that matches the email sent in the request
  const user = await User.findOne({ email: email })

  if (user && (await user.matchPassword(password))) {
    response.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    })
  } else {
    response.status(401)
    throw new Error('Invalid email or password')
  }
})

/**
 * Create new user
 * @route POST /api/users/
 * @access Public
 */
const createUser = asyncHandler(async (request, response) => {
  const { name, email, password } = request.body

  const userExists = await User.findOne({ email: email })

  if (userExists) {
    response.status(400)
    throw new Error('An account already exists with that email address')
  }
  const user = await User.create({
    name,
    email,
    password,
  })
  if (user) {
    response.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    })
  } else {
    response.status(400)
    throw new Error('Invalid account credentials')
  }
})

/**
 * Gets user profile
 * @route GET /api/users/profile
 * @access Private
 * @protected
 * @throws 401 Unauthorized: If user is not found || If client auth token is malformed or not found
 */
const getUserProfile = asyncHandler(async (request, response) => {
  const user = await User.findById(request.user._id)

  if (user) {
    response.json({ _id: user._id, name: user.name, email: user.email, isAdmin: user.isAdmin })
  } else {
    response.status(404)
    throw new Error('Account not found')
  }
})

/**
 * Update user profile
 * @route PUT /api/users/profile
 * @access Private
 * @protected
 * @throws 404 Not Found: If user is not found
 */
const updateUserProfile = asyncHandler(async (request, response) => {
  const user = await User.findById(request.user._id)

  if (user) {
    user.name = request.body.name || user.name
    user.email = request.body.email || user.email
    if (request.body.password) {
      user.password = request.body.password
    }
    const updatedUser = await user.save()

    response.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(user._id),
    })
  } else {
    response.status(404)
    throw new Error('Account not found')
  }
})

/**
 * Gets all users
 * @route GET /api/users
 * @access Private
 * @access Admin only
 * @protected
 */
const getAllUsers = asyncHandler(async (request, response) => {
  const users = await User.find({})
  response.json(users)
})

/**
 * Deletes single user
 * @route DELETE /api/users/:id
 * @access Private
 * @access Admin only
 * @protected
 */
const deleteUser = asyncHandler(async (request, response) => {
  const user = await User.findById(request.params.id)
  if (user) {
    await user.remove()
    response.json({ message: 'User deleted' })
  } else {
    response.status(404)
    throw new Error('User not found or does not exist')
  }
})

/**
 * Gets user by ID
 * @route GET /api/users/:id
 * @access Private
 * @access Admin only
 * @protected
 */
const getUserById = asyncHandler(async (request, response) => {
  const user = await User.findById(request.params.id).select('-password')
  if (user) {
    response.json(user)
  } else {
    response.status(404)
    throw new Error('User not found or does not exist')
  }
})

/**
 * Update user profile
 * @route PUT /api/users/profile
 * @access Private
 * @access Admin only
 * @protected
 */
const updateUser = asyncHandler(async (request, response) => {
  const user = await User.findById(request.params.id)

  if (user) {
    user.name = request.body.name || user.name
    user.email = request.body.email || user.email
    user.isAdmin = request.body.isAdmin
    const updatedUser = await user.save()

    response.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    })
  } else {
    response.status(404)
    throw new Error('Account not found')
  }
})

export { authUser, createUser, getUserProfile, updateUserProfile, getAllUsers, deleteUser, getUserById, updateUser }
