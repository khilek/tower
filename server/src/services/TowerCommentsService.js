import { dbContext } from "../db/DbContext.js"
import { Forbidden } from "../utils/Errors.js"


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

  async eraseComment(commentId, userId) {
    const commentToDelete = await dbContext.Comments.findById(commentId)
    if (!commentToDelete) throw new Error(`No Comment with id ${commentId}`)
    if (userId != commentToDelete.creatorId) throw new Forbidden("This action is forbidden")

    await commentToDelete.deleteOne()
    return commentToDelete
  }


}

export const towerCommentsService = new TowerCommentsService()