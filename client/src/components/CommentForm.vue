<script setup>
import { ref } from "vue";
import { towerCommentsService } from "../services/TowerCommentsService.js";
import { logger } from "../utils/Logger.js";
import Pop from "../utils/Pop.js";
import { useRoute } from "vue-router";

const route = useRoute()

const commentData = ref(
  {
    body: '',
    eventId: route.params.eventId
  }
)




async function createComment() {
  try {
    await towerCommentsService.createComment(commentData.value)
    Pop.toast("Comment Added!", 'success')
    resetForm()
  } catch (error) {
    Pop.toast("Couldn't Create Comment", 'error')
    logger.error(error)
  }
}


function resetForm() {
  commentData.value = {
    body: '',
    eventId: route.params.eventId
  }
}



</script>


<template>
  <div class="container">
    <form @submit.prevent="createComment()" class="row">
      <div class="mb-3 col-6">
        <label for="comment-body">Comment</label>
        <input v-model="commentData.body" type="text" class="form-control" required
          placeholder="Get in the conversation...">
      </div>
      <div class="row">
        <div class="mb-2 col-6 text-end">
          <button class="btn btn-success">Post Comment <i class="mdi mdi-plus-outline"></i></button>
        </div>
      </div>
    </form>
  </div>
</template>


<style lang="scss" scoped></style>