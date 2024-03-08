<template>
  <div class="row">
    <div class="col-12">
      <div class="d-flex justify-content-between align-content-center my-3">
        <h6 class="fw-bold d-flex align-items-center mb-0">Shift Settings</h6>
      </div>
    </div>
    <div class="col-12">
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
        <div class="row mt-4">
          <div class="col-2">
            <label for="" class="form-label fw-medium">Break Time</label>
          </div>
          <div class="col-10">
            <div class="ms-5">
              <div class="col-5 ms-2">
                <input type="text" class="form-control" readonly />
              </div>
            </div>
          </div>
        </div>
        <div class="row mt-3">
          <div>
            <button class="btn btn-primary text-nowrap">Update</button>&nbsp;&nbsp;
            <button class="btn btn-secondary text-nowrap">Reset to Default</button>
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
  components: {},
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
        const updatedIndex = this.shifts.findIndex((s) => s.id === updatedShift.id);

        if (updatedIndex !== -1) {
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
