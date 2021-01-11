import express from 'express'
const router = express.Router()
import { authUser, createUser, deleteUser, getAllUsers, getUserProfile, updateUserProfile } from '../controllers/userController.js'
import { protect, isAdmin } from '../middleware/authMiddleware.js'

router.route('/').post(createUser).get(protect, isAdmin, getAllUsers)
router.post('/login', authUser)
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile)
router.route('/:id').delete(protect, isAdmin, deleteUser)

export default router
