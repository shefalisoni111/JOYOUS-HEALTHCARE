<template>
  <div>
    <!-- Modal -->
    <div class="modal fade" id="editOverview" aria-labelledby="overviewEdit">
      <div class="modal-dialog modal-dialog-centered modal-xl">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title text-center" id="editOverview">
              Add Details
            </h5>
            <button
              type="button"
              class="custom-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              @click="blurActiveElement"
            ></button>
          </div>
          <div class="modal-body mx-3">
            <div class="row align-items-center">
              <form>
                <div class="row">
                  <div class="col-6">
                    <div class="mb-3">
                      <div class="col-12">
                        <label class="form-label">Employment Type</label>
                      </div>
                      <div class="col-12 mt-1">
                        <select
                          v-model="fetchCandidate.employment_type_id"
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
                  </div>
                  <div class="col-6">
                    <div class="mb-3">
                      <div class="col-12">
                        <label class="form-label">DBS/PVG No</label>
                      </div>
                      <div class="col-12 mt-1">
                        <input
                          type="text"
                          class="form-control"
                          v-model="fetchCandidate.DBS_PVG_no"
                          @input="cleanAndValidateDBSPVGNo"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-6">
                    <div class="mb-3">
                      <div class="col-12">
                        <label class="form-label">DBS/PVG Issue Date</label>
                      </div>
                      <div class="col-12 mt-1">
                        <input
                          type="date"
                          class="form-control"
                          v-model="fetchCandidate.DBS_PVG_issue_date"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="col-6">
                    <div class="mb-3">
                      <div class="col-12">
                        <label class="form-label">Enhanced DBS Issues</label>
                      </div>
                      <div class="col-12 mt-1">
                        <input
                          type="text"
                          class="form-control"
                          v-model="fetchCandidate.enhanced_dbs_issues"
                          @input="cleanAndValidatePin('enhanced_dbs_issues')"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div class="row">
                  <div class="col-6">
                    <div class="mb-3">
                      <div class="col-12">
                        <label class="form-label">Enhanced DBS Number</label>
                      </div>
                      <div class="col-12 mt-1">
                        <input
                          type="text"
                          class="form-control"
                          v-model="fetchCandidate.enhanced_dbs_number"
                          @input="cleanAndValidatePin('enhanced_dbs_number')"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="col-6">
                    <div class="mb-3">
                      <div class="col-12">
                        <label class="form-label">Deby</label>
                      </div>
                      <div class="col-12 mt-1">
                        <input
                          type="text"
                          class="form-control"
                          v-model="fetchCandidate.deby"
                          @input="cleanAndValidatePin('deby')"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div class="row">
                  <div class="col-6">
                    <div class="mb-3">
                      <div class="col-12">
                        <label class="form-label">DBS/PVG Expiry Date</label>
                      </div>
                      <div class="col-12 mt-1">
                        <input
                          type="date"
                          class="form-control"
                          v-model="fetchCandidate.DBS_PVG_expiry_date"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="col-6">
                    <div class="mb-3">
                      <div class="col-12">
                        <label class="form-label">Next Check Date</label>
                      </div>
                      <div class="col-12 mt-1">
                        <input
                          type="date"
                          class="form-control"
                          v-model="fetchCandidate.next_check_date"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div class="row">
                  <div class="col-6">
                    <div class="mb-3">
                      <div class="col-12">
                        <label class="form-label">NMC/NISCC/SSSC Pin</label>
                      </div>
                      <div class="col-12 mt-1">
                        <input
                          type="text"
                          class="form-control"
                          v-model="fetchCandidate.NMC_NISCC_SSSC_pin"
                          @input="cleanAndValidatePin"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="col-6">
                    <div class="mb-3">
                      <div class="col-12">
                        <label class="form-label">Nationality</label>
                      </div>
                      <div class="col-12 mt-1">
                        <input
                          type="text"
                          class="form-control"
                          v-model="fetchCandidate.nationality"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div class="row">
                  <div class="col-6">
                    <div class="mb-3">
                      <div class="col-12">
                        <label class="form-label">Date Of Birth</label>
                      </div>
                      <div class="col-12 mt-1">
                        <input
                          type="date"
                          class="form-control"
                          v-model="fetchCandidate.date_of_birth"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="col-6">
                    <div class="mb-3">
                      <div class="col-12">
                        <label class="form-label">Place Of Birth</label>
                      </div>
                      <div class="col-12 mt-1">
                        <input
                          type="text"
                          class="form-control"
                          v-model="fetchCandidate.place_of_birth"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div class="mb-3">
                  <div class="col-12">
                    <label class="form-label">Gender</label>
                  </div>

                  <div class="col-12 mt-1">
                    <select id="selectOption" v-model="fetchCandidate.gender">
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div class="modal-footer">
            <button
              class="btn btn-dark btn-cancel"
              data-bs-target="#editOverview"
              data-bs-toggle="modal"
              data-bs-dismiss="modal"
              @click="clearFieldsData"
            >
              Cancel
            </button>
            <button
              class="btn btn-primary rounded-1 text-capitalize fw-medium"
              data-bs-dismiss="modal"
              @click.prevent="updateCandidateMethod()"
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
  name: "CandidateAdd",
  data() {
    return {
      fetchCandidate: {
        employment_type_id: null,
        DBS_PVG_no: "",
        DBS_PVG_issue_date: "",
        DBS_PVG_expiry_date: "",
        next_check_date: "",
        NMC_NISCC_SSSC_pin: "",
        nationality: "",
        date_of_birth: "",
        place_of_birth: "",
        gender: "",
        deby: null,
        enhanced_dbs_issues: null,
        enhanced_dbs_number: null,
      },
      employeeData: [],
    };
  },
  components: {
    SuccessAlert,
  },
  props: {
    overViewId: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    selectEmployeeType() {
      const employment_type = this.employeeData.find(
        (option) => option.id === this.fetchCandidate.employment_type_id
      );
      return employment_type ? employment_type.title : "";
    },
  },
  methods: {
    toggleActionMenu(index) {
      this.selectedRow = this.selectedRow === index ? null : index;
    },
    blurActiveElement() {
      if (document.activeElement) {
        document.activeElement.blur();
      }
    },
    clearFieldsData() {
      setTimeout(() => {
        this.employment_type_id = null;
        this.DBS_PVG_no = "";
        this.DBS_PVG_issue_date = "";
        this.DBS_PVG_expiry_date = "";
        this.next_check_date = "";
        this.NMC_NISCC_SSSC_pin = "";
        this.nationality = "";
        this.date_of_birth = "";
        this.place_of_birth = "";
        this.gender = "";
      }, 3);
      this.blurActiveElement();
    },

    cleanAndValidateDBSPVGNo() {
      this.fetchCandidate.DBS_PVG_no = this.fetchCandidate.DBS_PVG_no.replace(
        /\D/g,
        ""
      );
    },

    cleanAndValidatePin() {
      this.fetchCandidate.NMC_NISCC_SSSC_pin =
        this.fetchCandidate.NMC_NISCC_SSSC_pin.replace(/\D/g, "");
    },
    cleanAndValidatePin(field) {
      if (this.fetchCandidate[field]) {
        this.fetchCandidate[field] = this.fetchCandidate[field].replace(
          /\D/g,
          ""
        );
      }
    },

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
    async fetchCandidateOverviewMethod() {
      if (!this.$route.params.id) {
        return;
      }
      try {
        const response = await axios.get(
          `${VITE_API_URL}/candidates/${this.$route.params.id}`
        );

        this.fetchCandidate = response.data.candidate;
      } catch (error) {
        // console.error("Error fetching todo:", error);
      }
    },
    async updateCandidateMethod() {
      try {
        await axios.put(
          `${VITE_API_URL}/candidates/${this.$route.params.id}`,
          this.fetchCandidate
        );
        this.$emit("overviewAdded");
        // alert("Candidate updated successfully");
        const message = " Staff updated successfully";
        this.$refs.successAlert.showSuccess(message);
      } catch (error) {
        // console.error("Error updating candidate:", error);
      }
    },
  },
  watch: {
    $route(to, from) {
      this.fetchCandidateOverviewMethod();
      this.getEmployeeTypeData();
    },
  },
  // beforeRouteEnter(to, from, next) {
  //   next((vm) => {
  //     vm.fetchCandidateOverviewMethod();
  //     vm.getEmployeeTypeData();
  //   });
  // },
  // beforeRouteUpdate(to, from, next) {
  //   this.fetchCandidateOverviewMethod();
  //   this.getEmployeeTypeData();
  //   next();
  // },
  mounted() {
    this.fetchCandidateOverviewMethod();
    this.getEmployeeTypeData();
  },
};
</script>

<style scoped>
.modal-body {
  border-radius: 5px;
}

.modal-footer {
  border-top: 0px;
}

select {
  width: 100%;

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
  font-family: "Inter", sans-serif;
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
