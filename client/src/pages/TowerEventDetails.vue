<script setup>
import { useRoute } from "vue-router";
import { AppState } from "../AppState.js";
import { towerEventsService } from "../services/TowerEventsService.js";
import { logger } from "../utils/Logger.js";
import Pop from "../utils/Pop.js";
import { computed, onMounted } from "vue";


const route = useRoute()

const event = computed(()=> AppState.activeEvent)




async function getEventById(){
  try {
    await towerEventsService.getEventById(route.params.eventId)
  } catch (error) {
    Pop.toast("Couldn't Get Event By Id", 'error')
    logger.error(error)
  }
}


async function closeEvent(eventId){
try {
const wantsToClose = await Pop.confirm('Are you sure you want to close event?', 'There is no undoing this...', 'CLOSE', "question")
if(!wantsToClose) return
  await towerEventsService.closeEvent(route.params.eventId)
  logger.log('Closing Event', eventId)
} catch (error) {
  Pop.toast("Couldn't Close Event", 'error')
  logger.error(error)
}

}


onMounted(()=> {
  getEventById()
})

</script>


<template>


<div v-if="event" class="container">
  <h1 class="text-center"> {{ event.name }} {{ event.type }}</h1>
  <div class="col text-end p-3">
    <button @click="closeEvent()" class="btn btn-outline-danger">Cancel Event</button>
  </div>
  <section class="row">
    <div class="col-6 d-flex justify-content-center">
      <img class="img-fluid" :src="event.coverImg" alt="">
    </div>
    <div class="col-6 text-center border border-primary">
      <h2>EVENT DETAILS:</h2>
   <p> {{ event.description }} </p>
   <span class="fs-2">Where: {{ event.location }}</span>
   <p class="fs-3"> When: {{ event.startDate.toLocaleString() }}</p>
   <p class="fs-4"> Event Capacity: {{ event.capacity }}</p>
   <div  class="col-12 border border-danger bg-danger">
    Is this event canceled?
   <p class="fs-3 fw-bold"> {{ event.isCanceled }}</p>
  </div>
  </div>

  </section>



</div>
</template>


<style lang="scss" scoped>

</style>