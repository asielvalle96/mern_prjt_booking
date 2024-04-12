import Room from '../models/room.model.js'

export const createRoom = async (req, res, next) => {
  try {
    const newRoom = new Room(req.body)
    await newRoom.save()
    res.status(200).send('Room has been created.')
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
  try {
    const deletedRoom = await Room.findByIdAndDelete(req.params.id)
    res.status(200).json(`Room has been deleted (${deletedRoom.name}).`)
  } catch (error) {
    next(error)
  }
}

// Get a room by id.
export const getRoom = async (req, res, next) => {
  try {
    const room = await Room.findById(req.params.id)
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
