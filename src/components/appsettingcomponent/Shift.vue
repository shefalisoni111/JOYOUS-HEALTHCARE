<template>
  <div class="row">
    <div class="col-12 p-0">
      <div class="pagetitle d-flex justify-content-between">
        <div class="d-flex align-items-center">
          <ul class="breadcrumb mb-1">
            <li class="breadcrumb-item active text-uppercase fw-bold">
              Shift / <span>shift</span>
            </li>
          </ul>
        </div>
        <!-- End Page Title -->
        <div class="d-flex align-items-center">
          <button
            class="btn btn-primary rounded-1 text-uppercase fw-medium"
            data-bs-toggle="modal"
            data-bs-target="#addShift"
            data-bs-whatever="@mdo"
            type="button"
          >
            Update Shift
          </button>
        </div>
      </div>
      <div class="mt-3">
        <form class="" v-for="shift in shifts" :key="shift.id">
          <div class="row mb-3 border-bottom pb-4 mx-1">
            <div class="col-2 p-0">
              <label for="" class="form-label fw-medium">{{ shift.shift_name }}</label>
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
                    :value="shift.start_time"
                    readonly
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
                    :value="shift.end_time"
                    readonly
                  />
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
    <AddShift :shifts="shifts" @shift-updated="getTime" />
  </div>
</template>

<script>
import axios from "axios";
import AddShift from "../modals/appsetting/AddShift.vue";

export default {
  data() {
    return {
      shifts: [],
    };
  },
  components: { AddShift },
  methods: {
    async getTime() {
      try {
        const response = await axios.get(`${VITE_API_URL}/shifts`);
        this.shifts = response.data || [];
      } catch (error) {
        // console.error("Error fetching shifts:", error);
      }
    },
    updateShiftInList(updatedShifts) {
      updatedShifts.forEach((updatedShift) => {
        // Find the index of the updated shift in the local array
        const updatedIndex = this.shifts.findIndex((s) => s.id === updatedShift.id);

        // Update the shift in the local array at its own position
        if (updatedIndex !== -1) {
          // Use direct assignment for reactivity in Vue 3
          this.shifts[updatedIndex] = updatedShift;
        }
      });
    },
  },

  async created() {
    await this.getTime();
  },
};
</script>

<style scoped></style>
