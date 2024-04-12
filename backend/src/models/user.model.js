import mongoose from 'mongoose'

const { Schema } = mongoose

const UserSchema = new Schema({
  username: {
    type: String, // String is shorthand for {type: String}
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  isAdmin: {
    type: Boolean,
    default: false
  }
},
{ timestamps: true } /* To get the last date of creating & date of updating for each user object. */
)

export default mongoose.model('User', UserSchema)
