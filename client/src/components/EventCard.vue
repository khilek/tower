<script setup>
import { TowerEvent } from "../models/TowerEvent.js";


defineProps({ event: { type: TowerEvent, required: true } })




</script>


<template>

  <RouterLink :to="{ name: 'TowerEvents', params: { eventId: event.id } }">
    <div class=" card text-bg-dark mt-3">
      <img :src="event.coverImg" class="event-img" alt="...">
      <div class="card p-3">
        <h5 class="card-title">
          {{ event.name }} {{ event.location }}
        </h5>
        <p class="card-text"><small>When: {{ event.startDate.toLocaleString() }} </small></p>
        <p>Event Capacity: {{ event.capacity }}</p>

      </div>
    </div>
  </RouterLink>
</template>


<style lang="scss" scoped>
.event-img {
  height: 100%;
  width: 100%;
  object-fit: contain;
}
</style>