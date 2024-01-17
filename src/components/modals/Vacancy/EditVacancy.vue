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

        // Extract only the date part and format it as "yyyy-MM-dd"
        const dateObject = new Date(response.data.dates);
        this.fetchVacancy.dates =
          dateObject.getFullYear() +
          "-" +
          ("0" + (dateObject.getMonth() + 1)).slice(-2) +
          "-" +
          ("0" + dateObject.getDate()).slice(-2);

        this.fetchVacancy.shift_id = response.data.shift_id;
      } catch (error) {
        // You might want to set a default value or display an error message
      }
    },

    async updateVacancyMethod() {
      const token = localStorage.getItem("token");
      const dateObject = new Date(this.fetchVacancy.dates);

      // Extract the date part in the "yyyy-MM-dd" format
      const formattedDate =
        dateObject.getFullYear() +
        "-" +
        ("0" + (dateObject.getMonth() + 1)).slice(-2) +
        "-" +
        ("0" + dateObject.getDate()).slice(-2);

      try {
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
        this.$emit("updateVacancy");
        alert("Vacancy updated successfully");
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
