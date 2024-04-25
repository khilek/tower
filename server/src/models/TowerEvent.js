import { Schema } from "mongoose"

export const TowerEventSchema = new Schema({
  name: { type: String, required: true, minLength: 3, maxLength: 50 },
  description: { type: String, required: true, minLength: 15, maxLength: 1000 },
  coverImg: { type: String, required: true },
  location: { type: String, required: true, minLength: 1, maxLength: 500 },
  capacity: { type: Number, required: true, minLength: 1, maxLength: 5000 },
  startDate: { type: Date, required: true },
  isCanceled: { type: Boolean, required: true, default: false },
  type: { type: String, required: true, enum: ['concert', 'convention', 'sport', 'digital'] },
  creatorId: { type: Schema.ObjectId, required: true, ref: 'Account' },
}, { timestamps: true, toJSON: { virtuals: true } })

TowerEventSchema.virtual('creator', {
  localField: 'creatorId',
  ref: 'Account',
  foreignField: '_id',
  justOne: true
})

TowerEventSchema.virtual('ticketCount', {
  localField: '_id',
  ref: 'Ticket',
  foreignField: 'eventId',
  justOne: false,
  count: true
})