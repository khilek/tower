<script setup>
import { useRoute } from "vue-router";
import { AppState } from "../AppState.js";
import { towerEventsService } from "../services/TowerEventsService.js";
import { logger } from "../utils/Logger.js";
import Pop from "../utils/Pop.js";
import { computed, onMounted } from "vue";
import { ticketsService } from "../services/TicketsService.js";
import { towerCommentsService } from "../services/TowerCommentsService.js";


const route = useRoute()

const comments = computed(() => AppState.activeComments)
const event = computed(() => AppState.activeEvent)
const ticketHolders = computed(() => AppState.activeTicketHolders)
const youAreATicketHolder = computed(() => ticketHolders.value.find(ticket => ticket.accountId == AppState.account?.id))


async function getEventById() {
  try {
    await towerEventsService.getEventById(route.params.eventId)
  } catch (error) {
    Pop.toast("Couldn't Get Event By Id", 'error')
    logger.error(error)
  }
}


async function closeEvent(eventId) {
  try {
    const wantsToClose = await Pop.confirm('Are you sure you want to close event?', 'There is no undoing this...', 'CLOSE', "question")
    if (!wantsToClose) return
    await towerEventsService.closeEvent(route.params.eventId)
    logger.log('Closing Event', eventId)
  } catch (error) {
    Pop.toast("Couldn't Close Event", 'error')
    logger.error(error)
  }
}

async function attendEvent() {
  try {
    const tickets = { eventId: route.params.eventId }
    await ticketsService.attendEvent(tickets)
  } catch (error) {
    Pop.toast("Couldn't get Ticket", 'error')
    logger.error(error)
  }
}

async function getTicketHolders() {
  try {
    await towerEventsService.getTicketHolders(route.params.eventId)
  } catch (error) {
    Pop.toast("Couldn't get Ticket Holders", 'error')
    logger.error(error)
  }
}

async function getEventComments() {
  try {
    await towerEventsService.getEventComments(route.params.eventId)

  } catch (error) {
    Pop.toast("Couldn't Get Event Comments", 'error')
    logger.error(error)
  }
}

onMounted(() => {
  getEventById()
  getTicketHolders()
  getEventComments()
})

</script>


<template>


  <div v-if="event" class="container">
    <h1 class="text-center"> {{ event.name }} </h1>
    <p class="fw-medium fs-3 text-center">{{ event.type }}</p>
    <div class="col text-end p-3">
      <button v-if="AppState.account?.id === event.creatorId" @click="closeEvent()"
        class="btn btn-outline-danger">Cancel
        Event</button>
    </div>
    <section class="row">
      <div class="col-6 col-md-6 d-flex justify-content-center">
        <img class="img-fluid" :src="event.coverImg" alt="">
      </div>
      <div class="col-6 col-md-6 text-center border border-primary">
        <h2>EVENT DETAILS:</h2>
        <p> {{ event.description }} </p>
        <span class="fs-2">Where: {{ event.location }}</span>
        <p class="fs-3"> When: {{ event.startDate.toLocaleString() }}</p>
        <p class="fs-4"> Event Capacity: {{ event.capacity }}</p>
        <div class="col col-md- text-center border border-danger bg-danger">
          Is this event canceled?
          <p v-if="event.isCanceled === true" class="fs-3 fw-bold"> Canceled</p>
          <p v-else class="fs-3 fw-bold"> No </p>
        </div>
      </div>
    </section>




    <section class="row">
      <div class="col-6 col-md-6 text-center mt-3 fw-bold fs-2">
        Attending Users {{ event.ticketCount }}
      </div>
      <div v-if="event.ticketCount === event.capacity" class="col-3 col-md-3 text-center mt-3 fw-bold fs-2"> Sold out!
      </div>
      <div v-if="youAreATicketHolder" class="col-3 col-md-3 text-center mt-3 fw-bold fs-2"> You have a Ticket!
      </div>
    </section>

    <section class="row mt-3 d-flex justify-content-end ">

    </section>

    <section class="row mt-3  ">
      <div class="col-6 col-md-6 d-flex justify-content-center">
        <div v-for="ticket in ticketHolders" :key="ticket.id">
          <img class="attendee-img img-fluid" :src="ticket.profile.picture" :title="ticket.profile.name" alt=""> {{
            ticket.profile.name }}
        </div>
      </div>
      <div class="col-6 col-md-6 card text-center p-3 fs-4">
        <span> Interested in attending? </span>
        <button v-if="!youAreATicketHolder" @click="attendEvent()" class="btn btn-success mt-3 ">Get a
          Ticket!</button>
        <button v-else disabled @click="attendEvent()" class="btn btn-success mt-3 ">Get a Ticket!</button>
      </div>
    </section>
  </div>

  <div class="container">
    <CommentForm />
    <section class="row">
      <div class="col-6 col-md-6 card d-flex justify-content-center p-2">
        <div v-for="comment in comments" :key="comment.id">
          <CommentCard :comment="comment" />
        </div>
      </div>
    </section>
  </div>
</template>


<style lang="scss" scoped>
.attendee-img {
  width: 20%;
  aspect-ratio: 1/1;
  object-fit: cover;
  object-position: center;
  border-radius: 20px;
}
</style>