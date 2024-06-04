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

                  <select
                    :id="'start-time-' + shift.id"
                    :name="'start-time-' + shift.id"
                    class="form-select"
                    v-model="shift.start_time"
                    @change="setShiftIdToUpdate(shift.id)"
                  >
                    <option v-for="hour in 24" :key="hour" :value="formatTime(hour)">
                      {{ formatTime(hour) }}
                    </option>
                  </select>
                </div>

                <div class="col-5">
                  <label for="end-time" class="form-label"
                    >End Time<span class="text-danger">*</span></label
                  >
                  <select
                    :id="'end-time-' + shift.id"
                    :name="'end-time-' + shift.id"
                    class="form-select"
                    v-model="shift.end_time"
                    @change="setShiftIdToUpdate(shift.id)"
                  >
                    <option v-for="hour in 24" :key="hour" :value="formatTime(hour)">
                      {{ formatTime(hour) }}
                    </option>
                  </select>
                </div>
              </div>
            </div>
            <div class="row mt-4">
              <div class="mb-3 d-flex justify-content-between">
                <div class="col-3">
                  <label class="form-label" for="break">Break Time</label>
                </div>
                <div class="col-9">
                  <select
                    :id="'break-' + shift.id"
                    :name="'break-' + shift.id"
                    class="form-select w-25"
                    v-model="shift.break"
                    @change="setShiftIdToUpdate(shift.id)"
                  >
                    <option
                      v-for="minute in [15, 30, 45, 60, 75, 90]"
                      :key="minute"
                      :value="formatBreakTime(minute)"
                    >
                      {{ formatBreakTime(minute) }}
                    </option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </form>

        <div class="row mt-3">
          <div>
            <button class="btn btn-primary text-nowrap" v-on:click="updateShiftTimes()">
              Update</button
            >&nbsp;&nbsp;
            <button class="btn btn-secondary text-nowrap">Reset to Default</button>
          </div>
        </div>
      </div>
    </div>
    <SuccessAlert ref="successAlert" />
  </div>
</template>
<script>
import axios from "axios";
import SuccessAlert from "../../Alerts/SuccessAlert.vue";

export default {
  data() {
    return {
      shifts: [],
      shiftIdToUpdate: null,
    };
  },
  components: { SuccessAlert },
  methods: {
    formatTime(hour) {
      if (hour < 12) {
        return `${String(hour).padStart(2, "0")}:00 AM`;
      } else if (hour === 12) {
        return `${String(hour).padStart(2, "0")}:00 PM`;
      } else if (hour === 24) {
        return `00:00`;
      } else if (hour > 12 && hour < 24) {
        return `${String(hour).padStart(2, "0")}:00 PM`;
      } else {
        return `${String(hour - 12).padStart(2, "0")}:00 PM`;
      }
    },
    async getTime() {
      try {
        const response = await axios.get(
          `${VITE_API_URL}site_shift/${this.$route.params.id}`
        );
        this.shifts =
          response.data.site_shift_data.map((shift) => ({
            ...shift,
            start_time: this.convertTimeFormat(shift.start_time),
            end_time: this.convertTimeFormat(shift.end_time),
            break: shift.break,
          })) || [];
        // console.log(this.shifts);
      } catch (error) {
        // console.error("Error fetching shifts:", error);
      }
    },
    formatBreakTime(minute) {
      const hours = Math.floor(minute / 60);
      const mins = minute % 60;

      let formattedTime = "";
      if (hours > 0) {
        formattedTime += `${hours} hour `;
      }
      if (mins > 0) {
        formattedTime += `${mins} minute`;
      }

      return formattedTime;
    },
    convertTimeFormat(dateTimeString) {
      const date = new Date(dateTimeString);
      let hours = date.getUTCHours();
      const minutes = date.getUTCMinutes();
      const amPm = hours >= 12 ? "PM" : "AM";

      if (hours > 12 && hours < 24) {
        return `${String(hours).padStart(2, "0")}:00 PM`;
      } else {
        hours = hours === 0 ? 12 : hours;
      }
      const formattedHours = String(hours).padStart(2, "0");
      const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
      return `${formattedHours}:${formattedMinutes} ${amPm}`;
    },

    setShiftIdToUpdate(shiftId) {
      this.shiftIdToUpdate = shiftId;
    },

    updateShiftTimes() {
      const shiftIndex = this.shifts.findIndex(
        (shift) => shift.id === this.shiftIdToUpdate
      );
      if (shiftIndex !== -1) {
        const requestData = {
          site_shifts: [
            {
              id: this.shiftIdToUpdate,
              start_time: this.shifts[shiftIndex].start_time,
              end_time: this.shifts[shiftIndex].end_time,
              break: this.shifts[shiftIndex].break,
            },
          ],
        };

        axios
          .put(`${VITE_API_URL}/update_site_shifts`, requestData)
          .then((response) => {
            const message = "Shift Updated Successfully";
            this.$refs.successAlert.showSuccess(message);
            // alert("Shift Updated Successfully");
            this.shiftIdToUpdate = null;
          })
          .catch((error) => {
            // console.error(error);
          });
      }
    },
  },

  async mounted() {
    await this.getTime();
  },
};
</script>
