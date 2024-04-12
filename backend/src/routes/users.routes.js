import { Router } from 'express'
import { createUser, updateUser, deleteUser, getUser, getUsers } from '../controllers/user.controller.js'
import { verifyUser, verifyAdmin } from '../middlewares/verify.middlewares.js'

const router = Router()

// Create.
router.post('/', verifyAdmin, createUser)

// Update.
router.put('/:id', verifyUser, updateUser)

// Delete.
router.delete('/:id', verifyUser, deleteUser)

// Get.
router.get('/:id', verifyUser, getUser)

// Get all.
router.get('/', verifyAdmin, getUsers)

export default router
