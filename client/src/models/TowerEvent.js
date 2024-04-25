

export class TowerEvent {
  constructor(data) {
    this.id = data.id
    this.type = data.type
    this.name = data.name
    this.description = data.description
    this.coverImg = data.coverImg
    this.location = data.location
    this.capacity = data.capacity
    this.startDate = new Date(data.startDate)
    this.isCanceled = data.isCanceled
    this.creatorId = data.creatorId

    this.ticketCount = data.ticketCount
  }

}