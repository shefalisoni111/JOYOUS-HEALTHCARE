<template>
  <div>
    <!-- Modal -->
    <div
      class="modal fade"
      id="publishVacancy"
      aria-labelledby="publishVacancy"
      tabindex="-1"
    >
      <div class="modal-dialog modal-dialog-centered modal-xl">
        <div class="modal-content">
          <div class="modal-header d-inline-flex gap-3">
            <h5 class="modal-title" id="publishVacancy">Publish Shift</h5>
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
            <div class="row g-3 align-items-center">
              <ul class="list-unstyled d-flex justify-content-end gap-3">
                <li>
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckDefault"
                  />
                  &nbsp;WORKED (0)
                </li>
                <li>
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckDefault"
                  />&nbsp;CONSECUTIVE (0)
                </li>
                <li>
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckDefault"
                  />&nbsp;AVAILABLE (0)
                </li>
                <li>
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckDefault"
                  />&nbsp;UNAVAILABLE (0)
                </li>
                <li>
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckDefault"
                  />&nbsp;OTHER (1)
                </li>
                <!-- <li>
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckDefault"
                  />&nbsp;O ASSIGNED (0)
                </li> -->
                <li>
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckDefault"
                  />&nbsp;© PUBLISHED
                </li>
                <li>
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckDefault"
                  />&nbsp;@ REJECTED BY STAFF
                </li>
              </ul>
            </div>
            <div class="row">
              <div class="col-md-12">
                <div
                  class="pagetitle d-flex justify-content-between align-items-center p-2"
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
            <div class="row" v-if="!searchQuery">
              <div class="col-md-12">
                <h6>Shifts List</h6>
                <div class="wrapper-vacancy">
                  <table class="table vacancyTable w-100" v-if="selectedPublishItemId">
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
                    <tbody>
                      <tr v-for="candidate in getCandidatesData" :key="candidate.id">
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
                  </table>
                </div>
              </div>
            </div>
            <div class="row" v-if="searchQuery">
              <div class="col-md-12">
                <h6>Shifts List</h6>
                <div class="wrapper-vacancy">
                  <table class="table vacancyTable w-100" v-if="selectedPublishItemId">
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
                          No Match Found !!
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <div class="row">
              <div class="col-md-12 d-flex justify-content-between">
                <div class="d-flex gap-3">
                  <!-- <div class="d-flex justify-content-around gap-2">
                    <div class="btn btn-success text-nowrap">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        value=""
                        id="flexCheckDefault"
                      />
                      Push Notification
                    </div>
                  </div>
                  <div class="d-flex justify-content-around gap-2">
                    <div class="btn btn-success text-nowrap">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        value=""
                        id="flexCheckDefault"
                      />
                      Text Notification
                    </div>
                  </div> -->
                  <div class="d-flex justify-content-around gap-2">
                    <div class="btn btn-success text-nowrap">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        value=""
                        id="flexCheckDefault"
                        v-model="enableMailNotification"
                      />
                      Mail Notification
                    </div>
                  </div>
                </div>
                <div class="d-flex gap-3">
                  <button
                    class="btn btn-danger rounded-1"
                    data-bs-target="#publishVacancy"
                    data-bs-toggle="modal"
                    data-bs-dismiss="modal"
                    v-on:click="clearFieldsData"
                  >
                    Cancel
                  </button>
                  <button
                    class="btn btn-success rounded-1 text-capitalize fw-medium"
                    v-on:click="publicCandidateMail()"
                    :disabled="!canPublish"
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
      getCandidatesData: [],
      getPublicVacancyMAil: [],
      notification_type: null,
      vacancyData: [],
      enableMailNotification: false,
      showMessage: false,
      publicationStatus: null,
      checkedCandidates: reactive({}),
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
    this.getCandidatesData.forEach((data) => {
      this.$set(this.checkedCandidates, data.id, false);
    });
  },
  computed: {
    canPublish() {
      const hasCheckedCandidates = Object.keys(this.checkedCandidates).some(
        (key) => this.checkedCandidates[key]
      );

      return hasCheckedCandidates && this.enableMailNotification;
    },
    selectedPublishItemId() {
      this.getAllCandidateListMethod(this.$store.state.selectedPublishItemId);

      return this.$store.state.selectedPublishItemId;
    },
    selectedAllItemId() {
      this.getAllCandidateListMethod(this.$store.state.selectedPublishItemId);

      return this.$store.state.selectedPublishItemId;
    },
  },
  methods: {
    clearFieldsData() {
      setTimeout(() => {
        this.checkedCandidates = Object.fromEntries(
          Object.keys(this.checkedCandidates).map((key) => [key, false])
        );

        this.enableMailNotification = false;
        this.selectAll = false;
      }, 10);
    },
    selectAllCandidates() {
      if (this.selectAll) {
        this.getCandidatesData.forEach((data) => {
          this.checkedCandidates[data.id] = true;
        });
      } else {
        this.checkedCandidates = {};
      }
    },
    async getAllCandidateListMethod(id) {
      if (!id) return;
      this.getCandidatesData = [];

      if (this.$store.state.selectedPublishItemId) {
        try {
          const response = await axios.get(
            `${VITE_API_URL}/candidate_list_of_vacancy?vacancy_id=${id}`
          );
          this.getCandidatesData = response.data.candidates_data;
          // this.vacancyDetails = response.data.vacancy_data;
          this.$emit("allVacancy");
          // console.log(this.getCandidatesData);
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

    async publicCandidateMail() {
      const token = localStorage.getItem("token");

      if (this.$store.state.selectedPublishItemId) {
        const checkedCandidateIds = Object.keys(this.checkedCandidates)
          .filter((candidate_ids) => this.checkedCandidates[candidate_ids])
          .map((candidate_ids) => parseInt(candidate_ids));

        try {
          const notificationType = this.enableMailNotification
            ? "email_notification"
            : null;

          const response = await axios.put(
            `${VITE_API_URL}/send_notification/${this.$store.state.selectedPublishItemId}`,
            { notification_type: notificationType, candidate_ids: checkedCandidateIds },
            {
              headers: {
                "content-type": "application/json",
                Authorization: "bearer " + token,
              },
            }
          );

          if (response.status === 200) {
            const message = response.data.message;

            if (
              this.$refs.successAlert &&
              typeof this.$refs.successAlert.showSuccess === "function"
            ) {
              this.$refs.successAlert.showSuccess(message);
            } else {
              // console.error("SuccessAlert component or method No found");
            }

            // Reset fields after successful notification
            this.checkedCandidates = Object.fromEntries(
              Object.keys(this.checkedCandidates).map((key) => [key, false])
            );
            this.enableMailNotification = false;
            this.selectAll = false;

            this.$emit("publishVacancy");
            this.$emit("publishVacancySearch");
            this.publishListShowMethod();
          } else {
            // Handle unexpected response status
          }
        } catch (error) {
          // Handle error
        }
      } else {
        // Handle case where selectedPublishItemId is falsy
      }
    },

    // async getActiveCandidateMethod() {
    //   try {
    //     const response = await axios.get(
    //       `${VITE_API_URL}/approve_and_activated_candidates`
    //     );

    //     this.getCandidatesData = response.data.data;
    //   } catch (error) {
    //     if (error.response) {
    //       if (error.response.status == 404) {
    //       }
    //     } else {
    //       // console.error("Error fetching candidates:", error);
    //     }
    //   }
    // },
    closePopup() {
      this.$store.commit("setSelectedPublishedItemId", null);
    },
    async getVacancyDataMethod() {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get(`${VITE_API_URL}/vacancies`, {
          headers: {
            "content-type": "application/json",
            Authorization: "bearer " + token,
          },
        });
        this.vacancyData = response.data.data;
      } catch (error) {
        //console.error("Error fetching vacancies:", error);
      }
    },
    //search api start
    async search() {
      try {
        this.searchResults = [];

        const response = await axiosInstance.get(
          `${VITE_API_URL}/searching_publish_candidates`,
          {
            params: {
              candidate_query: this.searchQuery,
              vacancy_id: this.$store.state.selectedPublishItemId,
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
    debounceSearch() {
      clearTimeout(this.debounceTimeout);

      this.debounceTimeout = setTimeout(() => {
        this.search();
      }, 100);
    },
    async publishListShowMethod() {
      try {
        const response = await axios.get(`${VITE_API_URL}candidate_list_of_vacancy`, {
          params: {
            vacancy_id: id,
          },
        });
        console.log(response.data.candidates_data);
      } catch (error) {
        // console.error("Error fetching vacancies:", error);
      }
    },
  },

  async mounted() {
    // await this.getVacancyDataMethod();
    await this.getAllCandidateListMethod(this.$store.state.selectedPublishItemId);
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
@media (max-width: 1120px) {
  .vacancyTable {
    width: 1090px;
  }
  .wrapper-vacancy {
    overflow-x: scroll;
  }
}
</style>
