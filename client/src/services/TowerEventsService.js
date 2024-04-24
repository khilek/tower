import { AppState } from "../AppState.js"
import { TowerEvent } from "../models/TowerEvent.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"



class TowerEventsService {


  async getEvents() {
    const response = await api.get('api/events')
    logger.log('Getting Events', response.data)
    const events = response.data.map(eventData => new TowerEvent(eventData))
    AppState.events = events

  }

  async getEventById(eventId) {
    const response = await api.get(`api/events/${eventId}`)
    logger.log('Getting Events By ID', response.data)
    const event = new TowerEvent(response.data)
    AppState.activeEvent = event

  }

  async createEvents(eventData) {
    const response = await api.post('api/events', eventData)
    logger.log('Creating Event', response.data)
    const newEvent = new TowerEvent(response.data)
    AppState.events.push(newEvent)
  }

}

export const towerEventsService = new TowerEventsService()