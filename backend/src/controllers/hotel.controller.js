import Hotel from '../models/hotel.model.js'
import createError from '../useful/createError.js'
import Room from '../models/room.model.js'

export const createHotel = async (req, res, next) => {
  try {
    const newHotel = new Hotel(req.body)
    const saveHotel = await newHotel.save()
    res.status(200).json(saveHotel)
  } catch (err) {
    next(err)
  }
}

export const updateHotel = async (req, res, next) => {
  try {
    const updatedHotel = await Hotel.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true }) // Param { new: true } give me the updated item.
    res.status(200).json(updatedHotel)
  } catch (error) {
    next(error)
  }
}

export const deleteHotel = async (req, res, next) => {
  const hotelId = req.params.id

  try {
    const hotelToDelete = await Hotel.findByIdAndDelete(hotelId)
    if (!hotelToDelete) return next(createError(404, `Hotel with id ${hotelId} not found!`))

    try {
      hotelToDelete.hotelRooms.forEach(async roomId => {
        const deleteRoom = await Room.findByIdAndDelete(roomId)
        if (!deleteRoom) return next(createError(404, `Room with id ${roomId} not found. It is from Hotel with id ${hotelId}`))
      })
    } catch (err) {
      next(err)
    }

    res.status(200).json('Hotel has been deleted!')
  } catch (err) {
    next(err)
  }
}

// Get a hotel by id.
export const getHotel = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.id)
    res.status(200).json(hotel)
  } catch (error) {
    next(error)
  }
}

// Get all hotels.
export const getHotels = async (req, res, next) => {
  try {
    const hotels = await Hotel.find()
    res.status(200).json(hotels)
  } catch (error) {
    next(error)
  }
}
