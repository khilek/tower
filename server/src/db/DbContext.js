import mongoose from 'mongoose'
import { AccountSchema } from '../models/Account'
import { ValueSchema } from '../models/Value'
import { TowerEventSchema } from "../models/TowerEvent.js";

class DbContext {
  Values = mongoose.model('Value', ValueSchema);
  Account = mongoose.model('Account', AccountSchema);

Events = mongoose.model('Event', TowerEventSchema)


}

export const dbContext = new DbContext()
