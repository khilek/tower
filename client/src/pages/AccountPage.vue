<script setup>
import { computed, onMounted } from 'vue';
import { AppState } from '../AppState.js';
import Pop from "../utils/Pop.js";
import { logger } from "../utils/Logger.js";
import { accountService } from "../services/AccountService.js";

import { ticketsService } from "../services/TicketsService.js";

const account = computed(() => AppState.account)
const ticketHolders = computed(() => AppState.accountTickets)
const event = computed(() => AppState.activeEvent)

async function getMyTickets() {
  try {
    await accountService.getMyTickets()
  } catch (error) {
    Pop.toast("Couldn't get My Tickets", 'error')
    logger.error(error)
  }
}

async function ripTicket(ticketId) {
  try {
    await ticketsService.ripTicket(ticketId)
  } catch (error) {
    Pop.toast("Couldn't Rip Up Ticket", 'error')
    logger.error(error)
  }
}

onMounted(() => {
  getMyTickets()
})


</script>

<template>
  <div class="container">
    <div class="about text-center">
      <div v-if="account">
        <h1>Welcome {{ account.name }}</h1>
        <img class="rounded" :src="account.picture" alt="" />
        <p>{{ account.email }}</p>
      </div>
      <div v-else>
        <h1>Loading... <i class="mdi mdi-loading mdi-spin"></i></h1>
      </div>
    </div>

    <section class="row gap-3 ">
      <div class="col-2 g-3 p-2 card d-flex justify-content-center" v-for="ticketHolder in ticketHolders"
        :key="ticketHolder.id">
        <img class="img-fluid" :src="ticketHolder.event.coverImg" alt="">
        <RouterLink :to="{ name: 'TowerEvents', params: { eventId: ticketHolder.event.id } }">
          {{ ticketHolder.event.name }}
        </RouterLink>
        {{ ticketHolder.event.startDate.toLocaleString() }}
        <div class="d-flex justify-content-end m-2 p-2 ">
          <button @click="ripTicket(ticketHolder.id)" class="btn btn-outline-danger w-25 "><i
              class="mdi mdi-delete-outline"></i></button>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss">
// img {
//   max-width: 100px;
// }</style>
