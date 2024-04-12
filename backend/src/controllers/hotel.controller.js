import Hotel from '../models/hotel.model.js'

export const createHotel = async (req, res, next) => {
  try {
    const newHotel = new Hotel(req.body)
    const saveHotel = await newHotel.save()
    res.status(200).json(saveHotel)
  } catch (error) {
    next(error)
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
  try {
    const deletedHotel = await Hotel.findByIdAndDelete(req.params.id)
    res.status(200).json(`Hotel has been deleted (${deletedHotel.name}).`)
  } catch (error) {
    next(error)
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
