<template>
  <div>
    <!-- Modal -->
    <div>
      <div class="main-box">
        <div class="model-box">
          <div class="text-center">
            <h5 class="">Edit Candidate</h5>
          </div>
          <div class="mx-3">
            <div class="row">
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
                      <!-- <input
                        type="text"
                        class="form-control"
                        v-model="fetchVacancy.business_unit"
                      /> -->
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
                    <!-- <input
                      type="text"
                      class="form-control"
                      v-model="fetchVacancy.job_title"
                    /> -->
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
                    <!-- <input
                      type="text"
                      class="form-control"
                      v-model="fetchVacancy.client"
                    /> -->
                  </div>
                </div>
                <div class="mb-3">
                  <div class="col-12">
                    <label class="form-label">Dates</label>
                  </div>
                  <div class="col-12 mt-1">
                    <input
                      type="text"
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
                    <!-- <input
                      type="text"
                      class="form-control"
                      v-model="fetchVacancy.shift_id"
                    /> -->
                  </div>
                </div>
                <div class="mb-3">
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
                </div>
                <div class="d-flex justify-content-center">
                  <button
                    class="btn btn-primary rounded-1 text-capitalize fw-medium"
                    data-bs-dismiss="modal"
                    @click.prevent="updateVacancyMethod()"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "VacancyEdit",
  data() {
    return {
      fetchVacancy: {
        business_unit_id: "",
        client_id: "",
        job_id: "",

        dates: [],
        shift_id: "",
        notes: "",
        error: [],
      },
      businessUnit: [],
      shiftsTime: [],
      clientData: [],
      options: [],
    };
  },
  computed: {
    selectBusinessUnit() {
      const businessUnit = this.businessUnit.find(
        (option) => option.id === this.fetchVacancy.business_unit
      );
      return businessUnit ? businessUnit.name : "";
    },
    selectClients() {
      const client_id = this.clientData.find(
        (option) => option.id === this.client_id
      );
      return client_id ? client_id.first_name : "";
    },

    selectShifts() {
      const shifts_id = this.shiftsTime.find(
        (option) => option.id === this.shifts_id
      );
      return shifts_id ? shifts_id.shift_name : "";
    },
  },
  methods: {
    async fetchVacancyMethod(id) {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get(
          `https://logezy.onrender.com/vacancies/${id}`,
          {
            headers: {
              "content-type": "application/json",
              Authorization: "bearer " + token,
            },
          }
        );

        this.fetchVacancy = { ...this.fetchVacancy, ...response.data };
      } catch (error) {
       // console.error("Error fetching todo:", error);
      }
    },
    async updateVacancyMethod() {
      const token = localStorage.getItem("token");
      try {
        await axios.put(
          `https://logezy.onrender.com/vacancies/${this.fetchVacancy.id}`,
          this.fetchVacancy,
          {
            headers: {
              "content-type": "application/json",
              Authorization: "bearer " + token,
            },
          }
        );

        alert("Candidate updated successfully");
      } catch (error) {
        // console.error("Error updating candidate:", error);
      }
    },
    async getBusinessUnitMethod() {
      try {
        const response = await axios.get(
          "https://logezy.onrender.com/business_units"
        );
        this.businessUnit = response.data;
      } catch (error) {
        if (error.response) {
          if (error.response.status == 404) {
            alert(error.response.data.message);
          }
        }
      }
    },
    async getClientMethod() {
      try {
        const response = await axios.get("https://logezy.onrender.com/clients");
        this.clientData = response.data.data;
      } catch (error) {
        if (error.response) {
          if (error.response.status == 404) {
            alert(error.response.data.message);
          }
        }
      }
    },
    async getTimeShift() {
      await axios
        .get("https://logezy.onrender.com/shifts")
        .then((response) => (this.shiftsTime = response.data));
    },
    async getJobTitleMethod() {
      try {
        const response = await axios.get("https://logezy.onrender.com/jobs");
        this.options = response.data;
      } catch (error) {
        if (error.response) {
          if (error.response.status == 404) {
            alert(error.response.data.message);
          }
        }
      }
    },
    async getJobTitleMethod() {
      try {
        const response = await axios.get("https://logezy.onrender.com/jobs");
        this.options = response.data;
      } catch (error) {
        if (error.response) {
          if (error.response.status == 404) {
            alert(error.response.data.message);
          }
        }
      }
    },
  },

  mounted() {
    this.fetchVacancyMethod(this.$route.params.id);
    this.getBusinessUnitMethod();
    this.getClientMethod();
    this.getTimeShift();
    this.getJobTitleMethod();
  },
};
</script>

<style scoped>
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

#head {
  width: 40px;
  height: 40px;
}
.main-box {
  background: #00000008;

  padding: 100px 20px;
  height: 100vh;
  overflow: hidden;
}
select,
:focus-visible {
  width: 100%;
  padding: 9px;
  border: none;
  border-radius: 4px;
}

.model-box {
  background: #f3f3f3;
  margin: 20px 443px;
  padding: 10px;
  border-radius: 4px;
  box-shadow: 3px 1px 12px 14px #c3bdbd;
}
.btn-primary {
  background-color: #ff5f30 !important;
  font-weight: bold;
  border: none;
  border-radius: 4px;
  outline: none;
}

.switch {
  width: 50px;
  height: 17px;
  position: relative;
  display: inline-block;
}

.switch input {
  display: none;
}

.switch .slider {
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  cursor: pointer;
  background-color: #e7ecf1;
  border-radius: 30px !important;
  border: 0;
  padding: 0;
  display: block;
  margin: 12px 10px;
  min-height: 11px;
}

.switch .slider:before {
  position: absolute;
  background-color: #aaa;
  height: 15px;
  width: 15px;
  content: "";
  left: 0px;
  bottom: -2px;
  border-radius: 50%;
  transition: ease-in-out 0.5s;
}

.switch .slider:after {
  content: "";
  color: white;
  display: block;
  position: absolute;
  transform: translate(-50%, -50%);
  top: 50%;
  left: 70%;
  transition: all 0.5s;
  font-size: 10px;
  font-family: Verdana, sans-serif;
}

.switch input:checked + .slider:after {
  transition: all 0.5s;
  left: 30%;
  content: "";
}

.switch input:checked + .slider {
  background-color: #d3d6d9;
}

.switch input:checked + .slider:before {
  transform: translateX(15px);
  background-color: #ff9800;
}
</style>
