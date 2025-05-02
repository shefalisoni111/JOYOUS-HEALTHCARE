<template>
  <div>
    <!-- Modal -->
    <div
      class="modal fade"
      id="siteCustomHoliday"
      aria-labelledby="siteCustomHoliday"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="siteCustomHoliday">Add Holidays</h5>
          </div>
          <div class="modal-body mx-3">
            <div class="row g-3 align-items-center">
              <form>
                <div class="mb-3 d-flex justify-content-between">
                  <div class="col-2">
                    <label class="form-label">Title</label>
                  </div>
                  <div class="col-10 mt-1">
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

                <div class="mb-3 d-flex justify-content-between">
                  <div class="col-2">
                    <label class="form-label"> Date</label>
                  </div>
                  <div class="col-10 mt-1">
                    <!-- <input
                      type="date"
                      class="form-control"
                      v-model="date"
                      rows="3"
                      @input="clearError('date')"
                    /> -->
                    <input
                      type="date"
                      class="form-control"
                      v-model="selectedDate"
                      @change="addDate"
                      style="padding-right: 1px"
                    />
                    <span v-if="!validationDateType" class="text-danger"
                      >Please choose a date from today onwards!</span
                    >
                    <div v-if="getError('date')" class="text-danger">
                      {{ getError("date") }}
                    </div>
                  </div>
                </div>
                <div class="mb-3 d-flex justify-content-between">
                  <div class="col-2">
                    <label class="form-label">Holiday Type</label>
                  </div>
                  <div class="col-10 mt-1">
                    <textarea
                      type="text"
                      class="form-control"
                      rows="3"
                      v-model="holiday_type"
                      @input="clearError('holiday_type')"
                    ></textarea>
                    <div v-if="getError('holiday_type')" class="text-danger">
                      {{ getError("holiday_type") }}
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div class="modal-footer">
            <button
              class="btn btn-dark btn-cancel"
              data-bs-target="#siteCustomHoliday"
              data-bs-toggle="modal"
              data-bs-dismiss="modal"
              v-on:click="clearFieldsData"
            >
              Cancel
            </button>
            <button
              class="btn btn-primary rounded-1 text-capitalize fw-medium"
              data-bs-dismiss="modal"
              :disabled="isButtonDisabled"
              v-on:click="siteCustomHoliday()"
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
  name: "AddAddSiteCustomHoliday",
  data() {
    return {
      title: "",
      site_id: this.$route.params.id,
      date: "",
      holiday_type: "",
      errors: {},
      selectedDate: null,
      validationDateType: true,
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
  },
  methods: {
    clearFieldsData() {
      setTimeout(() => {
        this.clearFields();
        this.clearError();
      }, 10);
    },
    clearFields() {
      this.title = "";
      this.selectedDate = null;
      this.date = "";
      this.holiday_type = "";
    },
    clearError(fieldName) {
      this.errors[fieldName] = null;
    },

    getError(fieldName) {
      return this.errors[fieldName];
    },
    isEmptyField() {
      return (
        !this.title.trim() ||
        !this.selectedDate ||
        !this.holiday_type.trim() ||
        !this.validationDateType
      );
    },
    addDate() {
      if (this.selectedDate) {
        const currentDate = new Date();
        const selectedDate = new Date(this.selectedDate);

        if (selectedDate >= currentDate) {
          this.validationDateType = true;
          this.clearError("date");
          this.date = selectedDate.toISOString().split("T")[0];
        } else {
          this.validationDateType = false;
          this.$set(
            this.errors,
            "date",
            "Please choose a date from today onwards."
          );
        }
      } else {
        this.validationDateType = false;
        this.$set(this.errors, "date", "Holiday Date is required.");
      }
    },
    isToday(selectedDate, currentDate) {
      return (
        selectedDate.getDate() === currentDate.getDate() &&
        selectedDate.getMonth() === currentDate.getMonth() &&
        selectedDate.getFullYear() === currentDate.getFullYear()
      );
    },
    validateAndAddJob() {
      this.errors = {};

      if (!this.title.trim()) {
        this.$set(this.errors, "title", "Title is required.");
      }

      if (!this.date.trim()) {
        this.$set(this.errors, "date", "Holiday Date is required.");
      } else if (!this.validationDateType) {
        this.$set(
          this.errors,
          "date",
          "Please choose a date from today onwards."
        );
      }

      if (!this.holiday_type.trim()) {
        this.$set(this.errors, "holiday_type", "Holiday Type is required.");
      }

      if (
        Object.values(this.errors).every((error) => error === null) &&
        !this.isEmptyField()
      ) {
        this.siteCustomHoliday();
      }
    },
    async siteCustomHoliday() {
      const data = {
        title: this.title,
        date: this.date,
        holiday_type: this.holiday_type,
        site_id: this.$route.params.id,
      };
      try {
        const response = await axios.post(
          `${VITE_API_URL}/custom_holidays`,
          data
        );
        if (response.status === 200) {
          this.$emit("addCustomHoliday");
          const message = "Holiday Add Successful";
          this.$refs.successAlert.showSuccess(message);
          this.clearFields();
        }
      } catch (error) {
        // console.error("Error adding employee:", error);
        this.clearFields();
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
  background: #dbdbdb;
}

.modal-footer {
  border-top: 0px;
}
</style>
