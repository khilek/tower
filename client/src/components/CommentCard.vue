<script setup>
import { computed } from "vue";
import { TowerComment } from "../models/TowerComment.js";
import { AppState } from "../AppState.js";


defineProps({ comment: { type: TowerComment, required: true } })
const comments = computed(() => AppState.activeComments)

</script>


<template>

  <!-- <div class="container">
    <section class="row ">
      <div class="col-6 card"> -->
  <img class="creator-img" :src="comment.creator.picture" alt="">

  {{ comment.body }}



  <!-- </div>

    </section>

  </div> -->


</template>


<style lang="scss" scoped>
.creator-img {
  width: 20%;
  aspect-ratio: 1/1;
  object-fit: cover;
  object-position: center;
  border-radius: 20px;
}
</style>