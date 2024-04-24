<script setup>
import { computed, onMounted } from "vue";
import { towerEventsService } from "../services/TowerEventsService.js";
import { logger } from "../utils/Logger.js";
import Pop from "../utils/Pop.js";
import { AppState } from "../AppState.js";


const events = computed(()=> AppState.events)

async function getEvents(){
try {
  await towerEventsService.getEvents()
} catch (error) {
  Pop.toast("Couldn't get Events", 'error')
  logger.error(error)
}
  
}

onMounted(() => {
  getEvents()
})

</script>

<template>

  
  
  <section class="row m-3 ">
    <div class="col d-flex justify-content-center">
      <button  class="btn btn-outline-dark" title="Post an Event!" data-bs-toggle="modal" data-bs-target="#eventFormModal">
        <i class="mdi mdi-plus">Create an Event!</i>
      </button>
    </div>
  </section>
  
  
  <div class="container">
  <section class="row">
      <div class="col-4" v-for="e in events" :key="e.id">
        <EventCard :event="e"/>
    </div>
  </section>


  <EventFormModal/>
</div>

</template>

<style scoped lang="scss">
.home {
  display: grid;
  height: 80vh;
  place-content: center;
  text-align: center;
  user-select: none;

  .home-card {
    width: clamp(500px, 50vw, 100%);

    >img {
      height: 200px;
      max-width: 200px;
      width: 100%;
      object-fit: contain;
      object-position: center;
    }
  }
}
</style>
