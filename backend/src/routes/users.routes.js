import { Router } from 'express'
import { createUser, updateUser, deleteUser, getUser, getUsers } from '../controllers/user.controller.js'

const router = Router()

// Create.
router.post('/', createUser)

// Update.
router.put('/:id', updateUser)

// Delete.
router.delete('/:id', deleteUser)

// Get.
router.get('/:id', getUser)

// Get all.
router.get('/', getUsers)

export default router
