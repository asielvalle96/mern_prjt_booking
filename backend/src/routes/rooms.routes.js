import { Router } from 'express'
import { createRoom, updateRoom, deleteRoom, getRoom, getRooms } from '../controllers/room.controller.js'
import { verifyAdmin } from '../middlewares/verify.middlewares.js'

const router = Router()

// Create.
router.post('/:hotelId', verifyAdmin, createRoom)

// Update.
router.put('/:id', verifyAdmin, updateRoom)

// Delete.
router.delete('/:hotelId/:id', verifyAdmin, deleteRoom)

// Get.
router.get('/:id', getRoom)

// Get all.
router.get('/', getRooms)

export default router
