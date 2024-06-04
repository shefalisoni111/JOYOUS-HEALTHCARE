<template>
  <div>
    <!-- Modal -->
    <div
      class="modal fade"
      id="editRateCard"
      aria-labelledby="editRateCard"
      tabindex="-1"
    >
      <div class="modal-dialog modal-dialog-centered modal-xl">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title text-center" id="editRateCard">Edit Rate Card</h5>
          </div>
          <div class="modal-body mx-3">
            <div class="row align-items-center">
              <form>
                <div class="mb-3">
                  <div class="col-12">
                    <label class="form-label" for="selectRatCardJob">Position</label>
                  </div>
                  <div class="col-12 mt-1">
                    <select v-model="fetchRateCard.job_id" id="selectRatCardJob">
                      <option
                        v-for="option in options"
                        :key="option.id"
                        :value="option.id"
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
                      v-model="fetchRateCard.employment_type_id"
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
                    <label class="form-label" for="selectShiftsIds">Shift Type</label>
                  </div>
                  <div class="col-12 mt-1">
                    <select v-model="fetchRateCard.shift_id" id="selectShiftsIds">
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
                    <label class="form-label" for="selectBusinessUnitIds">Site</label>
                  </div>
                  <div class="col-12 mt-1">
                    <select v-model="fetchRateCard.site_id" id="selectBusinessUnitIds">
                      <option
                        v-for="option in businessUnit"
                        :key="option.id"
                        :value="option.id"
                      >
                        {{ option.site_name }}
                      </option>
                    </select>
                  </div>
                </div>
                <div class="mb-3">
                  <div class="col-12">
                    <label class="form-label">Day</label>
                  </div>
                  <div class="col-12 mt-1">
                    <select
                      class="form-select"
                      aria-label="Default select example"
                      v-model="fetchRateCard.weekname"
                    >
                      <option
                        v-for="day in daysOfWeek"
                        :key="day"
                        :value="day"
                        :selected="fetchRateCard.weekname == day"
                      >
                        {{ day }}
                      </option>
                    </select>
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
    <SuccessAlert ref="successAlert" />
  </div>
</template>

<script>
import axios from "axios";
import SuccessAlert from "../../Alerts/SuccessAlert.vue";

export default {
  name: "EditRateCard",
  data() {
    return {
      fetchRateCard: {
        id: "",
        employment_type_id: "",
        job_id: "",
        weekname: "",
        site_id: "",
        shift_id: "",
        staff_rate: "",
        site_id: "",
        candidate_id: this.$route.params.id,
      },
      employeeData: [],
      options: [],
      businessUnit: [],
      shiftsTime: [],
      daysOfWeek: ["monday", "tuesday", "wednesday", "thursday", "friday"],
    };
  },
  props: {
    rateCardId: {
      type: Number,
      default: 0,
    },
  },
  components: { SuccessAlert },
  computed: {
    selectEmployeeType() {
      const employment_type = this.employeeData.find(
        (option) => option.id === this.fetchRateCard.employment_type_id
      );
      return employment_type ? employment_type.title : "";
    },
    selectBusinessUnitIds() {
      const site_id = this.businessUnit.find(
        (option) => option.id === this.fetchRateCard.site_id
      );
      return site_id ? site_id.site_name : "";
    },
    selectedOptionText() {
      const job_id = this.options.find(
        (option) => option.id === this.fetchRateCard.job_id
      );
      return job_id ? job_id.name : "";
    },
    selectShiftsIds() {
      const shifts_id = this.shiftsTime.find(
        (option) => option.id === this.fetchRateCard.shift_id
      );
      return shifts_id ? shifts_id.shift_name : "";
    },
  },
  methods: {
    async getEmployeeTypeData() {
      try {
        const response = await axios.get(`${VITE_API_URL}/employment_types`);
        this.employeeData = response.data;
      } catch (error) {
        if (error.response) {
          if (error.response.status == 404) {
            // alert(error.response.data.message);
          }
        }
      }
    },
    async getPositionMethod() {
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
    async getTimeShift() {
      await axios
        .get(`${VITE_API_URL}/shifts`)
        .then((response) => (this.shiftsTime = response.data));
    },
    async fetchRateCardMethod() {
      try {
        const response = await axios.get(`${VITE_API_URL}/rate_cards/${this.rateCardId}`);

        this.fetchRateCard = response.data.data;
      } catch (error) {
        // console.error("Error fetching todo:", error);
      }
    },
    async fetchRateCardMethod(id) {
      if (!id) return;
      try {
        const response = await axios.get(`${VITE_API_URL}/rate_cards/${id}`);
        this.fetchRateCard = { ...this.fetchRateCard, ...response.data.data };
      } catch (error) {}
    },
    async updateRateCardMethod() {
      try {
        await axios.put(
          `${VITE_API_URL}rate_cards/` + this.fetchRateCard.id,
          this.fetchRateCard
        );

        // alert("Candidate updated successfully");
        this.$emit("EditRateCard");
        const message = " Rate Card updated successfully";
        this.$refs.successAlert.showSuccess(message);
      } catch (error) {
        // console.error("Error updating candidate:", error);
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
    async fetchData() {
      try {
        await this.fetchRateCardMethod();
        await this.getEmployeeTypeData();
        await this.getPositionMethod();
        await this.getBusinessUnitMethod();
        await this.getTimeShift();
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },
  },
  watch: {
    rateCardId: {
      immediate: true,
      handler(newrateCardId) {
        this.fetchRateCardMethod(newrateCardId);
      },
    },
  },
  async mounted() {
    await this.fetchData();
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
