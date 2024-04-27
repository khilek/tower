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








}

export const towerCommentsService = new TowerCommentsService()