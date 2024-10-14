<template>
  <div>
    <Navbar />
    <div id="main">
      <div class="pagetitle d-flex justify-content-between px-2">
        <div class="py-3">
          <ol class="breadcrumb mb-1">
            <li class="breadcrumb-item active text-uppercase fs-6">
              <router-link class="nav-link d-inline" aria-current="page" to="/home"
                >Dashboard</router-link
              >
              / <span class="color-fonts">Booking</span>
            </li>
          </ol>
        </div>
      </div>

      <div class="container-fluid pt-3">
        <div class="row">
          <div class="col-12">
            <div class="">
              <div class="d-flex justify-content-between">
                <div class="p-2">
                  <div class="d-flex justify-content-between">
                    <div class="d-flex">
                      <!-- <div class="d-flex align-items-center gap-2">
                          <select
                            class="form-control"
                            v-model="currentView"
                            @change="updateDateRange"
                          >
                            <option value="weekly">Weekly</option>
                            <option value="monthly">Monthly</option>
                          </select>
                        </div> -->

                      &nbsp;&nbsp;
                      <div class="d-flex align-items-center">
                        <span
                          v-if="currentView === 'weekly' && startDate && endDate"
                          class="fw-bold"
                        >
                          {{
                            "Monday " +
                            formatDate(startDate) +
                            " to Sunday " +
                            formatDate(endDate)
                          }}
                        </span>
                        <span
                          v-else-if="currentView === 'monthly' && startDate && endDate"
                          class="fw-bold"
                        >
                          {{ formatDate(startDate) + " to " + formatDate(endDate) }}
                        </span>
                      </div>
                      &nbsp;&nbsp;
                      <div class="d-flex align-items-center fs-4">
                        <i class="bi bi-caret-left-fill" @click="moveToPrevious"></i>
                        <i class="bi bi-calendar2-check-fill"></i>
                        <i class="bi bi-caret-right-fill" @click="moveToNext"></i>
                      </div>
                    </div>

                    <div class="d-flex gap-3 align-items-center"></div>
                  </div>
                </div>
                <!-- <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
                     
                    </ul> -->
                <div v-if="currentView === 'weekly'">
                  <div>
                    <div v-for="(day, index) in daysOfWeek" :key="index"></div>
                    <div v-for="(day, index) in getWeekDates" :key="index"></div>
                  </div>
                </div>

                <div v-else-if="currentView === 'monthly'">
                  <div>
                    <div v-for="(day, index) in getMonthDates" :key="index"></div>
                  </div>
                </div>
                <div class="d-flex gap-2">
                  <div class="d-flex justify-content-end align-items-center">
                    <div class="d-flex align-items-center gap-2 justify-content-between">
                      <div class="searchbox position-relative">
                        <form
                          @submit.prevent="search"
                          class="form-inline my-2 my-lg-0 d-flex align-items-center justify-content-between gap-2"
                        >
                          <input
                            class="form-control mr-sm-2"
                            type="search"
                            placeholder="Search.."
                            aria-label="Search"
                            v-model="searchQuery"
                            @input="debounceSearch"
                          />
                        </form>
                      </div>

                      <button
                        type="button"
                        class="btn btn-outline-success text-nowrap"
                        @click="toggleFilters"
                      >
                        <i class="bi bi-funnel"></i>
                        Show Filters
                      </button>
                      <button
                        class="nav-item dropdown btn btn-outline-success text-nowrap dropdown-toggle"
                        type="button"
                        id="navbarDropdown"
                        role="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        :

                        <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                          <li><a class="dropdown-item" href="#">Import</a></li>
                          <li><hr class="dropdown-divider" /></li>
                          <li><a class="dropdown-item" href="#">Export</a></li>
                          <li><hr class="dropdown-divider" /></li>
                          <li>
                            <a class="dropdown-item" href="#">Export All</a>
                          </li>
                        </ul>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div class="d-flex gap-2 mb-3 justify-content-between" v-if="showFilters">
                <div class="d-flex gap-2">
                  <div></div>
                  <select v-model="job_id" id="selectedOptionText" @change="filterData">
                    <option value="">Job Title</option>
                    <option
                      v-for="option in options"
                      :key="option.id"
                      :value="option.name"
                    >
                      {{ option.name }}
                    </option>
                  </select>

                  <select v-model="site_id" id="selectBusinessUnit" @change="filterData">
                    <option value="">All Site</option>
                    <option
                      v-for="option in businessUnit"
                      :key="option.id"
                      :value="option.site_name"
                      placeholder="Select BusinessUnit"
                    >
                      {{ option.site_name }}
                    </option>
                  </select>

                  <select v-model="id" @change="filterData" id="selectCandidateList">
                    <option value="">All Staff</option>
                    <option
                      v-for="option in candidateLists"
                      :key="option.id"
                      :value="option.first_name"
                      placeholder="Select Staff"
                    >
                      {{ option.first_name + " " + option.last_name }}
                    </option>
                  </select>
                </div>
              </div>
              <ul class="nav nav-pills my-2 gap-2" id="pills-tab" role="tablist">
                <li class="nav-item" role="presentation">
                  <button
                    class="nav-link active"
                    id="pills-AllBooking-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#pills-AllBooking"
                    type="button"
                    role="tab"
                    aria-controls="pills-AllBooking"
                    aria-selected="true"
                  >
                    All Booking
                  </button>
                </li>
              </ul>
              <div class="tab-content mt-2" id="pills-tabContent" v-if="!searchQuery">
                <div
                  class="tab-pane fade show active table-wrapper AllBooking"
                  id="pills-AllBooking"
                  role="tabpanel"
                  aria-labelledby="pills-AllBooking-tab"
                >
                  <table class="table bookingTable">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th scope="col">#Booking Code</th>
                        <th scope="col">Staff</th>
                        <th scope="col">Site</th>
                        <th scope="col">Job Title</th>
                        <th scope="col" style="width: 142px">Shift Dates</th>
                        <th scope="col">Booking By</th>
                        <th scope="col">Booking Date</th>
                        <th scope="col">Start</th>
                        <th scope="col">End</th>
                        <th scope="col">Break</th>
                        <th scope="col">Duration</th>
                        <th scope="col">Notes</th>
                        <!-- <th scope="col">Mailed At</th> -->
                        <th scope="col">Status</th>
                        <th scope="col">Action</th>
                      </tr>
                    </thead>
                    <tbody v-if="getBookingData?.length > 0 && getBookingData">
                      <tr v-for="data in getBookingData" :key="data.id">
                        <td scope="col">{{ data.id }}</td>
                        <td scope="col">{{ data.booking_code }}</td>
                        <td scope="col">{{ data.candidate }}</td>
                        <td scope="col">{{ data.site }}</td>
                        <td scope="col">{{ data.job_title }}</td>
                        <td>
                          <span v-for="(date, index) in data.shift_dates" :key="index">
                            {{ date }}

                            <template v-if="index !== data.shift_dates.length - 1"
                              >,
                            </template>
                          </span>
                        </td>
                        <td scope="col">{{ data.booked_by }}</td>
                        <td scope="col">{{ data.booking_date }}</td>
                        <td scope="col">{{ data.start_time }}</td>
                        <td scope="col">{{ data.end_time }}</td>
                        <td scope="col">{{ data.break }}</td>
                        <td scope="col">{{ data.duration }}</td>
                        <td scope="col">{{ data.notes }}</td>
                        <!-- <td scope="col">
                            {{ data.mailed_at ? data.mailed_at : "null" }}
                          </td> -->
                        <td scope="col">{{ data.status }}</td>
                        <td scope="col">
                          <button class="btn btn-danger">
                            <i
                              class="bi bi-trash text-white"
                              @click="confirmed(data.id)"
                            ></i>
                          </button>
                        </td>
                      </tr>
                    </tbody>
                    <tbody v-else>
                      <tr>
                        <td colspan="15" class="text-danger text-center">
                          {{
                            errorMessageBooking ||
                            errorMessageFilter ||
                            "No bookings found."
                          }}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div class="tab-content mt-4" id="pills-tabContent" v-if="searchQuery">
                <div
                  class="tab-pane fade show active table-wrapper"
                  id="pills-home"
                  role="tabpanel"
                  aria-labelledby="pills-home-tab"
                >
                  <table class="table bookingTable">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th scope="col">#Booking Code</th>
                        <th scope="col">Staff</th>
                        <th scope="col">Site</th>
                        <th scope="col">Job Title</th>
                        <th scope="col" style="width: 142px">Shift Dates</th>
                        <th scope="col">Booking By</th>
                        <th scope="col">Booking Date</th>
                        <th scope="col">Start</th>
                        <th scope="col">End</th>
                        <th scope="col">Break</th>
                        <th scope="col">Duration</th>
                        <th scope="col">Notes</th>
                        <!-- <th scope="col">Mailed At</th> -->
                        <th scope="col">Status</th>
                        <th scope="col">Action</th>
                      </tr>
                    </thead>
                    <tbody v-if="searchResults?.length > 0">
                      <tr v-for="data in searchResults" :key="data.id">
                        <td scope="col">{{ data.id }}</td>
                        <td scope="col">{{ data.booking_code }}</td>
                        <td scope="col">{{ data.candidate }}</td>
                        <td scope="col">{{ data.site }}</td>
                        <td scope="col">{{ data.job_title }}</td>
                        <td>
                          <span v-for="(date, index) in data.shift_dates" :key="index">
                            {{ date }}

                            <template v-if="index !== data.shift_dates.length - 1"
                              >,
                            </template>
                          </span>
                        </td>
                        <td scope="col">{{ data.booked_by }}</td>
                        <td scope="col">{{ data.booking_date }}</td>
                        <td scope="col">{{ data.start_time }}</td>
                        <td scope="col">{{ data.end_time }}</td>
                        <td scope="col">{{ data.break }}</td>
                        <td scope="col">{{ data.duration }}</td>
                        <td scope="col">{{ data.notes }}</td>
                        <!-- <td scope="col">
                            {{ data.mailed_at ? data.mailed_at : "null" }}
                          </td> -->
                        <td scope="col">{{ data.status }}</td>
                        <td scope="col">
                          <button class="btn btn-danger">
                            <i
                              class="bi bi-trash text-white"
                              @click="bookingDeleteMethod(data.id)"
                            ></i>
                          </button>
                        </td>
                      </tr>
                    </tbody>
                    <tbody v-else>
                      <tr>
                        <td
                          colspan="15"
                          class="text-danger text-center"
                          v-if="!isLoading"
                        >
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
    </div>
    <loader :isLoading="isLoading"></loader>
    <SuccessAlert ref="successAlert" />
    <ConfirmationAlert
      :show-modal="isModalVisible"
      :message="confirmMessage"
      @confirm="confirmCallback"
      @cancel="canceled"
    />
    <ShowDetailsMessage v-if="showModal" :message="alertMessage" @close="closeModal" />
  </div>
</template>
<script>
import axios from "axios";
import Navbar from "../components/Navbar.vue";
import Loader from "../components/Loader/Loader.vue";
import SuccessAlert from "../components/Alerts/SuccessAlert.vue";
import ConfirmationAlert from "../components/Alerts/ConfirmationAlert.vue";
import ShowDetailsMessage from "../components/Alerts/ShowDetailsMessage.vue";

const axiosInstance = axios.create({
  headers: {
    "Cache-Control": "no-cache",
  },
});
export default {
  data() {
    return {
      currentTab: "AllBooking",
      currentView: "weekly",
      daysOfWeek: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      startDate: new Date(),
      endDate: new Date(),
      getBookingData: [],
      currentPage: 1,
      itemsPerPage: 10,
      totalRecords: 0,
      deleteBookingDataPage: 1,
      currentPageSearch: 1,
      showFilters: false,
      site_id: "",
      businessUnit: [],
      candidateLists: [],
      id: "",
      selectedCandidate: "",
      business_unit_value: "",
      searchQuery: null,
      debounceTimeout: null,
      searchResults: [],
      errorMessageFilter: "",
      errorMessage: "",
      job_id_value: "",
      job_id: "",
      options: [],

      errorMessageBooking: [],
      isLoading: false,
      errorDelete: [],
      isModalVisible: false,
      confirmMessage: "",
      confirmCallback: null,
      showModal: false,
    };
  },
  components: { Navbar, Loader, SuccessAlert, ConfirmationAlert, ShowDetailsMessage },
  computed: {
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
      const site_id = this.businessUnit.find((option) => option.id === this.site_id);
      return site_id ? site_id.site_name : "";
    },

    selectCandidateList() {
      const id = this.candidateLists.find((option) => option.id === this.id);
      return id ? `${id.first_name} ${id.last_name}` : "";
    },
    selectedOptionText() {
      const job_id = this.options.find((option) => option.id === this.job_id);
      return job_id ? job_id.name : "";
    },
  },
  watch: {
    job_id(newValue) {
      if (newValue) {
        this.filterData();
      }
    },
    site_id(newValue) {
      if (newValue) {
        this.filterData();
      }
    },
    id(newValue) {
      if (newValue) {
        this.filterData();
      }
    },
  },
  methods: {
    handleDeleteBooking() {
      this.$refs.getDeleteBookingData();
    },
    confirmed(id) {
      this.isModalVisible = false;

      this.bookingDeleteMethod(id);
    },
    canceled() {
      this.isModalVisible = false;
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
          `${VITE_API_URL}/booking_searching/${modifiedSearchQuery}`
        );

        // this.searchResults = response.data.booking_data;
        if (
          response.data.booking_data &&
          typeof response.data.booking_data === "string"
        ) {
          this.errorMessage = response.data.booking_data;
          this.searchResults = [];
        } else {
          this.searchResults = response.data.booking_data || [];
          if (this.searchResults.length === 0) {
            this.errorMessage = "No Record found for the specified criteria.";
          } else {
            this.errorMessage = "";
          }
        }
      } catch (error) {
        if (
          (error.response && error.response.status === 404) ||
          error.response.status === 400
        ) {
          this.errorMessage = "No Staff found for the specified criteria";
        }
      }
    },
    toggleFilters() {
      this.showFilters = !this.showFilters;
    },
    filterData() {
      const filters = {
        filterType: this.job_id
          ? "job_title"
          : this.site_id
          ? "site"
          : this.id
          ? "candidate"
          : "",
        filterValue: this.job_id || this.site_id || this.getCandidateName(this.id) || "",
      };

      this.makeFilterAPICall(filters.filterType, filters.filterValue);
    },
    getCandidateName(id) {
      const candidate = this.candidateLists.find((candidate) => candidate.id === id);
      return candidate ? candidate.first_name : "";
    },
    async makeFilterAPICall(filterType, filterValue) {
      const token = localStorage.getItem("token");

      try {
        const response = await axios.get(`${VITE_API_URL}/booking_filter`, {
          params: {
            filter_type: filterType,
            filter_value: filterValue,
          },
          headers: {
            "content-type": "application/json",
            Authorization: "bearer " + token,
          },
        });

        this.getBookingData = response.data.booking_data || [];
        this.errorMessageFilter = "";
      } catch (error) {
        if (error.response && error.response.status === 404) {
          this.getBookingData = [];
          this.errorMessageFilter = error.response.data.error || "Report Not Found!";
        } else {
          this.errorMessageFilter = "An unexpected error occurred. Please try again.";
        }
      }
    },
    // async getDeleteBookingData() {
    //   this.isLoading = true;
    //   const formattedStartDate = this.formatDate(this.startDate);

    //   let requestData = {
    //     date: formattedStartDate,
    //   };
    //   try {
    //     const response = await axios.get(`${VITE_API_URL}/find_deleted_bookings`, {
    //       params: requestData,
    //     });

    //     this.deleteBookingData = response.data.booking_data;
    //     if (response.status === 200) {
    //       if (!this.deleteBookingData || this.deleteBookingData.length === 0) {
    //         this.errorDelete = "Record Not found!";
    //       } else {
    //         this.errorDelete = "";
    //         const deletedBookingIDs = response.data.booking_data.map(
    //           (booking) => booking.id
    //         );
    //         if (deletedBookingIDs.includes(this.currentBookingID)) {
    //           this.errorDelete = "Booking is already deleted!";
    //         } else {
    //           this.deleteBookingData = response.data.booking_data;
    //         }
    //       }
    //     }
    //   } catch (error) {
    //     if (error.response) {
    //       if (error.response.status == 404) {
    //         // alert(error.response.data.message);
    //       }
    //     }
    //     this.errorDelete = "An error occurred while fetching data.";
    //   } finally {
    //     this.isLoading = false;
    //   }
    // },

    async bookingDeleteMethod(id) {
      this.confirmMessage = "Are you sure you want to delete this booking?";
      this.isModalVisible = true;
      this.confirmCallback = async () => {
        const token = localStorage.getItem("token");

        await axios
          .put(`${VITE_API_URL}/delete_booking/` + id, {
            headers: {
              "content-type": "application/json",
              Authorization: "bearer " + token,
            },
          })
          .then((response) => {
            const message = "Booking Deleted!";
            this.$refs.successAlert.showSuccess(message);
            this.fetchBookingDataMethod();
            // this.getDeleteBookingData();
          });
        this.isModalVisible = false;
      };
      // alert("Record Deleted ");
    },
    closeModal() {
      this.showModal = false;
    },
    async getCandidateListMethod() {
      const pagesToFetch = [1, 2, 3];
      let allStaffData = [];

      try {
        const responses = await Promise.all(
          pagesToFetch.map((page) =>
            axios.get(`${VITE_API_URL}/candidates`, {
              params: {
                page: page,
              },
            })
          )
        );

        responses.forEach((response) => {
          allStaffData = allStaffData.concat(response.data.data);
        });

        this.candidateLists = allStaffData;
      } catch (error) {
        if (error.response && error.response.status === 404) {
          // Handle 404 error
          // console.error('Error fetching client data:', error.response.data.message);
        } else {
          // console.error('Error fetching client data:', error);
        }
      }
    },
    async getPositionMethod() {
      try {
        const response = await axios.get(`${VITE_API_URL}/active_job_list`);
        this.options = response.data.data;
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
    moveToPrevious() {
      if (this.currentView === "weekly") {
        this.startDate.setDate(this.startDate.getDate() - 7);
        this.endDate.setDate(this.endDate.getDate() - 7);
        this.updateDateRange();
      } else if (this.currentView === "monthly") {
        this.startDate.setMonth(this.startDate.getMonth() - 1);
        this.endDate = new Date(
          this.startDate.getFullYear(),
          this.startDate.getMonth() + 1,
          0
        );
      }
      this.fetchBookingDataMethod();
      //   this.getDeleteBookingData();
    },
    moveToNext() {
      if (this.currentView === "weekly") {
        this.startDate.setDate(this.startDate.getDate() + 7);
        this.endDate.setDate(this.endDate.getDate() + 7);
        this.updateDateRange();
      } else if (this.currentView === "monthly") {
        this.startDate.setMonth(this.startDate.getMonth() + 1);
        this.endDate = new Date(
          this.startDate.getFullYear(),
          this.startDate.getMonth() + 1,
          0
        );
      }
      this.fetchBookingDataMethod();
      //   this.getDeleteBookingData();
    },
    updateDateRange() {
      if (this.currentView === "weekly") {
        const weekStart = new Date(this.startDate);
        weekStart.setDate(this.startDate.getDate() - this.startDate.getDay() + 1);
        this.startDate = weekStart;

        const weekEnd = new Date(this.startDate);
        weekEnd.setDate(weekEnd.getDate() + 6);
        this.endDate = weekEnd;
      } else if (this.currentView === "monthly") {
        const currentDate = new Date();
        this.startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
        this.endDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
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
    setItemsPerPage(value) {
      this.itemsPerPage = value;
      this.currentPage = 1;
      this.fetchBookingDataMethod();
    },
    async fetchBookingDataMethod() {
      const token = localStorage.getItem("token");
      this.isLoading = true;
      let url = "";
      let requestData = {};

      if (this.currentView === "weekly") {
        requestData = {
          date: this.formatDate(this.startDate),
          per_page: this.itemsPerPage,
        };
        url = `${VITE_API_URL}/find_booking_according_current_week`;
      } else if (this.currentView === "monthly") {
        const formattedStartDate = this.formatDate(this.startDate);
        const formattedEndDate = this.formatDate(this.endDate);
        requestData = {
          date: formattedStartDate,
        };
        url = `${VITE_API_URL}/find_booking_according_mounth`;
      }

      try {
        const response = await axios.get(url, {
          params: requestData,
          headers: {
            "content-type": "application/json",
            Authorization: "bearer " + token,
          },
        });
        this.getBookingData = response.data.booking_data;

        if (this.getBookingData.length === 0) {
          this.errorMessageBooking = "No Booking found for the specified Criteria";
        } else {
          this.errorMessageBooking = "";
        }
      } catch (error) {
        // Handle error
        // console.error("Error fetching booking data:", error);
      } finally {
        this.isLoading = false;
      }
    },
  },
  async beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.fetchBookingDataMethod();
      // vm.getDeleteBookingData();
    });
  },
  async beforeRouteUpdate(to, from, next) {
    this.fetchBookingDataMethod();
    // this.getDeleteBookingData();
    next();
  },
  async mounted() {
    this.loadDateRangeFromLocalStorage();

    await this.getPositionMethod();

    await this.getBusinessUnitMethod();

    await this.getCandidateListMethod();
    const currentDate = new Date();
    const dayOfWeek = currentDate.getDay();
    const startOfWeek = new Date(currentDate);

    const diff = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
    startOfWeek.setDate(startOfWeek.getDate() + diff);

    this.startDate = startOfWeek;

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(endOfWeek.getDate() + 6);
    this.endDate = endOfWeek;
    // await this.fetchBookingDataMethod();
    // await this.getDeleteBookingData();
  },
};
</script>

<style scoped>
#main {
  transition: all 0.3s;

  padding-top: 65px;
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
.hidden {
  display: none;
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
.nav-pills .nav-link.active,
.nav-pills .show > .nav-link {
  background-color: transparent;
  border: 1px solid green !important;
  border-radius: 22px;
  color: green;
}
.nav-pills .nav-link {
  background-color: transparent;
  border: 1px solid #ff5722 !important;
  border-radius: 22px;
  color: #ff5722;
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
.bookingTable tr:nth-child(odd) td {
  background: #fdce5e17 !important;
}
.btn-primary {
  border-radius: 4px;
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

.form-select {
  width: auto;
}

input::-webkit-input-placeholder {
  margin-left: 5px;
}
@media (max-width: 1120px) {
  .bookingTable {
    width: 1090px;
  }
  .table-wrapper {
    overflow-x: scroll;
  }
}
</style>
