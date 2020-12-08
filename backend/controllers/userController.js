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

export { authUser }
