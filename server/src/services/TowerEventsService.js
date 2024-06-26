import { dbContext } from "../db/DbContext.js"
import { Forbidden } from "../utils/Errors.js"




class TowerEventsService {

  async getEvents() {
    const events = await dbContext.Events.find().populate('ticketCount')
    return events
  }

  async createEvents(eventData) {
    const events = await dbContext.Events.create(eventData)
    await events.populate('creator ticketCount')
    return events
  }

  async getEventById(eventId) {
    const events = await dbContext.Events.findById(eventId).populate('ticketCount')
    if (!events) throw new Error(`No Event with that ID: ${eventId}`)
    return events
  }

  async editEventsById(eventId, eventData, userId) {
    const eventToUpdate = await this.getEventById(eventId)

    // if (eventToUpdate.isCanceled = !eventToUpdate.isCanceled) throw new Error(`Event is Canceled, cannot edit ${eventToUpdate.isCanceled} `)
    if (!eventToUpdate) throw new Error(`Couldn't  ${eventId}`)

    if (eventToUpdate.isCanceled) throw new Error(`Couldn't edit ${eventId}`)

    if (eventToUpdate.creatorId != userId) throw new Error("You are not the creator of this event")

    eventToUpdate.name = eventData.name ?? eventToUpdate.name
    eventToUpdate.description = eventData.description ?? eventToUpdate.description
    eventToUpdate.coverImg = eventData.coverImg ?? eventToUpdate.coverImg
    eventToUpdate.location = eventData.location ?? eventToUpdate.location
    eventToUpdate.capacity = eventData.capacity ?? eventToUpdate.capacity
    eventToUpdate.startDate = eventData.startDate ?? eventToUpdate.startDate


    await eventToUpdate.save()

    return eventToUpdate
  }

  async closeEvent(eventId, userId) {
    const eventToClose = await this.getEventById(eventId)
    if (eventToClose.creatorId != userId) throw new Forbidden('You cannot close what you did not create')
    eventToClose.isCanceled = true
    await eventToClose.save()

    return `${eventToClose.name} has been closed!`
  }


}

export const towerEventsService = new TowerEventsService()