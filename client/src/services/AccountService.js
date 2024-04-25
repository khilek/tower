import { AppState } from '../AppState'
import { Account } from '../models/Account.js'
import { Ticket } from "../models/Ticket.js"
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class AccountService {
  async getAccount() {
    try {
      const res = await api.get('/account')
      AppState.account = new Account(res.data)
    } catch (err) {
      logger.error('HAVE YOU STARTED YOUR SERVER YET???', err)
    }
  }


  async getMyTickets() {
    const response = await api.get('/account/tickets')
    logger.log("Getting My Tickets", response.data)
    const tickets = response.data.map(ticket => new Ticket(ticket))
    AppState.accountTickets = tickets

  }





}

export const accountService = new AccountService()
