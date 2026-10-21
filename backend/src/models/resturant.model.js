import mongoose from 'mongoose'

const pointerSchema = new mongoose.Schema(
  {
    name: { type: String, enum: ['Point'], default: 'Point' },
    coordinates: {
      type: [Number],
      required: true,
      validate: {
        validate: value => value.length === 2,
        message: 'It must be with two value lon and lat'
      }
    }
  },
  { _id: false }
)

const resturantSchema = new Mongoose.Schema(
  {
    name: { type: String, required: true },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    city: { type: String, required: true, trim: true },
    area: { type: String, required: true, trim: true },
    cuisines: { type: [String], required: true, default: [] },
    location: pointerSchema,
    isOpen: { type: Boolean, required: true }
  },
  { timeStamps: { createdAt: true, updatedAt: false } }
)

const resturantModel = mongoose.model("Resturants", resturantSchema)
export default resturantModel
