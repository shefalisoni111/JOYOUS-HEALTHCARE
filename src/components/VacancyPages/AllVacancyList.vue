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
              <!-- <th scope="col">Client Rate</th> -->
              <th scope="col" class="widthDefineNotes">Notes</th>
              <th scope="col">Publish</th>
              <th scope="col" class="text-center withShow">All Staff</th>
              <th scope="col">Applied</th>
              <th scope="col">Assigned</th>
              <th scope="col">Rejected</th>
              <th scope="col">Created by</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody v-if="getVacancyDetail?.length > 0">
            <tr v-for="getdata in getVacancyDetail" :key="getdata.id">
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
                  {{ getdata.client_name }}
                </router-link>
              </td>
              <td v-text="getdata.site_name"></td>
              <td v-text="getdata.job_name"></td>
              <td class="widthDefine">
                <span v-for="(date, index) in getdata.dates" :key="index">
                  {{ date }}

                  <template v-if="index !== getdata.dates.length - 1">, </template>
                </span>
              </td>
              <!-- <td v-for="(date, index) in getdata.dates" :key="index" v-text="date"></td> -->

              <td v-text="getdata.shift ? getdata.shift.replace(/_/g, ' ') : ' '"></td>
              <td class="withShow text-center">
                {{ getdata.staff_required === null ? 0 : getdata.staff_required }}
              </td>
              <!-- <td class="text-center">
                {{ getdata.client_rate }}
              </td> -->
              <td class="widthDefineNotes" v-text="getdata.notes"></td>

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
                    :style="{ padding: getPadding(getdata.applied) }"
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
                    :style="{ padding: getPadding(getdata.assigned) }"
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
                    :style="{ padding: getPadding(getdata.rejected) }"
                    class="rounded-circle"
                    >{{ getdata.rejected }}</span
                  >
                </button>
              </td>
              <td>
                {{
                  getdata.create_by_and_time
                    ? getdata.create_by_and_time.split(" ")[0]
                    : ""
                }}
              </td>

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
                  v-on:click="confirmed(getdata.id)"
                >
                  In-Active
                </button>
              </td>
            </tr>
          </tbody>
          <tbody v-else>
            <tr>
              <td colspan="16" class="text-center text-danger" v-if="!isLoading">
                {{ "Data Not Found!" }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <EditVacancy
      :vacancyId="selectedVacancyId || 0"
      @updateVacancy="createVacancy"
      ref="editShift"
    />
    <PublishedVacancy @publishVacancy="createVacancy" />
    <AppliedVacancyList @appliedVacancy="createVacancy" />
    <AssignedVacancyList @assignVacancy="createVacancy" />
    <RejectedVacancyList @rejectVacancy="createVacancy" />
    <AllVacancyCandidateList @allVacancy="createVacancy" />
    <!-- <AddVacancy @addVacancy="createVacancy" /> -->
    <div class="mt-3" style="text-align: right" v-if="getVacancyDetail?.length >= 10">
      <!-- <button class="btn btn-outline-dark btn-sm">
        {{ totalRecordsOnPage }} Records Per Page
      </button> -->
      <button
        class="btn btn-sm btn-primary dropdown-toggle"
        type="button"
        id="recordsPerPageDropdown"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        {{ itemsPerPage }} Records
      </button>
      <ul class="dropdown-menu" aria-labelledby="recordsPerPageDropdown">
        <li>
          <a class="dropdown-item" href="#" @click="setItemsPerPage(20)">20 Records</a>
        </li>
        <li>
          <a class="dropdown-item" href="#" @click="setItemsPerPage(50)">50 Records</a>
        </li>
        <li>
          <a class="dropdown-item" href="#" @click="setItemsPerPage(100)">100 Records</a>
        </li>
      </ul>
      &nbsp;&nbsp;
      <button
        class="btn btn-sm btn-primary mr-2"
        :disabled="currentPage === 1"
        @click="previousPage"
      >
        Previous
      </button>
      &nbsp;&nbsp;

      <span>{{ currentPage }}</span>
      &nbsp;&nbsp;

      <button
        class="btn btn-sm btn-primary ml-2"
        :disabled="currentPage >= totalPages"
        @click="nextPage"
      >
        Next
      </button>
    </div>
    <ConfirmationAlert
      :show-modal="isModalVisible"
      :message="confirmMessage"
      @confirm="confirmCallback"
      @cancel="canceled"
    />
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
import ConfirmationAlert from "../Alerts/ConfirmationAlert.vue";

export default {
  data() {
    return {
      getVacancyDetail: [],
      selectedVacancyId: 0,
      currentPage: 1,
      itemsPerPage: 10,
      totalCount: 0,
      totalPages: 1,
      isLoading: false,
      isModalVisible: false,
      confirmMessage: "",
      confirmCallback: null,
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
    ConfirmationAlert,
  },
  computed: {
    displayedVacancies() {
      // const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      // const endIndex = startIndex + this.itemsPerPage;
      // return this.getVacancyDetail.slice(startIndex, endIndex);
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      return this.getVacancyDetail.slice(startIndex, startIndex + this.itemsPerPage);
    },
    getIconClass() {
      return this.publish ? "bi bi-bell" : "bi bi-check-circle-fill";
    },
    paginatedVacancies() {
      if (!this.getVacancyDetail) return [];
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.getVacancyDetail.slice(startIndex, endIndex);
    },
    totalRecordsOnPage() {
      return this.paginatedVacancies.length;
    },
  },

  methods: {
    previousPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
        this.createVacancy();
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
        this.createVacancy();
      }
    },
    setItemsPerPage(value) {
      this.itemsPerPage = value;
      this.currentPage = 1;
      this.createVacancy();
    },
    getPadding(value) {
      if (value == null) {
        return "8px 8px";
      }

      const digitCount = value.toString().length;
      return digitCount === 1 ? "7px 11px" : "8px 8px";
    },
    editVacancyId(vacancyId) {
      this.selectedVacancyId = vacancyId;
      this.$refs.editShift.getBusinessUnitMethod();

      setTimeout(() => {
        this.$refs.editShift.getClientMethod();
      }, 100);

      setTimeout(() => {
        this.$refs.editShift.getTimeShift();
      }, 200);

      setTimeout(() => {
        this.$refs.editShift.getJobTitleMethod();
      }, 300);

      setTimeout(() => {
        this.$refs.editShift.fetchVacancyMethod(vacancyId);
      }, 400);
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
    confirmed(id) {
      this.isModalVisible = false;

      this.vacancyDeleteMethod(id);
    },
    canceled() {
      this.isModalVisible = false;
    },
    async vacancyDeleteMethod(id) {
      this.confirmMessage = "Are you Sure want to In-active Shift?";
      this.isModalVisible = true;
      this.confirmCallback = async () => {
        const token = localStorage.getItem("token");

        await axios
          .put(
            `${VITE_API_URL}/inactive_vacancy/` + id,
            {},
            {
              headers: {
                "content-type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          )
          .then((response) => {
            this.createVacancy();
          });
        alert("InActive Shift");
        this.isModalVisible = false;
      };
    },

    async createVacancy() {
      const token = localStorage.getItem("token");
      this.isLoading = true;
      axios
        .get(`${VITE_API_URL}/activate_vacancy_list`, {
          params: { page: this.currentPage, per_page: this.itemsPerPage },
          headers: {
            "content-type": "application/json",
            Authorization: "bearer " + token,
          },
        })

        .then((response) => {
          this.getVacancyDetail = response.data.vacancies;
          this.totalCount = response.data.total_vacancy;
          this.totalPages = response.data.total_pages;
          this.currentPage = response.data.current_page;
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
  },

  created() {
    this.createVacancy();
  },
};
</script>

<style scoped>
#main {
  transition: all 0.3s;
  height: 100dvh;

  background-color: #fdce5e17;
}
.widthDefineNotes {
  width: 8%;
}
.withShow {
  width: 5%;
}
.main-content {
  transition: all 0.3s;
}
.btn:focus-visible {
  border: none;
  outline: none;
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
.widthDefine {
  width: 6%;
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
ul.nav-pills {
  height: 53px;
  border-bottom: 1px solid #b8b1b1;
}
table th {
  background-color: #ff5f30;
}

button.nav-link > li.nav-item {
  border-bottom: 2px solid red;
  padding-bottom: 5px;
}
.btn-check:checked + .btn,
.btn.active,
.btn.show,
.btn:first-child:active,
:not(.btn-check) + .btn:active {
  border: none !important;
}
button:focus-visible {
  outline: none !important;
  border: none !important;
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
@media (max-width: 1120px) {
  .vacancyTable {
    width: 1090px;
  }
  .wrapper-vacancy {
    overflow-x: scroll;
  }
}
</style>
