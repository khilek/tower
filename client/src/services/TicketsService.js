import { AppState } from "../AppState.js"
import { Ticket } from "../models/Ticket.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"


class TicketsService {

  async attendEvent(eventId) {
    const response = await api.post('api/tickets', eventId)
    logger.log('Creating Ticket', response.data)
    const tickets = new Ticket(response.data)
    AppState.activeTicketHolders.push(tickets)

  }




}

export const ticketsService = new TicketsService()