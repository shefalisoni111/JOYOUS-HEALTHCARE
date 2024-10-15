<template>
  <div>
    <!-- Modal -->
    <div
      class="modal fade"
      id="editWeeklyTs"
      aria-labelledby="editWeeklyTs"
      tabindex="-1"
    >
      <div class="modal-dialog modal-dialog-centered modal-xl">
        <div class="modal-content">
          <div class="modal-header" style="background-color: #f9944b">
            <h5 class="modal-title" id="editWeeklyTs">
              Edit Assign Shift {{ vacancyId }}
            </h5>
          </div>
          <div class="modal-body mx-3">
            <div class="row align-items-center">
              <form>
                <div class="row">
                  <div class="col-6">
                    <div class="mb-3">
                      <label class="form-label">Assign To</label>
                      <!-- <input
                        type="text"
                        class="form-control text-capitalize"
                        v-model="
                          fetchCustomTimeShetData.name
                            ? fetchCustomTimeShetData.candidate_name
                            : ''
                        "
                        aria-describedby="name"
                        readonly
                      /> -->
                      <input
                        v-if="fetchCustomTimeShetData.candidate_name"
                        class="form-control text-capitalize"
                        v-model="fetchCustomTimeShetData.candidate_name"
                        type="text"
                        readonly
                      />
                      <input
                        v-else
                        class="form-control text-capitalize"
                        v-model="fetchCustomTimeShetData.name"
                        type="text"
                        readonly
                      />
                    </div>
                    <div class="mb-3">
                      <label class="form-label">Site</label>
                      <input
                        type="text"
                        class="form-control"
                        v-model="fetchCustomTimeShetData.site"
                        aria-describedby="site"
                        readonly
                      />
                    </div>
                  </div>
                  <div class="col-6">
                    <div class="mb-3">
                      <label class="form-label">Position</label>
                      <input
                        type="text"
                        class="form-control"
                        v-model="fetchCustomTimeShetData.job"
                        aria-describedby="time"
                        readonly
                      />
                    </div>
                    <div class="mb-3">
                      <label class="form-label">Date</label>
                      <input
                        v-if="fetchCustomTimeShetData.shift_date"
                        class="form-control text-capitalize"
                        v-model="fetchCustomTimeShetData.shift_date"
                        type="text"
                        readonly
                      />
                      <input
                        v-else
                        class="form-control text-capitalize"
                        v-model="fetchCustomTimeShetData.date"
                        type="text"
                        readonly
                      />
                      <!-- <input
                        type="text"
                        class="form-control"
                        v-model="fetchCustomTimeShetData.shift_date"
                        aria-describedby="date"
                        readonly
                      /> -->
                    </div>
                  </div>
                  <div class="col-12">
                    <div class="mb-3">
                      <label class="form-label">Shift</label>
                      <input
                        type="text"
                        class="form-control"
                        v-model="fetchCustomTimeShetData.shift_name"
                        aria-describedby="position"
                        readonly
                      />
                    </div>
                  </div>
                  <div class="col-12">
                    <label class="form-label">Rate Cards</label>
                    <div class="d-flex gap-2 justify-content-between">
                      <!-- <div class="mb-3">
                        <div class="col-12">
                          <label class="form-label">Start Time</label>
                        </div>
                        <div class="col-12 mt-1">
                          <input
                            type="email"
                            class="form-control"
                            v-model="fetchCustomTimeShetData.start_time"
                          />
                        </div>
                      </div> -->
                      <div class="mb-3">
                        <div class="col-12">
                          <label class="form-label" for="selectCustomStartTime"
                            >Start Time
                          </label>
                        </div>
                        <div class="col-12">
                          <select
                            id="selectCustomStartTime"
                            class="form-control"
                            v-model="fetchCustomTimeShetData.start_time"
                            @change="validateStartTime"
                            style="width: 240px"
                          >
                            <option
                              v-for="hour in 24"
                              :key="hour"
                              :value="formatTime(hour)"
                            >
                              {{ formatTime(hour) }}
                            </option>
                          </select>
                        </div>
                      </div>
                      <!-- <div class="mb-3">
                        <div class="col-12">
                          <label class="form-label">End Time</label>
                        </div>
                        <div class="col-12 mt-1">
                          <input
                            type="email"
                            class="form-control"
                            v-model="fetchCustomTimeShetData.end_time"
                          />
                        </div>
                      </div> -->
                      <div class="mb-3">
                        <div class="col-12">
                          <label class="form-label" for="selectCustomEndTime"
                            >End Time</label
                          >
                        </div>
                        <div class="col-12">
                          <select
                            id="selectCustomEndTime"
                            class="form-control"
                            v-model="fetchCustomTimeShetData.end_time"
                            @change="validateEndTime"
                            style="width: 240px"
                          >
                            <option
                              v-for="hour in 24"
                              :key="hour"
                              :value="formatTime(hour)"
                            >
                              {{ formatTime(hour) }}
                            </option>
                          </select>
                        </div>
                      </div>
                      <!-- <div class="mb-3">
                        <div class="col-12">
                          <label class="form-label">Break</label>
                        </div>
                        <div class="col-12 mt-1">
                          <input
                            type="email"
                            class="form-control"
                            v-model="fetchCustomTimeShetData.break"
                          />
                        </div>
                      </div> -->
                      <div class="mb-3">
                        <div class="col-12">
                          <label class="form-label" for="selectShiftsBreak"
                            >Break Time</label
                          >
                        </div>
                        <div class="col-12">
                          <select
                            id="selectShiftsBreak"
                            class="form-control"
                            v-model="fetchCustomTimeShetData.break"
                            @change="validateBreak"
                            style="width: 240px"
                          >
                            <option
                              v-for="minute in [15, 30, 45, 60, 75, 90]"
                              :key="minute"
                              :value="minute"
                            >
                              {{ formatBreakTime(minute) }}
                            </option>
                          </select>
                        </div>
                      </div>
                      <div class="mb-3">
                        <div class="col-12">
                          <label class="form-label">Total Hours</label>
                        </div>
                        <div class="col-12 mt-1">
                          <!-- <input
                            type="email"
                            class="form-control"
                            v-model="fetchCustomTimeShetData.total_shift_hours"
                          /> -->
                          <select
                            id="selectCustomStartTime"
                            class="form-control"
                            v-model="fetchCustomTimeShetData.total_hours"
                            @change="validateStartTime"
                            style="width: 240px"
                          >
                            <option v-for="hour in 24" :key="hour" :value="hour">
                              {{ hour }} hour{{ hour > 1 ? "s" : "" }}
                            </option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div class="d-flex justify-content-between">
                      <div class="mb-3">
                        <div class="col-12">
                          <label class="form-label">Client Rate</label>
                        </div>
                        <div class="col-12 mt-1">
                          <input
                            type="text"
                            class="form-control"
                            v-model="fetchCustomTimeShetData.client_rate"
                            @input="validateNumber('client_rate')"
                          />
                        </div>
                      </div>
                      <div class="mb-3">
                        <div class="col-12">
                          <label class="form-label">Client Pay Amount</label>
                        </div>
                        <div class="col-12 mt-1">
                          <input
                            type="text"
                            class="form-control"
                            v-model="fetchCustomTimeShetData.total_cost"
                            @input="validateNumber('total_cost')"
                          />
                        </div>
                      </div>
                      <div class="mb-3">
                        <div class="col-12">
                          <label class="form-label">Staff Rate</label>
                        </div>
                        <div class="col-12 mt-1">
                          <input
                            type="text"
                            class="form-control"
                            v-model="fetchCustomTimeShetData.staff_rate"
                            @input="validateNumber('staff_rate')"
                          />
                        </div>
                      </div>
                      <div class="mb-3">
                        <div class="col-12">
                          <label class="form-label">Staff Rate Amount</label>
                        </div>
                        <div class="col-12 mt-1">
                          <input
                            type="text"
                            class="form-control"
                            v-model="fetchCustomTimeShetData.staff_rate_amount"
                            @input="validateNumber('staff_rate_amount')"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="mb-3">
                    <div class="col-12">
                      <label class="form-label">Notes</label>
                    </div>
                    <div class="col-12 mt-1">
                      <textarea
                        class="form-control"
                        v-model="fetchCustomTimeShetData.notes"
                        rows="3"
                      ></textarea>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div class="modal-footer">
            <button
              class="btn btn-secondary rounded-1"
              data-bs-target="#editWeeklyTs"
              data-bs-dismiss="modal"
              @click="resetChanges"
            >
              Cancel
            </button>
            <button
              class="btn btn-primary rounded-1 text-capitalize fw-medium"
              data-bs-dismiss="modal"
              @click.prevent="updateCandidateMethod()"
            >
              Save
            </button>
            <button
              class="btn btn-primary rounded-1 text-capitalize fw-medium"
              data-bs-dismiss="modal"
            >
              Approve & Save
            </button>
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
  name: "editCustomTimeSheet",
  data() {
    return {
      fetchCustomTimeShetData: {
        id: "",
        name: "",
        candidate_name: "",
        date: "",
        shift_date: "",
        candidate_name: "",
        total_hours: "",
        start_time: "",
        end_time: "",
        break: "",
        client_rate: "",
        total_cost: "",
        notes: "",
      },
      isPublished: false,
      originalData: null,
    };
  },
  props: {
    vacancyId: {
      type: String,
      required: true,
    },
  },
  components: { SuccessAlert },
  computed: {
    getCandidatesData() {
      return this.$store.state.candidates;
    },
  },
  methods: {
    resetChanges() {
      this.fetchCustomTimeShetData = { ...this.originalData };
    },
    convertTimeFormat(dateTimeString) {
      const date = new Date(dateTimeString);
      const hours = date.getUTCHours();
      const minutes = date.getUTCMinutes();
      const amPm = hours >= 12 ? "PM" : "AM";
      const formattedHours = String(hours).padStart(2, "0");
      const formattedMinutes = String(minutes).padStart(2, "0");
      return `${formattedHours}:${formattedMinutes} ${amPm}`;
    },
    formatTime(hour) {
      if (hour < 12) {
        return `${String(hour).padStart(2, "0")}:00 AM`;
      } else if (hour === 12) {
        return `${String(hour).padStart(2, "0")}:00 PM`;
      } else if (hour === 24) {
        return `00:00`;
      } else {
        const adjustedHour = hour % 12;
        return `${String(adjustedHour).padStart(2, "0")}:00 PM`;
      }
    },
    formatBreakTime(minute) {
      if (minute === 60) {
        return "1 hour";
      } else {
        const hours = Math.floor(minute / 60);
        const mins = minute % 60;

        let formattedTime = "";
        if (hours > 0) {
          formattedTime += `${hours} hour `;
        }
        if (mins > 0) {
          formattedTime += `${mins} minute`;
        }
        return formattedTime.trim();
      }
    },
    async fetchCustomTimeSheetData() {
      try {
        const response = await axios.get(
          `${VITE_API_URL}/custom_timesheets/${this.vacancyId}`
        );
        this.fetchCustomTimeShetData = {
          ...this.fetchCustomTimeShetData,
          ...response.data.custom_sheets,
        };
        this.originalData = { ...this.fetchCustomTimeShetData };
      } catch (error) {
        if (error.response && error.response.status === 404) {
          try {
            const fallbackResponse = await axios.get(
              `${VITE_API_URL}/sign_timesheets/${this.vacancyId}`
            );
            this.fetchCustomTimeShetData = {
              ...this.fetchCustomTimeShetData,
              ...fallbackResponse.data.sign_timesheets,
            };
            this.originalData = { ...this.fetchCustomTimeShetData };
          } catch (fallbackError) {
            // console.error("Error with fallback API:", fallbackError);
          }
        } else {
          // console.error("Error fetching custom timesheets:", error);
        }
      }
    },
    validateNumber(field) {
      const value = this.fetchCustomTimeShetData[field];

      if (!/^\d*\.?\d*$/.test(value)) {
        this.fetchCustomTimeShetData[field] = value.replace(/[^0-9.]/g, "");
      }
    },
    async updateCandidateMethod() {
      try {
        const response = await axios.put(
          `${VITE_API_URL}/custom_timesheets/${this.fetchCustomTimeShetData.id}`,
          this.fetchCustomTimeShetData
        );

        this.$store.commit("updateCandidate", {
          id: this.fetchCustomTimeShetData.id,
          newData: response.data.custom_sheets,
        });
        this.$emit("CustomTimeSheetData-updated");

        const message = "TimeSheet updated successfully";
        this.$refs.successAlert.showSuccess(message);
      } catch (error) {
        // if (error.response && error.response.status === 404) {
        //   try {
        //     const fallbackResponse = await axios.put(
        //       `${DEV}/update_sign_timesheet/${this.fetchCustomTimeShetData.id}`,
        //       this.fetchCustomTimeShetData
        //     );
        //     this.$store.commit("updateCandidate", {
        //       id: this.fetchCustomTimeShetData.id,
        //       newData: fallbackResponse.data.custom_sheets,
        //     });
        //     this.$emit("CustomTimeSheetData-updated");
        //     const message = "TimeSheet updated successfully via fallback";
        //     this.$refs.successAlert.showSuccess(message);
        //   } catch (fallbackError) {
        //     // console.error("Error updating candidate via fallback API:", fallbackError);
        //   }
        // } else {
        //   // console.error("Error updating candidate:", error);
        // }
      }
    },
  },
  watch: {
    vacancyId: {
      immediate: true,
      handler(newvacancyId) {
        this.fetchCustomTimeSheetData();
      },
    },
  },
  async beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.fetchCustomTimeSheetData(newvacancyId);
    });
  },
  async beforeRouteUpdate(to, from, next) {
    this.fetchCustomTimeSheetData(newvacancyId);
    next();
  },
  mounted() {},
};
</script>
<style scoped>
select {
  width: 100%;
  padding: 9px;

  border-radius: 4px;
  border: 1px solid #80808059;
}
</style>
