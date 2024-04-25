import { Auth0Provider } from "@bcwdev/auth0provider";
import { towerCommentsService } from "../services/TowerCommentsService.js";
import BaseController from "../utils/BaseController.js";


export class TowerCommentsController extends BaseController {
  constructor() {
    super('api/comments')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createComment)
  }


  async createComment(request, response, next) {
    try {
      const commentData = request.body
      const user = request.userInfo
      commentData.creatorId = user.id
      const comment = await towerCommentsService.createComment(commentData)
      response.send(comment)
    } catch (error) {
      next(error)
    }
  }



}