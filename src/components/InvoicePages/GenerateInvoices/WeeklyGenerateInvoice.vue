<template>
  <div class="container-fluid p-0">
    <div class="row">
      <div class="my-3">
        <div class="d-flex">
          <div class="d-flex align-items-center gap-2">
            <select class="form-control" v-model="currentView" @change="updateDateRange">
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select>
          </div>

          &nbsp;&nbsp;
          <div class="d-flex align-items-center">
            <span v-if="currentView === 'weekly' && startDate && endDate" class="fw-bold">
              {{
                "Monday " + formatDate(startDate) + " to Sunday " + formatDate(endDate)
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
      </div>
      <div class="col-12 table-wrapper">
        <table class="table reportTable">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Code</th>
              <th scope="col" style="width: 153px">Client</th>
              <th scope="col">Site</th>
              <th scope="col">Job</th>
              <th scope="col">Booking Date</th>
              <th scope="col">Start Time</th>
              <th scope="col">End Date</th>
              <th scope="col">Total Hours</th>
              <th scope="col">Client Rate</th>
              <th scope="col">Total Cost</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody v-if="candidateList?.length > 0">
            <tr v-for="(data, index) in candidateList" :key="data.id || index">
              <td scope="col">{{ data.id }}</td>
              <td scope="col">{{ data.code }}</td>
              <td scope="col">{{ data.site_id_and_client_id.client_name }}</td>
              <td scope="col">{{ data.site }}</td>
              <td scope="col">{{ data.job }}</td>
              <td scope="col">{{ data.shift_date }}</td>
              <td scope="col">
                {{ data.start_time }}
              </td>
              <td scope="col">
                {{ data.end_time }}
              </td>
              <td scope="col">
                {{ data.total_hours }}
              </td>
              <td scope="col">
                {{ data.client_rate }}
              </td>
              <td scope="col">
                {{ data.total_cost }}
              </td>
              <td>
                <i class="bi bi-eye"></i> &nbsp;
                <button
                  type="button"
                  class="btn btn-outline-success text-nowrap text-nowrap"
                  data-bs-toggle="modal"
                  data-bs-target="#generateInvoice"
                  data-bs-whatever="@mdo"
                >
                  <i class="bi bi-plus-square"></i>
                </button>
              </td>
            </tr>
          </tbody>
          <tbody v-else>
            <tr>
              <td colspan="16" class="text-danger text-center">
                {{ errorMessage }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="mx-3 mb-2" style="text-align: right" v-if="candidateList?.length >= 10">
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
        @click="currentPage--"
      >
        Previous</button
      >&nbsp;&nbsp; <span>{{ currentPage }}</span
      >&nbsp;&nbsp;
      <button
        class="btn btn-sm btn-primary ml-2"
        :disabled="currentPage * itemsPerPage >= candidateList?.length"
        @click="currentPage++"
      >
        Next
      </button>
    </div>
    <loader :isLoading="isLoading"></loader>
    <GenerateInvoiceAdd />
  </div>
</template>

<script>
import axios from "axios";
import Loader from "../../Loader/Loader.vue";
import GenerateInvoiceAdd from "../../modals/InvoicePagesModal/GenerateInvoiceAdd.vue";

export default {
  data() {
    return {
      currentView: "weekly",
      daysOfWeek: [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
      candidateList: [],
      errorMessage: "",
      currentPage: 1,
      itemsPerPage: 10,
      isLoading: false,
      startDate: new Date(),
      endDate: new Date(),
    };
  },
  components: { Loader, GenerateInvoiceAdd },
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
  },
  methods: {
    setItemsPerPage(value) {
      this.itemsPerPage = value;
      this.currentPage = 1;
      this.fetWeekTimeSheetData();
    },
    async fetWeekTimeSheetData() {
      this.isLoading = true;
      const currentDate = new Date();

      const formatDate = (date) => {
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const day = date.getDate().toString().padStart(2, "0");
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
      };

      this.formattedStartDate = formatDate(this.startDate);
      this.formattedEndDate = formatDate(this.endDate);
      try {
        const requestData = {
          start_date: this.formattedStartDate,
          end_date: this.formattedEndDate,
          per_page: this.itemsPerPage,
        };

        const response = await axios.get(`${VITE_API_URL}/generate_invoice_filters`, {
          params: requestData,
          per_page: this.itemsPerPage,
        });
        if (response.data.message) {
          this.errorMessage = response.data.message;
          this.candidateList = [];
        } else {
          this.candidateList = response.data.data;

          this.errorMessage =
            this.candidateList.length === 0
              ? "Data Not Found for the specified Week"
              : "";
        }
      } catch (error) {
      } finally {
        this.isLoading = false;
      }
    },
    formatDate(date) {
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
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

      this.getSiteReportMethod();
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

      this.getSiteReportMethod();
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
      this.fetWeekTimeSheetData();
    },
    loadDateRangeFromLocalStorage() {
      const storedStartDate = localStorage.getItem("startDate");
      const storedEndDate = localStorage.getItem("endDate");

      if (storedStartDate && storedEndDate) {
        this.startDate = new Date(storedStartDate);
        this.endDate = new Date(storedEndDate);
      }
    },
  },

  mounted() {
    this.loadDateRangeFromLocalStorage();

    if (!this.startDate || !this.endDate) {
      const currentDate = new Date();
      if (this.currentView === "weekly") {
        const dayOfWeek = currentDate.getDay();
        const startOfWeek = new Date(currentDate);
        startOfWeek.setDate(
          currentDate.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1)
        );
        this.startDate = startOfWeek;

        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 6);
        this.endDate = endOfWeek;
      } else if (this.currentView === "monthly") {
        this.startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
        this.endDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
      }
    }

    this.fetWeekTimeSheetData();
  },
};
</script>
<style scoped>
#main {
  transition: all 0.3s;
  height: 100vh;
  padding-top: 65px;
  background-color: #fdce5e17;
}
.reportTable tr:nth-child(odd) td {
  background: #fdce5e17 !important;
}

input::-webkit-input-placeholder {
  margin-left: 5px;
}
</style>
