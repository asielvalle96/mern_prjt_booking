import User from '../models/user.model.js'
import bcrypt from 'bcryptjs'

export const createUser = async (req, res, next) => {
  try {
    // To encrypt the password.
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(req.body.password, salt)

    req.body.password = hash

    const newUser = new User(req.body)
    await newUser.save()
    res.status(200).send('User has been created.')
  } catch (err) {
    next(err)
  }
}

export const updateUser = async (req, res, next) => {
  try {
    if (req.body.password) {
      // To encrypt the password.
      const salt = bcrypt.genSaltSync(10)
      const hash = bcrypt.hashSync(req.body.password, salt)

      req.body.password = hash
    }

    const updatedUser = await User.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true }) // Param { new: true } give me the updated item.
    res.status(200).json(updatedUser)
  } catch (error) {
    next(error)
  }
}

export const deleteUser = async (req, res, next) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id)
    res.status(200).json(`User has been deleted (${deletedUser.username}).`)
  } catch (error) {
    next(error)
  }
}

// Get a user by id.
export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id)
    res.status(200).json(user)
  } catch (error) {
    next(error)
  }
}

// Get all users.
export const getUsers = async (req, res, next) => {
  try {
    const users = await User.find()
    res.status(200).json(users)
  } catch (error) {
    next(error)
  }
}
