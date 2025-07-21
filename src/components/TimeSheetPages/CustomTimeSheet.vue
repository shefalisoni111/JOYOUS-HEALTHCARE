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
      <div class="container-fluid ps-5 pt-5">
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
                  Weekly Timesheet /
                  <router-link
                    class="nav-link d-inline fw-bolder"
                    style="color: #000000"
                    aria-current="page"
                    to="/timesheet/custom"
                    >Custom Timesheet</router-link
                  >
                  / Signed Timesheet
                </p>
              </li>
            </ol>
          </div>
        </div>

        <div class="pt-3">
          <div class="d-flex justify-content-between">
            <div class="d-flex align-items-center justify-content-between">
              <i
                class="bi bi-caret-left-fill"
                @click="moveToPrevious"
                style="cursor: pointer"
              ></i>
              &nbsp;
              <img
                src="../../assets/calender.png"
                class="img-fluid pe-2"
                alt="calender"
                loading="eager"
              />
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
              <button
                type="button"
                class="btn btn-danger text-nowrap btn-lg"
                @click="toggleFilters"
              >
                <i class="bi bi-funnel"></i>
                Show Filters
              </button>
              <input
                ref="fileInput"
                id="fileAll"
                type="file"
                accept=".csv"
                style="display: none"
                @change="handleFileUpload"
              />

              <button
                class="nav-item dropdown btn btn-lg text-nowrap dropdown-toggle"
                type="button"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                style="
                  border-radius: 8px;
                  background: rgb(249, 148, 75);
                  color: rgb(255, 255, 255);
                "
              >
                <!-- <i class="bi bi-download"></i>  -->
                Export

                <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li>
                    <!-- Hide the default file input -->
                    <label
                      for="fileAll"
                      class="custom-file-label dropdown-item"
                      style="border-radius: 0px; cursor: pointer"
                      @click="triggerFileInput"
                    >
                      Import
                    </label>
                  </li>
                  <li><hr class="dropdown-divider" /></li>
                  <li>
                    <a
                      class="dropdown-item"
                      href="#"
                      @click="exportOneFile('selected')"
                      >Export</a
                    >
                  </li>
                  <li><hr class="dropdown-divider" /></li>
                  <li>
                    <a
                      class="dropdown-item"
                      href="#"
                      @click="exportOneFile('all')"
                      >Export All</a
                    >
                  </li>
                </div>
              </button>
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

          <div
            class="d-flex gap-2 mb-3 justify-content-between"
            v-if="showFilters"
          >
            <div
              class="d-flex gap-2 flex-column position-absolute"
              style="
                transform: translate(150%, 21%);
                background: rgb(255, 255, 255);
                padding: 8px 13px 9px 13px;
                border-radius: 10px;
                box-shadow: 0px 4px 40px 0px #0000000d;
                z-index: 1;
              "
            >
              <div></div>

              <select
                v-model="selectedSiteName"
                id="selectBusinessUnit"
                @change="filterData"
              >
                <option value="" disabled>All Site</option>
                <option
                  v-for="option in businessUnit"
                  :key="option.id"
                  :value="option.site_name"
                  placeholder="Select BusinessUnit"
                >
                  {{ option.site_name }}
                </option>
              </select>

              <select
                v-model="selectedCandidate"
                id="selectCandidateList"
                @change="filterData"
              >
                <option value="" disabled>All Staff</option>
                <option
                  v-for="option in candidateLists"
                  :key="option.id"
                  :value="option.id"
                >
                  {{ option.first_name }} {{ option.last_name }}
                </option>
              </select>
              <input
                class="form-control"
                type="search"
                placeholder="Search CustomTimesheet..."
                aria-label="Search"
                v-model="localSearchQuery"
                @input="filterData"
              />
              <div>
                <button
                  @click="resetFilter"
                  class="btn btn-secondary"
                  :disabled="
                    !selectedSiteName && !selectedCandidate && !localSearchQuery
                  "
                >
                  Reset Filters
                </button>
              </div>
            </div>
          </div>

          <div
            class="tab-content mt-4"
            id="pills-tabContent"
            v-if="!searchQuery"
          >
            <div
              class="tab-pane fade show active"
              id="pills-home"
              role="tabpanel"
              aria-labelledby="pills-home-tab"
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
                      <th scope="col" style="width: 153px">Staff</th>
                      <th scope="col">Client</th>
                      <th scope="col">Site</th>
                      <th scope="col">Job Position</th>
                      <th scope="col">Shift</th>
                      <th scope="col">Date</th>
                      <th scope="col">Start Time</th>
                      <th scope="col">End Time</th>
                      <th scope="col">Break</th>
                      <th scope="col">Total Hours</th>
                      <!-- <th scope="col">Client Rate</th>
                            <th scope="col">Total Cost</th>
                            <th scope="col">Paper TimeSheet</th> -->
                      <th scope="col">Status</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>

                  <tbody v-if="paginateGetCustomTimeSheet?.length > 0">
                    <tr
                      v-for="(data, index) in paginateGetCustomTimeSheet"
                      :key="index"
                      @click="toggleActionMenu(index)"
                      @mouseleave="selectedRow = null"
                    >
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          :value="data.id"
                          :id="data.id"
                          v-model="checkedSites[data.id]"
                          @change="handleCheckboxChange(data.id)"
                        />
                      </td>
                      <!-- <td scope="col">{{ data.id }}</td> -->
                      <td scope="col">{{ data.code }}</td>
                      <td scope="col">
                        <router-link
                          v-if="data && data.candidate_id"
                          class="text-black text-decoration-none fw-bold"
                          :to="{
                            name: 'Profile',
                            params: { id: data.candidate_id },
                          }"
                          >{{ data.name }}</router-link
                        >
                      </td>
                      <td scope="col">
                        <router-link
                          v-if="data && data.site_id_and_client_id?.client_id"
                          class="text-black text-decoration-none fw-bold"
                          :to="{
                            name: 'SingleClientProfile',
                            params: {
                              id: data.site_id_and_client_id.client_id,
                            },
                          }"
                          >{{
                            data.site_id_and_client_id?.client_name
                          }}</router-link
                        >
                      </td>
                      <td scope="col">
                        <router-link
                          v-if="data && data.site_id_and_client_id?.site_id"
                          class="text-black text-decoration-none fw-bold"
                          :to="{
                            name: 'SingleSiteprofile',
                            params: { id: data.site_id_and_client_id.site_id },
                          }"
                        >
                          {{ data.site }}
                        </router-link>

                        <span
                          v-else
                          class="text-black text-decoration-none fw-bold"
                        >
                          {{ data.site }}
                        </span>
                      </td>
                      <td scope="col">{{ data.job }}</td>
                      <td scope="col">{{ data.shift_name }}</td>
                      <td scope="col">{{ data.shift_date }}</td>
                      <td scope="col">
                        {{ data.start_time }}
                      </td>
                      <td scope="col">
                        {{ data.end_time }}
                      </td>
                      <td scope="col">
                        {{ data.break }}
                      </td>
                      <td scope="col">
                        {{ data.total_hours }}
                      </td>

                      <td scope="col">
                        <button
                          type="button"
                          :class="['btn', 'text-nowrap']"
                          :style="
                            data.status === 'Approved'
                              ? { backgroundColor: '#E9FAEF', color: '#24D164' }
                              : {
                                  backgroundColor: 'rgb(255 227 234)',
                                  color: '#FF3B30',
                                }
                          "
                          @click="ApproveMethod(data.id)"
                        >
                          {{
                            data.status === "Approved"
                              ? "Approved"
                              : "Unapprove"
                          }}
                        </button>
                      </td>
                      <td scope="col">
                        <div class="action-wrapper">
                          <i class="bi bi-three-dots dot-icon"></i>

                          <div v-if="selectedRow === index" class="action-menu">
                            <button
                              type="button"
                              class="btn btn-default text-nowrap border-0 shadow-soft"
                              data-bs-toggle="modal"
                              data-bs-target="#editCustomTimeSheet"
                              @click="openEditModal(data.id)"
                            >
                              <i
                                class="bi bi-pencil-square"
                                style="color: #f9944b"
                              ></i>
                              Edit
                            </button>
                          </div>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                  <tbody v-else>
                    <tr v-if="!isLoading">
                      <td colspan="15" class="text-danger text-center">
                        {{ errorMessageCustom }}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div
              class="tab-pane fade"
              id="pills-profile"
              role="tabpanel"
              aria-labelledby="pills-profile-tab"
            >
              ...
            </div>
          </div>
          <div
            class="tab-content mt-4"
            id="pills-tabContent"
            v-if="searchQuery"
          >
            <div
              class="tab-pane fade show active"
              id="pills-home"
              role="tabpanel"
              aria-labelledby="pills-home-tab"
            >
              <div class="col-12 wrapper-timeSheet">
                <table class="table candidateTable">
                  <thead>
                    <tr>
                      <th scope="col">Ref Code</th>
                      <th scope="col" style="width: 153px">Staff</th>
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
                    <tr v-for="data in paginateSearchResults" :key="data.id">
                      <td scope="col">{{ data.code }}</td>
                      <td scope="col">
                        <router-link
                          v-if="data && data.candidate_id"
                          class="text-black text-decoration-none fw-bold"
                          :to="{
                            name: 'Profile',
                            params: { id: data.candidate_id },
                          }"
                          >{{ data.name }}</router-link
                        >
                      </td>
                      <td scope="col">
                        <router-link
                          v-if="data && data.site_id_and_client_id?.client_id"
                          class="text-black text-decoration-none fw-bold"
                          :to="{
                            name: 'SingleClientProfile',
                            params: {
                              id: data.site_id_and_client_id.client_id,
                            },
                          }"
                          >{{
                            data.site_id_and_client_id?.client_name
                          }}</router-link
                        >
                      </td>
                      <td scope="col">
                        <router-link
                          v-if="data && data.site_id_and_client_id?.site_id"
                          class="text-black text-decoration-none fw-bold"
                          :to="{
                            name: 'SingleSiteprofile',
                            params: { id: data.site_id_and_client_id.site_id },
                          }"
                        >
                          {{ data.site }}
                        </router-link>

                        <span
                          v-else
                          class="text-black text-decoration-none fw-bold"
                        >
                          {{ data.site }}
                        </span>
                      </td>
                      <td scope="col">{{ data.job }}</td>
                      <td scope="col">{{ data.shift_name }}</td>
                      <td scope="col">{{ data.shift_date }}</td>
                      <td scope="col">
                        {{ data.start_time }}
                      </td>
                      <td scope="col">
                        {{ data.end_time }}
                      </td>
                      <td scope="col">
                        {{ data.break }}
                      </td>
                      <td scope="col">
                        {{ data.total_hours }}
                      </td>

                      <td scope="col">
                        <button
                          type="button"
                          :class="['btn', 'text-nowrap']"
                          :style="
                            data.status === 'Approved'
                              ? { backgroundColor: '#E9FAEF', color: '#24D164' }
                              : {
                                  backgroundColor: 'rgb(255 227 234)',
                                  color: '#FF3B30',
                                }
                          "
                          @click="ApproveMethod(data.id)"
                        >
                          {{
                            data.status === "Approved"
                              ? "Approved"
                              : "Unapprove"
                          }}
                        </button>
                      </td>
                      <td scope="col">
                        <div
                          class="action-wrapper"
                          @mouseenter="hover = true"
                          @mouseleave="hover = false"
                        >
                          <i class="bi bi-three-dots dot-icon"></i>

                          <div v-if="hover" class="action-menu">
                            <button
                              type="button"
                              class="btn text-nowrap text-nowrap shadow-soft"
                              data-bs-toggle="modal"
                              data-bs-target="#editCustomTimeSheet"
                              data-bs-whatever="@mdo"
                              @click="openEditModal(data.id)"
                            >
                              <i
                                class="bi bi-pencil-square"
                                style="color: #f9944b"
                              ></i>
                              Edit
                            </button>
                          </div>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                  <tbody v-else>
                    <tr v-if="!isLoading">
                      <td colspan="15" class="text-danger text-center">
                        {{ errorMessage }}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div
              class="tab-pane fade"
              id="pills-profile"
              role="tabpanel"
              aria-labelledby="pills-profile-tab"
            >
              ...
            </div>
          </div>
          <div
            class="mx-3 mb-2 d-flex justify-content-between"
            v-if="getCustomTimeSheet?.length >= 10 && !searchResults.length"
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
              <ul
                class="dropdown-menu"
                aria-labelledby="recordsPerPageDropdown"
              >
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
                  <a
                    class="dropdown-item"
                    href="#"
                    @click="setItemsPerPage(100)"
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
              <ul
                class="dropdown-menu"
                aria-labelledby="recordsPerPageDropdown"
              >
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
                  <a
                    class="dropdown-item"
                    href="#"
                    @click="setItemsPerPage(100)"
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
        </div>
        <loader :isLoading="isLoading"></loader>
      </div>
    </div>
    <CustomeTimeSheetEdit
      :customDataId="selectedCustomTimesheetId"
      @CustomTimeSheetData-updated="getCustomSheetMethod"
      ref="customEdit"
    />

    <!-- <PaperTimeSheetViewVue :customDataId="selectedCustomTimesheetId" /> -->
  </div>
</template>
<script>
import axios from "axios";
import Navbar from "../Navbar.vue";
import CustomeTimeSheetEdit from "../modals/TimeSheet/CustomeTimeSheetEdit.vue";
import Loader from "../Loader/Loader.vue";
import { reactive } from "vue";

// import PaperTimeSheetViewVue from "../modals/TimeSheet/PaperTimeSheetView.vue";
import Swal from "sweetalert2";
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
      selectedRow: null,
      getCustomTimeSheet: [],
      currentDate: new Date(),
      notes: "",
      start_time: "",
      end_time: "",
      paper_timesheet: "",
      currentPage: 1,
      totalPages: 0,
      itemsPerPage: 10,
      selectedCustomTimesheetId: null,
      searchQuery: null,
      debounceTimeout: null,
      searchResults: [],
      errorMessage: "",
      showFilters: false,
      errorMessageCustom: "",
      site_id: "",
      businessUnit: [],
      candidateLists: [],
      checkedSites: reactive({}),
      custom_sheet_ids: [],
      id: "",
      selectedCandidate: "",
      selectedSiteName: "",
      localSearchQuery: this.searchQuery,
      isLoading: false,
    };
  },
  created() {
    this.custom_sheet_ids = this.getCustomTimeSheet.map((data) => data.id);

    this.getCustomTimeSheet.forEach((data) => {
      this.$set(this.checkedSites, data.id, false);
    });
  },
  components: {
    Navbar,
    CustomeTimeSheetEdit,
    Loader,
  },
  computed: {
    isSaveDisabled() {
      return (
        !this.notes ||
        !this.paper_timesheet ||
        !this.start_time ||
        !this.end_time
      );
    },
    fullPaperTimeSheetUrl() {
      return (paper_timesheet) => {
        return paper_timesheet ? `${VITE_API_URL}${paper_timesheet}` : "";
      };
    },
    paginateGetCustomTimeSheet() {
      if (!this.getCustomTimeSheet) return [];
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.getCustomTimeSheet.slice(startIndex, endIndex);
    },
    // paginateSearchResults() {
    //   const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    //   const endIndex = startIndex + this.itemsPerPage;
    //   return this.searchResults.slice(startIndex, endIndex);
    // },
    // totalRecordsOnPage() {
    //   return this.paginateGetCustomTimeSheet.length;
    // },
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

    selectCandidateList() {
      const candidate = this.candidateLists.find(
        (option) => option.id === this.selectedCandidate
      );
      return candidate ? `${candidate.first_name} ${candidate.last_name}` : "";
    },
  },

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
          this.getCustomSheetMethod();
        }
      } catch (error) {
        // Handle the error if needed
        // console.error("Error approving timesheet:", error);
      }
    },
    viewPaperSheet(customDataId, event) {
      event.stopPropagation();
      this.selectedCustomTimesheetId = customDataId;
    },
    toggleFilters() {
      this.showFilters = !this.showFilters;
    },
    debounceSearch() {
      clearTimeout(this.debounceTimeout);

      this.debounceTimeout = setTimeout(() => {
        this.search();
      }, 100);
    },
    //search api start

    async search() {
      try {
        this.searchResults = [];
        const modifiedSearchQuery = this.searchQuery.replace(/ /g, "_");
        const response = await axiosInstance.get(
          `${VITE_API_URL}/custom_timesheet_searching/${modifiedSearchQuery}`
        );

        this.searchResults = response.data.custom_sheets;
      } catch (error) {
        if (
          (error.response && error.response.status === 404) ||
          error.response.status === 400
        ) {
          this.errorMessage = "No Staff found for the specified criteria";
        }
      }
    },
    async getCandidateListMethod() {
      try {
        let candidateLists = [];
        let currentPage = 1;
        const itemsPerPage = 10;
        let totalPages = 1;

        do {
          const response = await axios.get(`${VITE_API_URL}/candidates`, {
            params: {
              page: currentPage,
              per_page: itemsPerPage,
              status_value: "approved",
              activated_value: true,
            },
          });

          candidateLists = [...candidateLists, ...response.data.data];

          totalPages = response.data.total_pages;

          currentPage++;
        } while (currentPage <= totalPages);

        this.candidateLists = candidateLists;
      } catch (error) {
        if (error.response) {
          if (error.response.status == 404) {
          }
        } else {
          // console.error("Error fetching candidates:", error);
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

    openEditModal(customDataId) {
      this.selectedCustomTimesheetId = customDataId;
      // this.$refs.customEdit.fetchCustomTimeSheetData(customDataId);
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
      // Save the values to localStorage
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
    handleCheckboxChange(dataId) {
      if (this.checkedSites[dataId]) {
        this.custom_sheet_ids.push(dataId);
      } else {
        const index = this.custom_sheet_ids.indexOf(dataId);
        if (index !== -1) {
          this.custom_sheet_ids.splice(index, 1);
        }
      }
    },
    async filterData() {
      const params = {
        page: 1,
      };

      if (this.selectedSiteName) {
        params["custom_timesheet[site]"] = this.selectedSiteName;
      }

      if (this.selectedCandidate) {
        params["custom_timesheet[name]"] = this.selectedCandidate;
      }
      if (this.localSearchQuery) {
        params.search = this.localSearchQuery;
      }

      try {
        const response = await axios.get(
          `${VITE_API_URL}/filter_custom_timesheet`,
          {
            params,
          }
        );
        this.getCustomTimeSheet = response.data.custom_timesheets || [];
      } catch (error) {
        // console.error("Error fetching filtered data:", error);
      }
    },
    resetFilter() {
      this.selectedSiteName = null;
      this.selectedCandidate = null;
      this.localSearchQuery = "";

      this.filterData();
    },
    triggerFileInput() {
      this.$refs.fileInput.click();
    },
    handleFileUpload(event) {
      const file = event.target.files[0];
      if (!file) return;

      const isValidFileType = file.type === "text/csv";
      if (!isValidFileType) {
        Swal.fire({
          icon: "warning",
          title: "No File Selected",
          text: "Please select a CSV file.",
          confirmButtonText: "OK",
        });
        return;
      }

      const formData = new FormData();
      formData.append("file", file);
      axios
        .post(`${VITE_API_URL}/filter_custom_timesheet`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          const message = "Import Successfully";
          this.$refs.successAlert.showSuccess(message);
          this.ImportCSV(response.data, file.name);
        })
        .catch((error) => {
          // Handle error
          // console.log(error);
        });
    },
    exportOneFile(exportType) {
      let queryParams = {
        format: "csv",
      };

      if (this.selectedSiteName) {
        queryParams["custom_timesheet[site]"] = this.selectedSiteName;
      }

      if (this.selectedCandidate) {
        queryParams["custom_timesheet[name]"] = this.selectedCandidate;
      }
      if (this.localSearchQuery) {
        queryParams.search = this.localSearchQuery;
      }

      if (exportType === "all") {
        queryParams.custom_sheet_ids = [];
      } else {
        if (!this.custom_sheet_ids || this.custom_sheet_ids.length === 0) {
          // alert("Please select at least one Site.");
          Swal.fire({
            icon: "warning",
            title: "No File Selected",
            text: "Please select at least one Site.",
            confirmButtonText: "OK",
          });
          return;
        }
        if (this.custom_sheet_ids.length > 0) {
          queryParams.custom_sheet_ids = this.custom_sheet_ids;
        } else {
          queryParams.custom_sheet_ids = [];
        }
      }
      // const filterName = this.getFilterName(this.selectedFilter);
      // const filename = `${filterName}_Sites.csv`;
      return axios
        .get(`${VITE_API_URL}/filter_custom_timesheet`, {
          params: queryParams,
          headers: {
            Accept: "text/csv",
          },
          responseType: "blob",
        })
        .then((response) => {
          this.blobToText(response.data)
            .then((csvData) => {
              const filename = "CustomTimesheetData.csv";
              this.downloadOneCSV(csvData, filename);
              const message = "Export file downloaded successfully";
              this.$refs.successAlert.showSuccess(message);
              this.custom_sheet_ids = [];
              for (let key in this.checkedSites) {
                this.checkedSites[key] = false;
              }
            })
            .catch((error) => {});
        })
        .catch((error) => {})
        .finally(() => {
          this.custom_sheet_ids = [];
        });
    },
    blobToText(blob) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
          resolve(reader.result);
        };
        reader.onerror = reject;
        reader.readAsText(blob);
      });
    },

    combineCsvData(csvDataArray) {
      let combinedCsvData = "";
      csvDataArray.forEach((csvData, index) => {
        if (index > 0) {
          const lines = csvData.split("\n");
          lines.shift();
          csvData = lines.join("\n");
        }

        combinedCsvData += csvData;
        if (index < csvDataArray.length - 1) {
          combinedCsvData += "\n";
        }
      });
      return combinedCsvData;
    },
    downloadOneCSV(csvData, filename) {
      const blob = new Blob([csvData], { type: "text/csv" });

      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = filename;

      document.body.appendChild(a);
      a.click();

      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    },

    ImportCSV(csvData, filename) {
      const blob = new Blob([csvData], { type: "text/csv;charset=utf-8" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    },
    async changePage(page) {
      this.currentPage = page;
      await this.getCustomSheetMethod();
    },
    setItemsPerPage(value) {
      this.itemsPerPage = value;
      this.currentPage = 1;
      this.getCustomSheetMethod();
    },
    async getCustomSheetMethod() {
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
      const formatDate = (date) => {
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const day = date.getDate().toString().padStart(2, "0");
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
      };
      const requestData = {
        date: formatDate(startOfMonth),
        per_page: this.itemsPerPage,
        page: this.currentPage,
        // end_date: endOfMonth.toLocaleDateString(),
      };
      this.isLoading = true;
      try {
        const response = await axios.get(
          `${VITE_API_URL}/find_custom_timesheet_according_mounth`,
          {
            params: requestData,
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        this.getCustomTimeSheet = response.data.custom_timesheets;
        this.totalRecords = response.data.total_record || 0;
        this.totalPages = Math.ceil(this.totalRecords / this.itemsPerPage);
        if (this.getCustomTimeSheet.length === 0) {
          this.errorMessageCustom =
            "No Custom timesheets found for the specified month";
        } else {
          this.errorMessageCustom =
            "No Custom timesheets found for the specified month";
        }
      } catch (error) {
        // console.error("Error fetching custom timesheets:", error);
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

        this.getCustomSheetMethod();
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

        this.getCustomSheetMethod();
      }
    },
  },
  async beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.updateDateRange();
      vm.getCustomSheetMethod();
      vm.getBusinessUnitMethod();
      vm.getCandidateListMethod();
    });
  },
  async beforeRouteUpdate(to, from, next) {
    this.updateDateRange();
    this.getCustomSheetMethod();
    this.getBusinessUnitMethod();

    this.getCandidateListMethod();
    next();
  },
  async mounted() {
    this.currentView = "monthly";
    this.updateDateRange();
    this.getCustomSheetMethod();
    this.getBusinessUnitMethod();

    this.getCandidateListMethod();
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
select {
  padding: 10px;
  border-radius: 4px;
  border: 0px;
  border: 1px solid rgb(202, 198, 198);
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

.action-wrapper {
  position: relative;
  display: inline-block;
}

.dot-icon {
  font-size: 18px;
  cursor: pointer;
  color: #888;
}

.shadow-soft {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  border-radius: 12px;
  background-color: white;
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
