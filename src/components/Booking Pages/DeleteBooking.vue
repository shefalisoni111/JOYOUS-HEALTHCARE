<template>
  <div class="container-fluid p-0">
    <div class="row mx-1">
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
          </tr>
        </thead>
        <tbody v-if="paginateDeleteResults?.length > 0">
          <tr v-for="data in paginateDeleteResults" :key="data.id">
            <td scope="col">{{ data.id }}</td>
            <td scope="col">{{ data.booking_code }}</td>
            <td scope="col">{{ data.candidate }}</td>
            <td scope="col">{{ data.site }}</td>
            <td scope="col">{{ data.job_title }}</td>
            <td>
              <span v-for="(date, index) in data.shift_dates" :key="index">
                {{ date }}

                <template v-if="index !== data.shift_dates.length - 1">, </template>
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
          </tr>
        </tbody>
        <tbody v-else>
          <tr>
            <td colspan="15" class="text-danger text-center" v-if="!isLoading">
              {{ errorMessageBooking }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- Pagination for deleteBookingData -->
    <div
      class="mx-3"
      id="delete-pagination"
      style="text-align: right"
      v-if="
        paginateDeleteResults &&
        currentTab === 'DeleteBooking' &&
        deleteBookingData?.length >= 8
      "
    >
      <button class="btn btn-outline-dark btn-sm">
        {{ totalRecordsOnPageDelete }} Records Per Page
      </button>
      &nbsp;&nbsp;
      <button
        class="btn btn-sm btn-primary mr-2"
        :disabled="deleteBookingDataPage === 1"
        @click="deleteBookingDataPage--"
      >
        Previous
      </button>
      &nbsp;&nbsp;
      <span>{{ deleteBookingDataPage }}</span>
      &nbsp;&nbsp;
      <button
        class="btn btn-sm btn-primary ml-2"
        :disabled="deleteBookingDataPage * itemsPerPage >= deleteBookingData.length"
        @click="deleteBookingDataPage++"
      >
        Next
      </button>
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

import Loader from "../Loader/Loader.vue";

import ShowDetailsMessage from "../Alerts/ShowDetailsMessage.vue";
import SuccessAlert from "../Alerts/SuccessAlert.vue";
import ConfirmationAlert from "../Alerts/ConfirmationAlert.vue";
import Swal from "sweetalert2";
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
      startDate: new Date(),
      endDate: new Date(),
      itemsPerPage: 9,
      deleteBookingDataPage: 1,
      currentPageSearch: 1,
      showFilters: false,

      deleteBookingData: [],
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
    Loader,
    SuccessAlert,
    ConfirmationAlert,
    ShowDetailsMessage,
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

    paginateDeleteResults() {
      if (!this.deleteBookingData) return [];
      const startIndex = (this.deleteBookingDataPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.deleteBookingData.slice(startIndex, endIndex);
    },
    totalRecordsOnPage() {
      return this.paginationBooking.length;
    },
    totalRecordsOnPageSearch() {
      return this.paginateSearchResults.length;
    },
    totalRecordsOnPageDelete() {
      return this.paginateDeleteResults.length;
    },
  },
  watch: {
    selectedCandidate(newValue) {
      if (newValue !== "") {
        this.makeFilterAPICall("candidate", newValue);
      } else {
      }
    },

    business_unit_value(newValue) {
      if (newValue !== "") {
        this.makeFilterAPICall("business_unit", newValue);
      } else {
      }
    },

    job_id_value(newValue) {
      if (newValue !== "") {
        this.makeFilterAPICall("job_title", newValue);
      } else {
      }
    },
  },
  methods: {
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

        this.searchResults = response.data.booking_data;
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
      let filterType = "";
      let filterValue = "";

      if (this.job_id_value !== "") {
        filterType = "job_title";
        filterValue = this.job_id_value;
      } else if (this.business_unit_value !== "") {
        filterType = "business_unit";
        filterValue = this.business_unit_value;
      } else if (this.selectedCandidate !== "") {
        filterType = "candidate";
        filterValue = this.selectedCandidate;
      }

      this.makeFilterAPICall(filterType, filterValue);
    },
    async makeFilterAPICall(filterType, filterValue) {
      const token = localStorage.getItem("token");
      this.isLoading = true;
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
        this.getBookingData = response.data.booking_data;
      } catch (error) {
        if (error.response && error.response.status === 404) {
          const errorMessages = error.response.data.error;
          if (errorMessages === "No records found for the given filter") {
            // alert("No records found for the given filter");
            errorMessages === "No records found for the given filter";
          } else {
            // alert(errorMessages);
            Swal.fire({
              icon: "error",
              title: "Error",
              text: errorMessages,
            });
          }
        } else {
          // Handle other errors
          // console.error("Error filtering custom timesheets:", error);
        }
      } finally {
        this.isLoading = false;
      }
    },
    async getDeleteBookingData() {
      this.isLoading = true;
      const formattedStartDate = this.formatDate(this.startDate);

      let requestData = {
        date: formattedStartDate,
      };
      try {
        const response = await axios.get(`${VITE_API_URL}/find_deleted_bookings`, {
          params: requestData,
        });

        this.deleteBookingData = response.data.booking_data;
        if (response.status === 200) {
          if (!this.deleteBookingData || this.deleteBookingData.length === 0) {
            this.errorDelete = "Record Not found!";
          } else {
            this.errorDelete = "";
            const deletedBookingIDs = response.data.booking_data.map(
              (booking) => booking.id
            );
            if (deletedBookingIDs.includes(this.currentBookingID)) {
              this.errorDelete = "Booking is already deleted!";
            } else {
              this.deleteBookingData = response.data.booking_data;
            }
          }
        }
      } catch (error) {
        if (error.response) {
          if (error.response.status == 404) {
            // alert(error.response.data.message);
          }
        }
        this.errorDelete = "An error occurred while fetching data.";
      } finally {
        this.isLoading = false;
      }
    },

    closeModal() {
      this.showModal = false;
    },

    formatDate(date) {
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    },
  },

  created() {
    this.getDeleteBookingData();
  },
};
</script>
