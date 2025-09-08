<template>
  <div>
    <!-- Modal -->
    <div
      class="modal fade"
      id="editHolidayCalender"
      aria-labelledby="editHolidayCalender"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="editHolidayCalender">Edit Holidays</h5>
            <button
              type="button"
              class="custom-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              @click="blurActiveElement"
            ></button>
          </div>
          <div class="modal-body mx-3">
            <div class="row g-3 align-items-center">
              <form>
                <div class="mb-3 d-flex justify-content-between">
                  <div class="col-3">
                    <label class="form-label">Title</label>
                  </div>
                  <div class="col-9 mt-1">
                    <input
                      type="text"
                      class="form-control"
                      v-model="fetchHolidayCalender.title"
                      @input="clearError('title')"
                    />
                    <div v-if="getError('title')" class="text-danger">
                      {{ getError("title") }}
                    </div>
                  </div>
                </div>

                <div class="mb-3 d-flex justify-content-between">
                  <div class="col-3">
                    <label class="form-label"> Date</label>
                  </div>
                  <div class="col-9 mt-1">
                    <input
                      type="date"
                      class="form-control"
                      v-model="fetchHolidayCalender.holiday_date"
                      rows="3"
                      @input="clearError('holiday_date')"
                      :min="today"
                    />
                    <div v-if="getError('holiday_date')" class="text-danger">
                      {{ getError("holiday_date") }}
                    </div>
                  </div>
                </div>

                <div class="mb-3 d-flex justify-content-between">
                  <div class="col-3">
                    <label class="form-label"> Percentage</label>
                  </div>
                  <div class="col-9 mt-1">
                    <select
                      class="form-control"
                      v-model="fetchHolidayCalender.percentage"
                      @change="clearError('percentage')"
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
                    <div v-if="getError('percentage')" class="text-danger">
                      {{ getError("percentage") }}
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div class="modal-footer">
            <button
              class="btn btn-dark btn-cancel"
              data-bs-target="#editHolidayCalender"
              data-bs-toggle="modal"
              data-bs-dismiss="modal"
            >
              Cancel
            </button>
            <button
              class="btn btn-primary rounded-4 text-capitalize fw-medium"
              data-bs-dismiss="modal"
              :disabled="isButtonDisabled"
              v-on:click="editHolidayCalender()"
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
  name: "AddHolidayCalender",
  data() {
    return {
      fetchHolidayCalender: {
        id: "",
        title: "",
        holiday_date: "",
        percentage: "",
      },
      errors: {},
    };
  },
  props: {
    holidayCalenderID: {
      type: Number,
      required: true,
    },
  },
  watch: {
    holidayCalenderID: {
      immediate: true,
      handler(newVacancyID) {
        if (newVacancyID !== 0) {
          this.fetchHolidayDetails(newVacancyID);
        } else {
        }
      },
    },
  },
  components: { SuccessAlert },
  computed: {
    isButtonDisabled() {
      return (
        Object.values(this.errors).some((error) => error !== null) ||
        this.isEmptyField()
      );
    },
    today() {
      const date = new Date();
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    },
  },
  methods: {
    toggleActionMenu(index) {
      this.selectedRow = this.selectedRow === index ? null : index;
    },
    clearFields() {
      this.fetchHolidayCalender = {
        id: "",
        title: "",
        holiday_date: "",
        percentage: "",
      };
    },
    clearError(fieldName) {
      this.$set(this.errors, fieldName, null);
    },
    getError(fieldName) {
      return this.errors[fieldName];
    },
    isEmptyField() {
      return (
        !this.fetchHolidayCalender.title.trim() ||
        !this.fetchHolidayCalender.holiday_date.trim() ||
        !this.fetchHolidayCalender.percentage.trim()
      );
    },

    async editHolidayCalender() {
      const data = {
        title: this.fetchHolidayCalender.title,
        holiday_date: this.fetchHolidayCalender.holiday_date,
        percentage: String(this.fetchHolidayCalender.percentage),
      };
      try {
        const response = await axios.put(
          `${VITE_API_URL}/holiday_calenders/${this.fetchHolidayCalender.id}`,
          data
        );
        if (response.status === 200) {
          this.$emit("updateHoliday");
          const message = "Holiday Update Successful";
          this.$refs.successAlert.showSuccess(message);
          // this.clearFields();
        }
      } catch (error) {
        // console.error("Error updating holiday:", error);
      }
    },
    async fetchHolidayDetails(id) {
      try {
        const response = await axios.get(
          `${VITE_API_URL}/holiday_calenders/${id}`
        );
        this.fetchHolidayCalender = {
          id: response.data.data.id,
          title: response.data.data.title,
          holiday_date: response.data.data.holiday_date,
          percentage: response.data.data.percentage,
        };
      } catch (error) {
        // console.error("Error fetching holiday details:", error);
      }
    },
  },
  mounted() {},
};
</script>

<style scoped>
.bi-square-fill::before {
  color: #673ab7;
  font-size: 40px;
}

.modal-body {
  border-radius: 5px;
}

.modal-footer {
  border-top: 0px;
}
</style>
