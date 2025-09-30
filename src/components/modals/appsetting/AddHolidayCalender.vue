<template>
  <div>
    <!-- Modal -->
    <div
      class="modal fade"
      id="addHolidayCalender"
      aria-labelledby="addHolidayCalender"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="addHolidayCalender">Add Holidays</h5>
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
                <div class="mb-3">
                  <div class="col-12">
                    <label class="form-label">Title</label>
                  </div>
                  <div class="col-12 mt-1">
                    <input
                      type="text"
                      class="form-control"
                      v-model="title"
                      @input="clearError('title')"
                    />
                    <div v-if="getError('title')" class="text-danger">
                      {{ getError("title") }}
                    </div>
                  </div>
                </div>

                <div class="mb-3">
                  <div class="col-12">
                    <label class="form-label"> Date</label>
                  </div>
                  <div class="col-12 mt-1">
                    <input
                      type="date"
                      class="form-control"
                      v-model="holiday_date"
                      rows="3"
                      @input="clearError('holiday_date')"
                      :min="today"
                    />
                    <div v-if="getError('holiday_date')" class="text-danger">
                      {{ getError("holiday_date") }}
                    </div>
                  </div>
                </div>

                <div class="mb-3">
                  <div class="col-12">
                    <label class="form-label"> Percentage</label>
                  </div>
                  <div class="col-12 mt-1">
                    <select
                      class="form-control"
                      v-model="percentage"
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
              data-bs-target="#addHolidayCalender"
              data-bs-toggle="modal"
              data-bs-dismiss="modal"
              v-on:click="clearFieldsData"
            >
              Cancel
            </button>
            <button
              class="btn btn-primary rounded-4 text-capitalize fw-medium"
              data-bs-dismiss="modal"
              :disabled="isButtonDisabled"
              v-on:click="addHolidayCalender()"
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
      title: "",

      holiday_date: "",
      percentage: "",
      errors: {},
    };
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
    clearFieldsData() {
      this.clearFields();
      setTimeout(() => {
        this.clearError();
      }, 10);
    },
    clearFields() {
      this.title = "";
      this.holiday_date = "";
      this.percentage = "";
    },
    clearError(fieldName) {
      this.errors[fieldName] = null;
    },
    getError(fieldName) {
      return this.errors[fieldName];
    },
    isEmptyField() {
      return (
        !this.title.trim() || !this.holiday_date.trim() || !this.percentage
      );
    },
    validateAndAddJob() {
      this.errors = {};

      if (!this.title.trim()) {
        this.$set(this.errors, "title", "Title is required.");
      }

      if (!this.holiday_date.trim()) {
        this.$set(this.errors, "holiday_date", "Holiday Date is required.");
      }

      if (
        Object.values(this.errors).every((error) => error === null) &&
        !this.isEmptyField()
      ) {
        this.addHolidayCalender();
      }
    },
    async addHolidayCalender() {
      const data = {
        title: this.title,
        holiday_date: this.holiday_date,
        percentage: String(this.percentage),
      };
      try {
        const response = await axios.post(
          `${VITE_API_URL}/holiday_calenders`,
          data
        );
        if (response.data) {
          this.$emit("updateListHoliday");
          const message = "Holiday Add Successful";
          this.$refs.successAlert.showSuccess(message);
          this.title = "";
          this.holiday_date = "";
          this.percentage = "";
        }
      } catch (error) {
        // console.error("Error adding employee:", error);
      }
    },
  },
  mounted() {},
};
</script>

<style scoped>
.content-area {
  margin-left: 250px;
  transition: margin-left 0.3s ease;
}
@media (max-width: 1120px) {
  .content-area {
    margin-left: 0;
  }
}
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
