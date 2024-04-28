import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { ticketsService } from "../services/TicketsService.js";

export class TicketsController extends BaseController {
  constructor() {
    super('api/tickets')

    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createTicket)
      .delete('/:ticketId', this.ripTicket)


  }


  async createTicket(request, response, next) {
    try {
      const ticketData = request.body
      const user = request.userInfo
      ticketData.accountId = user.id
      const ticket = await ticketsService.createTicket(ticketData)
      response.send(ticket)
    } catch (error) {
      next(error)
    }
  }

  async ripTicket(request, response, next) {
    try {
      const ticketId = request.params.ticketId
      const user = request.userInfo
      const message = await ticketsService.ripTicket(ticketId, user.id)
      response.send(message)
    } catch (error) {
      next(error)
    }
  }




}