import mongoose from 'mongoose'

const connectDB = async () => {
  // "MONGODB_CONNECTION_STRING" brings the connection string to DB.  See it in ".env" file.
  // I can use "process.env." in this file because its importation is in "index.js".
  const connectionURL = process.env.MONGODB_CONNECTION_STRING

  try {
    await mongoose.connect(connectionURL)
    console.log('Connected to MongoDB!')
  } catch (error) {
    console.log(error)
  }
}

export default connectDB
