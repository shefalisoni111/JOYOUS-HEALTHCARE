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
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <div class="row g-3 align-items-center">
              <table class="table candidateTable" v-if="selectedCandidateItemId">
                <thead>
                  <tr>
                    <th scope="col">ID</th>
                    <th scope="col">#RefCode</th>
                    <th scope="col">Client</th>
                    <th scope="col">Business Unit</th>
                    <th scope="col">Job Title</th>
                    <th scope="col">Date</th>
                    <th scope="col">Shift</th>
                    <!-- <th scope="col">Staff Required</th> -->
                    <th scope="col">Notes</th>

                    <!-- <th scope="col">Created by</th> -->
                  </tr>
                </thead>
                <tbody>
                  <tr v-if="errorMessage">
                    <td colspan="9" class="text-center text-danger fw-bolder">
                      {{ errorMessage }}
                    </td>
                  </tr>
                  <tr v-for="getdata in vacancyList" :key="getdata.id">
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

                    <td
                      v-for="(date, index) in getdata.dates"
                      :key="index"
                      v-text="date"
                    ></td>

                    <td v-text="getdata.shift"></td>
                    <!-- <td v-text="getdata.staff_required"></td> -->
                    <td v-text="getdata.notes"></td>

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
              v-on:click="assignVacancyToCandidateDirectMethod()"
              @click="closePopup"
            >
              Submit
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
  name: "AssignDirectVacancy",
  data() {
    return {
      getVacancyDetail: [],
      vacancyList: [],
      errorMessage: "",
    };
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
      this.$store.commit("setSelectedJobId", null);
    },

    assignedCandidate(candidateId, jobId) {
      this.$emit("assignCandidate", { candidateId, jobId });
    },

    async assignedCandidate(candidateId, jobId) {
      const token = localStorage.getItem("token");

      if (this.$store.state.selectedCandidateItemId) {
        try {
          const response = await axios.get(`${VITE_API_URL}/find_vacancy_according_job`, {
            params: {
              candidate_id: candidateId,
              job_id: jobId,
            },
            headers: {
              "content-type": "application/json",
              Authorization: "bearer " + token,
            },
          });

          // console.log(
          //   "candidate_id",
          //   this.$store.state.selectedCandidateItemId,
          //   "job_id",
          //   this.$store.state.selectedJobItemId
          // );

          this.errorMessage = response.data.message;
          this.getVacancyDetail = response.data;

          this.vacancyList = [];

          this.getVacancyDetail.forEach((vacancyItem) => {
            this.vacancyList.push(vacancyItem.vacancy);
          });
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
    // async assignVacancyToCandidateDirectMethod(candidateId, jobId) {
    //   const token = localStorage.getItem("token");

    //   if (this.$store.state.selectedCandidateItemId) {
    //     try {
    //       const response = await axios.get(`${VITE_API_URL}/find_vacancy_according_job`, {
    //         params: {
    //           candidate_id: candidateId,
    //           job_id: jobId,
    //         },
    //         headers: {
    //           "content-type": "application/json",
    //           Authorization: "bearer " + token,
    //         },
    //       });

    //       // console.log(
    //       //   "candidate_id",
    //       //   this.$store.state.selectedCandidateItemId,
    //       //   "job_id",
    //       //   this.$store.state.selectedJobItemId,
    //       //   this.getVacancyDetail
    //       // );

    //       this.getVacancyDetail = response.data;
    //       this.$emit("assignVacancy");

    //       this.vacancyList = [];

    //       this.getVacancyDetail.forEach((vacancyItem) => {
    //         this.vacancyList.push(vacancyItem.vacancy);
    //       });
    //       if (response.status === 200 && this.vacancyList.length === 0) {
    //         this.errorMessage = "Vacancy Not Found";
    //       }
    //     } catch (error) {
    //       if (error.response) {
    //         if (error.response.status == 404) {
    //           // Handle 404 error
    //         }
    //       }
    //     }
    //   }
    // },
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
