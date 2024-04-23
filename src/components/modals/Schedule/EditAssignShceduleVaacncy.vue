<template>
  <div>
    <!-- Modal -->
    <div
      class="modal fade"
      id="editAssignScheduleVacancy"
      aria-labelledby="editAssignScheduleVacancy"
      tabindex="-1"
    >
      <div class="modal-dialog modal-dialog-centered modal-xl">
        <div class="modal-content">
          <div class="modal-header" style="background-color: #f9944b">
            <h5 class="modal-title" id="editAssignScheduleVacancy">
              Edit Assign Shift {{ vacancyId }} {{ candidateId }}
            </h5>
          </div>
          <div class="modal-body mx-3">
            <div class="row align-items-center">
              <form>
                <div class="row">
                  <div class="col-6">
                    <div class="mb-3">
                      <label class="form-label">Assign To</label>
                      <input
                        type="text"
                        class="form-control"
                        v-model="fetchAssignVacancy.assign_to"
                        aria-describedby="name"
                        readonly
                      />
                    </div>
                    <div class="mb-3">
                      <label class="form-label">Site</label>
                      <input
                        type="text"
                        class="form-control"
                        v-model="fetchAssignVacancy.site"
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
                        v-model="fetchAssignVacancy.job_title"
                        aria-describedby="time"
                        readonly
                      />
                    </div>
                    <div class="mb-3">
                      <label class="form-label">Date</label>
                      <input
                        type="text"
                        class="form-control"
                        v-model="fetchAssignVacancy.dates"
                        aria-describedby="date"
                        readonly
                      />
                    </div>
                  </div>
                  <div class="col-12">
                    <div class="mb-3">
                      <label class="form-label">Shift</label>
                      <input
                        type="text"
                        class="form-control"
                        v-model="fetchAssignVacancy.site_shift"
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
                            v-model="fetchAssignVacancy.start_time"
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
                            class="form-select"
                            v-model="fetchAssignVacancy.start_time"
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
                            v-model="fetchAssignVacancy.end_time"
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
                            class="form-select"
                            v-model="fetchAssignVacancy.end_time"
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
                            v-model="fetchAssignVacancy.break"
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
                            class="form-select"
                            v-model="fetchAssignVacancy.break"
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
                          <input
                            type="email"
                            class="form-control"
                            v-model="fetchAssignVacancy.total_shift_hours"
                          />
                        </div>
                      </div>
                    </div>
                    <div class="d-flex justify-content-between">
                      <div class="mb-3">
                        <div class="col-12">
                          <label class="form-label">Client Rate</label>
                        </div>
                        <div class="col-12 mt-1">
                          <input type="text" class="form-control" value="null" />
                        </div>
                      </div>
                      <div class="mb-3">
                        <div class="col-12">
                          <label class="form-label">Client Pay Amount</label>
                        </div>
                        <div class="col-12 mt-1">
                          <input type="text" class="form-control" value="null" />
                        </div>
                      </div>
                      <div class="mb-3">
                        <div class="col-12">
                          <label class="form-label">Staff Rate</label>
                        </div>
                        <div class="col-12 mt-1">
                          <input type="text" class="form-control" value="null" />
                        </div>
                      </div>
                      <div class="mb-3">
                        <div class="col-12">
                          <label class="form-label">Staff Rate Amount</label>
                        </div>
                        <div class="col-12 mt-1">
                          <input type="text" class="form-control" value="null" />
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
                        v-model="fetchAssignVacancy.notes"
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
              data-bs-target="#editAssignScheduleVacancy"
              data-bs-toggle="modal"
              data-bs-dismiss="modal"
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
  name: "editAssignScheduleVacancy",
  data() {
    return {
      fetchAssignVacancy: {
        id: "",
        assign_to: "",
        start_time: "",
        rates: "",
        site_shift: "",
        end_time: "",
        site: "",
        client_rate: "",
        dates: [],
        total_shift_hours: "",
        job_id: 1,
        job_title: "",
        notes: "",
      },
      options: [],
    };
  },
  props: {
    candidateId: {
      type: String,
      default: null,
    },
    vacancyId: {
      type: String,
      default: null,
    },
    columnDateMatch: {
      type: String,
      required: true,
    },
  },
  components: { SuccessAlert },
  computed: {
    // formattedStartTime() {
    //   return this.convertTimeFormat(this.fetchAssignVacancy.start_time);
    // },
    // formattedEndTime() {
    //   return this.convertTimeFormat(this.fetchAssignVacancy.end_time);
    // },
    getCandidatesData() {
      return this.$store.state.candidates;
    },
    selectJobTitle() {
      const job_title = this.options.find(
        (option) => option.id === this.fetchVacancy.job_id
      );
      return job_title ? job_title.name : "";
    },
  },
  methods: {
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
      } else if (hour > 12 && hour < 24) {
        return `${String(hour).padStart(2, "0")}:00 PM`;
      } else {
        return `${String(hour - 12).padStart(2, "0")}:00 PM`;
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
    async fetchVacancyListMethod(selectedWeekDate) {
      try {
        const requestData = {
          date: selectedWeekDate,
        };
        const response = await axios.get(
          `${VITE_API_URL}/vacancies_and_candidates_availability`,
          {
            params: requestData,
          }
        );
        this.vacancyList = response.data.data;
      } catch (error) {
        // console.error("Error in fetchVacancyListMethod:", error);
      }
    },
    async getJobTitleMethod() {
      try {
        const response = await axios.get(`${VITE_API_URL}/active_job_list`);
        this.options = response.data.data;
      } catch (error) {
        if (error.response) {
          if (error.response.status == 404) {
            // alert(error.response.data.message);
          }
        }
      }
    },
    // async fetchAssignVacancyMethod(id) {
    //   if (!id) return;
    //   try {
    //     const response = await axios.get(`${VITE_API_URL}/candidates/${id}`);
    //     this.fetchAssignVacancy = { ...this.fetchAssignVacancy, ...response.data.data };
    //     this.fetchAssignVacancy.start_time = this.convertTimeFormat(
    //       this.fetchAssignVacancy.start_time
    //     );
    //     this.fetchAssignVacancy.end_time = this.convertTimeFormat(
    //       this.fetchAssignVacancy.end_time
    //     );
    //   } catch (error) {}
    // },
    async fetchVacancyIdMethod(id) {
      if (!id) return;

      const payload = {
        vacancy_id: this.vacancyId,
        candidate_id: this.candidateId,
      };

      const response = await axios.get(`${VITE_API_URL}schedule_vacancy`, {
        params: payload,
      });
      const { assign_to, vacancy_data } = response.data;
      this.fetchAssignVacancy = {
        ...this.fetchAssignVacancy,
        ...vacancy_data,
      };
      this.fetchAssignVacancy.start_time = this.convertTimeFormat(
        vacancy_data.start_time
      );
      this.fetchAssignVacancy.end_time = this.convertTimeFormat(vacancy_data.end_time);
      this.fetchAssignVacancy.assign_to = assign_to;
    },
    async updateCandidateMethod() {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.put(
          `${VITE_API_URL}/vacancies/${this.fetchAssignVacancy.id}`,
          this.fetchAssignVacancy,
          {
            headers: {
              "content-type": "application/json",
              Authorization: "bearer " + token,
            },
          }
        );

        // this.$store.commit("updateCandidate", {
        //   id: this.fetchAssignVacancy.id,
        //   newData: response.data,
        // });
        this.$emit("updated-assign");
        // alert("Candidate updated successfully");
        const message = "Assigned Shift updated successfully";
        this.$refs.successAlert.showSuccess(message);
      } catch (error) {
        // console.error("Error updating candidate:", error);
      }
    },
  },
  mounted() {
    this.getJobTitleMethod();
    // this.fetchAssignVacancyMethod();
    this.fetchVacancyIdMethod();
    this.fetchVacancyListMethod(this.selectedWeekDate);
  },
  watch: {
    candidateId: {
      immediate: true,
      handler(newCandidateId) {
        this.fetchVacancyIdMethod(newCandidateId);
      },
    },
    vacancyId: {
      immediate: true,
      handler(newvacancyId) {
        this.fetchVacancyIdMethod(newvacancyId);
      },
    },
    columnDateMatch(newDate) {
      this.selectedWeekDate = newDate;

      this.fetchVacancyListMethod(this.selectedWeekDate);
      // this.fetchAssignList();
    },
  },
  created() {
    if (!this.columnDateMatch) {
      const currentDate = new Date();

      const firstDayOfWeek = new Date(
        currentDate.setDate(currentDate.getDate() - currentDate.getDay())
      );

      const formattedDate = firstDayOfWeek.toISOString().split("T")[0];
      this.selectedWeekDate = formattedDate;
    } else {
      this.selectedWeekDate = this.columnDateMatch;
    }
  },
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
