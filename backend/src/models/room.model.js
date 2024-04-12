import mongoose from 'mongoose'

const { Schema } = mongoose

const RoomSchema = new Schema({
  title: {
    type: String, // String is shorthand for {type: String}
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  maxPeople: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  roomNumbers: [{ number: Number, unavailableDates: [{ type: Date }] }]
},
{ timestamps: true } /* To get the last date of creating & date of updating for each user object. */
)

export default mongoose.model('Room', RoomSchema)

// Example of roomNumbers.
// [
//   { number: 101, unavailableDates: [] }
//   { number: 102, unavailableDates: [] }
//   { number: 103, unavailableDates: [] }
//   { number: 104, unavailableDates: [] }
//   { number: 105, unavailableDates: [] }
// ]
