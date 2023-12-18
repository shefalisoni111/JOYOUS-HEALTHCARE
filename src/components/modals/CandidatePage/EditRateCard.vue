<template>
  <div>
    <!-- Modal -->
    <div
      class="modal fade"
      id="editRateCard"
      aria-labelledby="candidatePage"
      tabindex="-1"
    >
      <div class="modal-dialog modal-dialog-centered modal-xl">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title text-center" id="editRateCard">
              Add Details
            </h5>
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
                  <div class="col-12">
                    <label class="form-label" for="selectOption"
                      >Position</label
                    >
                  </div>
                  <div class="col-12 mt-1">
                    <select v-model="fetchRateCard.job_id" id="selectOption">
                      <option
                        v-for="option in options"
                        :key="option.id"
                        :value="option.name"
                      >
                        {{ option.name }}
                      </option>
                    </select>
                  </div>
                </div>
                <div class="mb-3">
                  <div class="col-12">
                    <label class="form-label" for="selectEmployeeType"
                      >Employment Type</label
                    >
                  </div>
                  <div class="col-12 mt-1">
                    <select
                      v-model="fetchRateCard.employment_type"
                      id="selectEmployeeType"
                    >
                      <option
                        v-for="option in employeeData"
                        :key="option.id"
                        :value="option.id"
                        aria-placeholder="Select Job"
                      >
                        {{ option.title }}
                      </option>
                    </select>
                  </div>
                </div>
                <div class="mb-3">
                  <div class="col-12">
                    <label class="form-label" for="selectShifts"
                      >Shift Type</label
                    >
                  </div>
                  <div class="col-12 mt-1">
                    <select v-model="fetchRateCard.shift_id" id="selectShifts">
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
                <div class="mb-3">
                  <div class="col-12">
                    <label class="form-label" for="selectBusinessUnit"
                      >Business Unit</label
                    >
                  </div>
                  <div class="col-12 mt-1">
                    <select
                      v-model="fetchRateCard.business_unit_id"
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
                <div class="mb-3">
                  <div class="col-12">
                    <label class="form-label">Day</label>
                  </div>
                  <div class="col-12 mt-1">
                    <input
                      type="text"
                      class="form-control"
                      v-model="fetchRateCard.weekname"
                    />
                  </div>
                </div>
                <div class="mb-3">
                  <div class="col-12">
                    <label class="form-label">Staff Rate</label>
                  </div>
                  <div class="col-12 mt-1">
                    <input
                      type="text"
                      class="form-control"
                      v-model="fetchRateCard.staff_rate"
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div class="modal-footer">
            <button
              class="btn btn-secondary rounded-1"
              data-bs-target="#editRateCard"
              data-bs-toggle="modal"
              data-bs-dismiss="modal"
            >
              Cancel
            </button>
            <button
              class="btn btn-primary rounded-1 text-capitalize fw-medium"
              data-bs-dismiss="modal"
              @click.prevent="updateRateCardMethod()"
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

export default {
  name: "CandidateAdd",
  data() {
    return {
      fetchRateCard: {
        id: "",
        employment_type: "",
        job_id: "",
        weekname: "",
        shift_id: "",
        shiftsTime: [],
        business_unit_id: "",
        businessUnit: [],
      },
      employeeData: [],
      options: [],
    };
  },
  computed: {
    selectEmployeeType() {
      const employment_type = this.employeeData.find(
        (option) => option.id === this.employment_type
      );
      return employment_type ? employment_type.title : "";
    },
    selectBusinessUnit() {
      const business_unit_id = this.businessUnit.find(
        (option) => option.id === this.business_unit_id
      );
      return business_unit_id ? business_unit_id.name : "";
    },
    selectedOptionText() {
      const job_id = this.options.find((option) => option.id === this.job_id);
      return job_id ? job_id.name : "";
    },
    selectShifts() {
      const shifts_id = this.shiftsTime.find(
        (option) => option.id === this.shifts_id
      );
      return shifts_id ? shifts_id.shift_name : "";
    },
  },
  methods: {
    async getEmployeeTypeData() {
      try {
        const response = await axios.get(
          "https://logezy.onrender.com/employment_types"
        );
        this.employeeData = response.data;
      } catch (error) {
        if (error.response) {
          if (error.response.status == 404) {
            alert(error.response.data.message);
          }
        }
      }
    },
    async getPositionMethod() {
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
    async getTimeShift() {
      await axios
        .get("https://logezy.onrender.com/shifts")
        .then((response) => (this.shiftsTime = response.data));
    },
    async fetchRateCardMethod() {
      try {
        const response = await axios.get(
          `https://logezy.onrender.com/rate_cards/${this.$route.params.id}`
        );

        this.fetchRateCard = response.data.data;
      } catch (error) {
        // console.error("Error fetching todo:", error);
      }
    },
    async updateRateCardMethod(id) {
      try {
        await axios.put(
          `https://logezy.onrender.com/rate_cards/` + id,
          this.fetchRateCard
        );

        alert("Candidate updated successfully");
        window.location.reload();
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
  },

  mounted() {
    this.fetchRateCardMethod();
    this.getEmployeeTypeData();
    this.getPositionMethod();
    this.getBusinessUnitMethod();
    this.getTimeShift();
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

select {
  width: 100%;
  border: none;
  padding: 9px;
  border-radius: 4px;
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
