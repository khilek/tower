import { Schema } from "mongoose";

export const TowerCommentSchema = new Schema({
  creatorId: { type: Schema.ObjectId, required: true, ref: 'Account' },
  eventId: { type: Schema.ObjectId, required: true, ref: 'Event' },
  body: { type: String, required: true, minLength: 1, maxLength: 2000 }
}, { timestamps: true, toJSON: { virtuals: true } })

TowerCommentSchema.virtual('creator', {
  localField: 'creatorId',
  ref: 'Account',
  foreignField: '_id',
  justOne: true
})