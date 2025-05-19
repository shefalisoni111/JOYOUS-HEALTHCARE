<template>
  <div>
    <!-- Modal -->
    <div class="modal fade" id="editVacancy" aria-labelledby="editVacancy">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="editVacancy">Edit Shift</h5>
            <button
              type="button"
              class="custom-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body mx-3">
            <div class="row g-3 align-items-center">
              <form>
                <div class="row">
                  <div class="col-6">
                    <div class="mb-3">
                      <div class="col-12">
                        <label class="form-label" for="selectClients"
                          >Client</label
                        >
                      </div>
                      <div class="col-12">
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
                            {{ option.client_name }}
                          </option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div class="col-6">
                    <div class="mb-3">
                      <div class="col-12">
                        <label class="form-label">Site </label>
                      </div>
                      <div class="col-12">
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
                  </div>
                </div>

                <div class="row">
                  <div class="col-6">
                    <div class="mb-3">
                      <div class="col-12">
                        <label class="form-label">Job Title </label>
                      </div>
                      <div class="col-12">
                        <select
                          v-model="fetchVacancy.job_id"
                          id="selectJobTitle"
                        >
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
                  </div>
                  <div class="col-6">
                    <div class="mb-3">
                      <div class="col-12">
                        <label class="form-label">Date</label>
                      </div>

                      <div
                        v-for="(date, index) in fetchVacancy.dates"
                        :key="index"
                      >
                        <div class="col-12 position-relative">
                          <input
                            type="date"
                            class="form-select w-100"
                            v-model="fetchVacancy.dates[index]"
                          />
                          <span v-if="!isDateValid(date)" class="text-danger">
                            Please choose a date from today onwards!
                          </span>
                          <button
                            v-if="fetchVacancy.dates.length > 1"
                            style="
                              position: absolute;
                              bottom: 96px;
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
                </div>
                <div class="row">
                  <div class="col-6">
                    <div class="mb-3">
                      <div class="col-12">
                        <label class="form-label" for="selectShifts"
                          >Shift</label
                        >
                      </div>
                      <div class="col-12">
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
                            {{ option.shift_name.replace(/_/g, " ") }}
                          </option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="row">
                  <div class="col-4">
                    <div class="mb-3">
                      <div class="col-12">
                        <label class="form-label" for="selectCustomStartTime"
                          >Start Time
                        </label>
                      </div>
                      <div class="col-12">
                        <select
                          id="selectCustomStartTime"
                          class="form-select w-100"
                          v-model="fetchVacancy.start_time"
                          @change="validateStartTime"
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
                  </div>
                  <div class="col-4">
                    <div class="mb-3">
                      <div class="col-12">
                        <label class="form-label" for="selectCustomEndTime"
                          >End Time</label
                        >
                      </div>
                      <div class="col-12">
                        <select
                          id="selectCustomEndTime"
                          class="form-select w-100"
                          v-model="fetchVacancy.end_time"
                          @change="validateEndTime"
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
                  </div>

                  <div class="col-4">
                    <div class="mb-3">
                      <div class="col-12">
                        <label class="form-label" for="selectShiftsBreak"
                          >Break Time</label
                        >
                      </div>
                      <div class="col-12">
                        <select
                          id="selectShiftsBreak"
                          class="form-select w-100"
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
                  </div>
                </div>
                <div class="mb-3">
                  <div class="col-12">
                    <label class="form-label" for="clientRate"
                      >Client Rate</label
                    >
                  </div>
                  <div class="col-12">
                    <div class="input-container">
                      <span class="currency-symbol">£</span>
                      <input
                        type="text"
                        class="form-control w-50"
                        v-model="fetchVacancy.client_rate"
                        @input="handleInput('client_rate', $event.target.value)"
                        maxlength="3"
                        @keydown="allowNumbersOnly($event)"
                      />
                    </div>
                    <span
                      v-if="!validationClientRate && fetchVacancy.client_rate"
                      class="text-danger"
                    >
                      Client Rate must be greater than 0
                    </span>
                  </div>
                </div>
                <div class="mb-3 d-flex justify-content-between">
                  <div class="col-2">
                    <label class="form-label" for="clientRate"
                      >Staff Rate</label
                    >
                  </div>
                  <div class="col-10 d-flex gap-2">
                    <div>
                      <label class="form-label" for="staffRate"
                        >Self Employee</label
                      >
                      <div class="input-container">
                        <span class="currency-symbol">£</span>
                        <input
                          type="text"
                          class="form-control w-100"
                          v-model="fetchVacancy.staff_rate"
                          @input="
                            handleInput('staff_rate', $event.target.value)
                          "
                          @keydown="allowNumbersOnly($event)"
                        />
                      </div>
                      <span
                        v-if="!validationStaffRate && fetchVacancy.staff_rate"
                        class="text-danger"
                      >
                        Staff Rate must be greater than 0
                      </span>
                    </div>

                    <div>
                      <label class="form-label" for="umbrella">Umbrella</label>
                      <div class="input-container">
                        <span class="currency-symbol">£</span>
                        <input
                          type="text"
                          class="form-control w-100"
                          v-model="fetchVacancy.umbrella"
                          @input="handleInput('umbrella', $event.target.value)"
                          maxlength="3"
                          @keydown="allowNumbersOnly($event)"
                        />
                      </div>
                      <span
                        v-if="!validationUmbrella && fetchVacancy.umbrella"
                        class="text-danger"
                      >
                        Umbrella must be greater than 0
                      </span>
                    </div>

                    <div>
                      <label class="form-label" for="paye">Paye</label>
                      <div class="input-container">
                        <span class="currency-symbol">£</span>
                        <input
                          type="text"
                          class="form-control w-100"
                          v-model="fetchVacancy.paye"
                          @input="handleInput('paye', $event.target.value)"
                          maxlength="3"
                          @keydown="allowNumbersOnly($event)"
                        />
                      </div>
                      <span
                        v-if="!validationPaye && fetchVacancy.paye"
                        class="text-danger"
                      >
                        Paye must be greater than 0
                      </span>
                    </div>

                    <div>
                      <label class="form-label" for="privateLimited"
                        >Private Limited</label
                      >
                      <div class="input-container">
                        <span class="currency-symbol">£</span>
                        <input
                          type="text"
                          class="form-control w-100"
                          v-model="fetchVacancy.private_limited"
                          @input="
                            handleInput('private_limited', $event.target.value)
                          "
                          maxlength="3"
                          @keydown="allowNumbersOnly($event)"
                        />
                      </div>
                      <span
                        v-if="
                          !validationPrivateLimited &&
                          fetchVacancy.private_limited
                        "
                        class="text-danger"
                      >
                        Private Limited must be greater than 0
                      </span>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-6">
                    <div class="mb-3">
                      <div class="col-12">
                        <label class="form-label"> Bank Holiday Rate</label>
                      </div>
                      <div class="col-12 mt-1">
                        <select
                          class="form-control"
                          v-model="fetchVacancy.percentage"
                        >
                          <option value="" disabled>Select Percentage</option>
                          <option
                            v-for="value in [0, 25, 50, 75, 100]"
                            :key="value"
                            :value="value"
                          >
                            {{ value }}%
                          </option>
                        </select>
                        <!-- <div v-if="getError('percentage')" class="text-danger">
                          {{ getError("percentage") }}
                        </div> -->
                      </div>
                    </div>
                  </div>
                  <div class="col-6">
                    <div class="mb-3">
                      <div class="col-12">
                        <label class="form-label">Staff Required</label>
                      </div>
                      <div class="col-12">
                        <input
                          type="text"
                          class="form-select w-100"
                          v-model="fetchVacancy.staff_required"
                          @input="validateStaffRequired"
                          maxlength="2"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div class="mb-3">
                  <div class="col-12">
                    <label class="form-label">Notes</label>
                  </div>
                  <div class="col-12">
                    <input
                      type="text"
                      class="form-select"
                      v-model="fetchVacancy.notes"
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div class="modal-footer">
            <button
              class="btn btn-dark btn-cancel"
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
              :disabled="!isFormValid"
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
import Swal from "sweetalert2";
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
        staff_required: null,
        client_rate: null,
        percentage: "",
        staff_rate: null,
        umbrella: null,
        paye: null,

        private_limited: null,
        job_id: "",
        dates: [],
        site_shift: "",
        notes: "",
        start_time: "",
        end_time: "",
        break: "",
      },
      // validationClientRate: true,
      // validationStaffRate: true,
      // validationUmbrella: true,
      // validationPaye: true,
      validationPrivateLimited: true,
      validationClientRate: true,
      validationStaffRate: true,
      validationUmbrella: true,
      validationPaye: true,
      validationPrivateLimited: true,
      businessUnit: [],
      shiftsTime: [],
      clientData: [],
      options: [],
      // isDateValid: true,
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
      return client ? client.client_name : "";
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
      return this.fetchVacancy.dates.every((date) => new Date(date) > today);
    },
    isValidDate() {
      if (this.fetchVacancy.dates.length === 0) {
        return true;
      }
      const today = new Date().toISOString().slice(0, 10);
      return this.fetchVacancy.dates.every((date) => {
        const [day, month, year] = date.split("-");
        const formattedDate = `${year}-${month}-${day}`;
        return formattedDate >= today;
      });
    },
    //isFormValid() {
    //   const today = new Date();
    //   return this.fetchVacancy.dates.every(
    //     (date) => new Date(this.formatDate(date)) > today
    //   );
    // },
  },
  methods: {
    validateStaffRequired() {
      this.fetchVacancy.staff_required =
        this.fetchVacancy.staff_required.replace(/[^0-9]/g, "");

      this.fetchVacancy.staff_required = Number(
        this.fetchVacancy.staff_required
      );

      this.fetchVacancy.staff_required =
        this.fetchVacancy.staff_required.replace(/[^0-9]/g, "");
      if (this.fetchVacancy.staff_required <= 0) {
        this.fetchVacancy.staff_required = null;
      } else {
      }
    },
    allowNumbersOnly(event) {
      const allowedKeys = [
        "Backspace",
        "ArrowLeft",
        "ArrowRight",
        "Tab",
        "Delete",
      ];
      const isNumberKey = /^[0-9]$/.test(event.key);

      if (!isNumberKey && !allowedKeys.includes(event.key)) {
        event.preventDefault();
      }
    },
    handleInput(type, value) {
      const filteredValue = value.replace(/[^0-9]/g, "");
      this.$set(this.fetchVacancy, type, filteredValue);

      this.validateRate(type, filteredValue);
    },
    validateRate(type, value) {
      const isPositiveNumber = parseInt(value, 10) > 0;
      switch (type) {
        case "client_rate":
          this.validationClientRate = isPositiveNumber;
          break;
        case "staff_rate":
          this.validationStaffRate = isPositiveNumber;
          break;
        case "umbrella":
          this.validationUmbrella = isPositiveNumber;
          break;
        case "paye":
          this.validationPaye = isPositiveNumber;
          break;
        case "private_limited":
          this.validationPrivateLimited = isPositiveNumber;
          break;
        default:
          break;
      }
    },
    // validateDates() {
    //   const today = new Date().toISOString().slice(0, 10);
    //   this.invalidDate = this.fetchVacancy.dates.some((date) => {
    //     const [day, month, year] = date.split("-");
    //     const formattedDate = `${year}-${month}-${day}`;
    //     return formattedDate < today;
    //   });
    // },
    // updateDate(value, index) {
    //   const [year, month, day] = value.split("-");
    //   this.fetchVacancy.dates[index] = `${day}-${month}-${year}`;
    //   this.validateDates();
    // },
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
      // if (hour === 0) {
      //   return "12:00 AM";
      // } else if (hour < 12) {
      //   return `${String(hour).padStart(2, "0")}:00 AM`;
      // } else if (hour === 12) {
      //   return "12:00 AM";
      // } else {
      //   return `${String(hour - 12).padStart(2, "0")}:00 PM`;
      // }
      let period = hour >= 12 ? "PM" : "AM";
      let formattedHour = hour % 12 || 12;

      return `${formattedHour}:00 ${period}`;
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

    isDateValid(date) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const [day, month, year] = date.split("-");
      const formattedDate = new Date(`${year}-${month}-${day}`);

      return formattedDate >= today;
    },
    removeDate(index) {
      const updatedDates = this.fetchVacancy.dates.filter(
        (_, i) => i !== index
      );

      this.fetchVacancy.dates = updatedDates;
    },

    formatDate(date) {
      const [day, month, year] = date.split("-");
      return `${year}-${month}-${day}`;
    },
    // updateDate(value, index) {
    //   const [year, month, day] = value.split("-");
    //   this.fetchVacancy.dates[index] = `${day}-${month}-${year}`;
    // },
    // validateStaffRequired() {
    //   if (this.fetchVacancy.staff_required <= 0) {
    //     this.fetchVacancy.staff_required = null;
    //   }
    // },

    async fetchVacancyMethod(id) {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get(`${VITE_API_URL}/vacancies/${id}`, {
          headers: {
            "content-type": "application/json",
            Authorization: "bearer " + token,
          },
        });
        const data = response.data;

        if (data.id !== undefined) {
          this.fetchVacancy.id = data.id;
        }

        this.fetchVacancy.site_id = data.site_id || "";
        this.fetchVacancy.client_id = data.client_id || "";
        this.fetchVacancy.job_id = data.job_id || "";
        this.fetchVacancy.staff_required = data.staff_required || 0;
        this.fetchVacancy.notes = data.notes || "";
        this.fetchVacancy.site_shift_id = data.site_shift_id || "";
        this.fetchVacancy.break = data.break || "0";

        if (Array.isArray(data.dates)) {
          this.fetchVacancy.dates = data.dates.map((date) =>
            this.formatDateForInput(date)
          );
        } else {
          this.fetchVacancy.dates = [];
        }

        this.fetchVacancy.staff_rate =
          data.staff_rate !== null
            ? String(data.staff_rate).replace(/£/g, "")
            : "";
        this.fetchVacancy.client_rate =
          data.client_rate !== null ? String(data.client_rate) : "";
        this.fetchVacancy.paye = data.paye !== null ? String(data.paye) : "";
        this.fetchVacancy.umbrella =
          data.umbrella !== null ? String(data.umbrella) : "";
        this.fetchVacancy.private_limited =
          data.private_limited !== null ? String(data.private_limited) : "";

        // this.fetchVacancy.start_time = data.start_time
        //   ? this.formatTime(new Date(data.start_time).getHours())
        //   : "";
        // this.fetchVacancy.end_time = data.end_time
        //   ? this.formatTime(new Date(data.end_time).getHours())
        //   : "";
        this.fetchVacancy.percentage = response.data.percentage;
        // if (response.data.id !== undefined) {
        //   this.fetchVacancy.id = response.data.id;
        // }

        // this.fetchVacancy.site_id = response.data.site_id;
        // this.fetchVacancy.client_id = response.data.client_id;
        // this.fetchVacancy.job_id = response.data.job_id;
        // this.fetchVacancy.staff_required = response.data.staff_required;

        // // this.fetchVacancy.dates = response.data.dates.map((date) => {
        // //   const dateParts = date.split(",")[1].trim().split("-");
        // //   const day = dateParts[0].trim();
        // //   const month = dateParts[1].trim();
        // //   const year = dateParts[2].trim();
        // //   return `${day}-${month}-${year}`;
        // // });
        // if (Array.isArray(response.data.dates)) {
        //   this.fetchVacancy.dates = response.data.dates.map((date) =>
        //     this.formatDateForInput(date)
        //   );
        // } else {
        //   this.fetchVacancy.dates = [];
        // }
        // // this.fetchVacancy.dates = response.data.dates;

        // this.fetchVacancy.notes = response.data.notes;
        // this.fetchVacancy.site_shift_id = response.data.site_shift_id;
        this.fetchVacancy.start_time = this.convertTimeFormat(
          response.data.start_time
        );
        this.fetchVacancy.end_time = this.convertTimeFormat(
          response.data.end_time
        );
        // this.fetchVacancy.break = response.data.break;
        // if (response.data.staff_rate) {
        //   this.fetchVacancy.staff_rate = response.data.staff_rate.replace(/£/g, "");
        // }
        // this.fetchVacancy.client_rate = response.data.client_rate;
        // this.fetchVacancy.paye = response.data.paye;
        // this.fetchVacancy.umbrella = response.data.umbrella;
        // this.fetchVacancy.private_limited = response.data.private_limited;
      } catch (error) {}
    },
    formatDateForInput(date) {
      if (!date) return "";
      return new Date(date).toISOString().split("T")[0];
    },

    updateDate(value, index) {
      this.fetchVacancy.dates[index] = value;
    },

    isDateValid(date) {
      const today = new Date().toISOString().split("T")[0];
      return date >= today;
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
            selectedDate < today ||
            selectedDate.toDateString() === today.toDateString()
          );
        });

        if (invalidDate && invalidDate < today) {
          // alert("Please choose a date from today onwards.");
          Swal.fire({
            icon: "warning",
            title: "Selection Required",
            text: "Please choose a date from today onwards.",
            confirmButtonText: "OK",
          });
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
            staff_rate: this.fetchVacancy.staff_rate,
            client_rate: this.fetchVacancy.client_rate,
            paye: this.fetchVacancy.paye,
            umbrella: this.fetchVacancy.umbrella,
            private_limited: this.fetchVacancy.private_limited,
            percentage: String(this.fetchVacancy.percentage),
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
        const response = await axios.get(`${VITE_API_URL}/get_client_id_name`);
        this.clientData = response.data.data;
      } catch (error) {
        if (error.response && error.response.status === 404) {
          // Handle 404 error
          // console.error('Error fetching client data:', error.response.data.message);
        } else {
          // console.error('Error fetching client data:', error);
        }
      }
    },

    async getTimeShift(siteId) {
      if (!siteId) {
        return;
      }
      try {
        const response = await axios.get(
          `${VITE_API_URL}/site_shift/${siteId}`
        );

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

      if (isNaN(date.getTime())) {
        return "Invalid date";
      }

      const hours = date.getUTCHours();
      const minutes = date.getUTCMinutes();

      const amPm = hours >= 12 ? "PM" : "AM";

      const formattedHours = hours % 12 || 12;
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
  async beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.getBusinessUnitMethod();
      vm.getClientMethod();
      vm.getTimeShift();
      vm.getJobTitleMethod();
      vm.fetchVacancyMethod(this.vacancyId);
    });
  },
  async beforeRouteUpdate(to, from, next) {
    this.getBusinessUnitMethod();
    this.getClientMethod();
    this.getTimeShift();
    this.getJobTitleMethod();
    this.fetchVacancyMethod(this.vacancyId);
    next();
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
.input-container {
  position: relative;
  display: flex;
  align-items: center;
}

.currency-symbol {
  position: absolute;
  left: 10px;
  font-size: 16px;
  color: #333;
}

input.form-control {
  padding-left: 25px;
}
.modal {
  --bs-modal-width: 841px;
}
.modal-body {
  border-radius: 5px;
}
</style>
