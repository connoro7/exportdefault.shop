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

export { authUser, createUser, getUserProfile }
