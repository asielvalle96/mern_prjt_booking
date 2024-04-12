import jwt from 'jsonwebtoken'
import createError from '../useful/createError.js'

const getCurrentlyLoggedInUser = (req, res, next) => {
  const token = req.cookies[process.env.TOKEN_NAME]
  if (!token) return next(createError(401, 'You are not authenticated!'))

  let currentlyUserLoggedIn

  // Decrypt the token to get the information del user signed in currently.
  jwt.verify(token, process.env.TOKEN_SECRET_KEY, (err, info) => {
    if (err) return next(createError(403, 'Token is not valid!'))

    // req.currentlySignedInUser = info // I send the information of the user signed in currently to the next operation in the current route.

    currentlyUserLoggedIn = info
  })
  return currentlyUserLoggedIn
}

export const verifyUser = (req, res, next) => {
  const { id, isAdmin } = getCurrentlyLoggedInUser(req, res, next)

  if ((id === req.params.id) || isAdmin) {
    next()
  } else {
    next(createError(403, 'You are not authorized to do this action!'))
  }
}

export const verifyAdmin = (req, res, next) => {
  const { isAdmin } = getCurrentlyLoggedInUser(req, res, next)

  if (isAdmin) {
    next()
  } else {
    next(createError(403, 'You are not authorized to do this action!'))
  }
}
