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
                    <label class="form-label">Site</label>
                  </div>
                  <div class="col-9">
                    <select
                      v-model="fetchVacancy.business_unit_id"
                      id="selectBusinessUnit"
                    >
                      <option
                        v-for="option in businessUnit"
                        :key="option.id"
                        :value="option.id"
                        placeholder="Select BusinessUnit"
                      >
                        {{ option.name }}
                      </option>
                    </select>
                  </div>
                </div>

                <div class="mb-3 d-flex justify-content-between">
                  <div class="col-3">
                    <label class="form-label">Job Title</label>
                  </div>
                  <div class="col-9">
                    <select v-model="fetchVacancy.job_id" id="selectJobTitle">
                      <option
                        v-for="option in options"
                        :key="option.id"
                        :value="option.id"
                        aria-placeholder="Select Job"
                      >
                        {{ option.name }}
                      </option>
                    </select>
                  </div>
                </div>
                <div class="mb-3 d-flex justify-content-between">
                  <div class="col-3">
                    <label class="form-label">ClientID</label>
                  </div>
                  <div class="col-9">
                    <select v-model="fetchVacancy.client_id" id="selectClients">
                      <option
                        v-for="option in clientData"
                        :key="option.id"
                        :value="option.id"
                        aria-placeholder="Select Job"
                      >
                        {{ option.first_name }}
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
                        <button
                          style="
                            position: absolute;
                            bottom: 27px;
                            right: -7px;
                            border-radius: 50%;
                            padding: 0 4px;
                          "
                          class="btn btn-danger btn-sm mt-2"
                          @click="removeDate(index)"
                        >
                          X
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="mb-3 d-flex justify-content-between">
                  <div class="col-3">
                    <label class="form-label">Shift</label>
                  </div>
                  <div class="col-9">
                    <select v-model="fetchVacancy.shift_id" id="selectShifts">
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
        business_unit_id: "",
        client_id: "",
        staff_required: "",
        job_id: "",
        dates: [],
        shift_id: "",
        notes: "",
      },
      businessUnit: [],
      shiftsTime: [],
      clientData: [],
      options: [],
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
        (option) => option.id === this.fetchVacancy.business_unit_id
      );
      return businessUnit ? businessUnit.name : "";
    },
    selectClients() {
      const client = this.clientData.find(
        (option) => option.id === this.fetchVacancy.client_id
      );
      return client ? client.first_name : "";
    },
    selectShifts() {
      const shift = this.shiftsTime.find(
        (option) => option.id === this.fetchVacancy.shift_id
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
  },
  methods: {
    removeDate(index) {
      this.fetchVacancy.dates.splice(index, 1);
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

        this.fetchVacancy.business_unit_id = response.data.business_unit_id;
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
        this.fetchVacancy.shift_id = response.data.shift_id;
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
        const response = await axios.put(
          `${VITE_API_URL}/vacancies/${this.fetchVacancy.id}`,
          {
            business_unit_id: this.fetchVacancy.business_unit_id,
            client_id: this.fetchVacancy.client_id,
            job_id: this.fetchVacancy.job_id,
            dates: datesArray,
            notes: this.fetchVacancy.notes,
            shift_id: this.fetchVacancy.shift_id,
            staff_required: this.fetchVacancy.staff_required,
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
        const response = await axios.get(`${VITE_API_URL}/business_units`);
        this.businessUnit = response.data;
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
    async getTimeShift() {
      await axios
        .get(`${VITE_API_URL}/shifts`)
        .then((response) => (this.shiftsTime = response.data));
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

  mounted() {
    this.getBusinessUnitMethod();
    this.getClientMethod();
    this.getTimeShift();
    this.getJobTitleMethod();
  },
  watch: {
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
