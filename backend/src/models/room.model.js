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
  roomNumbers: {
    type: [{ number: Number, unavailableDates: [{ type: Date }] }],
    validate: [arrayMinLength, 'At least one room number must be provided!'] // To do this required field (roomNumbers).
  }
},
{ timestamps: true } /* To get the last date of creating & date of updating for each user object. */
)

function arrayMinLength (val) {
  return val.length > 0
}

export default mongoose.model('Room', RoomSchema)

// Example of roomNumbers.
// [
//   { number: 1, unavailableDates: [01.05.2024, 02.05.2024] }
//   { number: 14, unavailableDates: [01.02.2024, 02.08.2024] }
//   { number: 42, unavailableDates: [05.10.2024, 05.25.2024] }
//   { number: 67, unavailableDates: [03.02.2024, 04.08.2024] }
//   { number: 105, unavailableDates: [08.15.2024, 10.24.2024] }
// ]
//
// These 5 rooms are the same.
