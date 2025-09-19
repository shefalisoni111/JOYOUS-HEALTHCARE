<template>
  <div>
    <!-- <Navbar /> -->
    <div id="main" class="main d-flex">
      <div
        class=""
        style="
          background: #fff;

          border-radius: 20px;
        "
      >
        <Navbar />
      </div>
      <div class="container-fluid ps-5 pt-3">
        <div class="row pagetitle d-flex justify-content-between px-2">
          <div class="py-3">
            <ol class="breadcrumb mb-1">
              <li class="breadcrumb-item active">
                <a
                  class="nav-link d-inline fs-4 fw-bolder"
                  style="color: #000000"
                  >Timesheet</a
                >
                <p>
                  Weekly Timesheet / Custom Timesheet /
                  <router-link
                    class="nav-link d-inline fw-bolder"
                    style="color: #000000"
                    aria-current="page"
                    to="/timesheet/signed"
                    >Signed Timesheet</router-link
                  >
                </p>
              </li>
            </ol>
          </div>
        </div>

        <div class="pt-3">
          <div class="row">
            <div class="col-11 col-md-11 col-xl-12 col-xxl-12">
              <div class="">
                <div class="d-flex justify-content-between">
                  <div
                    class="d-flex align-items-center justify-content-between"
                  >
                    <i
                      class="bi bi-caret-left-fill"
                      @click="moveToPrevious"
                      style="cursor: pointer"
                    ></i>
                    &nbsp;
                    <i
                      class="bi bi-calendar2-check pe-2 text-black fw-bold"
                    ></i>
                    &nbsp;
                    <span class="fw-bold fs-5">
                      {{ formatMonthYear(currentDate) }}
                    </span>
                    &nbsp;
                    <i
                      class="bi bi-caret-right-fill"
                      @click="moveToNext"
                      style="cursor: pointer"
                    ></i>
                  </div>

                  <div class="d-flex gap-3 align-items-center">
                    <form
                      @submit.prevent="search"
                      class="w-md-auto position-relative"
                    >
                      <input
                        class="form-control form-control-lg mr-sm-2 bg-white"
                        type="search"
                        placeholder="Search.."
                        aria-label="Search"
                        v-model="searchQuery"
                        @input="debounceSearch"
                      />
                      <span
                        class="position-absolute top-50 end-0 translate-middle-y pe-3"
                      >
                        <img
                          src="../../assets/Search.png"
                          class="img-fluid pe-2"
                          alt="RecPal"
                          loading="eager"
                      /></span>
                    </form>
                  </div>
                </div>
              </div>
              <!-- <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
                     
                    </ul> -->

              <div
                class="tab-content mt-3"
                id="pills-tabContent"
                v-if="!searchQuery"
              >
                <div
                  class="tab-pane fade show active"
                  id="pills-pendingSigned"
                  role="tabpanel"
                  aria-labelledby="pills-pendingSigned-tab"
                >
                  <div class="col-12 wrapper-timeSheet">
                    <table class="table candidateTable">
                      <thead>
                        <tr>
                          <th>
                            <div class="form-check">
                              <input
                                class="form-check-input"
                                type="checkbox"
                                value=""
                              />
                            </div>
                          </th>
                          <!-- <th scope="col">ID</th> -->
                          <th scope="col">Ref Code</th>
                          <th scope="col" style="width: 11%">Staff</th>
                          <th scope="col">Client</th>
                          <th scope="col">Site</th>
                          <th scope="col">Job Position</th>
                          <th scope="col">Shift</th>
                          <th scope="col">Date</th>

                          <th scope="col">Start Time</th>
                          <th scope="col">End Time</th>
                          <th scope="col">Break</th>
                          <th scope="col">Total Hours</th>
                          <th scope="col">Status</th>
                          <th scope="col">View</th>
                        </tr>
                      </thead>
                      <tbody v-if="paginateCandidates?.length > 0">
                        <tr
                          v-for="(data, index) in paginateCandidates"
                          :key="index"
                          @click="toggleActionMenu(index)"
                          @mouseleave="selectedRow = null"
                        >
                          <td>
                            <div class="form-check">
                              <input
                                class="form-check-input"
                                type="checkbox"
                                value=""
                              />
                            </div>
                          </td>
                          <!-- <td scope="col">{{ data.id }}</td> -->
                          <td scope="col">{{ data.code }}</td>
                          <td scope="col">
                            <router-link
                              class="text-black text-decoration-none fw-bold"
                              :to="{
                                name: 'Profile',
                                params: { id: data?.candidate_id },
                              }"
                              >{{ data.candidate_name }}</router-link
                            >
                          </td>
                          <td scope="col">
                            <router-link
                              v-if="data?.site_id_and_client_id?.client_id"
                              class="text-black text-decoration-none fw-bold"
                              :to="{
                                name: 'SingleClientProfile',
                                params: {
                                  id: data?.site_id_and_client_id?.client_id,
                                },
                              }"
                            >
                              {{ data.client }}
                            </router-link>
                            <span v-else>
                              <router-link
                                v-if="data?.site_id_and_client_id?.client_id"
                                class="text-black text-decoration-none fw-bold"
                                :to="{
                                  name: 'SingleClientProfile',
                                  params: {
                                    id: data?.site_id_and_client_id?.client_id,
                                  },
                                }"
                              >
                                {{ data.client }}
                              </router-link>
                            </span>
                          </td>
                          <td scope="col">
                            <router-link
                              v-if="data?.site_id_and_client_id?.site_id"
                              class="text-black text-decoration-none fw-bold"
                              :to="{
                                name: 'SingleSiteprofile',
                                params: {
                                  id: data?.site_id_and_client_id?.site_id,
                                },
                              }"
                              >{{ data.site }}</router-link
                            >
                            <span v-else>
                              <router-link
                                v-if="data?.site_id_and_client_id?.site_id"
                                class="text-black text-decoration-none fw-bold"
                                :to="{
                                  name: 'SingleSiteprofile',
                                  params: {
                                    id: data?.site_id_and_client_id?.site_id,
                                  },
                                }"
                              >
                                {{ data.site }}
                              </router-link>
                            </span>
                          </td>
                          <td scope="col">{{ data.job }}</td>
                          <td scope="col">{{ data.shift }}</td>
                          <td scope="col">{{ data.date }}</td>
                          <td scope="col">{{ data.start_time }}</td>

                          <td scope="col">{{ data.end_time }}</td>
                          <td scope="col">{{ data.break }}</td>
                          <td scope="col">{{ data.total_hours }}</td>

                          <td scope="col">
                            <button
                              type="button"
                              :class="['btn', 'text-nowrap']"
                              :style="
                                data.status === 'Approved'
                                  ? {
                                      backgroundColor: '#E9FAEF',
                                      color: '#24D164',
                                    }
                                  : {
                                      backgroundColor: 'rgb(255 227 234)',
                                      color: '#FF3B30',
                                    }
                              "
                              @click="ApproveMethod(data.id)"
                            >
                              {{
                                data.status === "Approved"
                                  ? "Unapprove"
                                  : "Approve"
                              }}
                            </button>
                          </td>
                          <td scope="col">
                            <button
                              type="button"
                              class="btn text-nowrap text-nowrap btn-outline-success shadow-soft"
                              data-bs-toggle="modal"
                              data-bs-target="#signedTimeSheetView"
                              data-bs-whatever="@mdo"
                              @click="openSignedView(data.id)"
                            >
                              <i class="bi bi-eye text-success"></i>
                            </button>
                          </td>
                        </tr>
                      </tbody>
                      <tbody v-else>
                        <tr v-if="!isLoading">
                          <td colspan="14" class="text-danger text-center">
                            {{ errorMessageSigned || errorMessageFilter }}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div
                class="tab-content mt-3"
                id="pills-tabContent"
                v-if="searchQuery"
              >
                <div
                  class="tab-pane fade show active"
                  id="pills-pendingSigned"
                  role="tabpanel"
                  aria-labelledby="pills-pendingSigned-tab"
                >
                  <div class="col-12 wrapper-timeSheet">
                    <table class="table candidateTable">
                      <thead>
                        <tr>
                          <th>
                            <div class="form-check">
                              <input
                                class="form-check-input"
                                type="checkbox"
                                value=""
                              />
                            </div>
                          </th>
                          <!-- <th scope="col">ID</th> -->

                          <th scope="col">Ref Code</th>
                          <th scope="col" style="width: 11%">Staff</th>
                          <th scope="col">Client</th>
                          <th scope="col">Site</th>
                          <th scope="col">Job Position</th>
                          <th scope="col">Shift</th>
                          <th scope="col">Date</th>

                          <th scope="col">Start Time</th>
                          <th scope="col">End Time</th>
                          <th scope="col">Break</th>
                          <th scope="col">Total Hours</th>
                          <th scope="col">Status</th>
                          <th scope="col">Action</th>
                        </tr>
                      </thead>
                      <tbody v-if="paginateSearchResults?.length > 0">
                        <tr
                          v-for="(data, index) in paginateSearchResults"
                          :key="index"
                          @click="toggleActionMenu(index)"
                          @mouseleave="selectedRow = null"
                        >
                          <td>
                            <div class="form-check">
                              <input
                                class="form-check-input"
                                type="checkbox"
                                value=""
                              />
                            </div>
                          </td>
                          <!-- <td scope="col">{{ data.id }}</td> -->
                          <td scope="col">{{ data.code }}</td>
                          <td scope="col">
                            <router-link
                              class="text-black text-decoration-none fw-bold"
                              :to="{
                                name: 'Profile',
                                params: { id: data?.candidate_id },
                              }"
                              >{{ data.candidate_name }}</router-link
                            >
                          </td>
                          <td scope="col">
                            <router-link
                              v-if="data?.site_id_and_client_id?.client_id"
                              class="text-black text-decoration-none fw-bold"
                              :to="{
                                name: 'SingleClientProfile',
                                params: {
                                  id: data?.site_id_and_client_id?.client_id,
                                },
                              }"
                            >
                              {{ data.client }}
                            </router-link>
                            <span v-else>
                              <router-link
                                v-if="data?.site_id_and_client_id?.client_id"
                                class="text-black text-decoration-none fw-bold"
                                :to="{
                                  name: 'SingleClientProfile',
                                  params: {
                                    id: data?.site_id_and_client_id?.client_id,
                                  },
                                }"
                              >
                                {{ data.client }}
                              </router-link>
                            </span>
                          </td>
                          <td scope="col">
                            <router-link
                              v-if="data?.site_id_and_client_id?.site_id"
                              class="text-black text-decoration-none fw-bold"
                              :to="{
                                name: 'SingleSiteprofile',
                                params: {
                                  id: data?.site_id_and_client_id?.site_id,
                                },
                              }"
                              >{{ data.site }}</router-link
                            >
                            <span v-else>
                              <router-link
                                v-if="data?.site_id_and_client_id?.site_id"
                                class="text-black text-decoration-none fw-bold"
                                :to="{
                                  name: 'SingleSiteprofile',
                                  params: {
                                    id: data?.site_id_and_client_id?.site_id,
                                  },
                                }"
                              >
                                {{ data.site }}
                              </router-link>
                            </span>
                          </td>
                          <td scope="col">{{ data.job }}</td>
                          <td scope="col">{{ data.shift }}</td>
                          <td scope="col">{{ data.date }}</td>
                          <td scope="col">{{ data.start_time }}</td>

                          <td scope="col">{{ data.end_time }}</td>
                          <td scope="col">{{ data.break }}</td>
                          <td scope="col">{{ data.total_hours }}</td>
                          <td scope="col">
                            <button
                              type="button"
                              :class="['btn', 'text-nowrap']"
                              :style="
                                data.status === 'Approved'
                                  ? {
                                      backgroundColor: '#E9FAEF',
                                      color: '#24D164',
                                    }
                                  : {
                                      backgroundColor: 'rgb(255 227 234)',
                                      color: '#FF3B30',
                                    }
                              "
                              @click="ApproveMethod(data.id)"
                            >
                              {{
                                data.status === "Approved"
                                  ? "Unapprove"
                                  : "Approve"
                              }}
                            </button>
                          </td>
                          <!-- <td scope="col"></td> -->
                          <td scope="col">
                            <button
                              type="button"
                              class="btn text-nowrap text-nowrap btn-outline-success shadow-soft"
                              data-bs-toggle="modal"
                              data-bs-target="#signedTimeSheetView"
                              data-bs-whatever="@mdo"
                              @click="openSignedView(data.id)"
                            >
                              <i class="bi bi-eye text-success"></i>
                            </button>

                            <!-- <button
                              type="button"
                              :class="[
                                'btn',
                                data.status === 'Approved'
                                  ? 'btn-danger'
                                  : 'btn-outline-success',
                                'text-nowrap',
                              ]"
                              @click="ApproveMethod(data.id)"
                            >
                              {{ data.status === "Approved" ? "Unapprove" : "Approve" }}
                            </button> -->
                          </td>
                        </tr>
                      </tbody>
                      <tbody v-else>
                        <tr v-if="!isLoading">
                          <td colspan="14" class="text-danger text-center">
                            {{ errorMessage }}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          class="mx-3 mb-2 d-flex justify-content-between"
          style="text-align: right"
          v-if="getSignedTimeSheetData.length >= 10 && !searchResults.length"
        >
          <div class="d-flex">
            <h6 class="d-flex align-items-center">Show: &nbsp;</h6>
            <button
              class="btn btn-sm dropdown-toggle rounded-[12px] border border-[1px] p-3 border"
              style="color: #00000080"
              type="button"
              id="recordsPerPageDropdown"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {{ itemsPerPage }} Records
            </button>
            <ul class="dropdown-menu" aria-labelledby="recordsPerPageDropdown">
              <li>
                <a class="dropdown-item" href="#" @click="setItemsPerPage(20)"
                  >20 Records</a
                >
              </li>
              <li>
                <a class="dropdown-item" href="#" @click="setItemsPerPage(50)"
                  >50 Records</a
                >
              </li>
              <li>
                <a class="dropdown-item" href="#" @click="setItemsPerPage(100)"
                  >100 Records</a
                >
              </li>
            </ul>
          </div>
          <div class="d-flex align-items-center">
            &nbsp;&nbsp;
            <button
              class="btn btn-sm mr-2 rounded-[12px] border border-[1px] p-3 border px-4"
              style="background: #ffffff"
              :disabled="currentPage === 1"
              @click="changePage(currentPage - 1)"
            >
              <i class="bi bi-chevron-left"></i>
            </button>
            &nbsp;&nbsp;
            <button
              class="btn btn-sm mr-2 rounded-[12px] border border-[1px] p-3 border px-4 cursor-none fw-bolder"
              style="background: #ffffff; color: #f9944b"
            >
              {{ currentPage }}
            </button>
            &nbsp;&nbsp;
            <button
              class="btn btn-sm ml-2 rounded-[12px] border border-[1px] p-3 border px-4"
              style="background: #ffffff"
              :disabled="currentPage === totalPages"
              @click="changePage(currentPage + 1)"
            >
              <i class="bi bi-chevron-right"></i>
            </button>
          </div>
        </div>
        <div
          class="mx-3 mb-2 d-flex justify-content-between"
          style="text-align: right"
          v-if="searchResults.length >= 10"
        >
          <div class="d-flex">
            <h6 class="d-flex align-items-center">Show: &nbsp;</h6>
            <button
              class="btn btn-sm dropdown-toggle rounded-[12px] border border-[1px] p-3 border"
              style="color: #00000080"
              type="button"
              id="recordsPerPageDropdown"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {{ itemsPerPage }} Records
            </button>
            <ul class="dropdown-menu" aria-labelledby="recordsPerPageDropdown">
              <li>
                <a class="dropdown-item" href="#" @click="setItemsPerPage(20)"
                  >20 Records</a
                >
              </li>
              <li>
                <a class="dropdown-item" href="#" @click="setItemsPerPage(50)"
                  >50 Records</a
                >
              </li>
              <li>
                <a class="dropdown-item" href="#" @click="setItemsPerPage(100)"
                  >100 Records</a
                >
              </li>
            </ul>
          </div>
          <div class="d-flex align-items-center">
            &nbsp;&nbsp;
            <button
              class="btn btn-sm mr-2 rounded-[12px] border border-[1px] p-3 border px-4"
              style="background: #ffffff"
              :disabled="currentPage === 1"
              @click="changePage(currentPage - 1)"
            >
              <i class="bi bi-chevron-left"></i>
            </button>
            &nbsp;&nbsp;
            <button
              class="btn btn-sm mr-2 rounded-[12px] border border-[1px] p-3 border px-4 cursor-none fw-bolder"
              style="background: #ffffff; color: #f9944b"
            >
              {{ currentPage }}
            </button>
            &nbsp;&nbsp;
            <button
              class="btn btn-sm ml-2 rounded-[12px] border border-[1px] p-3 border px-4"
              style="background: #ffffff"
              :disabled="currentPage === totalPages"
              @click="changePage(currentPage + 1)"
            >
              <i class="bi bi-chevron-right"></i>
            </button>
          </div>
        </div>
        <loader :isLoading="isLoading"></loader>
      </div>
    </div>
    <SignedTimesheetViewVue
      :id="selectedSignedTimesheetId"
      @SignTimeSheetData-updated="signedTimeSheetMethod"
    />

    <SuccessAlert ref="successAlert" />
  </div>
</template>
<script>
import axios from "axios";
import Navbar from "../Navbar.vue";
import SuccessAlert from "../Alerts/SuccessAlert.vue";
import SignedTimesheetViewVue from "../modals/TimeSheet/SignedTimesheetView.vue";
import Loader from "../Loader/Loader.vue";

const axiosInstance = axios.create({
  headers: {
    "Cache-Control": "no-cache",
  },
});

export default {
  data() {
    return {
      currentView: "monthly",
      daysOfWeek: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      startDate: new Date(),
      endDate: new Date(),
      currentDate: new Date(),
      client_id: "",
      clientData: [],
      site_id: "",
      businessUnit: [],
      candidateLists: [],
      selectedRow: null,
      isLoading: false,
      id: "",
      selectedCandidate: "",
      business_unit_value: "",
      selectedSignedTimesheetId: "",
      getSignedTimeSheetData: [],
      searchQuery: null,
      debounceTimeout: null,
      searchResults: [],
      errorMessage: "",
      errorMessageSigned: "",
      currentPage: 1,
      itemsPerPage: 10,
      totalRecords: 0,
      errorMessageFilter: "",
    };
  },
  components: {
    Navbar,
    SignedTimesheetViewVue,
    Loader,
    SuccessAlert,
  },
  computed: {
    paginateCandidates() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.getSignedTimeSheetData.slice(startIndex, endIndex);
    },
    paginateSearchResults() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.searchResults.slice(startIndex, endIndex);
    },
    totalRecordsOnPage() {
      return this.paginateCandidates.length;
    },
    getWeekDates() {
      const currentDate = new Date();
      const weekStart = new Date(currentDate);
      weekStart.setDate(currentDate.getDate() - currentDate.getDay());
      const weekDates = [];
      for (let i = 0; i < 7; i++) {
        const date = new Date(weekStart);
        date.setDate(weekStart.getDate() + i);
        weekDates.push(date.getDate());
      }
      return weekDates;
    },

    getMonthDates() {
      const currentDate = new Date();
      const daysInMonth = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() + 1,
        0
      ).getDate();
      const monthDates = Array.from({ length: daysInMonth }, (_, i) => i + 1);
      return monthDates;
    },
    selectBusinessUnit() {
      const site_id = this.businessUnit.find(
        (option) => option.id === this.site_id
      );
      return site_id ? site_id.site_name : "";
    },

    selectClients() {
      const client_id = this.clientData.find(
        (option) => option.id === this.client_id
      );
      return client_id ? client_id.client_name : "";
    },

    selectCandidateList() {
      const candidate = this.candidateLists.find(
        (option) => option.first_name === this.selectedCandidate
      );
      return candidate ? `${candidate.first_name} ${candidate.last_name}` : "";
    },
  },
  watch: {},

  methods: {
    toggleActionMenu(index) {
      this.selectedRow = this.selectedRow === index ? null : index;
    },
    async ApproveMethod(id) {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.put(
          `${VITE_API_URL}/approved_and_unapproved_timesheet_to_web/${id}`,
          {},
          {
            headers: {
              "content-type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200 && response.data.message) {
          const message = response.data.message;
          this.$refs.successAlert.showSuccess(message);
          this.signedTimeSheetMethod();
        }
      } catch (error) {
        // Handle the error if needed
        // console.error("Error approving timesheet:", error);
      }
    },
    debounceSearch() {
      clearTimeout(this.debounceTimeout);

      this.debounceTimeout = setTimeout(() => {
        this.searchQuery = this.searchQuery.trim();
        this.search();
      }, 100);
    },
    //search api start

    async search() {
      try {
        this.searchResults = [];
        const modifiedSearchQuery = this.searchQuery.replace(/ /g, "_");
        const response = await axiosInstance.get(
          `${VITE_API_URL}/sign_timesheet_searching/${modifiedSearchQuery}`
        );

        this.searchResults = response.data.sign_timesheets;
      } catch (error) {
        if (
          (error.response && error.response.status === 404) ||
          error.response.status === 400
        ) {
          this.errorMessage = "No Staff found for the specified criteria";
        }
      }
    },
    openSignedView(id) {
      this.selectedSignedTimesheetId = id;
    },

    async getCandidateListMethod() {
      try {
        const response = await axios.get(`${VITE_API_URL}/candidates`);
        this.candidateLists = response.data.data;
        this.candidateStatus = response.data.data.status;
      } catch (error) {
        if (error.response) {
          if (error.response.status == 404) {
            // alert(error.response.data.message);
          }
        }
      }
    },
    async getBusinessUnitMethod() {
      try {
        const response = await axios.get(`${VITE_API_URL}/activated_site`);
        this.businessUnit = response.data.data;
      } catch (error) {
        if (error.response) {
          if (error.response.status == 404) {
            // alert(error.response.data.message);
          }
        }
      }
    },
    async getClientMethod() {
      try {
        const response = await axios.get(`${VITE_API_URL}/clients`);
        this.clientData = response.data.data;
      } catch (error) {
        if (error.response) {
          if (error.response.status == 404) {
            // alert(error.response.data.message);
          }
        }
      }
    },

    updateDateRange() {
      const currentDate = new Date();
      if (this.currentView === "weekly") {
        const weekStart = new Date(this.startDate);
        weekStart.setDate(this.startDate.getDate() - this.startDate.getDay());
        this.startDate = weekStart;
        this.endDate = new Date(weekStart);
        this.endDate.setDate(this.endDate.getDate() + 6);
      } else if (this.currentView === "monthly") {
        const currentDate = new Date();
        this.startDate = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          1
        );
        this.endDate = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth() + 1,
          0
        );
      }

      localStorage.setItem("startDate", this.startDate.toISOString());
      localStorage.setItem("endDate", this.endDate.toISOString());
    },
    loadDateRangeFromLocalStorage() {
      const storedStartDate = localStorage.getItem("startDate");
      const storedEndDate = localStorage.getItem("endDate");

      if (storedStartDate && storedEndDate) {
        this.startDate = new Date(storedStartDate);
        this.endDate = new Date(storedEndDate);
      }
    },
    formatDate(date) {
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    },
    async changePage(page) {
      this.currentPage = page;
      await this.signedTimeSheetMethod();
    },
    setItemsPerPage(value) {
      this.itemsPerPage = value;
      this.currentPage = 1;
      this.signedTimeSheetMethod();
    },
    async signedTimeSheetMethod() {
      this.isLoading = true;
      const token = localStorage.getItem("token");
      const startOfMonth = new Date(
        this.startDate.getFullYear(),
        this.startDate.getMonth(),
        1
      );
      const endOfMonth = new Date(
        this.endDate.getFullYear(),
        this.endDate.getMonth() + 1,
        0
      );

      const formattedStartDate = startOfMonth.toLocaleDateString("en-GB");

      const formattedEndDate = endOfMonth.toLocaleDateString("en-GB");
      const requestData = {
        date: formattedStartDate,
        per_page: this.itemsPerPage,
        // end_date: endOfMonth.toLocaleDateString(),
      };

      try {
        const response = await axios.get(
          `${VITE_API_URL}/find_sign_timesheet_according_mounth`,
          {
            params: requestData,
            headers: {
              Authorization: "bearer " + token,
            },
          }
        );

        this.getSignedTimeSheetData = response.data.sign_timesheets;

        if (this.getSignedTimeSheetData.length === 0) {
          this.errorMessageSigned =
            "No signed timesheets found for the specified criteria";
        } else {
          this.errorMessageSigned = "Report Not Found!";
        }
      } catch (error) {
        // console.error("Error fetching signed timesheets:", error);
        // this.errorMessage = "Error fetching signed timesheets";
      } finally {
        this.isLoading = false;
      }
    },
    formatMonthYear(date) {
      return new Intl.DateTimeFormat("en-US", {
        month: "long",
        year: "numeric",
      }).format(date);
    },
    moveToPrevious() {
      if (this.currentView === "monthly") {
        this.startDate = new Date(
          this.startDate.getFullYear(),
          this.startDate.getMonth() - 1,
          1
        );

        this.endDate = new Date(
          this.startDate.getFullYear(),
          this.startDate.getMonth() + 1,
          0
        );

        this.currentDate = new Date(this.startDate);
        this.signedTimeSheetMethod();
      }
    },
    moveToNext() {
      if (this.currentView === "monthly") {
        this.startDate = new Date(
          this.startDate.getFullYear(),
          this.startDate.getMonth() + 1,
          1
        );

        this.endDate = new Date(
          this.startDate.getFullYear(),
          this.startDate.getMonth() + 1,
          0
        );

        this.currentDate = new Date(this.startDate);
        this.signedTimeSheetMethod();
      }
    },
  },
  async beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.signedTimeSheetMethod();
    });
  },
  async beforeRouteUpdate(to, from, next) {
    this.signedTimeSheetMethod();
    next();
  },
  async mounted() {
    this.currentView = "monthly";
    this.updateDateRange();
    await this.getBusinessUnitMethod();

    await this.getClientMethod();

    await this.getCandidateListMethod();
    await this.signedTimeSheetMethod();
    // this.loadDateRangeFromLocalStorage();
    // const currentDate = new Date();
    // const startOfWeek = new Date(currentDate);
    // startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay() + 1);
    // this.startDate = startOfWeek;

    // const endOfWeek = new Date(currentDate);
    // endOfWeek.setDate(endOfWeek.getDate() + (7 - endOfWeek.getDay()));
    // this.endDate = endOfWeek;
  },
};
</script>

<style scoped>
#main {
  transition: all 0.3s;

  background-color: #f9f9f9;
}
.main-content {
  transition: all 0.3s;
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
select {
  padding: 10px;
  border-radius: 4px;
  border: 0px;
  border: 1px solid rgb(202, 198, 198);
}

.shadow-soft {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  border-radius: 12px;
  background-color: white;
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

button.nav-link > li.nav-item {
  border-bottom: 2px solid red;
  padding-bottom: 5px;
}

.form-select {
  width: auto;
}

input::-webkit-input-placeholder {
  margin-left: 5px;
}

@media (max-width: 1120px) {
  .candidateTable {
    width: 1090px;
  }
  .wrapper-timeSheet {
    overflow-x: scroll;
  }
}
</style>
