<template>
  <div>
    <div class="row">
      <div class="col-12 wrapper-vacancy">
        <table class="table vacancyTable">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">#RefCode</th>
              <th scope="col">Client</th>
              <th scope="col">Site</th>
              <th scope="col">Job Title</th>
              <th scope="col">Date</th>
              <th scope="col">Shift</th>
              <th scope="col" class="withShow">Staff Required</th>
              <th scope="col" class="widthDefineNotes">Notes</th>
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
            <tr v-for="getdata in paginatedVacancies" :key="getdata.id">
              <td v-text="getdata.id"></td>
              <td v-text="getdata.ref_code"></td>
              <td>
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

              <td class="widthDefine">
                <span v-for="(date, index) in getdata.dates" :key="index">
                  {{ date }}

                  <template v-if="index !== getdata.dates.length - 1">, </template>
                </span>
              </td>

              <td v-text="getdata.shift" class="widthDefine"></td>
              <td class="withShow text-center">
                {{ getdata.staff_required === null ? 0 : getdata.staff_required }}
              </td>
              <td class="widthDefineNotes" v-text="getdata.notes"></td>

              <td>
                <i
                  data-bs-toggle="modal"
                  data-bs-target="#publishVacancy"
                  data-bs-whatever="@mdo"
                  v-if="getdata.publish === 'true'"
                  :class="{
                    btn: true,
                    'btn-success': getdata.publish === 'true',
                    bi: true,
                    'bi-check-circle-fill': getdata.publish === 'true',
                    'bi-bell': getdata.publish !== 'true',
                    disabled: !getdata.activated,
                    'bg-danger': !getdata.activated,
                  }"
                  @click="getdata.activated && openPublished(getdata.id)"
                ></i>
                <i
                  data-bs-toggle="modal"
                  data-bs-target="#publishVacancy"
                  data-bs-whatever="@mdo"
                  @click="openPublished(getdata.id)"
                  v-else
                  class="btn btn-success bi bi-bell"
                  :class="{
                    disabled: !getdata.activated,
                    'btn-success': getdata.publish === 'true',
                    'bg-danger': !getdata.activated,
                  }"
                ></i>
              </td>

              <td class="text-center">
                <button
                  type="button"
                  class="btn text-nowrap border-0"
                  data-bs-toggle="modal"
                  data-bs-target="#allCandidateVacancyList"
                  data-bs-whatever="@mdo"
                  @click="openAllApplied(getdata.id)"
                  :disabled="!getdata.activated"
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
                  class="btn text-nowrap border-0"
                  data-bs-toggle="modal"
                  data-bs-target="#appliedVacancy"
                  data-bs-whatever="@mdo"
                  @click="openPopup(getdata.id)"
                  :disabled="!getdata.activated"
                >
                  <span
                    :style="{ padding: getPadding(getdata.applied) }"
                    class="rounded-circle"
                    >{{ getdata.applied }}</span
                  >
                </button>
              </td>
              <td>
                <button
                  type="button"
                  class="btn text-nowrap border-0"
                  data-bs-toggle="modal"
                  data-bs-target="#assignedVacancyList"
                  data-bs-whatever="@mdo"
                  @click="openAssigned(getdata.id)"
                  :disabled="!getdata.activated"
                >
                  <span
                    :style="{ padding: getPadding(getdata.assigned) }"
                    class="rounded-circle"
                    >{{ getdata.assigned }}</span
                  >
                </button>
              </td>
              <td>
                <button
                  type="button"
                  class="btn text-nowrap border-0"
                  data-bs-toggle="modal"
                  data-bs-target="#rejectedVacancyList"
                  data-bs-whatever="@mdo"
                  @click="openRejected(getdata.id)"
                  :disabled="!getdata.activated"
                >
                  <span
                    :style="{ padding: getPadding(getdata.rejected) }"
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
                <!-- <button
                  v-if="getdata.activated"
                  class="btn btn-danger text-nowrap"
                  v-on:click="vacancyInactiveMethod(getdata.id)"
                >
                  In-Activate</button
                >&nbsp;
                <button
                  v-else
                  class="btn btn-success text-nowrap"
                  v-on:click="vacancyActiveMethod(getdata.id)"
                >
                  Activated
                </button> -->
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

    <div class="mt-3" style="text-align: right" v-if="getVacancyDetail.length >= 9">
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
    <loader :isLoading="isLoading"></loader>
  </div>
</template>

<script>
import axios from "axios";
import Loader from "../Loader/Loader.vue";
import PublishedVacancy from "../modals/Vacancy/PublishedVacancy.vue";
import AppliedVacancyList from "../modals/Vacancy/AppliedVacancyList.vue";
import AssignedVacancyList from "../modals/Vacancy/AssignedVacancyList.vue";
import RejectedVacancyList from "../modals/Vacancy/RejectedVacancyList.vue";
import AllVacancyCandidateList from "../modals/Vacancy/AllVacancyCandidateList.vue";
import EditVacancy from "../modals/Vacancy/EditVacancy.vue";
import AddVacancy from "../modals/Vacancy/AddVacancy.vue";
import { mapActions } from "vuex";
export default {
  data() {
    return {
      getVacancyDetail: [],
      selectedVacancyId: 0,
      currentPage: 1,
      itemsPerPage: 8,
      isLoading: false,
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
    Loader,
  },
  computed: {
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
    reActivatedMethod(id) {
      if (!window.confirm("Are you sure you want to re-activate?")) {
        return;
      }
      axios
        .put(`${VITE_API_URL}/active_vacancy/${id}`)
        .then((response) => {
          this.inactiveCandidateData = response.data;
          this.getInactiveVacancyMethod();
          alert("Successful Reactivate");
        })
        .catch((error) => {
          // console.error("Error reactivating vacancy:", error);
        });
    },
    getPadding(value) {
      // Calculate padding based on the number of digits
      const digitCount = value.toString().length;
      return digitCount === 1 ? "7px 11px" : "8px 8px";
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
    async openAllApplied(id) {
      this.$store.commit("setSelectedAllItemId", id);
      const vacancyId = this.$store.state.vacancy_id;
    },
    openPublished(id) {
      this.$store.commit("setSelectedPublishedItemId", id);
    },
    async vacancyInactiveMethod(id) {
      if (!window.confirm("Are you Sure ?")) {
        return;
      }
      const token = localStorage.getItem("token");

      const isInactive = this.getVacancyDetail.find(
        (vacancy) => vacancy.id === id && vacancy.activated === false
      );

      if (isInactive) {
        alert("Vacancy already Inactive");
        return;
      }
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
    async vacancyActiveMethod(id) {
      if (!window.confirm("Are you Sure ?")) {
        return;
      }
      const token = localStorage.getItem("token");
      const isActive = this.getVacancyDetail.find(
        (vacancy) => vacancy.id === id && vacancy.activated === true
      );

      if (isActive) {
        alert("Vacancy already active");
        return;
      }

      await axios
        .put(`${VITE_API_URL}/active_vacancy/` + id, {
          headers: {
            "content-type": "application/json",
            Authorization: "bearer " + token,
          },
        })
        .then((response) => {
          this.createVacancy();
        });
      alert("Active Vacancy");
    },

    async createVacancy() {
      const token = localStorage.getItem("token");
      this.isLoading = true;
      await axios
        .get(`${VITE_API_URL}/vacancies`, {
          headers: {
            "content-type": "application/json",
            Authorization: "bearer " + token,
          },
        })
        .then((response) => {
          this.getVacancyDetail = response.data.data;
        })
        .finally(() => {
          this.isLoading = false;
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
.withShow {
  width: 5%;
}
.widthDefineNotes {
  width: 8%;
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

  cursor: pointer;
}
.border-left {
  border-left: 1px solid #ded9d9;
  height: 100vh;
}
a[data-v-507f63b7] {
  text-decoration: none;
}
.vacancyTable tr:nth-child(odd) td {
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

table th {
  background-color: #ff5f30;
}

button.nav-link > li.nav-item {
  border-bottom: 2px solid red;
  padding-bottom: 5px;
}

.form-select {
  width: auto;
}
.searchbox {
  width: 19%;
}
.widthDefine {
  width: 6%;
}
.btn:focus-visible {
  border: none;
  outline: none;
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
@media (max-width: 1120px) {
  .vacancyTable {
    width: 1090px;
  }
  .wrapper-vacancy {
    overflow-x: scroll;
  }
}
</style>
