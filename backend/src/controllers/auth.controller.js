import User from '../models/user.model.js'
import bcrypt from 'bcryptjs'
import createError from '../useful/createError.js'
import jwt from 'jsonwebtoken'

export const register = async (req, res, next) => {
  try {
    // To encrypt the password.
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(req.body.password, salt)

    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hash
    })
    await newUser.save()
    res.status(200).send('User has been signed up.')
  } catch (err) {
    next(err)
  }
}

export const login = async (req, res, next) => {
  try {
    if (!(req.body.username || req.body.email)) return next(createError(406, 'You should enter a username or email!'))
    if (!req.body.password) return next(createError(406, 'You should enter a password!'))

    let user
    if (req.body.username) {
      user = await User.findOne({ username: req.body.username })
      if (!user) return next(createError(401, 'Wrong username!'))
    }
    if (req.body.email) {
      user = await User.findOne({ email: req.body.email })
      if (!user) return next(createError(401, 'Wrong email!'))
    }

    const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password)
    if (!isPasswordCorrect) return next(createError(401, 'Wrong password!'))

    const { password, isAdmin, ...otherDetails } = user._doc // I want to respond with the whole object without password and isAdmin.

    // "TOKEN_SECRET_KEY" brings my secret key for the token. See it in ".env" file.
    // I can use "process.env." in this file because its importation is in "index.js".
    const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.TOKEN_SECRET_KEY)

    // "TOKEN_NAME" brings the name of the token. See it in ".env" file.
    // I can use "process.env." in this file because its importation is in "index.js".
    res.cookie(process.env.TOKEN_NAME, token, { httpOnly: true }).status(200).json(otherDetails)
  } catch (err) {
    next(err)
  }
}
