import { dbContext } from "../db/DbContext.js"


class TowerCommentsService {
  async getEventComments(eventId) {
    const comments = await dbContext.Comments.find({ eventId: eventId }).populate('creator')
    return comments
  }
  async createComment(commentData) {
    const comment = await dbContext.Comments.create(commentData)
    await comment.populate('creator')
    return comment
  }




}

export const towerCommentsService = new TowerCommentsService()