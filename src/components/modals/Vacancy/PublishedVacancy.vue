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
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body mx-3">
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
                <li>
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckDefault"
                  />&nbsp;O ASSIGNED (0)
                </li>
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
                        <input
                          class="form-control mr-sm-2"
                          type="search"
                          placeholder="Search "
                          aria-label="Search"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-12">
                <h6>Shifts List</h6>
                <table v-if="selectedPublishItemId" class="w-100">
                  <thead>
                    <tr>
                      <th></th>
                      <th scope="col">ID</th>
                      <th scope="col" class="widthSet">First Name</th>
                      <th scope="col" class="widthSet">Last Name</th>
                      <th scope="col">Positions</th>
                      <th scope="col" class="widthSet">Email</th>
                      <th scope="col">Phone</th>
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
                      <td v-text="candidate.id"></td>
                      <td>
                        {{ candidate.first_name }}
                      </td>
                      <td>
                        {{ candidate.last_name }}
                      </td>
                      <td v-text="candidate.position"></td>
                      <td>{{ candidate.email }}</td>
                      <td>
                        {{ candidate.phone_number }}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <div class="row">
              <div class="col-md-12 d-flex justify-content-between">
                <div class="d-flex gap-3">
                  <div class="d-flex justify-content-around gap-2">
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
                  </div>
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
                  >
                    Cancel
                  </button>
                  <button
                    class="btn btn-success rounded-1 text-capitalize fw-medium"
                    data-bs-dismiss="modal"
                    v-on:click="publicCandidateMail()"
                  >
                    Publish
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <SuccessAlert :show="showMessage" message="Mail sent successfully!" />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import SuccessAlert from "../../Alerts/SuccessAlert.vue";
import { reactive } from "vue";
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
    selectedPublishItemId() {
      this.publicCandidateMail(this.$store.state.selectedPublishItemId);
      return this.$store.state.selectedPublishItemId;
    },
  },
  methods: {
    selectAllCandidates() {
      if (this.selectAll) {
        this.getCandidatesData.forEach((data) => {
          this.checkedCandidates[data.id] = true;
        });
      } else {
        this.checkedCandidates = {};
      }
    },
    async publicCandidateMail() {
      const token = localStorage.getItem("token");
      this.getPublicVacancyMAil = [];

      if (this.$store.state.selectedPublishItemId) {
        const checkedCandidateIds = Object.keys(this.checkedCandidates)
          .filter((candidate_id) => this.checkedCandidates[candidate_id])
          .map((candidate_id) => parseInt(candidate_id));

        // Check if any candidate is checked
        if (checkedCandidateIds.length === 0) {
          // Handle case where no candidate is checked
          // console.error("No candidate is checked.");
          return;
        }

        try {
          const notificationType = this.enableMailNotification
            ? "email_notification"
            : null;

          const response = await axios.put(
            `${VITE_API_URL}/send_notification/${checkedCandidateIds}`,
            { notification_type: notificationType },
            {
              headers: {
                "content-type": "application/json",
                Authorization: "bearer " + token,
              },
            }
          );

          this.getPublicVacancyMAil = response.data.data;
          alert(response.data.message);
          if (response.status === 200) {
            this.publicationStatus = "published";
            this.showMessage = true;
            this.$emit("publishVacancy");
            for (const key in this.checkedCandidates) {
              this.checkedCandidates[key] = false;
            }
          } else {
            // Handle error case if needed
          }
        } catch (error) {
          // console.error("Error sending notification:", error);
          // Handle error
        }
      } else {
        // Handle case where selectedPublishItemId is falsy
      }
    },

    async getActiveCandidateMethod() {
      try {
        const response = await axios.get(
          `${VITE_API_URL}/approve_and_activated_candidates`
        );

        this.getCandidatesData = response.data.data;
      } catch (error) {
        if (error.response) {
          if (error.response.status == 404) {
          }
        } else {
          // console.error("Error fetching candidates:", error);
        }
      }
    },
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
  },

  mounted() {
    this.getVacancyDataMethod();
    this.getActiveCandidateMethod();
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
