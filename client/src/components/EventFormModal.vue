<script setup>
import { ref } from "vue";
import { towerEventsService } from "../services/TowerEventsService.js";
import { logger } from "../utils/Logger.js";
import Pop from "../utils/Pop.js";
import { Modal } from "bootstrap";
import { useRouter } from "vue-router";



const router = useRouter()



const eventData = ref({
  name: '',
  description: '',
  coverImg: '',
  location: '',
  capacity: '',
  startDate: '',
  type: ''
})

function resetForm() {
  eventData.value = { name: '', description: '', coverImg: '', location: '', capacity: '', startDate: '', type: '' }
}

async function createEvents() {
  try {
    const newEvent = await towerEventsService.createEvents(eventData.value)
    resetForm()

    eventData.value = {
      name: '',
      description: '',
      coverImg: '',
      location: '',
      capacity: '',
      startDate: '',
      type: ''
    }

    Modal.getOrCreateInstance('#eventFormModal').hide()

    Pop.toast("Event Created!", 'success')

    router.push({ name: 'TowerEvents', params: { eventId: newEvent.id } })

  } catch (error) {
    Pop.toast("Couldn't Create Event", 'error')
    logger.error(error)
  }

}


</script>


<template>



  <div class="modal fade" id="eventFormModal" tabindex="-1" aria-labelledby="eventFormModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="postFormModalLabel">Create a new Event!</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">

          <form @submit.prevent="createEvents()">

            <div class="form-floating mb-3">
              <input type="text" v-model="eventData.name" class="form-control"
                placeholder="What's the name of your event?" id="eventName" maxlength="500">
              <label for="eventName">Event Name</label>
            </div>
            <div class="form-floating mb-3">
              <textarea type="text" v-model="eventData.description" class="form-control"
                placeholder="Leave a description here" id="eventDescription" maxlength="500"></textarea>
              <label for="eventDescription">Event Description</label>
            </div>
            <div class="form-floating mb-3">
              <input type="text" v-model="eventData.capacity" class="form-control"
                placeholder="Maximum Attendance Capacity" id="eventCapacity" maxlength="500">
              <label for="eventCapacity">Event Capacity</label>
            </div>
            <div class="form-floating mb-3">
              <input type="text" v-model="eventData.location" class="form-control" placeholder="Where is the event?"
                id="eventLocation" maxlength="500">
              <label for="eventLocation">Event Location</label>
            </div>
            <div class="form-floating mb-3">
              <input type="text" v-model="eventData.startDate" class="form-control" placeholder="When is the event?"
                name="eventStartDate" id="eventStartDate" maxlength="500">
              <label for="eventStartDate">Event Start Date</label>
            </div>
            <div class="mb-3 col-4">
              <label for="eventType">Category</label>
              <select v-model="eventData.type" id="eventType" class="form-control">
                <option value="" disabled selected>Please select an event type</option>
                <option value="concert">Concert</option>
                <option value="convention">Convention</option>
                <option value="sport">Sport</option>
                <option value="digital">Digital</option>
              </select>
            </div>
            <div class="form-floating mb-3">
              <textarea v-model="eventData.coverImg" class="form-control" placeholder="Image" id="eventCoverImg"
                maxlength="500"></textarea>
              <label for="eventCoverImg">Cover Image</label>
            </div>



            <div class="text-end">
              <button class="btn btn-success" type="submit">Submit</button>
            </div>
          </form>


        </div>
      </div>
    </div>
  </div>



</template>


<style lang="scss" scoped></style>