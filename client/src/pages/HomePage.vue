<script setup>
import { computed, onMounted, ref } from "vue";
import { towerEventsService } from "../services/TowerEventsService.js";
import { logger } from "../utils/Logger.js";
import Pop from "../utils/Pop.js";
import { AppState } from "../AppState.js";


const events = computed(() => AppState.events)


const filterBy = ref('all')

const eventType = computed(() => {
  if (filterBy.value == 'all') return AppState.events
  return AppState.events.filter(event => event.type == filterBy.value)
})


const filters = [
  {
    name: 'all'
  },
  {
    name: 'concert'
  },
  {
    name: 'convention'
  },
  {
    name: 'sport'
  },
  {
    name: 'digital'
  }

]


async function getEvents() {
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

  <div class="container">


    <section class="row m-3 ">
      <div class="col d-flex justify-content-center">
        <button class="btn btn-outline-dark" title="Post an Event!" data-bs-toggle="modal"
          data-bs-target="#eventFormModal">
          <i class="mdi mdi-plus">Create an Event!</i>
        </button>
      </div>
    </section>

    <section class="row">
      <div class="col text-center" v-for="filterObj in filters" :key="filterObj.name">
        <div @click="filterBy = filterObj.name" role="button" class="selectable">
          {{ filterObj.name }}
        </div>

      </div>
    </section>



    <section class="row">
      <div class="col-3 text-center" v-for="e in eventType" :key="e.id">
        <EventCard :event="e" />
      </div>
    </section>


    <EventFormModal />
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
