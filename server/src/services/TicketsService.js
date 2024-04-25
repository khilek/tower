import { dbContext } from "../db/DbContext.js"
import { Forbidden } from "../utils/Errors.js"

class TicketsService {

  async createTicket(ticketData) {
    const ticket = await dbContext.Tickets.create(ticketData)

    await ticket.populate('profile')

    return ticket

  }

  async getMyTickets(userId) {
    const tickets = await dbContext.Tickets.find({ accountId: userId }).populate('event')
    return tickets
  }

  async getAllTickets(eventId) {
    const tickets = await dbContext.Tickets.find({ eventId: eventId }).populate('profile')
    return tickets
  }

  async ripTicket(ticketId, userId) {
    const ticketToRip = await dbContext.Tickets.findById(ticketId)
    if (!ticketToRip) throw new Error(`No ticket with id ${ticketId}`)
    if (ticketToRip.accountId != userId) throw new Forbidden("This action is Forbidden")

    await ticketToRip.deleteOne()

    return ticketToRip
  }



















}

export const ticketsService = new TicketsService()