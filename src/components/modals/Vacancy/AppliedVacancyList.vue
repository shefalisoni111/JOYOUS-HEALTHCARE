<template>
  <div>
    <!-- Modal -->
    <div
      class="modal fade"
      id="appliedVacancy"
      aria-labelledby="appliedVacancy"
      tabindex="-1"
    >
      <div class="modal-dialog modal-dialog-centered modal-xl">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="appliedVacancy">Applied Shift</h5>
          </div>
          <div class="modal-body overflow-x-auto">
            <div class="row g-3 align-items-center">
              <ul class="list-unstyled d-lg-flex gap-3 mb-0 publish-ul d-sm-grid">
                <li>Code:{{ vacancyDetails.ref_code }}</li>
                <li>Site:{{ vacancyDetails.business_unit }}</li>
                <li>Job: {{ vacancyDetails.job_title }}</li>
                <li
                  v-for="(date, index) in vacancyDetails.dates"
                  :key="index"
                  v-text="date"
                ></li>
                <li>Time: {{ vacancyDetails.shift }}</li>
                <li>Space left: 1</li>
              </ul>
            </div>
            <div class="row m-3">
              <div class="col-md-12">
                <div
                  class="pagetitle d-flex justify-content-between align-items-center p-2"
                  v-if="getVacancyDetail.length > 0"
                >
                  <div class="d-flex justify-content-around gap-2">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      v-model="selectAll"
                      @change="selectAllCandidates"
                      id="selectAllCheckbox"
                    />
                    Select All
                  </div>

                  <div></div>

                  <div class="d-flex align-items-center justify-content-between">
                    <div class="d-flex align-items-center gap-2">
                      <div class="searchbox position-relative">
                        <form @submit.prevent="search">
                          <input
                            class="form-control mr-sm-2"
                            type="search"
                            placeholder="Search by Name"
                            aria-label="Search"
                            v-model="searchQuery"
                            @input="debounceSearch"
                          />
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="row g-3 align-items-center" v-if="!searchQuery">
              <div class="wrapper-vacancy">
                <table class="table vacancyTable" v-if="selectedAppliedItemId">
                  <thead>
                    <tr>
                      <th></th>
                      <th scope="col">staff code</th>
                      <th scope="col">first name</th>
                      <th scope="col">last name</th>
                      <th scope="col">phone number</th>
                      <!-- <th scope="col">email</th>
                    <th scope="col">address</th> -->
                      <th scope="col">activated</th>
                      <th scope="col">status</th>
                      <th scope="col">position</th>
                      <!-- <th scope="col">employment type</th> -->
                      <!-- <th scope="col">last login</th>

                    <th scope="col">Action</th> -->
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="data in getVacancyDetail" :key="data.id">
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          :value="data.id"
                          :id="data.id"
                          v-model="checkedCandidates[data.id]"
                        />
                      </td>
                      <td v-text="data.candidate_code"></td>
                      <td v-text="data.first_name"></td>
                      <td v-text="data.last_name"></td>
                      <td v-text="data.phone_number"></td>

                      <td v-text="data.activated"></td>
                      <td v-text="data.status"></td>
                      <td v-text="data.position"></td>
                      <!-- <td v-text="data.employment_type"></td> -->
                      <!-- <td v-text="data.last_login"></td>
                    <td class="cursor-pointer">
                      <a class="btn btn-outline-success text-nowrap">
                        <i class="bi bi-pencil-square"></i>
                      </a>
                      &nbsp;&nbsp;
                      <button class="btn btn-outline-success text-nowrap">
                        <i
                          class="bi bi-trash"
                          v-on:click="vacancyDeleteMethod(data.id)"
                        ></i>
                      </button>
                    </td> -->
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div class="row g-3 align-items-center" v-if="searchQuery">
              <div class="wrapper-vacancy">
                <table class="table vacancyTable" v-if="selectedAppliedItemId">
                  <thead>
                    <tr>
                      <th></th>
                      <th scope="col">staff code</th>
                      <th scope="col">first name</th>
                      <th scope="col">last name</th>
                      <th scope="col">phone number</th>
                      <th scope="col">email</th>
                      <!--<th scope="col">address</th> -->
                      <!-- <th scope="col">activated</th> -->

                      <th scope="col">position</th>
                      <th scope="col">status</th>
                      <!-- <th scope="col">employment type</th> -->
                      <!-- <th scope="col">last login</th>

                    <th scope="col">Action</th> -->
                    </tr>
                  </thead>
                  <tbody v-if="searchResults.length > 0">
                    <tr v-for="data in searchResults" :key="data.id">
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          :value="data.id"
                          :id="data.id"
                          v-model="checkedCandidates[data.id]"
                        />
                      </td>
                      <td v-text="data.candidate_code"></td>
                      <td v-text="data.first_name"></td>
                      <td v-text="data.last_name"></td>
                      <td v-text="data.phone_number"></td>

                      <td v-text="data.email"></td>

                      <td v-text="data.position"></td>
                      <td v-text="data.status"></td>
                      <!-- <td v-text="data.employment_type"></td> -->
                      <!-- <td v-text="data.last_login"></td>
                    <td class="cursor-pointer">
                      <a class="btn btn-outline-success text-nowrap">
                        <i class="bi bi-pencil-square"></i>
                      </a>
                      &nbsp;&nbsp;
                      <button class="btn btn-outline-success text-nowrap">
                        <i
                          class="bi bi-trash"
                          v-on:click="vacancyDeleteMethod(data.id)"
                        ></i>
                      </button>
                    </td> -->
                    </tr>
                  </tbody>
                  <tbody v-else>
                    <tr>
                      <td colspan="7" class="text-danger text-center">
                        Not Match Found !!
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <hr />
            <div
              class="row g-3 align-items-center mt-3"
              v-if="getVacancyDetail.length > 0"
            >
              <div class="d-flex gap-1">
                <div class="d-flex align-items-center">
                  <label>Choose Action:</label>
                </div>
                <div class="col-3">
                  <select
                    class="form-select"
                    v-model="selectedAction"
                    @change="handleSelectChange"
                  >
                    <option :value="null" disabled>Select an Action</option>
                    <option value="1">Assigned Staff</option>
                    <option value="2">Reject Staff</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button
              class="btn btn-secondary rounded-1"
              data-bs-target="#appliedVacancy"
              data-bs-toggle="modal"
              data-bs-dismiss="modal"
              @click="closePopup"
            >
              Cancel
            </button>
            <button
              v-if="getVacancyDetail.length > 0"
              class="btn btn-primary rounded-1"
              data-bs-target="#appliedVacancy"
              data-bs-toggle="modal"
              data-bs-dismiss="modal"
              v-on:click="updateVacancyMethod($event)"
            >
              Submit
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

import { reactive } from "vue";
const axiosInstance = axios.create({
  headers: {
    "Cache-Control": "no-cache",
  },
});
export default {
  name: "AppliedVacancyList",
  data() {
    return {
      getVacancyDetail: [],

      searchQuery: null,
      debounceTimeout: null,
      searchResults: [],

      vacancyDetails: [],

      selectedAction: null,
      getRejectedList: [],
      getAssignedList: [],
      checkedCandidates: reactive({}),
      selectAll: false,
    };
  },
  components: { SuccessAlert },
  created() {
    this.getVacancyDetail.forEach((data) => {
      this.$set(this.checkedCandidates, data.id, false);
    });
  },

  computed: {
    selectedAppliedItemId() {
      this.getAppliedVacancyMethod(this.$store.state.selectedAppliedItemId);
      this.assignedCandidate(this.$store.state.selectedAssignedItemId);
      this.rejectCandidate(this.$store.state.selectedRejectItemId);
      return this.$store.state.selectedAppliedItemId;
    },
  },
  methods: {
    debounceSearch() {
      clearTimeout(this.debounceTimeout);

      this.debounceTimeout = setTimeout(() => {
        this.search();
      }, 100);
    },
    //search api start
    async search() {
      try {
        this.searchResults = [];

        const response = await axiosInstance.get(
          `${VITE_API_URL}/searching_candidates_according_position`,
          {
            params: {
              candidate_query: this.searchQuery,
              vacancy_id: this.$store.state.selectedAppliedItemId,
              status: "applied",
            },
          }
        );

        this.searchResults = response.data;
      } catch (error) {
        if (
          (error.response && error.response.status === 404) ||
          error.response.status === 400
        ) {
          this.errorMessage = "No candidates found for the specified criteria";
        }
      }
    },
    selectAllCandidates() {
      if (this.selectAll) {
        this.getVacancyDetail.forEach((data) => {
          this.checkedCandidates[data.id] = true;
        });
      } else {
        this.checkedCandidates = {};
      }
    },
    handleSelectChange() {
      switch (this.selectedAction) {
        case "1":
          this.assignedCandidate();
          break;
        case "2":
          this.rejectCandidate();
          break;
      }
    },
    async assignedCandidate(id) {
      const token = localStorage.getItem("token");

      if (this.$store.state.selectedAssignedItemId) {
        try {
          const response = await axios.get(
            `${VITE_API_URL}/assigned_candidate_list/${id}`,
            {
              headers: {
                "content-type": "application/json",
                Authorization: "bearer " + token,
              },
            }
          );
          this.getAssignedList = response.data.data;
          this.$emit("assignVacancy");
        } catch (error) {
          if (error.response) {
            if (error.response.status == 404) {
              // alert(error.response.data.message);
            }
          }
        }
      }
    },
    async rejectCandidate(id) {
      const token = localStorage.getItem("token");

      if (this.$store.state.selectedRejectItemId) {
        try {
          const response = await axios.get(
            `${VITE_API_URL}/rejected_candidate_list/${id}`,
            {
              headers: {
                "content-type": "application/json",
                Authorization: "bearer " + token,
              },
            }
          );
          this.getRejectedList = response.data.data;
          this.$emit("rejectVacancy");
        } catch (error) {
          if (error.response) {
            if (error.response.status == 404) {
              // alert(error.response.data.message);
            }
          }
        }
      }
    },
    async getAppliedVacancyMethod(id) {
      const token = localStorage.getItem("token");

      this.getVacancyDetail = [];
      this.vacancyDetails = [];
      if (this.$store.state.selectedAppliedItemId) {
        try {
          const response = await axios.get(
            `${VITE_API_URL}/applied_candidate_list?vacancy_id=${id}`,
            {
              headers: {
                "content-type": "application/json",
                Authorization: "bearer " + token,
              },
            }
          );

          this.getVacancyDetail.push(...response.data.data);

          this.vacancyDetails = response.data.vacancy_date;
        } catch (error) {
          if (error.response) {
            if (error.response.status == 404) {
              // alert(error.response.data.message);
            }
          }
        }
      }
    },

    async updateVacancyMethod(event) {
      event.stopPropagation();
      const checkedCandidateIds = Object.keys(this.checkedCandidates)
        .filter((candidate_id) => this.checkedCandidates[candidate_id])
        .map((candidate_id) => parseInt(candidate_id));
      if (checkedCandidateIds.length === 0) {
        alert("Please select at least one candidate before proceeding.");
        return;
      }
      if (!this.selectedAction) {
        alert("Please select an action (Assign or Reject) before proceeding.");
        return;
      }

      const data = {
        selectedAction: this.selectedAction,
        candidate_id: checkedCandidateIds,
        status: "",
      };

      if (this.selectedAction === "1") {
        // Assign Candidate
        data.status = "assigned";
      } else if (this.selectedAction === "2") {
        // Reject Candidate
        data.status = "rejected";
      }
      const id = this.$store.state.selectedAppliedItemId;
      if (id) {
        try {
          const response = await fetch(`${VITE_API_URL}/apply_candidates/${id}`, {
            method: "PUT",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          });

          if (response.ok) {
            this.checkedCandidates = {};
            this.$emit("appliedVacancy");
            if (this.selectedAction === "1") {
              // alert("Staff assigned successfully!");
              const message = "Staff assigned successfully";
              this.$refs.successAlert.showSuccess(message);
            } else if (this.selectedAction === "2") {
              // alert("Staff rejected successfully!");
              const message = "Staff rejected successfully";
              this.$refs.successAlert.showSuccess(message);
            }
          } else {
          }
        } catch (error) {}
      }
    },
    closePopup() {
      this.$store.commit("setSelectedAppliedItemId", null);
    },
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

.modal-dialog {
  margin-right: inherit;
}
select {
  width: 100%;
  padding: 10px;
  border-radius: 4px;
  border: 0px;
}
label.form-label {
  text-transform: capitalize;
}
.modal-footer {
  border-top: 0px;
}
.modal-dialog {
  margin-right: inherit;
}
.btn-primary {
  border: none;
}
.modal-xl {
  width: 1400px;
}
#head {
  width: 40px;
  height: 40px;
}

table th {
  text-transform: capitalize;
}
.vacancyTable tr:nth-child(odd) td {
  background: #fdce5e17 !important;
}
@media (max-width: 1120px) {
  .vacancyTable {
    width: 1090px;
  }
  .wrapper-vacancy {
    overflow-x: scroll;
  }
}
@media (max-width: 1050px) {
  .modal-dialog {
    margin-right: auto;
  }
  .modal-xl {
    width: auto;
  }
}
</style>
