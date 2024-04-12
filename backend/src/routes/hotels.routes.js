import { Router } from 'express'
import { createHotel, updateHotel, deleteHotel, getHotel, getHotels } from '../controllers/hotel.controller.js'
import { verifyUser, verifyAdmin } from '../middlewares/verify.middlewares.js'

const router = Router()

// Create.
router.post('/', verifyAdmin, createHotel)

// Update.
router.put('/:id', verifyUser, updateHotel)

// Delete.
router.delete('/:id', verifyUser, deleteHotel)

// Get.
router.get('/:id', verifyUser, getHotel)

// Get all.
router.get('/', verifyAdmin, getHotels)

export default router
