import mongoose from 'mongoose'
import { AccountSchema } from '../models/Account'
import { ValueSchema } from '../models/Value'
import { TowerEventSchema } from "../models/TowerEvent.js";
import { TicketSchema } from "../models/Ticket.js";

class DbContext {
  Values = mongoose.model('Value', ValueSchema);
  Account = mongoose.model('Account', AccountSchema);

  Events = mongoose.model('Event', TowerEventSchema);

  Tickets = mongoose.model('Ticket', TicketSchema)




}

export const dbContext = new DbContext()
