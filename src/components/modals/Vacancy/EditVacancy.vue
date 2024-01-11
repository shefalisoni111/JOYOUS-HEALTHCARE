<template>
  <div>
    <!-- Modal -->
    <div class="modal fade" id="editVacancy" aria-labelledby="editVacancy" tabindex="-1">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="editVacancy">Edit Vacancy</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body mx-3">
            <div class="row align-items-center">
              <form>
                <div class="mb-3">
                  <div class="">
                    <div class="col-12">
                      <label class="form-label">Business Unit</label>
                    </div>
                    <div class="col-12 mt-1">
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
                </div>

                <div class="mb-3">
                  <div class="col-12">
                    <label class="form-label">Job Title</label>
                  </div>
                  <div class="col-12 mt-1">
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
                <div class="mb-3">
                  <div class="col-12">
                    <label class="form-label">Client ID</label>
                  </div>
                  <div class="col-12 mt-1">
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
                  <div class="col-12">
                    <label class="form-label">Dates</label>
                  </div>
                  <div class="col-12 mt-1">
                    <input
                      type="date"
                      class="form-control"
                      v-model="fetchVacancy.dates"
                    />
                  </div>
                </div>
                <div class="mb-3">
                  <div class="col-12">
                    <label class="form-label">Shift</label>
                  </div>
                  <div class="col-12 mt-1">
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
                <!-- <div class="mb-3">
                  <div class="col-12">
                    <label class="form-label">Notes</label>
                  </div>
                  <div class="col-12 mt-1">
                    <input
                      type="text"
                      class="form-control"
                      v-model="fetchVacancy.notes"
                    />
                  </div>
                </div> -->
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
  </div>
</template>

<script>
import axios from "axios";
import store from "@/store";
export default {
  name: "VacancyEdit",
  data() {
    return {
      fetchVacancy: {
        id: "",
        business_unit_id: "",
        client_id: "",
        job_id: "",
        dates: "",
        shift_id: "",
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
    // async fetchVacancies() {
    //   const token = localStorage.getItem("token");
    //   try {
    //     const response = await axios.get(`${VITE_API_URL}/vacancies`, {
    //       headers: {
    //         "content-type": "application/json",
    //         Authorization: "bearer " + token,
    //       },
    //     });

    //     // Assuming your store has a mutation named 'setVacancies'
    //     store.commit("setVacancies", response.data.data);
    //   } catch (error) {
    //     // Handle error if needed
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

        if (response.data.id !== undefined) {
          this.fetchVacancy.id = response.data.id;
        }

        // Update each property individually
        this.fetchVacancy.business_unit_id = response.data.business_unit_id;
        this.fetchVacancy.client_id = response.data.client_id;
        this.fetchVacancy.job_id = response.data.job_id;
        this.fetchVacancy.dates = response.data.dates;
        this.fetchVacancy.shift_id = response.data.shift_id;
      } catch (error) {
        // You might want to set a default value or display an error message
      }
    },

    async updateVacancyMethod() {
      const token = localStorage.getItem("token");

      // Ensure that fetchVacancy.dates is a valid date string
      const originalDate = this.fetchVacancy.dates;

      try {
        // Parse the original date string
        const parsedDate = new Date(originalDate);

        // Check if the parsed date is valid
        if (!isNaN(parsedDate.getTime())) {
          // Format the date to "yyyy-MM-dd"
          const formattedDate = parsedDate.toISOString().split("T")[0];

          const response = await axios.put(
            `${VITE_API_URL}/vacancies/${this.fetchVacancy.id}`,
            {
              business_unit_id: this.fetchVacancy.business_unit_id,
              client_id: this.fetchVacancy.client_id,
              job_id: this.fetchVacancy.job_id,
              dates: [formattedDate],
              shift_id: this.fetchVacancy.shift_id,
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

          alert("Vacancy updated successfully");
          if (response.ok) {
            this.$emit("addAfterEditVacancy");
          }
        } else {
          console.error("Invalid date format:", originalDate);
        }
      } catch (error) {
        console.error("Error updating vacancy:", error);
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
        this.fetchVacancyMethod(newVacancyID);
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
</style>
