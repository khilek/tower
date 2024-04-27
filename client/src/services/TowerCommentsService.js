import { AppState } from "../AppState.js"
import { TowerComment } from "../models/TowerComment.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"


class TowerCommentsService {

  async createComment(commentData) {
    const response = await api.post('api/comments', commentData)
    logger.log('Getting Comments', response.data)
    const comment = new TowerComment(response.data)
    AppState.activeComments.push(comment)

  }


  async eraseComment(commentId) {
    const response = await api.delete(`api/comments/${commentId}`)
    logger.log('Erasing Comment', response.data)
    const comments = AppState.activeComments
    const commentToDelete = comments.findIndex(comment => comment.id == commentId)
    if (commentToDelete == -1) throw new Error("Couldn't find Comment")
    comments.splice(commentToDelete, 1)
  }





}

export const towerCommentsService = new TowerCommentsService()