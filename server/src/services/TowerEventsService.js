import { dbContext } from "../db/DbContext.js"




class TowerEventsService{

 async getEvents() {
  const events = await dbContext.Events.find()
  return events
  }

 async createEvents(eventData) {
    const events = await dbContext.Events.create(eventData)
    await events.populate('creator')
    return events
  }

 async getEventById(eventId) {
    const events = await dbContext.Events.findById(eventId)
    if(!events) throw new Error(`No Event with that ID: ${eventId}`)
    return events
  }
  

}

export const towerEventsService = new TowerEventsService()