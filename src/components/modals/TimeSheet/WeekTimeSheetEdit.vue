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
                      <!--         <input
                    
                        class="form-control text-capitalize custom-disabled"
                        v-model="fetchCustomTimeShetData.candidate_name"
                        type="text"
                        readonly
                      /> -->
                      <input
                        class="form-control text-capitalize custom-disabled"
                        v-model="fetchCustomTimeShetData.name"
                        type="text"
                        readonly
                      />
                    </div>
                    <div class="mb-3">
                      <label class="form-label">Site</label>
                      <input
                        type="text"
                        class="form-control custom-disabled"
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
                        class="form-control custom-disabled"
                        v-model="fetchCustomTimeShetData.job"
                        aria-describedby="time"
                        readonly
                      />
                    </div>
                    <div class="mb-3">
                      <label class="form-label">Date</label>
                      <input
                        v-if="fetchCustomTimeShetData.shift_date"
                        class="form-control text-capitalize custom-disabled"
                        v-model="fetchCustomTimeShetData.shift_date"
                        type="text"
                        readonly
                      />
                      <input
                        v-else
                        class="form-control text-capitalize custom-disabled"
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
                        class="form-control custom-disabled"
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
                        <div class="col-12" v-if="showSaveButton">
                          <input
                            v-if="apiResponse_EndTime"
                            type="text"
                            class="form-control custom-disabled"
                            v-model="fetchCustomTimeShetData.end_time"
                            disabled
                          />

                          <select
                            v-else
                            id="selectCustomStartTime"
                            class="form-control"
                            v-model="fetchCustomTimeShetData.end_time"
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
                          <!-- <select
                            id="selectCustomEndTime"
                            class="form-control"
                            v-model="fetchCustomTimeShetData.end_time"
                            @change="validateEndTime"
                            style="width: 240px"
                            disabled
                          >
                            <option
                              v-for="hour in 24"
                              :key="hour"
                              :value="formatTime(hour)"
                            >
                              {{ formatTime(hour) }}
                            </option>
                          </select> -->
                        </div>
                        <div class="col-12" v-else>
                          <input
                            v-if="apiResponse_EndTime"
                            type="text"
                            class="form-control custom-disabled"
                            v-model="fetchCustomTimeShetData.end_time"
                            disabled
                          />

                          <select
                            v-else
                            id="selectCustomStartTime"
                            class="form-control custom-disabled"
                            v-model="fetchCustomTimeShetData.end_time"
                            @change="validateStartTime"
                            style="width: 240px"
                            disabled
                          >
                            <option
                              v-for="hour in 24"
                              :key="hour"
                              :value="formatTime(hour)"
                            >
                              {{ formatTime(hour) }}
                            </option>
                          </select>
                          <!-- <select
                            id="selectCustomEndTime"
                            class="form-control"
                            v-model="fetchCustomTimeShetData.end_time"
                            @change="validateEndTime"
                            style="width: 240px"
                            disabled
                          >
                            <option
                              v-for="hour in 24"
                              :key="hour"
                              :value="formatTime(hour)"
                            >
                              {{ formatTime(hour) }}
                            </option>
                          </select> -->
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
                        <div class="col-12" v-if="showSaveButton">
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
                        <div class="col-12" v-else>
                          <select
                            id="selectShiftsBreak"
                            class="form-control custom-disabled"
                            v-model="fetchCustomTimeShetData.break"
                            @change="validateBreak"
                            style="width: 240px"
                            disabled
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
                            class="form-control custom-disabled"
                            v-model="fetchCustomTimeShetData.total_hours"
                            @change="validateStartTime"
                            style="width: 240px"
                            disabled
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
                        <div class="col-12 mt-1" v-if="showSaveButton">
                          <input
                            type="text"
                            class="form-control disabled"
                            v-model="fetchCustomTimeShetData.client_rate"
                            @input="validateNumber('client_rate')"
                            disabled
                          />
                        </div>
                        <div class="col-12 mt-1" v-else>
                          <input
                            type="text"
                            class="form-control custom-disabled"
                            v-model="fetchCustomTimeShetData.client_rate"
                            @input="validateNumber('client_rate')"
                            disabled
                          />
                        </div>
                      </div>
                      <!-- <div class="mb-3">
                        <div class="col-12">
                          <label class="form-label">Client Pay Amount</label>
                        </div>
                        <div class="col-12 mt-1" v-if="showSaveButton">
                          <input
                            type="text"
                            class="form-control"
                            v-model="fetchCustomTimeShetData.total_cost"
                            @input="validateNumber('total_cost')"
                          />
                        </div>
                        <div class="col-12 mt-1" v-else>
                          <input
                            type="text"
                            class="form-control"
                            v-model="fetchCustomTimeShetData.total_cost"
                            @input="validateNumber('total_cost')"
                            disabled
                          />
                        </div>
                      </div> -->
                      <div class="mb-3">
                        <div class="col-12">
                          <label class="form-label">Staff Rate</label>
                        </div>
                        <div class="col-12 mt-1" v-if="showSaveButton">
                          <input
                            type="text"
                            class="form-control custom-disabled"
                            v-model="fetchCustomTimeShetData.staff_rate"
                            @input="validateNumber('staff_rate')"
                            disabled
                          />
                        </div>
                        <div class="col-12 mt-1" v-else>
                          <input
                            type="text"
                            class="form-control custom-disabled"
                            v-model="fetchCustomTimeShetData.staff_rate"
                            @input="validateNumber('staff_rate')"
                            disabled
                          />
                        </div>
                      </div>
                      <!-- <div class="mb-3">
                        <div class="col-12">
                          <label class="form-label">Staff Rate Amount</label>
                        </div>
                        <div class="col-12 mt-1" v-if="showSaveButton">
                          <input
                            type="text"
                            class="form-control"
                            v-model="fetchCustomTimeShetData.staff_rate_amount"
                            @input="validateNumber('staff_rate_amount')"
                          />
                        </div>
                        <div class="col-12 mt-1" v-else>
                          <input
                            type="text"
                            class="form-control"
                            v-model="fetchCustomTimeShetData.staff_rate_amount"
                            @input="validateNumber('staff_rate_amount')"
                            disabled
                          />
                        </div>
                      </div> -->
                    </div>
                  </div>

                  <div class="mb-3">
                    <div class="col-12">
                      <label class="form-label">Comments</label>
                    </div>
                    <div class="col-12 mt-1" v-if="showSaveButton">
                      <textarea
                        class="form-control"
                        v-model="fetchCustomTimeShetData.notes"
                        rows="3"
                      ></textarea>
                    </div>
                    <div class="col-12 mt-1" v-else>
                      <textarea
                        class="form-control custom-disabled"
                        v-model="fetchCustomTimeShetData.notes"
                        rows="3"
                        disabled
                      ></textarea>
                    </div>
                  </div>
                  <div class="mb-3" v-if="showSaveButton">
                    <div class="col-12">
                      <label class="form-label">Paper TimeSheet</label>
                    </div>
                    <div
                      class="col-12 mt-1"
                      v-if="
                        fetchCustomTimeShetData.status === 'Approved' &&
                        fullCustomImageUrl
                      "
                    >
                      <img
                        :src="fullCustomImageUrl"
                        alt="Current Paper TimeSheet"
                        class="img-fluid"
                        width="20%"
                      />
                    </div>
                    <div class="col-12 mt-1" v-else>
                      <input
                        type="file"
                        class="form-control"
                        accept="image/*"
                        @change="handleFileUpload"
                      />
                      <!-- <span v-if="!validationPaperTimeSheet" class="text-danger">
                        Paper TimeSheet is required
                      </span> -->
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
            <!-- <button
              class="btn btn-primary rounded-1 text-capitalize fw-medium"
              data-bs-dismiss="modal"
              @click.prevent="updateCandidateMethod()"
            >
              Save
            </button> -->
            <button
              v-show="!showSaveButton"
              class="btn btn-primary rounded-1 text-capitalize fw-medium"
              data-bs-dismiss="modal"
              @click.prevent="approved_TimesheetRevertMethod()"
            >
              Approve
            </button>
            <button
              v-show="showSaveButton"
              class="btn btn-primary rounded-1 text-capitalize fw-medium"
              data-bs-dismiss="modal"
              @click.prevent="handleApproveAndSave"
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

        date: "",
        shift_date: "",
        candidate_name: "",
        total_hours: "",
        start_time: "",
        end_time: "",
        break: "",
        client_rate: "",
        paper_timesheet: "",
        total_cost: "",
        notes: "",
        status: "",
      },
      apiResponse: "",
      showValueCustom: false,
      apiResponse_EndTime: "",
      showSaveButton: true,
      isPublished: false,
      originalData: null,
    };
  },
  props: {
    vacancyId: {
      type: String,
      required: true,
    },
    paginatedTimesheets: {
      type: Array,
      required: false,
      default: () => [],
    },
  },
  components: { SuccessAlert },
  computed: {
    getCandidatesData() {
      return this.$store.state.candidates;
    },
    isSaveDisabled() {
      const {
        notes,
        start_time,
        end_time,

        paper_timesheet,
      } = this.fetchCustomTimeShetData;
      return !notes || !start_time || !paper_timesheet || !end_time;
    },
    fullCustomImageUrl() {
      return this.fetchCustomTimeShetData.paper_timesheet
        ? `${VITE_API_URL}${this.fetchCustomTimeShetData.paper_timesheet}`
        : "";
      // console.log(`${VITE_API_URL}${this.fetchCustomTimeShetData.paper_timesheet}`);
    },
  },
  methods: {
    validateStartTime() {
      const hour = this.fetchCustomTimeShetData.start_hour;
      const minute = this.fetchCustomTimeShetData.start_minute;
      this.fetchCustomTimeShetData.start_time = `${String(hour).padStart(
        2,
        "0"
      )}:${String(minute).padStart(2, "0")}`;
    },
    validateEndTime() {
      const hour = this.fetchCustomTimeShetData.start_hour;
      const minute = this.fetchCustomTimeShetData.start_minute;
      this.fetchCustomTimeShetData.end_time = `${String(hour).padStart(2, "0")}:${String(
        minute
      ).padStart(2, "0")}`;
    },
    async handleApproveAndSave() {
      try {
        await this.updateCandidateMethod();
        await this.approved_TimesheetRevertMethod();
      } catch (error) {
        // console.error("Error during approval process:", error);
      }
    },
    async approved_TimesheetRevertMethod() {
      const token = localStorage.getItem("token");
      if (!token) {
        return;
      }
      try {
        const response = await axios.put(
          `${VITE_API_URL}/approved_and_unapproved_timesheet_to_web/${this.fetchCustomTimeShetData.id}`,
          null,
          {
            headers: {
              "content-type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        this.$emit("CustomTimeSheetData-updated");
        const message = "Custom TimeSheet Approved successfully";
        this.$refs.successAlert.showSuccess(message);
      } catch (error) {
        // console.error("Error updating candidate:", error);
      }
    },
    resetChanges() {
      this.fetchCustomTimeShetData = { ...this.originalData };
    },
    async fetchCustomTimeSheetData() {
      if (!this.vacancyId) {
        return;
      }
      if (
        !Array.isArray(this.paginatedTimesheets) ||
        this.paginatedTimesheets.length === 0
      ) {
        return;
      }
      try {
        for (const day of this.paginatedTimesheets) {
          const customTimesheets = Array.isArray(day.custom_timesheets)
            ? day.custom_timesheets
            : [];
          const signTimesheets = Array.isArray(day.sign_timesheets)
            ? day.sign_timesheets
            : [];

          if (customTimesheets.length > 0) {
            const token = localStorage.getItem("token");
            try {
              const response = await axios.get(
                `${VITE_API_URL}/custom_timesheets/${this.vacancyId}`,
                {
                  headers: {
                    "content-type": "application/json",
                    Authorization: "bearer " + token,
                  },
                }
              );
              if (response.data.custom_sheets.custom_timesheet === "custom_timesheet") {
                if (
                  response.data.custom_sheets &&
                  response.data.custom_sheets.start_time
                ) {
                  this.showValueCustom = true;
                  this.apiResponse = response.data.custom_sheets.start_time;
                  this.apiResponse_EndTime = response.data.custom_sheets.end_time;
                  this.fetchCustomTimeShetData.start_time = this.apiResponse;
                  this.fetchCustomTimeShetData.end_time = this.apiResponse_EndTime;
                  this.originalData = { ...this.fetchCustomTimeShetData };
                  this.showSaveButton = true;
                } else {
                  this.apiResponse = "";
                }
              }
            } catch (error) {
              // console.error("Error fetching custom timesheets:", error);
            }
          } else if (signTimesheets.length > 0) {
            const token = localStorage.getItem("token");
            try {
              const fallbackResponse = await axios.get(
                `${VITE_API_URL}/sign_timesheets/${this.vacancyId}`,
                {
                  headers: {
                    "content-type": "application/json",
                    Authorization: "bearer " + token,
                  },
                }
              );

              if (
                fallbackResponse.data.sign_timesheets.timesheet_type ===
                "signed_timesheet"
              ) {
                if (
                  fallbackResponse.data.sign_timesheets &&
                  fallbackResponse.data.sign_timesheets.start_time
                ) {
                  this.showValueCustom = false;
                  this.apiResponse = fallbackResponse.data.sign_timesheets.start_time;
                  this.apiResponse_EndTime =
                    fallbackResponse.data.sign_timesheets.end_time;
                  this.fetchCustomTimeShetData.start_time = this.apiResponse;
                  this.fetchCustomTimeShetData.end_time = this.apiResponse_EndTime;
                  this.fetchCustomTimeShetData = {
                    ...this.fetchCustomTimeShetData,
                    ...fallbackResponse.data.sign_timesheets,
                  };
                  this.originalData = { ...this.fetchCustomTimeShetData };
                  this.showSaveButton = false;
                } else {
                  this.fetchCustomTimeShetData = {};
                  this.originalData = {};
                  this.showSaveButton = false;
                }
              }
            } catch (fallbackError) {
              // console.error("Error fetching sign_timesheets:", fallbackError);
            }
          } else {
            // console.log(
            //   "No custom_timesheets or sign_timesheets available for this day."
            // );
          }
        }
      } catch (error) {
        // console.error("Error in fetchCustomTimeSheetData:", error);
      }
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
      if (hour === 0) {
        return "12:00 AM";
      } else if (hour < 12) {
        return `${String(hour).padStart(2, "0")}:00 AM`;
      } else if (hour === 12) {
        return "12:00 AM";
      } else {
        return `${String(hour - 12).padStart(2, "0")}:00 PM`;
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

    validateNumber(field) {
      const value = this.fetchCustomTimeShetData[field];

      if (!/^\d*\.?\d*$/.test(value)) {
        this.fetchCustomTimeShetData[field] = value.replace(/[^0-9.]/g, "");
      }
    },
    async updateCandidateMethod() {
      const token = localStorage.getItem("token");

      try {
        const payload = { ...this.fetchCustomTimeShetData };

        if (payload.start_time !== null || payload.start_time !== "") {
          delete payload.start_time;
        }

        if (payload.end_time !== null || payload.end_time !== "") {
          delete payload.end_time;
        }

        const response = await axios.put(
          `${VITE_API_URL}/custom_timesheets/${this.fetchCustomTimeShetData.id}`,
          payload,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: "bearer " + token,
            },
          }
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
        this.fetchCustomTimeSheetData(newvacancyId);
      },
    },
    paginatedTimesheets(newVal) {
      if (newVal && newVal.length > 0) {
        this.fetchCustomTimeSheetData();
      }
    },
  },

  async beforeRouteEnter(to, from, next) {
    next((vm) => {
      const vacancyId = to.params.vacancyId;
      if (vacancyId) {
        vm.fetchCustomTimeSheetData(vacancyId);
      }
    });
  },

  async beforeRouteUpdate(to, from, next) {
    const vacancyId = to.params.vacancyId;
    if (vacancyId) {
      this.fetchCustomTimeSheetData(vacancyId);
    }
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
.form-control {
  background-color: #fff;
}
.custom-disabled {
  cursor: not-allowed;
}

.custom-disabled:hover {
  cursor: not-allowed;
}
</style>
