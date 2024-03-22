<template>
  <div>
    <!-- Modal -->
    <div
      class="modal fade"
      id="assignDirectVacancy"
      aria-labelledby="assignDirectVacancy"
      tabindex="-1"
    >
      <div class="modal-dialog modal-dialog-centered modal-xl">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="assignDirectVacancy">Shift</h5>
          </div>
          <div class="modal-body overflow-x-auto">
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
                      @change="selectAllVacancy"
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
            <div class="row g-3 align-items-center">
              <table class="table candidateTable" v-if="selectedCandidateItemId">
                <thead>
                  <tr>
                    <th scope="col"></th>
                    <th scope="col">ID</th>
                    <th scope="col">#RefCode</th>
                    <th scope="col">Client</th>
                    <th scope="col">Business Unit</th>
                    <th scope="col">Job Title</th>
                    <th scope="col" class="widthDefine">Date</th>
                    <th scope="col">Shift</th>
                    <!-- <th scope="col">Staff Required</th> -->
                    <!-- <th scope="col">Notes</th> -->

                    <!-- <th scope="col">Created by</th> -->
                  </tr>
                </thead>
                <tbody>
                  <tr v-if="errorMessage">
                    <td colspan="9" class="text-center text-danger fw-bolder">
                      {{ errorMessage }}
                    </td>
                  </tr>
                  <tr v-for="getdata in getVacancyDetail" :key="getdata.id">
                    <td>
                      <input
                        class="form-check-input"
                        type="checkbox"
                        :value="getdata.id"
                        :id="getdata.id"
                        v-model="checkedVacancies[getdata.id]"
                      />
                    </td>
                    <td v-text="getdata.id"></td>
                    <td v-text="getdata.ref_code"></td>
                    <td>
                      <router-link
                        class="text-capitalize text-black text-decoration-underline fw-bold"
                        to="/client"
                        >{{ getdata.client }}</router-link
                      >
                    </td>
                    <td v-text="getdata.business_unit"></td>
                    <td v-text="getdata.job_title"></td>

                    <td>
                      <span v-for="(date, index) in getdata.dates" :key="index">
                        {{ date }}

                        <template v-if="index !== getdata.dates.length - 1">, </template>
                      </span>
                    </td>

                    <td v-text="getdata.shift"></td>
                    <!-- <td v-text="getdata.staff_required"></td> -->
                    <!-- <td v-text="getdata.notes"></td> -->

                    <!-- <td v-text="getdata.create_by_and_time.split(' ')[0]"></td> -->
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="modal-footer">
            <button
              class="btn btn-primary rounded-1"
              data-bs-target="#assignDirectVacancy"
              data-bs-toggle="modal"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button
              v-if="getVacancyDetail.length > 0"
              class="btn btn-primary rounded-1"
              data-bs-target="#assignDirectVacancy"
              data-bs-toggle="modal"
              data-bs-dismiss="modal"
              v-on:click="assignVacancyToCandidateDirectMethod($event)"
              @click.stop="closePopup"
            >
              Assign
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { reactive } from "vue";
export default {
  name: "AssignDirectVacancy",
  data() {
    return {
      getVacancyDetail: [],
      searchQuery: null,
      vacancyList: [],
      errorMessage: "",
      checkedVacancies: reactive({}),
      selectAll: false,
    };
  },
  created() {
    this.getVacancyDetail.forEach((data) => {
      this.$set(this.checkedVacancies, data.id, false);
    });
  },
  computed: {
    selectedCandidateItemId() {
      this.assignedCandidate(
        this.$store.state.selectedCandidateItemId,
        this.$store.state.selectedJobItemId
      );
      return {
        candidateId: this.$store.state.selectedCandidateItemId,
        jobId: this.$store.state.selectedJobItemId,
      };
    },
  },
  methods: {
    closePopup() {
      this.$store.commit("setSelectedCandidateId", null);
    },
    selectAllVacancy() {
      if (this.selectAll) {
        this.getVacancyDetail.forEach((data) => {
          this.checkedVacancies[data.id] = true;
        });
      } else {
        this.checkedVacancies = {};
      }
    },
    assignedCandidate(candidateId, jobId) {
      this.$emit("assignCandidate", { candidateId, jobId });
    },

    async assignedCandidate(candidateId) {
      const token = localStorage.getItem("token");

      if (this.$store.state.selectedCandidateItemId) {
        try {
          const response = await axios.get(
            `${VITE_API_URL}/find_vacancy_according_candidate_job/${this.$store.state.selectedCandidateItemId}`,
            {
              headers: {
                "content-type": "application/json",
                Authorization: "bearer " + token,
              },
            }
          );

          // console.log(
          //   "candidate_id",
          //   this.$store.state.selectedCandidateItemId,
          //   "job_id",
          //   this.$store.state.selectedJobItemId
          // );

          this.errorMessage = response.data.message;
          this.getVacancyDetail = response.data.vacancies;

          this.vacancyList = [];

          // this.getVacancyDetail.forEach((vacancyItem) => {
          //   this.vacancyList.push(vacancyItem.vacancy);
          // });
          this.$emit("assignVacancy");
        } catch (error) {
          if (error.response) {
            if (error.response.status == 404) {
              // Handle 404 error
            }
          }
        }
      }
    },
    async assignVacancyToCandidateDirectMethod(event) {
      event.stopPropagation();
      const token = localStorage.getItem("token");
      const checkedVacancyIds = Object.keys(this.checkedVacancies)
        .filter((vacancy_id) => this.checkedVacancies[vacancy_id])
        .map((vacancy_id) => parseInt(vacancy_id));

      if (checkedVacancyIds.length === 0) {
        return;
      }
      console.log(this.$store.state.selectedCandidateItemId, checkedVacancyIds);
      const data = {
        candidate_id: this.$store.state.selectedCandidateItemId,
        vacancy_id: checkedVacancyIds,
      };

      try {
        const response = await fetch(`${VITE_API_URL}/assigned_vacancy`, {
          method: "PUT",
          headers: {
            Accept: "application/json",

            Authorization: "bearer " + token,
          },
          body: JSON.stringify(data),
        });

        if (response.ok) {
          alert("Staff Assigned Shift Successfully!");
          this.checkedVacancies = {};
          this.$emit("Candidate-updated");
        } else {
          // throw new Error(`Failed to assign candidates. Status: ${response.status}`);
        }
      } catch (error) {
        // console.error("Error assigning candidates:", error);
        // Optionally, display an error message to the user
      }
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
.widthDefine {
  width: 18%;
}
.modal-dialog {
  margin-right: auto;
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
#head {
  width: 40px;
  height: 40px;
}
.modal-content {
  height: 930px;
}
table th {
  text-transform: capitalize;
}
.candidateTable tr:nth-child(odd) td {
  background: #fdce5e17 !important;
}
</style>
