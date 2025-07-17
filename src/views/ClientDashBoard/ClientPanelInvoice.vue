<template>
  <div id="main" class="main d-flex sidebar">
    <div
      class=""
      style="
        background: #fff;

        border-radius: 20px;
      "
    >
      <ClientNavbar />
    </div>

    <div class="container-fluid pt-3 px-5">
      <div class="pagetitle d-flex justify-content-between px-2">
        <div class="py-3">
          <ol class="breadcrumb mb-1">
            <li class="breadcrumb-item active">
              <a class="nav-link d-inline fs-4 fw-bolder" style="color: #000000"
                >Invoices</a
              >
              <p>
                <router-link
                  class="nav-link d-inline fw-bolder"
                  style="color: #000000"
                  aria-current="page"
                  to="/staff-list"
                  >Invoices</router-link
                >
              </p>
            </li>
          </ol>
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <div class="">
            <div class="d-flex justify-content-between">
              <div class="p-2">
                <div class="d-flex justify-content-between">
                  <div class="d-flex">
                    <div class="d-flex align-items-center gap-2">
                      <select
                        class="form-control"
                        v-model="currentView"
                        @change="updateDateRange"
                      >
                        <option value="weekly">Weekly</option>
                        <option value="monthly">Monthly</option>
                      </select>
                    </div>

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
              <div class="d-flex gap-2 mb-3 justify-content-between">
                <div class="d-flex gap-2">
                  <div>
                    <form @submit.prevent="search" class="w-md-auto position-relative">
                      <input
                        class="form-control form-control-lg mr-sm-2 bg-white"
                        type="search"
                        placeholder="Search..."
                        aria-label="Search"
                        v-model="searchQuery"
                        @input="debounceSearch"
                      />
                      <span
                        class="position-absolute top-50 end-0 translate-middle-y pe-3"
                      >
                        <img
                          src="@/assets/Search.png"
                          class="img-fluid pe-2"
                          alt="RecPal"
                          loading="eager"
                      /></span>
                    </form>
                  </div>
                  <div class="custom-select-wrapper">
                    <select aria-label="Default select example" class="form-select">
                      <option selected>Status</option>
                      <option value="1">One</option>
                      <option value="2">Two</option>
                      <option value="3">Three</option>
                    </select>
                  </div>
                  <div class="custom-select-wrapper">
                    <select
                      v-model="site_id"
                      id="selectBusinessUnit"
                      @change="filterData"
                      class="form-select"
                    >
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
                  </div>
                </div>
              </div>
            </div>

            <div class="tab-content mt-2" id="pills-tabContent">
              <div
                class="tab-pane fade show active table-wrapper AllBooking"
                id="pills-AllBooking"
                role="tabpanel"
                aria-labelledby="pills-AllBooking-tab"
              >
                <table class="table bookingTable">
                  <thead>
                    <tr>
                      <th>#Number</th>
                      <th scope="col">Site</th>
                      <th scope="col">From</th>
                      <th scope="col">To</th>
                      <th scope="col">Created on</th>
                      <!-- <th scope="col" style="width: 142px">Due Date</th> -->
                      <th scope="col">Total Amount</th>
                      <!-- <th scope="col">Paid Amount</th>
                        <th scope="col">Balance Amount</th> -->
                      <!-- <th scope="col">Status</th> -->
                      <th scope="col" style="width: 13%">
                        Invoice Creation <br />
                        Period
                      </th>
                      <th scope="col" style="width: 13%">Generated By</th>
                      <th scope="col">View</th>
                    </tr>
                  </thead>
                  <tbody v-if="getBookingData?.length > 0">
                    <tr v-for="data in getBookingData" :key="data.id">
                      <td>{{ data.number }}</td>
                      <td>{{ data.site }}</td>
                      <td>{{ data.start_date }}</td>
                      <td>{{ data.end_date }}</td>
                      <td>{{ data.created_on }}</td>
                      <!-- <td>{{ data.due_date }}</td> -->
                      <td>{{ "£" + data.total_amount }}</td>
                      <!-- <td>{{ data.paid_amount }}</td> -->
                      <!-- <td>{{ data.balance_amount }}</td> -->
                      <!-- <td>{{ data.status }}</td> -->
                      <td>{{ data.invoice_creation_period }}</td>
                      <td>{{ data.generated_by }}</td>
                      <td>
                        <!-- <button class="btn btn-success" @click="viewInvoice(data.id)">
                            <i class="bi bi-eye"></i>
                          </button> -->
                        <router-link
                          :to="{
                            name: 'ClientPanelInvoiceView',
                            params: { id: data.id },
                          }"
                          class="text-success"
                          ><i class="bi bi-eye"></i
                        ></router-link>
                      </td>
                    </tr>
                  </tbody>

                  <tbody v-else>
                    <tr>
                      <td colspan="9" class="text-danger text-center">
                        {{
                          errorMessageBooking || errorMessageFilter || "No InvoicE found."
                        }}
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
  <div class="mx-3" style="text-align: right" v-if="getBookingData?.length >= 10">
    <!-- <button class="btn btn-outline-dark btn-sm">
        {{ getClientDetail.length }} Records Per Page
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
      @click="changePage(currentPage - 1)"
    >
      Previous
    </button>
    &nbsp;&nbsp;
    <span>{{ currentPage }} of {{ totalPages }}</span>
    &nbsp;&nbsp;
    <button
      class="btn btn-sm btn-primary ml-2"
      :disabled="currentPage === totalPages"
      @click="changePage(currentPage + 1)"
    >
      Next
    </button>

    <loader :isLoading="isLoading"></loader>

    <!-- <ShowDetailsMessage v-if="showModal" :message="alertMessage" @close="closeModal" /> -->
  </div>
</template>
<script>
import axios from "axios";
import ClientNavbar from "../../components/ClientDashBoard/ClientNavbar.vue";
import Loader from "../../components/Loader/Loader.vue";
// import SuccessAlert from "../components/Alerts/SuccessAlert.vue";
// import ConfirmationAlert from "../components/Alerts/ConfirmationAlert.vue";
// import ShowDetailsMessage from "../components/Alerts/ShowDetailsMessage.vue";

const axiosInstance = axios.create({
  headers: {
    "Cache-Control": "no-cache",
  },
});
export default {
  data() {
    return {
      currentView: "weekly",
      daysOfWeek: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      startDate: new Date(),
      endDate: new Date(),
      getBookingData: [],
      totalPages: 1,
      currentPage: 1,
      itemsPerPage: 10,
      totalCount: 0,
      searchQuery: null,
      debounceTimeout: null,
      searchResults: [],
      site_id: "",
      businessUnit: [],
      candidateLists: [],
      id: "",
      selectedCandidate: "",
      business_unit_value: "",

      debounceTimeout: null,

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
  components: {
    ClientNavbar,
    Loader,

    // ShowDetailsMessage,
  },
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
    // job_id(newValue) {
    //   if (newValue) {
    //     this.filterData();
    //   }
    // },
    // site_id(newValue) {
    //   if (newValue) {
    //     this.filterData();
    //   }
    // },
    // id(newValue) {
    //   if (newValue) {
    //     this.filterData();
    //   }
    // },
  },
  methods: {
    // handleDeleteBooking() {
    //   this.$refs.getDeleteBookingData();
    // },
    // confirmed(id) {
    //   this.isModalVisible = false;

    //   this.bookingDeleteMethod(id);
    // },
    // canceled() {
    //   this.isModalVisible = false;
    // },
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

        const response = await axiosInstance.get(`${VITE_API_URL}/search_candidate`, {
          params: {
            candidate_query: this.searchQuery,
          },
        });

        if (
          response.status === 200 &&
          response.data.candidate.length === 0 &&
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          this.errorMessage = "No Staff found for the specified criteria";
        } else {
          this.searchResults = response.data.candidate;
          this.errorMessage = "";
        }
      } catch (error) {
        if (error.response && error.response.data && error.response.data.message) {
          this.errorMessage = error.response.data.message;
        } else {
          this.errorMessage = "No Staff found for the specified criteria";
        }
      }
    },
    // toggleFilters() {
    //   this.showFilters = !this.showFilters;
    // },
    filterData() {
      // const filters = {
      //   filterType: this.job_id
      //     ? "job_title"
      //     : this.site_id
      //     ? "site"
      //     : this.id
      //     ? "candidate"
      //     : "",
      //   filterValue: this.job_id || this.site_id || this.getCandidateName(this.id) || "",
      // };
      // this.makeFilterAPICall(filters.filterType, filters.filterValue);
    },
    getCandidateName(id) {
      const candidate = this.candidateLists.find((candidate) => candidate.id === id);
      return candidate ? `${candidate.first_name} ${candidate.last_name}` : "";
    },
    // async makeFilterAPICall(filterType, filterValue) {
    //   const token = localStorage.getItem("token");

    //   try {
    //     const response = await axios.get(`${VITE_API_URL}/booking_filter`, {
    //       params: {
    //         filter_type: filterType,
    //         filter_value: filterValue,
    //       },
    //       headers: {
    //         "content-type": "application/json",
    //         Authorization: "bearer " + token,
    //       },
    //     });

    //     this.getBookingData = response.data.data || [];
    //     this.errorMessageFilter = "";
    //   } catch (error) {
    //     if (error.response && error.response.status === 404) {
    //       this.getBookingData = [];
    //       this.errorMessageFilter = error.response.data.error || "Report Not Found!";
    //     } else {
    //       this.errorMessageFilter = "Report Not Found!";
    //     }
    //   }
    // },
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

    // async bookingDeleteMethod(id) {
    //   this.confirmMessage = "Are you sure you want to delete this booking?";
    //   this.isModalVisible = true;
    //   this.confirmCallback = async () => {
    //     const token = localStorage.getItem("token");

    //     await axios
    //       .put(`${VITE_API_URL}/delete_booking/` + id, {
    //         headers: {
    //           "content-type": "application/json",
    //           Authorization: "bearer " + token,
    //         },
    //       })
    //       .then((response) => {
    //         const message = "Booking Deleted!";
    //         this.$refs.successAlert.showSuccess(message);
    //         this.fetchBookingDataMethod();
    //         // this.getDeleteBookingData();
    //       });
    //     this.isModalVisible = false;
    //   };
    //   // alert("Record Deleted ");
    // },
    // closeModal() {
    //   this.showModal = false;
    // },
    async getCandidateListMethod() {
      const pagesToFetch = [1, 2, 3];
      let allStaffData = [];
      const payload = {
        status_value: "approved",
        activated_value: true,
        per_page: 10,
      };

      try {
        const responses = await Promise.all(
          pagesToFetch.map((page) =>
            axios.get(`${VITE_API_URL}/candidates`, {
              params: {
                ...payload,
                page: page,
              },
            })
          )
        );

        responses.forEach((response) => {
          if (response.data && response.data.data) {
            allStaffData = allStaffData.concat(response.data.data);
          }
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
      this.fetchBookingDataMethod();
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
      this.isLoading = true;
      const token = localStorage.getItem("token");
      let requestData = {};

      if (this.currentView === "weekly") {
        requestData = {
          date: this.formatDate(this.startDate),
          per_page: this.itemsPerPage,
          range: "Weekly",
        };
      } else if (this.currentView === "monthly") {
        const formattedStartDate = this.formatDate(this.startDate);
        const formattedEndDate = this.formatDate(this.endDate);
        requestData = {
          // start_date: formattedStartDate,
          // end_date: formattedEndDate,
          date: this.formatDate(this.startDate),
          per_page: this.itemsPerPage,
          range: "Monthly ",
        };
      }

      try {
        const response = await axios.get(
          `${VITE_API_URL}/client_dashboard/client_invoices`,
          {
            params: requestData,
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
          }
        );

        this.getBookingData = response.data.data;

        if (this.getBookingData.length === 0) {
          this.errorMessageBooking = "No Invoice found for the specified Criteria.";
        } else {
          this.errorMessageBooking = "No Invoice found for the specified Criteria.";
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
      // vm.fetchBookingDataMethod();
      // vm.getDeleteBookingData();
    });
  },
  async beforeRouteUpdate(to, from, next) {
    // this.fetchBookingDataMethod();
    // this.getDeleteBookingData();
    next();
  },
  mounted() {
    // this.loadDateRangeFromLocalStorage();
    // this.fetchBookingDataMethod();
    // await this.getPositionMethod();

    // await this.getBusinessUnitMethod();

    // await this.getCandidateListMethod();
    const currentDate = new Date();
    const dayOfWeek = currentDate.getDay();
    const startOfWeek = new Date(currentDate);

    const diff = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
    startOfWeek.setDate(startOfWeek.getDate() + diff);

    this.startDate = startOfWeek;

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(endOfWeek.getDate() + 6);
    this.endDate = endOfWeek;
    this.fetchBookingDataMethod();
    // await this.getDeleteBookingData();
  },
};
</script>

<style scoped>
#main {
  transition: all 0.3s;

  background-color: rgb(249 249 249);
  height: 100vh;
}
.main-content {
  transition: all 0.3s;
}
.bg-define {
  background-color: rgb(249 249 249);
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
select.form-select {
  background: #f9944b14;
  width: 100%;
  border: 1px solid transparent;
  border-radius: 6px;
  height: 50px;
  padding: 6px 12px;
}

.custom-select-wrapper {
  position: relative;
}

.custom-select-wrapper .form-select {
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  padding-right: 30px;
}

.custom-select-wrapper::after {
  content: "▼";
  position: absolute;
  top: 50%;
  right: 12px;
  transform: translateY(-50%);
  pointer-events: none;
  font-size: 12px;
  color: rgb(153, 153, 153);
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
