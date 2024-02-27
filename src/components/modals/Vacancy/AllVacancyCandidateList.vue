<template>
  <div>
    <!-- Modal -->
    <div
      class="modal fade"
      id="allCandidateVacancyList"
      aria-labelledby="allCandidateVacancyList"
      tabindex="-1"
    >
      <div class="modal-dialog modal-dialog-centered modal-xl">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="allCandidateVacancyList">All Staff List</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <div class="row g-3 align-items-center">
              <ul class="list-unstyled d-lg-flex gap-3 mb-0 publish-ul d-sm-grid">
                <li>Code:{{ vacancyDetails.ref_code }}</li>
                <li>Department:{{ vacancyDetails.business_unit }}</li>
                <li>Job: {{ vacancyDetails.job_title }}</li>
                <li v-for="(date, index) in vacancyDetails.dates" :key="index">
                  Date: {{ date }}
                </li>
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
                        <!-- <form @submit.prevent="search">
                          <input
                            class="form-control mr-sm-2"
                            type="search"
                            placeholder="Search by Name"
                            aria-label="Search"
                            v-model="searchQuery"
                            @input="debounceSearch"
                          />
                        </form> -->
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="row g-3 align-items-center">
              <div class="wrapper-vacancy">
                <table class="table vacancyTable" v-if="selectedAllItemId">
                  <thead>
                    <tr>
                      <th></th>
                      <th scope="col">staff code</th>
                      <th scope="col">first name</th>
                      <th scope="col">last name</th>
                      <th scope="col">phone number</th>

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
          </div>
          <div class="modal-footer">
            <button
              class="btn btn-primary rounded-1"
              data-bs-target="#allCandidateVacancyList"
              data-bs-toggle="modal"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button
              class="btn btn-primary rounded-1"
              data-bs-target="#allCandidateVacancyList"
              data-bs-toggle="modal"
              data-bs-dismiss="modal"
              v-on:click="updateAssignVacancyMethod($event)"
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
  name: "AllVacancyCandidateList",

  data() {
    return {
      getVacancyDetail: [],
      vacancyDetails: [],

      getRejectedList: [],
      getAssignedList: [],
      checkedCandidates: reactive({}),
      selectAll: false,
    };
  },
  created() {
    this.getVacancyDetail.forEach((data) => {
      this.$set(this.checkedCandidates, data.id, false);
    });
  },
  computed: {
    selectedAllItemId() {
      // this.getallCandidateVacancyListMethod(this.$store.state.selectedAllItemId);
      this.getAllCandidateListMethod(this.$store.state.selectedAllItemId);
      //   this.assignedCandidate(this.$store.state.selectedAssignedItemId);
      // this.rejectCandidate(this.$store.state.selectedRejectItemId);
      return this.$store.state.selectedAllItemId;
    },
  },
  methods: {
    closePopup() {
      this.$store.commit("setSelectedAllItemId", null);
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

    async getAllCandidateListMethod(id) {
      const token = localStorage.getItem("token");
      this.getVacancyDetail = [];
      this.vacancyDetails = [];
      if (this.$store.state.selectedAllItemId) {
        try {
          const response = await axios.get(
            `${VITE_API_URL}/candidate_list_of_vacancy?vacancy_id=${id}`,
            {
              headers: {
                "content-type": "application/json",
                Authorization: "bearer " + token,
              },
            }
          );
          this.getVacancyDetail = response.data.candidates_data;
          this.vacancyDetails = response.data.vacancy_data;
          this.$emit("allVacancy");
          // console.log(this.getVacancyDetail);
        } catch (error) {
          if (error.response) {
            if (error.response.status == 404) {
              // alert(error.response.data.message);
            }
          }
        }
      } else {
      }
    },
    async updateAssignVacancyMethod(event) {
      event.stopPropagation();
      const checkedCandidateIds = Object.keys(this.checkedCandidates)
        .filter((candidate_id) => this.checkedCandidates[candidate_id])
        .map((candidate_id) => parseInt(candidate_id));

      if (checkedCandidateIds.length === 0) {
        return;
      }
      const id = this.$store.state.selectedAllItemId;
      const data = {
        candidate_ids: checkedCandidateIds,

        vacancy_id: id,
      };

      if (id) {
        try {
          const response = await fetch(`${VITE_API_URL}/assign_vacancy_to_candidates`, {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          });

          if (response.ok) {
            alert("Candidates assigned successfully!");
            this.checkedCandidates = {};
            this.$emit("allVacancy");
          } else {
          }
        } catch (error) {}
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
