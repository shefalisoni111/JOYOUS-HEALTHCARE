<template>
  <div>
    <!-- Modal -->
    <div
      class="modal fade"
      id="schedulePublishStaffList"
      aria-labelledby="schedulePublishStaffList"
      tabindex="-1"
    >
      <div class="modal-dialog modal-dialog-centered modal-xl">
        <div class="modal-content">
          <div class="modal-header d-inline-flex gap-3">
            <h5 class="modal-title" id="schedulePublishStaffList">Publish Staff Shift</h5>
            <!-- <ul
                class="list-unstyled d-flex gap-3 mb-0 publish-ul"
                v-for="data in vacancyData"
                :key="data.id"
              >
                <li>Code:{{ data.ref_code }}</li>
                <li>B-unit:{{ data.business_unit }}</li>
                <li>Job: {{ data.job_title }}</li>
                <li v-for="(date, index) in data.dates" :key="index" v-text="date"></li>
                <li>Time: {{ data.shift }}</li>
                <li>Space left: 1</li>
              </ul> -->
          </div>
          <div class="modal-body mx-3 overflow-x-auto">
            <div class="row">
              <div class="col-md-12">
                <div
                  class="pagetitle d-flex justify-content-between align-items-center p-2"
                >
                  <!-- <div class="d-flex justify-content-around gap-2">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      v-model="selectAll"
                      @change="selectAllCandidates"
                      id="selectAllCheckbox"
                    />
                    Select All
                  </div> -->

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
            <div class="row" v-if="!searchQuery">
              <div class="col-md-12">
                <table class="w-100">
                  <thead>
                    <tr>
                      <th class="text-center"></th>

                      <th scope="col" class="text-center">Staff</th>
                      <th scope="col" class="text-center">Client</th>
                      <th scope="col" class="text-center">Site</th>
                      <th scope="col" class="text-center">Date</th>
                      <th scope="col" class="text-center">Shift</th>
                      <th scope="col" class="text-center">Job Title</th>
                    </tr>
                  </thead>
                  <tbody>
                    <template
                      v-for="candidate in fetchStaffAndVacancy"
                      :key="candidate.id"
                    >
                      <tr v-for="(vacancy, index) in candidate.vacancies" :key="index">
                        <td class="text-center">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            :value="vacancy.id"
                            :id="`checkbox-${candidate.candidate_id}-${vacancy.id}`"
                            @change="
                              handleCheckboxChange(candidate.candidate_id, vacancy.id)
                            "
                          />
                        </td>

                        <!-- <template v-if="index === 0">
                          <td :rowspan="candidate.vacancies.length" class="text-center">
                            {{ candidate.candidate_id }}
                          </td>
                        </template> -->

                        <td class="text-center">{{ candidate.candidate_name }}</td>

                        <td class="text-center">{{ vacancy.client }}</td>
                        <td class="text-center">{{ vacancy.site }}</td>
                        <td class="text-center">
                          <span v-for="(date, index) in vacancy.dates" :key="index">
                            {{ date }}

                            <template v-if="index !== vacancy.dates.length - 1"
                              >,
                            </template>
                          </span>
                        </td>
                        <td class="text-center">{{ vacancy.site_shift }}</td>
                        <td class="text-center">{{ vacancy.job_title }}</td>
                      </tr>
                    </template>
                  </tbody>
                </table>
              </div>
            </div>
            <!-- <div class="row" v-if="searchQuery">
              <div class="col-md-12">
                <table class="w-100">
                  <thead>
                    <tr>
                      <th></th>
                      <th scope="col">staff code</th>
                      <th scope="col" class="widthSet">First Name</th>
                      <th scope="col" class="widthSet">Last Name</th>
                      <th scope="col">Phone Number</th>

                      <th scope="col" class="widthSet">Email</th>
                      <th scope="col">Positions</th>
                      <th scope="col">Status</th>
                    </tr>
                  </thead>
                  <tbody v-if="searchResults.length > 0">
                    <tr v-for="candidate in searchResults" :key="candidate.id">
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          :value="candidate.id"
                          :id="candidate.id"
                          v-model="checkedCandidates[candidate.id]"
                        />
                      </td>
                      <td v-text="candidate.candidate_code"></td>
                      <td>
                        {{ candidate.first_name }}
                      </td>
                      <td>
                        {{ candidate.last_name }}
                      </td>
                      <td>
                        {{ candidate.phone_number }}
                      </td>

                      <td>{{ candidate.email }}</td>
                      <td>{{ candidate.position }}</td>
                      <td>{{ candidate.status }}</td>
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
            </div> -->
          </div>
          <div class="modal-footer">
            <div class="row">
              <div class="col-md-12">
                <div class="">
                  <button
                    class="btn btn-danger rounded-1"
                    data-bs-target="#schedulePublishStaffList"
                    data-bs-toggle="modal"
                    data-bs-dismiss="modal"
                    v-on:click="clearFieldsData"
                  >
                    Cancel
                  </button>
                  <button
                    class="btn btn-success rounded-1 text-capitalize fw-medium ms-2"
                    data-bs-dismiss="modal"
                    v-on:click="assignVacancyToCandidateDirectMethod()"
                  >
                    Publish
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <SuccessAlert ref="successAlert" />
    </div>
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
  name: "PublishedVacancy",
  data() {
    return {
      fetchStaffAndVacancy: [],

      showMessage: false,

      selectAll: false,
      searchQuery: null,
      debounceTimeout: null,
      searchResults: [],
    };
  },
  components: {
    SuccessAlert,
  },

  created() {
    // this.getCandidatesData.forEach((data) => {
    //   this.$set(this.checkedCandidates, data.id, false);
    // });
  },
  computed: {
    // selectedPublishItemId() {
    //   this.getAllCandidateListMethod(this.$store.state.selectedPublishItemId);
    //   return this.$store.state.selectedPublishItemId;
    // },
    // selectedAllItemId() {
    //   this.getAllCandidateListMethod(this.$store.state.selectedPublishItemId);
    //   return this.$store.state.selectedPublishItemId;
    // },
  },
  methods: {
    concatenateIds(vacancies) {
      return vacancies.map((data) => data.id).join(", ");
    },
    concatenateValues(vacancies, field) {
      return vacancies.map((data) => data[field]).join(", ");
    },

    // selectAllCandidates() {
    //   if (this.selectAll) {
    //     this.getCandidatesData.forEach((data) => {
    //       this.checkedCandidates[data.id] = true;
    //     });
    //   } else {
    //     this.checkedCandidates = {};
    //   }
    // },
    // async getAllCandidateListMethod(id) {
    //   this.getCandidatesData = [];
    //   if (this.$store.state.selectedPublishItemId) {
    //     try {
    //       const response = await axios.get(
    //         `${VITE_API_URL}/candidate_list_of_vacancy?vacancy_id=${id}`
    //       );
    //       this.getCandidatesData = response.data.candidates_data;
    //       // this.vacancyDetails = response.data.vacancy_data;
    //       this.$emit("allVacancy");
    //       // console.log(this.getCandidatesData);
    //     } catch (error) {
    //       if (error.response) {
    //         if (error.response.status == 404) {
    //           // alert(error.response.data.message);
    //         }
    //       }
    //     }
    //   } else {
    //   }
    // },
    // async publicCandidateMail() {
    //   const token = localStorage.getItem("token");
    //   if (this.$store.state.selectedPublishItemId) {
    //     const checkedCandidateIds = Object.keys(this.checkedCandidates)
    //       .filter((candidate_ids) => this.checkedCandidates[candidate_ids])
    //       .map((candidate_ids) => parseInt(candidate_ids));
    //     // if (checkedCandidateIds.length === 0) {
    //     //   alert("Please select at least one candidate before proceeding.");
    //     //   return;
    //     // }
    //     try {
    //       const notificationType = this.enableMailNotification
    //         ? "email_notification"
    //         : null;
    //       const response = await axios.put(
    //         `${VITE_API_URL}/send_notification/${this.$store.state.selectedPublishItemId}`,
    //         { notification_type: notificationType, candidate_ids: checkedCandidateIds },
    //         {
    //           headers: {
    //             "content-type": "application/json",
    //             Authorization: "bearer " + token,
    //           },
    //         }
    //       );
    //       // this.getPublicVacancyMAil = response.data.data;
    //       alert(response.data.message);
    //       // const message = response.data.message;
    //       // this.$refs.successAlert.showSuccess(message);
    //       if (response.status === 200) {
    //         this.checkedCandidates = Object.fromEntries(
    //           Object.keys(this.checkedCandidates).map((key) => [key, false])
    //         );
    //         this.enableMailNotification = false;
    //         this.showMessage = false;
    //         this.selectAll = false;
    //         this.$emit("schedulePublishStaffList");
    //         this.$emit("schedulePublishStaffListSearch");
    //         const message = "Shift Published successfully";
    //         this.$refs.successAlert.showSuccess(message);
    //       } else {
    //         // Handle error case if needed
    //       }
    //     } catch (error) {
    //       // console.error("Error sending notification:", error);
    //       // Handle error
    //     }
    //   } else {
    //     // Handle case where selectedPublishItemId is falsy
    //   }
    // },
    clearFieldsData() {
      this.checkedCandidates = {};
      setTimeout(() => {
        this.checkedCandidates = {};
      }, 10);
    },
    handleCheckboxChange(id, vacancyId) {
      this.candidateId = id;

      this.vacancyId = vacancyId;
    },
    async assignVacancyToCandidateDirectMethod() {
      const data = {
        candidate_id: this.candidateId,
        vacancy_id: this.vacancyId,
      };

      try {
        const response = await axios.put(
          `${VITE_API_URL}/publish_schedule_vacancy`,
          data
        );
        if (response.status === 200) {
          alert("Staff Shift Publish Successfully");
          this.$emit("updated-assignPublish");
          // const message = "Staff Shift Publish Successfully";
          // this.$refs.successAlert.showSuccess(message);
          this.getPublishStaffListMethod();
          // this.checkedCandidates = {};
          // this.$emit("Candidate-updated");
        } else {
          // const errorMessage = "Failed to publish staff shift";
          // this.$refs.successAlert.showError(errorMessage);

          this.checkedCandidates = {};
        }
      } catch (error) {
        if (error.response && error.response.status === 404) {
          const errorMessage = error.response.data.error || "Resource not found";
          // Display alert error message
          alert(errorMessage);
        } else {
          // Handle other errors
          // console.error("Error:", error);
        }
      }
    },

    async getPublishStaffListMethod() {
      try {
        const response = await axios.get(`${VITE_API_URL}/find_unpublish_vacancy`);
        this.fetchStaffAndVacancy = response.data;
        // if (response.status === 200) {
        //   const message = "Staff Shift Publish Successfully";
        //   this.$refs.successAlert.showSuccess(message);
        // }
      } catch (error) {
        if (error.response) {
          if (error.response.status == 404) {
          }
        } else {
          // console.error("Error fetching candidates:", error);
        }
      }
    },
    // closePopup() {
    //   this.$store.commit("setSelectedPublishedItemId", null);
    // },
    // async getVacancyDataMethod() {
    //   const token = localStorage.getItem("token");
    //   try {
    //     const response = await axios.get(`${VITE_API_URL}/vacancies`, {
    //       headers: {
    //         "content-type": "application/json",
    //         Authorization: "bearer " + token,
    //       },
    //     });
    //     this.vacancyData = response.data.data;
    //   } catch (error) {
    //     //console.error("Error fetching vacancies:", error);
    //   }
    // },
    //search api start
    // async search() {
    //   try {
    //     this.searchResults = [];
    //     const response = await axiosInstance.get(
    //       `${VITE_API_URL}/searching_publish_candidates`,
    //       {
    //         params: {
    //           candidate_query: this.searchQuery,
    //           vacancy_id: this.$store.state.selectedPublishItemId,
    //         },
    //       }
    //     );
    //     this.searchResults = response.data;
    //   } catch (error) {
    //     if (
    //       (error.response && error.response.status === 404) ||
    //       error.response.status === 400
    //     ) {
    //       this.errorMessage = "No candidates found for the specified criteria";
    //     }
    //   }
    // },
    // debounceSearch() {
    //   clearTimeout(this.debounceTimeout);
    //   this.debounceTimeout = setTimeout(() => {
    //     this.search();
    //   }, 100);
    // },
    // async getAssignStaffListMethod() {
    //   try {
    //     const response = await axios.get(
    //       `${VITE_API_URL}/find_assign_vacacy_and_candidate`
    //     );
    //     this.assignStaffList = response.data.candidates;
    //   } catch (error) {
    //     //console.error("Error fetching vacancies:", error);
    //   }
    // },
  },
  async beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.getPublishStaffListMethod();
    });
  },
  async beforeRouteUpdate(to, from, next) {
    this.getPublishStaffListMethod();
    next();
  },
  mounted() {
    // this.getVacancyDataM
    //  this.getPublishStaffListMethod();
    // this.getAssignStaffListMethod();
    // this.getAllCandidateListMethod(this.$store.state.selectedPublishItemId);
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
.publish-ul li {
  background: #ff57223d;
  padding: 5px;
}
table th.widthSet {
  width: 15%;
}
.modal-xl {
  --bs-modal-width: 1823px !important;
}
.modal-footer {
  display: block;
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

.btn-primary {
  border: none;
}
#head {
  width: 40px;
  height: 40px;
}

.modal {
  --bs-modal-width: 881px;
}
</style>
