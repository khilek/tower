<script setup>
import { computed, onMounted } from 'vue';
import { AppState } from '../AppState.js';
import Pop from "../utils/Pop.js";
import { logger } from "../utils/Logger.js";
import { accountService } from "../services/AccountService.js";
import EventCard from "../components/EventCard.vue";

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

    <!-- <RouterLink :to="{ name: 'TowerEvents', params: { eventId: event.id } }"> -->
    <section class="row gap-3 ">
      <div class="col-2 g-3 p-2 card d-flex justify-content-center" v-for="ticketHolder in ticketHolders"
        :key="ticketHolder.id">
        <img class="img-fluid" :src="ticketHolder.event.coverImg" alt="">
        {{ ticketHolder.event.name }}
        {{ ticketHolder.event.startDate.toLocaleString() }}
      </div>
    </section>
    <!-- </RouterLink> -->
  </div>
</template>

<style scoped lang="scss">
// img {
//   max-width: 100px;
// }</style>
