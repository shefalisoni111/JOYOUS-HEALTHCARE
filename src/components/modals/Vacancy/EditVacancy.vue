<template>
  <div>
    <!-- Modal -->
    <div class="modal fade" id="editVacancy" aria-labelledby="editVacancy" tabindex="-1">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="editVacancy">Edit Shift</h5>
          </div>
          <div class="modal-body mx-3">
            <div class="row g-3 align-items-center">
              <form>
                <div class="mb-3 d-flex justify-content-between">
                  <div class="col-3">
                    <label class="form-label" for="selectClients">Client</label>
                  </div>
                  <div class="col-9">
                    <select
                      v-model="fetchVacancy.client_id"
                      id="selectClients"
                      @change="onClientSelect"
                    >
                      <option
                        v-for="option in clientData"
                        :key="option.id"
                        :value="option.id"
                        aria-placeholder="Select Job"
                        style="display: none"
                      >
                        {{ option.first_name }}
                      </option>
                    </select>
                  </div>
                </div>
                <div class="mb-3 d-flex justify-content-between">
                  <div class="col-3">
                    <label class="form-label">Site </label>
                  </div>
                  <div class="col-9">
                    <select
                      v-model="fetchVacancy.site_id"
                      id="selectBusinessUnit"
                      @change="onSiteSelect"
                    >
                      <option
                        v-for="option in businessUnit"
                        :key="option.id"
                        :value="option.id"
                        placeholder="Select BusinessUnit"
                        style="display: none"
                      >
                        {{ option.site_name }}
                      </option>
                    </select>
                  </div>
                </div>

                <div class="mb-3 d-flex justify-content-between">
                  <div class="col-3">
                    <label class="form-label">Job Title </label>
                  </div>
                  <div class="col-9">
                    <select v-model="fetchVacancy.job_id" id="selectJobTitle">
                      <option
                        v-for="option in options"
                        :key="option.id"
                        :value="option.id"
                        aria-placeholder="Select Job"
                        style="display: none"
                      >
                        {{ option.name }}
                      </option>
                    </select>
                  </div>
                </div>

                <div class="mb-3">
                  <div class="d-flex flex-wrap">
                    <div class="col-3">
                      <label class="form-label">Date</label>
                    </div>
                    <div
                      v-for="(date, index) in fetchVacancy.dates"
                      :key="index"
                      class=""
                    >
                      <div class="col-11 position-relative">
                        <input
                          type="date"
                          class="form-control"
                          :value="formatDate(date)"
                          @input="updateDate($event.target.value, index)"
                        />
                        <span
                          v-if="!isValidDate && fetchVacancy.dates.length > 0"
                          class="text-danger"
                          >Please choose a date from today onwards!</span
                        >
                        <button
                          v-if="fetchVacancy.dates.length > 1 && !isValidDate"
                          style="
                            position: absolute;
                            bottom: 27px;
                            right: -7px;
                            border-radius: 50%;
                            padding: 0px 5px;
                            font-size: small;
                          "
                          class="btn btn-danger btn-sm mt-2"
                          @click.prevent="removeDate(index)"
                        >
                          x
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="mb-3 d-flex justify-content-between">
                  <div class="col-3">
                    <label class="form-label" for="selectShifts">Shift</label>
                  </div>
                  <div class="col-9">
                    <select
                      v-model="fetchVacancy.site_shift_id"
                      id="selectShifts"
                      @change="onShiftSelect"
                    >
                      <option
                        v-for="option in shiftsTime"
                        :key="option.id"
                        :value="option.id"
                        aria-placeholder="Select Job"
                      >
                        {{ option.shift_name }}
                      </option>
                    </select>
                  </div>
                </div>
                <div>
                  <div class="mb-3 d-flex justify-content-between">
                    <div class="col-3">
                      <label class="form-label" for="selectCustomStartTime"
                        >Start Time
                      </label>
                    </div>
                    <div class="col-9">
                      <select
                        id="selectCustomStartTime"
                        class="form-select w-25"
                        v-model="fetchVacancy.start_time"
                        @change="validateStartTime"
                      >
                        <option v-for="hour in 24" :key="hour" :value="formatTime(hour)">
                          {{ formatTime(hour) }}
                        </option>
                      </select>
                    </div>
                  </div>
                  <div class="mb-3 d-flex justify-content-between">
                    <div class="col-3">
                      <label class="form-label" for="selectCustomEndTime">End Time</label>
                    </div>
                    <div class="col-9">
                      <select
                        id="selectCustomEndTime"
                        class="form-select w-25"
                        v-model="fetchVacancy.end_time"
                        @change="validateEndTime"
                      >
                        <option v-for="hour in 24" :key="hour" :value="formatTime(hour)">
                          {{ formatTime(hour) }}
                        </option>
                      </select>
                    </div>
                  </div>
                  <div class="mb-3 d-flex justify-content-between">
                    <div class="col-3">
                      <label class="form-label" for="selectShiftsBreak">Break Time</label>
                    </div>
                    <div class="col-9">
                      <select
                        id="selectShiftsBreak"
                        class="form-select w-25"
                        v-model="fetchVacancy.break"
                        @change="validateBreak"
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
                  <div class="mb-3 d-flex justify-content-between">
                    <div class="col-3">
                      <label class="form-label">Staff Required</label>
                    </div>
                    <div class="col-9">
                      <input
                        type="number"
                        class="form-control w-25"
                        v-model="fetchVacancy.staff_required"
                        @input="validateStaffRequired"
                        @keydown.prevent
                      />
                    </div>
                  </div>
                </div>
                <div class="mb-3 d-flex justify-content-between">
                  <div class="col-3">
                    <label class="form-label">Notes</label>
                  </div>
                  <div class="col-9">
                    <input
                      type="text"
                      class="form-control"
                      v-model="fetchVacancy.notes"
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div class="modal-footer">
            <button
              class="btn btn-secondary rounded-1"
              data-bs-target="#editVacancy"
              data-bs-toggle="modal"
              data-bs-dismiss="modal"
            >
              Cancel
            </button>
            <button
              class="btn btn-primary rounded-1 text-capitalize fw-medium"
              data-bs-dismiss="modal"
              @click.prevent="updateVacancyMethod()"
              :disabled="!isValidDate"
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

import store from "@/store";
export default {
  name: "VacancyEdit",
  data() {
    return {
      fetchVacancy: {
        id: "",
        site_shift_id: "",
        business_units_id: "",
        site_id: "",
        client_id: "",
        staff_required: "",
        job_id: "",
        dates: [],
        site_shift: "",
        notes: "",
        start_time: "",
        end_time: "",
        break: "",
      },
      businessUnit: [],
      shiftsTime: [],
      clientData: [],
      options: [],
      isDateValid: true,
      selectedDate: "",
      invalidDate: false,
    };
  },
  props: {
    vacancyId: {
      type: Number,
      required: true,
    },
  },

  components: { SuccessAlert },
  computed: {
    selectBusinessUnit() {
      const businessUnit = this.businessUnit.find(
        (option) => option.id === this.fetchVacancy.site_id
      );
      return businessUnit ? businessUnit.site_name : "";
    },
    selectClients() {
      const client = this.clientData.find(
        (option) => option.id === this.fetchVacancy.client_id
      );
      return client ? client.first_name : "";
    },
    selectShifts() {
      const shift = this.shiftsTime.find(
        (option) => option.id === this.fetchVacancy.site_id
      );
      return shift ? shift.shift_name : "";
    },
    selectJobTitle() {
      const job_title = this.options.find(
        (option) => option.id === this.fetchVacancy.job_id
      );
      return job_title ? job_title.name : "";
    },
    getVacancyDetail() {
      return this.$store.state.vacancies;
    },
    isFormValid() {
      const today = new Date();
      return this.fetchVacancy.dates.every((date) => new Date(date) >= today);
    },
    isValidDate() {
      if (this.fetchVacancy.dates.length === 0) {
        return true;
      }
      const today = new Date().toISOString().slice(0, 10);
      return this.fetchVacancy.dates.every((date) => date >= today);
    },
  },
  methods: {
    validateDates() {
      const today = new Date();
      this.invalidDate = this.fetchVacancy.dates.some((date) => new Date(date) < today);
    },
    updateDate(newDate, index) {
      this.fetchVacancy.dates[index] = newDate;
      this.validateDates();
    },
    onShiftSelect() {
      const selectedShift = this.shiftsTime.find(
        (shift) => shift.id === this.fetchVacancy.site_shift_id
      );
      if (selectedShift) {
        this.fetchVacancy.start_time = selectedShift.start_time;
        this.fetchVacancy.end_time = selectedShift.end_time;
      }
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
    formatTimes(hour) {
      if (hour < 12) {
        return `${String(hour).padStart(2, "0")}:00 AM`;
      } else if (hour === 12) {
        return `${String(hour).padStart(2, "0")}:00 PM`;
      } else if (hour === 24) {
        return `00:00`;
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
    onSiteSelect() {
      this.getTimeShift();
    },
    // onClientSelect() {
    //   const selectedClientId = fetchVacancy.client_id;

    //   this.getJobTitleMethod(selectedClientId);
    //   this.getSiteAccordingClientMethod(selectedClientId);
    // },
    removeDate(index) {
      // this.fetchVacancy.dates.splice(index, 1);
      const updatedDates = this.fetchVacancy.dates.filter((_, i) => i !== index);

      this.fetchVacancy.dates = updatedDates;
    },
    formatDate(date) {
      const [day, month, year] = date.split("-");
      return `${year}-${month}-${day}`;
    },
    updateDate(value, index) {
      const [year, month, day] = value.split("-");
      this.fetchVacancy.dates[index] = `${day}-${month}-${year}`;
    },
    validateStaffRequired() {
      if (this.fetchVacancy.staff_required <= 0) {
        this.fetchVacancy.staff_required = null;
      }
    },

    async fetchVacancyMethod(id) {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get(`${VITE_API_URL}/vacancies/${id}`, {
          headers: {
            "content-type": "application/json",
            Authorization: "bearer " + token,
          },
        });

        if (response.data.id !== undefined) {
          this.fetchVacancy.id = response.data.id;
        }

        this.fetchVacancy.site_id = response.data.site_id;
        this.fetchVacancy.client_id = response.data.client_id;
        this.fetchVacancy.job_id = response.data.job_id;
        this.fetchVacancy.staff_required = response.data.staff_required;
        this.fetchVacancy.dates = response.data.dates.map((date) => {
          const dateParts = date.split(",")[1].trim().split("-");
          const day = dateParts[0].trim();
          const month = dateParts[1].trim();
          const year = dateParts[2].trim();
          return `${day}-${month}-${year}`;
        });
        // this.fetchVacancy.dates = response.data.dates;
        this.fetchVacancy.notes = response.data.notes;
        this.fetchVacancy.site_shift_id = response.data.site_shift_id;
        this.fetchVacancy.start_time = this.convertTimeFormat(response.data.start_time);
        this.fetchVacancy.end_time = this.convertTimeFormat(response.data.end_time);
        this.fetchVacancy.break = response.data.break;
      } catch (error) {}
    },

    async updateVacancyMethod() {
      const token = localStorage.getItem("token");

      try {
        const datesArray = Array.isArray(this.fetchVacancy.dates)
          ? this.fetchVacancy.dates
          : [this.fetchVacancy.dates];
        const today = new Date();
        const invalidDate = datesArray.find((date) => {
          const selectedDate = new Date(date);

          return (
            selectedDate < today || selectedDate.toDateString() === today.toDateString()
          );
        });

        if (invalidDate && invalidDate < today) {
          alert("Please choose a date from today onwards.");
          return;
        } else if (invalidDate && invalidDate >= today) {
          // alert("Edit successful!");
          const message = "Shift Updated successfully";
          this.$refs.successAlert.showSuccess(message);
        }
        this.fetchVacancy.dates = this.fetchVacancy.dates.filter(
          (date) => date !== undefined
        );
        const response = await axios.put(
          `${VITE_API_URL}/vacancies/${this.fetchVacancy.id}`,
          {
            site_id: this.fetchVacancy.site_id,
            client_id: this.fetchVacancy.client_id,
            job_id: this.fetchVacancy.job_id,
            dates: this.fetchVacancy.dates,
            notes: this.fetchVacancy.notes,
            site_shift_id: this.fetchVacancy.site_shift_id,
            staff_required: this.fetchVacancy.staff_required,
            start_time: this.fetchVacancy.start_time,
            end_time: this.fetchVacancy.end_time,
            break: this.fetchVacancy.break,
          },
          {
            headers: {
              "content-type": "application/json",
              Authorization: "bearer " + token,
            },
          }
        );

        store.commit("updateVacancy", {
          id: this.fetchVacancy.id,
          newData: response.data,
        });
        this.$emit("updateVacancy");
        this.$emit("updateVacancyInactive");
        // alert("Vacancy updated successfully");
        const message = "Shift Updated successfully";
        this.$refs.successAlert.showSuccess(message);
      } catch (error) {
        // console.error("Error updating vacancy:", error);
      }
    },

    async getBusinessUnitMethod() {
      try {
        const response = await axios.get(`${VITE_API_URL}/activated_site`);
        this.businessUnit = response.data.data;
      } catch (error) {
        if (error.response) {
          if (error.response.status == 404) {
            // alert(error.response.data.message);
          }
        }
      }
    },
    async getSiteAccordingClientMethod() {
      try {
        const response = await axios.get(
          `${VITE_API_URL}/site_according_client/${this.client_id}`
        );
        this.businessUnit = response.data.site;
      } catch (error) {
        if (error.response) {
          if (error.response.status == 404) {
            // alert(error.response.data.message);
          }
        }
      }
    },
    async getClientMethod() {
      try {
        const response = await axios.get(`${VITE_API_URL}/clients`);
        this.clientData = response.data.data;
      } catch (error) {
        if (error.response) {
          if (error.response.status == 404) {
            // alert(error.response.data.message);
          }
        }
      }
    },
    // async getTimeShifts() {
    //   await axios
    //     .get(`${VITE_API_URL}/shifts`)
    //     .then((response) => (this.shiftsTime = response.data));
    // },
    async getTimeShift(siteId) {
      if (!siteId) {
        return;
      }
      try {
        const response = await axios.get(`${VITE_API_URL}/site_shift/${siteId}`);

        this.shiftsTime =
          response.data.site_shift_data.map((shift) => ({
            ...shift,
            start_time: this.convertTimeFormat(shift.start_time),
            end_time: this.convertTimeFormat(shift.end_time),
          })) || [];
      } catch (error) {
        // console.error("Error fetching shifts:", error);
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
  },

  async mounted() {
    await this.getBusinessUnitMethod();
    // this.getSiteAccordingClientMethod();
    await this.getClientMethod();
    await this.getTimeShift();
    await this.getJobTitleMethod();
  },
  watch: {
    "fetchVacancy.site_id": {
      immediate: true,
      handler(newSiteId) {
        this.getTimeShift(newSiteId);
      },
      fetchVacancy: {
        deep: true,
        handler() {
          this.validateDates();
        },
      },
    },
    vacancyId: {
      immediate: true,
      handler(newVacancyID) {
        if (newVacancyID !== 0) {
          this.fetchVacancyMethod(newVacancyID);
        } else {
        }
      },
    },
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
.modal {
  --bs-modal-width: 841px;
}
.modal-body {
  border-radius: 5px;
  background: #dbdbdb;
}
</style>
