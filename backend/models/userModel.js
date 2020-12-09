import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: String,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
)

/**
 * Handles user authentication by checking if password sent in login request matches the password in the DB
 * @name matchPassword
 * @param {string} enteredPassword
 * @this User.findOne({ email: email })
 * @method
 * @protected
 */
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password)
}

/**
 * Handles the salting and hashing of a password *before* saving it to the database
 * @name hashPassword
 * @this user
 * @param {string} this.password
 * @returns bcrypt.hash(this.password)
 * @protected
 */
userSchema.pre('save', async function (next) {
  // prevent new hash of password being made if user updates some account data, but not password
  if (!this.isModified('password')) {
    next()
  }

  // Re-assigns the plaintext password entered by user in the web app to the hashed version
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

const User = mongoose.model('User', userSchema)

export default User
