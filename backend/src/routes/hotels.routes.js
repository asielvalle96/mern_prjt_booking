import { Router } from 'express'
import { createHotel, updateHotel, deleteHotel, getHotel, getHotels } from '../controllers/hotel.controller.js'

const router = Router()

// Create.
router.post('/', createHotel)

// Update.
router.put('/:id', updateHotel)

// Delete.
router.delete('/:id', deleteHotel)

// Get.
router.get('/:id', getHotel)

// Get all.
router.get('/', getHotels)

export default router
