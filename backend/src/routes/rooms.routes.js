import { Router } from 'express'
import { createRoom, updateRoom, deleteRoom, getRoom, getRooms } from '../controllers/room.controller.js'
import { verifyUser, verifyAdmin } from '../middlewares/verify.middlewares.js'

const router = Router()

// Create.
router.post('/', verifyAdmin, createRoom)

// Update.
router.put('/:id', verifyUser, updateRoom)

// Delete.
router.delete('/:id', verifyUser, deleteRoom)

// Get.
router.get('/:id', verifyUser, getRoom)

// Get all.
router.get('/', verifyAdmin, getRooms)

export default router
