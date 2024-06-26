import { Auth0Provider } from "@bcwdev/auth0provider";
import { towerEventsService } from "../services/TowerEventsService.js";
import BaseController from "../utils/BaseController.js";
import { ticketsService } from "../services/TicketsService.js";
import { towerCommentsService } from "../services/TowerCommentsService.js";




export class TowerEventsController extends BaseController {
  constructor() {
    super('api/events')
    this.router
      .get('', this.getEvents)
      .get('/:eventId', this.getEventById)
      .get('/:eventId/tickets', this.getAllTickets)
      .get('/:eventId/comments', this.getEventComments)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createEvents)
      .put('/:eventId', this.editEventsById)
      .delete('/:eventId', this.closeEvent)
  }
  async getEvents(request, response, next) {
    try {
      const events = await towerEventsService.getEvents()
      response.send(events)
    } catch (error) {
      next(error)
    }
  }

  async createEvents(request, response, next) {
    try {
      const user = request.userInfo
      const eventData = request.body
      eventData.creatorId = user.id
      const event = await towerEventsService.createEvents(eventData)
      response.send(event)

    } catch (error) {
      next(error)
    }
  }

  async getEventById(request, response, next) {
    try {
      const eventId = request.params.eventId
      const events = await towerEventsService.getEventById(eventId)
      response.send(events)
    } catch (error) {
      next(error)
    }
  }


  async editEventsById(request, response, next) {
    try {
      const eventId = request.params.eventId
      const userId = request.userInfo.id
      const eventData = request.body
      const events = await towerEventsService.editEventsById(eventId, eventData, userId)
      response.send(events)
    } catch (error) {
      next(error)
    }
  }

  async closeEvent(request, response, next) {
    try {
      const eventId = request.params.eventId
      const userId = request.userInfo.id
      const message = await towerEventsService.closeEvent(eventId, userId)
      response.send(message)
    } catch (error) {
      next(error)
    }

  }

  async getAllTickets(request, response, next) {
    try {
      const eventId = request.params.eventId
      const tickets = await ticketsService.getAllTickets(eventId)
      response.send(tickets)
    } catch (error) {
      next(error)
    }
  }


  async getEventComments(request, response, next) {
    try {
      const eventId = request.params.eventId
      const comments = await towerCommentsService.getEventComments(eventId)
      response.send(comments)
    } catch (error) {
      next(error)
    }
  }
}