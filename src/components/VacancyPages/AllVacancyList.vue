<template>
  <div>
    <div class="row">
      <div class="col-12">
        <table class="table candidateTable">
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
              <th scope="col">Publish</th>
              <th scope="col" class="text-center">All</th>
              <th scope="col">Applied</th>
              <th scope="col">Assigned</th>
              <th scope="col">Rejected</th>
              <th scope="col">Created by</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="getdata in displayedVacancies" :key="getdata.id">
              <td v-text="getdata.id"></td>
              <td v-text="getdata.ref_code"></td>
              <td>
                <!-- <router-link
                  class="text-capitalize text-black text-decoration-underline fw-bold"
                  to="/client"
                  >{{ getdata.client }}</router-link
                > -->
                <router-link
                  class="text-capitalize text-black text-decoration-underline fw-bold"
                  :to="{
                    name: 'SingleClientProfile',
                    params: { id: getdata.client_id },
                  }"
                >
                  {{ getdata.client }}
                </router-link>
              </td>
              <td v-text="getdata.business_unit"></td>
              <td v-text="getdata.job_title"></td>

              <td v-for="(date, index) in getdata.dates" :key="index" v-text="date"></td>

              <td v-text="getdata.shift"></td>
              <!-- <td v-text="getdata.staff_required"></td> -->
              <td v-text="getdata.notes"></td>

              <td>
                <i
                  data-bs-toggle="modal"
                  data-bs-target="#publishVacancy"
                  data-bs-whatever="@mdo"
                  v-if="getdata.publish === 'true'"
                  class="btn btn-success bi bi-check-circle-fill"
                  :class="{
                    'btn-success': getdata.publish === 'true',
                    'bi-check-circle-fill': getdata.publish === 'true',
                    'bi-bell': getdata.publish !== 'true',
                  }"
                  @click="openPublished(getdata.id)"
                ></i>
                <i
                  data-bs-toggle="modal"
                  data-bs-target="#publishVacancy"
                  data-bs-whatever="@mdo"
                  @click="openPublished(getdata.id)"
                  v-else
                  class="btn btn-success bi bi-bell"
                ></i>
              </td>

              <td class="text-center">
                <button
                  type="button"
                  class="btn text-nowrap"
                  data-bs-toggle="modal"
                  data-bs-target="#allCandidateVacancyList"
                  data-bs-whatever="@mdo"
                  @click="openAllApplied(getdata.id)"
                >
                  <span
                    :style="{ padding: getPadding(getdata.all_candidate) }"
                    class="rounded-circle"
                    >{{ getdata.all_candidate }}</span
                  >
                </button>
              </td>
              <td>
                <button
                  type="button"
                  class="btn text-nowrap"
                  data-bs-toggle="modal"
                  data-bs-target="#appliedVacancy"
                  data-bs-whatever="@mdo"
                  @click="openPopup(getdata.id)"
                >
                  <span
                    :style="{ padding: getPadding(getdata.all_candidate) }"
                    class="rounded-circle"
                    >{{ getdata.applied }}</span
                  >
                </button>
              </td>
              <td>
                <button
                  type="button"
                  class="btn text-nowrap"
                  data-bs-toggle="modal"
                  data-bs-target="#assignedVacancyList"
                  data-bs-whatever="@mdo"
                  @click="openAssigned(getdata.id)"
                >
                  <span
                    :style="{ padding: getPadding(getdata.all_candidate) }"
                    class="rounded-circle"
                    >{{ getdata.assigned }}</span
                  >
                </button>
              </td>
              <td>
                <button
                  type="button"
                  class="btn text-nowrap"
                  data-bs-toggle="modal"
                  data-bs-target="#rejectedVacancyList"
                  data-bs-whatever="@mdo"
                  @click="openRejected(getdata.id)"
                >
                  <span
                    :style="{ padding: getPadding(getdata.all_candidate) }"
                    class="rounded-circle"
                    >{{ getdata.rejected }}</span
                  >
                </button>
              </td>
              <td v-text="getdata.create_by_and_time.split(' ')[0]"></td>

              <td class="cursor-pointer">
                <i
                  class="bi bi-pencil-square btn btn-outline-success text-nowrap text-nowrap"
                  data-bs-toggle="modal"
                  data-bs-target="#editVacancy"
                  data-bs-whatever="@mdo"
                  @click="editVacancyId(getdata.id)"
                ></i>
                &nbsp;&nbsp;
                <button
                  class="btn btn-outline-danger text-nowrap"
                  v-on:click="vacancyDeleteMethod(getdata.id)"
                >
                  In-Active
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <EditVacancy :vacancyId="selectedVacancyId || 0" @updateVacancy="createVacancy" />
    <PublishedVacancy @publishVacancy="createVacancy" />
    <AppliedVacancyList @appliedVacancy="createVacancy" />
    <AssignedVacancyList @assignVacancy="createVacancy" />
    <RejectedVacancyList @rejectVacancy="createVacancy" />
    <AllVacancyCandidateList @allVacancy="createVacancy" />
    <AddVacancy @addVacancy="createVacancy" />
    <div class="mt-3" style="text-align: right" v-if="getVacancyDetail.length >= 10">
      <button class="btn btn-outline-dark btn-sm">
        {{ totalRecordsOnPage }} Records Per Page
      </button>
      &nbsp;&nbsp;
      <button
        class="btn btn-sm btn-primary mr-2"
        :disabled="currentPage === 1"
        @click="currentPage--"
      >
        Previous</button
      >&nbsp;&nbsp; <span>{{ currentPage }}</span
      >&nbsp;&nbsp;
      <button
        class="btn btn-sm btn-primary ml-2"
        :disabled="currentPage * itemsPerPage >= getVacancyDetail.length"
        @click="currentPage++"
      >
        Next
      </button>
    </div>
  </div>
</template>

<script>
import axios from "axios";

import PublishedVacancy from "../modals/Vacancy/PublishedVacancy.vue";
import AppliedVacancyList from "../modals/Vacancy/AppliedVacancyList.vue";
import AssignedVacancyList from "../modals/Vacancy/AssignedVacancyList.vue";
import RejectedVacancyList from "../modals/Vacancy/RejectedVacancyList.vue";
import AllVacancyCandidateList from "../modals/Vacancy/AllVacancyCandidateList.vue";
import EditVacancy from "../modals/Vacancy/EditVacancy.vue";
import AddVacancy from "../modals/Vacancy/AddVacancy.vue";
export default {
  data() {
    return {
      getVacancyDetail: [],
      selectedVacancyId: 0,
      currentPage: 1,
      itemsPerPage: 10,
    };
  },
  components: {
    PublishedVacancy,
    AppliedVacancyList,
    AssignedVacancyList,
    RejectedVacancyList,
    AllVacancyCandidateList,
    EditVacancy,
    AddVacancy,
  },
  computed: {
    displayedVacancies() {
      return this.getVacancyDetail.length >= 8
        ? this.paginatedVacancies
        : this.getVacancyDetail;
    },
    getIconClass() {
      return this.publish ? "bi bi-bell" : "bi bi-check-circle-fill";
    },
    paginatedVacancies() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.getVacancyDetail.slice(startIndex, endIndex);
    },
    totalRecordsOnPage() {
      return this.paginatedVacancies.length;
    },
  },

  methods: {
    getPadding(value) {
      // Calculate padding based on the number of digits
      const digitCount = value.toString().length;
      return digitCount === 1 ? "8px 11px" : "11px";
    },
    editVacancyId(vacancyId) {
      this.selectedVacancyId = vacancyId;
    },
    updateVacancyInList(updatedVacancy) {
      const index = this.getVacancyDetail.findIndex(
        (vacancy) => vacancy.id === updatedVacancy.id
      );

      if (index !== -1) {
        this.$set(this.getVacancyDetail, index, updatedVacancy);
      }
    },
    openPopup(id) {
      this.$store.commit("setSelectedAppliedItemId", id);
    },
    openAssigned(id) {
      this.$store.commit("setSelectedAssignedItemId", id);
    },
    openRejected(id) {
      this.$store.commit("setSelectedRejectItemId", id);
    },
    openAllApplied(id) {
      this.$store.commit("setSelectedAllItemId", id);
    },
    openPublished(id) {
      this.$store.commit("setSelectedPublishedItemId", id);
    },
    async vacancyDeleteMethod(id) {
      if (!window.confirm("Are you Sure ?")) {
        return;
      }
      const token = localStorage.getItem("token");
      await axios
        .put(`${VITE_API_URL}/inactive_vacancy/` + id, {
          headers: {
            "content-type": "application/json",
            Authorization: "bearer " + token,
          },
        })
        .then((response) => {
          this.createVacancy();
        });
      alert("InActive Vacancy");
    },

    async createVacancy() {
      const token = localStorage.getItem("token");
      axios
        .get(`${VITE_API_URL}/activate_vacancy_list`, {
          headers: {
            "content-type": "application/json",
            Authorization: "bearer " + token,
          },
        })

        .then((response) => {
          this.getVacancyDetail = response.data.vacancies;
        });
    },
  },

  async created() {
    await this.createVacancy();
  },
};
</script>

<style scoped>
#main {
  transition: all 0.3s;
  height: 100dvh;

  background-color: #fdce5e17;
}

.main-content {
  transition: all 0.3s;
}
.bg-define {
  background-color: #fdce5e17;
}
.color-fonts {
  color: #ff5f30;
  font-weight: bold;
}
.btn-primary {
  border: none;
}
.form-check-input {
  border: 2px solid grey;
}

.rounded-circle {
  border: 1px solid #ff5f30;
  padding: 8px 11px;
  cursor: pointer;
}
.border-left {
  border-left: 1px solid #ded9d9;
  height: 100vh;
}
a[data-v-507f63b7] {
  text-decoration: none;
}
.candidateTable tr:nth-child(odd) td {
  background: #fdce5e17 !important;
}
.btn-primary {
  border-radius: 4px;
}

.nav-pills .nav-link.active,
.nav-pills .show > .nav-link {
  background-color: transparent;
  border: 1px solid green;
  border-radius: 22px;
  color: green;
}

.nav-pills .nav-link {
  background-color: transparent;
  border: 1px solid #0d6efd;
  border-radius: 22px;
}
ul.nav-pills {
  height: 53px;
  border-bottom: 1px solid #b8b1b1;
}
table th {
  background-color: #ff5f30;
}

button.nav-link > li.nav-item {
  border-bottom: 2px solid red; /* Replace with your desired border color */
  padding-bottom: 5px; /* Optional: Add padding for spacing */
}

button.nav-link.active > li.nav-item {
  /* Additional styles for the active state if needed */
}

.form-select {
  width: auto;
}
.searchbox {
  width: 19%;
}
.searchbox::before {
  content: "\F52A";
  font-family: "bootstrap-icons";
  position: absolute;
  top: 8px;
  left: 10px;
  color: #ff5f30;
  font-weight: bolder;
}
input::-webkit-input-placeholder {
  margin-left: 5px;
}
</style>
