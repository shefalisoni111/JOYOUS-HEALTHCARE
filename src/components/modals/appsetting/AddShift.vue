<template>
  <div>
    <!-- Modal -->
    <div class="modal fade" id="addShift" aria-labelledby="addShift" tabindex="-1">
      <div class="modal-dialog modal-dialog-centered modal-xl">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="addShift">Edit Shift</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body mx-3">
            <div class="mt-3">
              <form>
                <div
                  class="row mb-3 border-bottom pb-4 mx-1"
                  v-for="shift in shifts"
                  :key="shift.id"
                >
                  <div class="col-2 p-0">
                    <label for="" class="form-label fw-medium">{{
                      shift.shift_name
                    }}</label>
                  </div>
                  <div class="col-10">
                    <div class="d-flex justify-content-around">
                      <div class="col-5">
                        <label for="start-time" class="form-label"
                          >Start Time<span class="text-danger">*</span></label
                        >
                        <input
                          type="text"
                          :id="'start-time-' + shift.id"
                          :name="'start-time-' + shift.id"
                          class="form-control"
                          v-model="shift.start_time"
                          @input="updateTime(shift, 'start_time', $event.target.value)"
                        />
                      </div>

                      <div class="col-5">
                        <label for="end-time" class="form-label"
                          >End Time<span class="text-danger">*</span></label
                        >
                        <input
                          type="text"
                          :id="'end-time-' + shift.id"
                          :name="'end-time-' + shift.id"
                          class="form-control"
                          v-model="shift.end_time"
                          @input="updateTime(shift, 'end_time', $event.target.value)"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div class="modal-footer">
            <button class="btn btn-secondary rounded-1" data-bs-dismiss="modal">
              Cancel
            </button>
            <button
              class="btn btn-primary rounded-1 text-capitalize fw-medium"
              @click="updateShift"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      shifts: [],
    };
  },
  methods: {
    async updateShift() {
      try {
        for (const shift of this.shifts) {
          const response = await axios.put(
            `https://logezy.onrender.com/shifts/${shift.id}`,
            { start_time: shift.start_time, end_time: shift.end_time }
          );
          // console.log(`Shift ${shift.id} updated:`, response.data);
          if (data) {
            window.location.reload();
          }
        }
      } catch (error) {
        // console.error("Error updating shifts:", error);
      }
    },
    async fetchShifts() {
      try {
        const response = await axios.get("https://logezy.onrender.com/shifts");
        this.shifts = response.data || [];
      } catch (error) {
        // console.error("Error fetching shifts:", error);
      }
    },

    updateTime(shift, property, value) {
      // Update the corresponding property of the selected shift
      shift[property] = value;
    },
  },
  created() {
    this.fetchShifts();
  },
};
</script>
