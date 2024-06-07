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
            <th scope="col">Status</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody v-if="paginationBooking?.length > 0">
          <tr v-for="data in paginationBooking" :key="data.id">
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
            <td scope="col">{{ data.break ? data.break : "null" }}</td>
            <td scope="col">{{ data.duration ? data.duration : "null" }}</td>
            <td scope="col">{{ data.notes ? data.notes : "null" }}</td>
            <td scope="col">{{ data.status ? data.status : "null" }}</td>
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
            <td colspan="15" class="text-danger text-center" v-if="!isLoading">
              {{ errorMessageBooking }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- Pagination for getBookingData -->
    <div
      class="mx-3"
      id="get-pagination"
      style="text-align: right"
      v-if="
        paginationBooking && currentTab === 'AllBooking' && getBookingData?.length >= 8
      "
    >
      <button class="btn btn-outline-dark btn-sm">
        {{ totalRecordsOnPage }} Records Per Page
      </button>
      &nbsp;&nbsp;
      <button
        class="btn btn-sm btn-primary mr-2"
        :disabled="currentPage === 1"
        @click="currentPage--"
      >
        Previous
      </button>
      &nbsp;&nbsp;
      <span>{{ currentPage }}</span>
      &nbsp;&nbsp;
      <button
        v-if="paginationBooking"
        class="btn btn-sm btn-primary ml-2"
        :disabled="currentPage * itemsPerPage >= getBookingData.length"
        @click="currentPage++"
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

export default {
  data() {
    return {
      currentTab: "AllBooking",
      currentView: "weekly",
      startDate: new Date(),
      endDate: new Date(),
      getBookingData: [],
      currentPage: 1,
      itemsPerPage: 9,
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
    paginationBooking() {
      if (!this.getBookingData) return [];
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.getBookingData.slice(startIndex, endIndex);
    },

    totalRecordsOnPage() {
      return this.paginationBooking.length;
    },
  },
  watch: {
    startDate() {
      this.fetchBookingDataMethod();
    },
    endDate() {
      this.fetchBookingDataMethod();
    },
    selectedCandidate(newValue) {
      if (newValue !== "") {
        this.makeFilterAPICall("candidate", newValue);
      }
    },
    business_unit_value(newValue) {
      if (newValue !== "") {
        this.makeFilterAPICall("business_unit", newValue);
      }
    },
    job_id_value(newValue) {
      if (newValue !== "") {
        this.makeFilterAPICall("job_title", newValue);
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
    formatDate(date) {
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    },
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
          });
        this.isModalVisible = false;
      };
    },
    closeModal() {
      this.showModal = false;
    },
    async fetchBookingDataMethod() {
      const token = localStorage.getItem("token");
      this.isLoading = true;
      let url = `${VITE_API_URL}/find_booking_according_current_week`;

      const requestData = {
        date: this.formatDate(this.startDate),
      };

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
        // console.error("Error fetching booking data:", error);
      } finally {
        this.isLoading = false;
      }
    },
    moveToPrevious() {
      this.startDate.setDate(this.startDate.getDate() - 7);
      this.endDate.setDate(this.endDate.getDate() - 7);
    },
    moveToNext() {
      this.startDate.setDate(this.startDate.getDate() + 7);
      this.endDate.setDate(this.endDate.getDate() + 7);
    },
  },
  created() {
    this.fetchBookingDataMethod();
  },
};
</script>
