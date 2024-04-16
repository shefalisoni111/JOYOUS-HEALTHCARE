<template>
  <div>
    <!-- Modal -->
    <div
      class="modal fade"
      id="addHolidayCalender"
      aria-labelledby="addHolidayCalender"
      tabindex="-1"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="addHolidayCalender">Add Holidays</h5>
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
                    <input
                      type="date"
                      class="form-control"
                      v-model="holiday_date"
                      rows="3"
                      @input="clearError('holiday_date')"
                    />
                    <div v-if="getError('holiday_date')" class="text-danger">
                      {{ getError("holiday_date") }}
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div class="modal-footer">
            <button
              class="btn btn-secondary rounded-1"
              data-bs-target="#addHolidayCalender"
              data-bs-toggle="modal"
              data-bs-dismiss="modal"
            >
              Cancel
            </button>
            <button
              class="btn btn-primary rounded-1 text-capitalize fw-medium"
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

      errors: {},
    };
  },
  components: { SuccessAlert },
  computed: {
    isButtonDisabled() {
      return (
        Object.values(this.errors).some((error) => error !== null) || this.isEmptyField()
      );
    },
  },
  methods: {
    clearError(fieldName) {
      this.errors[fieldName] = null;
    },
    getError(fieldName) {
      return this.errors[fieldName];
    },
    isEmptyField() {
      return !this.title.trim() || !this.description.trim();
    },
    validateAndAddJob() {
      this.errors = {};

      if (!this.title.trim()) {
        this.$set(this.errors, "title", "Title is required.");
      }

      if (!this.description.trim()) {
        this.$set(this.errors, "description", "Description is required.");
      }

      // If there are no errors, proceed to add job
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
        description: this.description,
      };
      try {
        const response = await axios.post(`${VITE_API_URL}/employment_types`, data);
        if (response.data) {
          this.$emit("updateList");
          const message = "Holiday Add Successful";
          this.$refs.successAlert.showSuccess(message);
          this.title = "";
          this.description = "";
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
.bi-square-fill::before {
  color: #673ab7;
  font-size: 40px;
}

.modal-body {
  border-radius: 5px;
  background: #dbdbdb;
}
.modal-header {
  border-bottom: 0px;
}
.modal-footer {
  border-top: 0px;
}
</style>
