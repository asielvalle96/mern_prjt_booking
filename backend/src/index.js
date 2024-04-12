import express from 'express'
// DB.
import connectDB from './db.js'
// To create environment variables using ".env" file and sentence "process.env.".
import dotenv from 'dotenv'
// Importing the routers.
import hotelsRoute from './routes/hotels.routes.js'
import authRoute from './routes/auth.routes.js'
import usersRoute from './routes/users.routes.js'
import roomsRoute from './routes/rooms.routes.js'
// To send the token to the browser using its cookies.
import cookieParser from 'cookie-parser'
import morgan from 'morgan'

// Starting from this I can use "process.env." anywhere to get my environment variables from ".env" file.
dotenv.config()

// Execute the connection to DB.
connectDB()

// Creating the app.
const app = express()

// Middlewares.
app.use(express.json()) // Now Express is able to recognize the JSONs (req.body).
app.use(cookieParser()) // Now I can send the token to the cookies of the browser using "res.cookie" and receive, those cookies, using "req.cookies".
app.use(morgan('dev'))

app.use('/api/hotels', hotelsRoute)
app.use('/api/auth', authRoute)
app.use('/api/users', usersRoute)
app.use('/api/rooms', roomsRoute)

// Handle all errors ---- Handler of the "next" in the controllers. All errors get out with the same format.
app.use((err, req, res, next) => {
  const errorStatus = err.status || 500
  const errorMessage = err.message || 'Something went wrong!'
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack
  })
})

app.listen(process.env.BACKEND_PORT, () => {
  console.log(`Backend is connected. It is running on http://localhost:${process.env.BACKEND_PORT}`)
})
