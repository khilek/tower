import { Auth0Provider } from "@bcwdev/auth0provider";
import { towerEventsService } from "../services/TowerEventsService.js";
import BaseController from "../utils/BaseController.js";




export class TowerEventsController extends BaseController{
constructor(){
  super('api/events')
  this.router
    .get('', this.getEvents)
    .get('/:eventId', this.getEventById)
    .use(Auth0Provider.getAuthorizedUserInfo)
    .post('', this.createEvents)

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

}