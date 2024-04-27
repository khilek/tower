<script setup>
import { computed } from "vue";
import { TowerComment } from "../models/TowerComment.js";
import { AppState } from "../AppState.js";
import Pop from "../utils/Pop.js";
import { logger } from "../utils/Logger.js";
import { towerCommentsService } from "../services/TowerCommentsService.js";


defineProps({ comment: { type: TowerComment, required: true } })
const comments = computed(() => AppState.activeComments)




async function eraseComment(commentId) {
  try {
    const wantsToErase = await Pop.confirm('Are you sure you want to Erase Comment?', 'There is no undoing this action...', 'ERASE', 'warning')

    if (!wantsToErase) return

    logger.log('Erasing Comment', commentId)

    await towerCommentsService.eraseComment(commentId)


  } catch (error) {
    Pop.toast("Couldn't Erase Comment", 'error')
    logger.error(error)
  }

}


</script>


<template>


  <img class="creator-img" :src="comment.creator.picture" alt="">
  <p>{{ comment.creator.name }}</p>
  <p>{{ comment.body }}</p>
  <div class="text-end">
    <button v-if="comment.creatorId == AppState.account?.id" @click="eraseComment(comment.id)"
      class="btn btn-outline-danger" title="Full Send!">Delete</button>
  </div>
</template>


<style lang="scss" scoped>
.creator-img {
  width: 10%;
  aspect-ratio: 1/1;
  object-fit: cover;
  object-position: center;
  border-radius: 20px;
}
</style>