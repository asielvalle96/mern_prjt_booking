import Room from '../models/room.model.js'
import Hotel from '../models/hotel.model.js'
import createError from '../useful/createError.js'

export const createRoom = async (req, res, next) => {
  const hotelId = req.params.hotelId

  try {
    // First, I see if it finds the hotel (the hotelId provided is valid).
    const hotelFound = await Hotel.findById(hotelId)
    if (!hotelFound) return next(createError(404, 'Hotel not found!'))

    try {
      const newRoom = new Room(req.body)
      const saveRoom = await newRoom.save()

      try {
        await Hotel.findByIdAndUpdate(hotelId, { $push: { hotelRooms: saveRoom._id } })
      } catch (err) {
        next(err)
      }

      res.status(200).json(saveRoom)
    } catch (err) {
      next(err)
    }
  } catch (err) {
    next(err)
  }
}

export const updateRoom = async (req, res, next) => {
  try {
    const updatedRoom = await Room.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true }) // Param { new: true } give me the updated item.
    res.status(200).json(updatedRoom)
  } catch (error) {
    next(error)
  }
}

export const deleteRoom = async (req, res, next) => {
  const hotelId = req.params.hotelId
  const roomId = req.params.id

  try {
    await Hotel.findByIdAndUpdate(hotelId, { $pull: { hotelRooms: roomId } })

    try {
      await Room.findByIdAndDelete(roomId)

      res.status(200).json('Room has been deleted!')
    } catch (err) {
      next(err)
    }
  } catch (error) {
    next(error)
  }
}

// Get a room by id.
export const getRoom = async (req, res, next) => {
  try {
    const room = await Room.findById(req.params.id)
    if (!room) return next(createError(404, 'Room not found!'))

    res.status(200).json(room)
  } catch (error) {
    next(error)
  }
}

// Get all rooms.
export const getRooms = async (req, res, next) => {
  try {
    const rooms = await Room.find()
    res.status(200).json(rooms)
  } catch (error) {
    next(error)
  }
}
