<template>
  <div>
    <!-- <Navbar /> -->
    <div id="main">
      <div class="pagetitle d-flex justify-content-between px-2">
        <div class="py-3">
          <ol class="breadcrumb mb-1">
            <li class="breadcrumb-item active text-uppercase fs-6">
              <router-link class="nav-link d-inline" aria-current="page" to="/home"
                >Dashboard</router-link
              >
              / <span class="color-fonts">Staff Payroll</span>
            </li>
          </ol>
        </div>
      </div>

      <div class="container-fluid pt-3">
        <div class="row">
          <div class="col-12">
            <div class="">
              <div>
                <div class="p-2">
                  <div class="d-lg-flex justify-content-lg-between">
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

                    <div class="d-flex gap-3 align-items-center">
                      <form
                        v-if="getStaffInvoiceDetail?.length != 0"
                        @submit.prevent="search"
                        class="form-inline my-2 my-lg-0 d-flex align-items-center justify-content-between gap-2"
                      >
                        <input
                          class="form-control mr-sm-2"
                          type="search"
                          placeholder="Search..."
                          aria-label="Search"
                          v-model="searchQuery"
                          @input="debounceSearch"
                        />
                      </form>
                      <button
                        type="button"
                        class="btn btn-outline-success text-nowrap text-nowrap text-capitalize"
                        data-bs-toggle="modal"
                        data-bs-target="#staffGenerateCsv"
                        data-bs-whatever="@mdo"
                      >
                        + generate cSV
                      </button>
                    </div>
                  </div>
                </div>
                <!-- <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
                   
                  </ul> -->
                <!-- <div v-if="currentView === 'weekly'">
                  <div>
                    <div v-for="(day, index) in daysOfWeek" :key="index"></div>
                    <div v-for="(day, index) in getWeekDates" :key="index"></div>
                  </div>
                </div>

                <div v-else-if="currentView === 'monthly'">
                  <div>
                    <div v-for="(day, index) in getMonthDates" :key="index"></div>
                  </div>
                </div> -->
                <div class="d-flex gap-2">
                  <div></div>
                </div>
                <div class="tab-content mt-4" id="pills-tabContent">
                  <div
                    class="tab-pane fade show active table-wrapper"
                    id="pills-home"
                    role="tabpanel"
                    aria-labelledby="pills-home-tab"
                  >
                    <table class="table candidateTable" v-if="!searchQuery">
                      <thead>
                        <tr>
                          <th scope="col">#Number</th>
                          <th scope="col">Staff</th>

                          <th scope="col">From</th>
                          <th scope="col">To</th>
                          <th scope="col">Created On</th>
                          <!-- <th scope="col">Due Date</th> -->
                          <th scope="col" class="text-center">Total Amount</th>
                          <!-- <th scope="col" class="text-center">Paid Amount</th> -->
                          <!-- <th scope="col" class="text-center">Balance Amount</th> -->
                          <!-- <th scope="col">Status</th> -->

                          <th scope="col">Invoice Lock</th>
                          <th scope="col">Generated By</th>
                          <th scope="col">Email Status</th>
                          <th scope="col">Action</th>
                        </tr>
                      </thead>

                      <tbody v-if="getStaffInvoiceDetail?.length > 0">
                        <tr v-for="(data, index) in getStaffInvoiceDetail" :key="index">
                          <td scope="col">#{{ index + 1 }}</td>
                          <td scope="col">{{ data.staff }}</td>

                          <td scope="col">{{ data.start_date }}</td>
                          <td scope="col">{{ data.end_date }}</td>
                          <td scope="col">{{ data.created_on }}</td>
                          <!-- <td scope="col">
                            {{ data.due_date }}
                          </td> -->
                          <td scope="col" class="text-center">
                            {{ "£" + data.total_amount }}
                          </td>
                          <!-- <td scope="col" class="text-center">{{ data.paid_amount }}</td> -->
                          <!-- <td scope="col" class="text-center">
                            {{ data.balance_amount }}
                          </td> -->
                          <!-- <td scope="col">{{ data.status }}</td> -->

                          <td scope="col">
                            <label class="switch">
                              <input
                                type="checkbox"
                                :id="data.id"
                                :checked="data.invoice_lock"
                                @change="toggleInvoiceLock(data)"
                                :class="{
                                  locked: data.invoice_lock,
                                  unlocked: !data.invoice_lock,
                                }"
                              />
                              <div class="slider round"></div>
                            </label>
                          </td>
                          <td scope="col">{{ data.generated_by }}</td>
                          <td scope="col">
                            {{ data.email_status }}
                          </td>
                          <td>
                            <router-link
                              :to="{
                                name: 'CandidateInvoiceView',
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
                          <td
                            colspan="14"
                            v-if="!isLoading"
                            class="text-danger text-center"
                          >
                            {{ errorMessage }}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <table class="table candidateTable" v-else>
                      <thead>
                        <tr>
                          <th scope="col">#Number</th>
                          <th scope="col">Staff</th>

                          <th scope="col">From</th>
                          <th scope="col">To</th>
                          <th scope="col">Created On</th>
                          <!-- <th scope="col">Due Date</th> -->
                          <th scope="col" class="text-center">Total Amount</th>
                          <!-- <th scope="col" class="text-center">Paid Amount</th>
                          <th scope="col" class="text-center">Balance Amount</th> -->
                          <!-- <th scope="col">Status</th> -->

                          <th scope="col">Invoice Lock</th>
                          <th scope="col">Generated By</th>
                          <th scope="col">Email Status</th>
                          <th scope="col">Action</th>
                        </tr>
                      </thead>
                      <tbody v-if="searchResults?.length > 0">
                        <tr v-for="data in searchResults" :key="data.id">
                          <td scope="col">#{{ data.id }}</td>
                          <td scope="col">{{ data.staff }}</td>

                          <td scope="col">{{ data.start_date }}</td>
                          <td scope="col">{{ data.end_date }}</td>
                          <td scope="col">{{ data.created_on }}</td>
                          <!-- <td scope="col">
                            {{ data.due_date }}
                          </td> -->
                          <td scope="col" class="text-center">
                            {{ "£" + data.total_amount }}
                          </td>
                          <!-- <td scope="col" class="text-center">{{ data.paid_amount }}</td> -->
                          <!-- <td scope="col" class="text-center">
                            {{ data.balance_amount }}
                          </td> -->
                          <!-- <td scope="col">{{ data.status }}</td> -->

                          <td scope="col">
                            <label class="switch">
                              <input
                                type="checkbox"
                                :id="data.id"
                                :checked="data.invoice_lock"
                                @change="toggleInvoiceLock(data)"
                                :class="{
                                  locked: data.invoice_lock,
                                  unlocked: !data.invoice_lock,
                                }"
                              />
                              <div class="slider round"></div>
                            </label>
                          </td>
                          <td scope="col">{{ data.generated_by }}</td>
                          <td scope="col">
                            {{ data.email_status }}
                          </td>
                          <td>
                            <router-link
                              :to="{
                                name: 'CandidateInvoiceView',
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
                          <td
                            colspan="14"
                            v-if="!isLoading"
                            class="text-danger text-center"
                          >
                            {{ "Data Not Found !" }}
                          </td>
                        </tr>
                      </tbody>
                    </table>
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      class="mx-3"
      style="text-align: right"
      v-if="getStaffInvoiceDetail?.length >= 10"
    >
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
        @click="currentPage--"
      >
        Previous
      </button>
      &nbsp;&nbsp;
      <span>{{ currentPage }} of {{ totalPages }}</span>
      &nbsp;&nbsp;
      <button
        class="btn btn-sm btn-primary ml-2"
        :disabled="currentPage * itemsPerPage >= getStaffInvoiceDetail.length"
        @click="currentPage++"
      >
        Next
      </button>
    </div>
    <SuccessAlert ref="successAlert" />
    <loader :isLoading="isLoading"></loader>
    <StaffGenrateInvoice />
  </div>
</template>
<script>
import axios from "axios";
import SuccessAlert from "../Alerts/SuccessAlert.vue";
import StaffGenrateInvoice from "../modals/InvoicePagesModal/StaffGenrateInvoice.vue";
import Loader from "../Loader/Loader.vue";
import Swal from "sweetalert2";

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
      getStaffInvoiceDetail: [],
      searchQuery: null,
      debounceTimeout: null,
      searchResults: [],
      isLoading: false,
      errorMessage: "",
      totalPages: 1,
      itemsPerPage: 10,
      totalCount: 0,
    };
  },
  components: { Loader, StaffGenrateInvoice, SuccessAlert },
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
    async toggleInvoiceLock(data) {
      const newLockValue = !data.invoice_lock;

      const payload = {
        staff_invoice_id: data.id,
        lock_value: String(newLockValue),
      };

      try {
        const response = await axios.put(
          `${VITE_API_URL}/enable_and_disable__staff_invoice_lock`,
          payload,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.status === 200) {
          data.data.invoice_lock = newLockValue;
          console.log(data.data.invoice_lock);
          const message = newLockValue
            ? "Staff Payroll locked successfully!"
            : "Staff Payroll unlocked successfully!";
          this.$refs.successAlert.showSuccess(message);
          // this.$nextTick(() => {
          //   if (this.$refs.successAlert) {
          //     this.$refs.successAlert.showSuccess(message);
          //   } else {
          //     console.error("SuccessAlert component is not found.");
          //   }
          // });
          this.fetWeekTimeSheetData();
        } else {
          // console.error("Failed to update invoice lock:", response.data);
          // Handle failure
        }
      } catch (error) {
        // console.error("API call error:", error.response?.data || error.message);
        // Handle error
      }
    },
    async fetWeekTimeSheetData() {
      this.isLoading = true;
      const token = localStorage.getItem("token");
      let requestData = {};

      if (this.currentView === "weekly") {
        requestData = {
          date: this.formatDate(this.startDate),
          period: "week",
          per_page: this.totalPages,
        };
      } else if (this.currentView === "monthly") {
        const formattedStartDate = this.formatDate(this.startDate);
        const formattedEndDate = this.formatDate(this.endDate);
        requestData = {
          start_date: formattedStartDate,
          period: "month",
          per_page: this.totalPages,
        };
      }

      try {
        const response = await axios.get(`${VITE_API_URL}/staff_invoices`, {
          params: requestData,
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        });

        this.getStaffInvoiceDetail = response.data.staff_invoices;

        if (this.getStaffInvoiceDetail.length === 0) {
          this.errorMessage = "No Staff Payroll found for the specified criteria.";
        } else {
          this.errorMessage = "";
        }
      } catch (error) {
        // Handle error
      } finally {
        this.isLoading = false;
      }
    },
    //search api start

    async search() {
      try {
        this.isLoading = true;
        this.searchResults = [];
        const modifiedSearchQuery = this.searchQuery.replace(/ /g, "_");

        const response = await axiosInstance.get(
          `${VITE_API_URL}/staff_invoice_serching`,
          {
            params: {
              invoice_query: modifiedSearchQuery,
            },
          }
        );

        this.searchResults = response.data.candidate;
      } catch (error) {
        if (
          (error.response && error.response.status === 404) ||
          error.response.status === 400
        ) {
          // this.errorMessage = "No candidates found for the specified criteria";
        }
      } finally {
        this.isLoading = false;
      }
    },
    debounceSearch() {
      clearTimeout(this.debounceTimeout);

      this.debounceTimeout = setTimeout(() => {
        this.search();
      }, 100);
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
      this.fetWeekTimeSheetData();
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
      this.fetWeekTimeSheetData();
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
    // async vacancyDeleteMethod(id) {
    //   if (!window.confirm("Are you Sure ?")) {
    //     return;
    //   }
    //   const token = localStorage.getItem("token");
    //   await axios
    //     .delete(`${VITE_API_URL}/vacancies/` + id, {
    //       headers: {
    //         "content-type": "application/json",
    //         Authorization: "bearer " + token,
    //       },
    //     })
    //     .then((response) => {
    //       this.createStaffInvoiceMethod();
    //     });
    //   // alert("Record Deleted ");
    // },
    setItemsPerPage(value) {
      this.itemsPerPage = value;
      this.currentPage = 1;
      this.fetWeekTimeSheetData();
    },
    // async createStaffInvoiceMethod() {
    //   this.isLoading = true;
    //   const token = localStorage.getItem("token");
    //   let requestData = {};

    //   if (this.currentView === "weekly") {
    //     requestData = {
    //       date: this.formatDate(this.startDate),
    //       per_page: this.itemsPerPage,
    //     };
    //   } else if (this.currentView === "monthly") {
    //     const formattedStartDate = this.formatDate(this.startDate);
    //     const formattedEndDate = this.formatDate(this.endDate);
    //     requestData = {
    //       start_date: formattedStartDate,
    //       end_date: formattedEndDate,
    //       per_page: this.itemsPerPage,
    //     };
    //   }

    //   try {
    //     const response = await axios.get(`${VITE_API_URL}/staff_invoices`, {
    //       params: requestData,
    //       headers: {
    //         "content-type": "application/json",
    //         Authorization: "bearer " + token,
    //       },
    //     });

    //     this.getStaffInvoiceDetail = response.data.data;

    //     if (this.getStaffInvoiceDetail.length === 0) {
    //       this.errorMessage = "No staff invoices found for the specified criteria.";
    //     } else {
    //       this.errorMessage = "";
    //     }
    //   } catch (error) {
    //     // Handle the error
    //   } finally {
    //     this.isLoading = false;
    //   }
    // },
  },

  async mounted() {
    // this.createStaffInvoiceMethod();
    this.loadDateRangeFromLocalStorage();
    this.updateDateRange();

    const currentDate = new Date();
    const dayOfWeek = currentDate.getDay();
    const startOfWeek = new Date(currentDate);

    const diff = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
    startOfWeek.setDate(startOfWeek.getDate() + diff);

    this.startDate = startOfWeek;

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(endOfWeek.getDate() + 6);
    this.endDate = endOfWeek;

    await this.fetWeekTimeSheetData();
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
.text-success {
  color: green;
}
.text-danger {
  color: red;
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
.switch {
  width: 50px;
  height: 17px;
  position: relative;
  display: inline-block;
}

.switch input {
  display: none;
}

.switch .slider {
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  cursor: pointer;
  background-color: #e7ecf1;
  border-radius: 30px !important;
  border: 0;
  padding: 0;
  display: block;
  margin: 12px 10px;
  min-height: 11px;
}

.switch .slider:before {
  position: absolute;
  background-color: #aaa;
  height: 15px;
  width: 15px;
  content: "";
  left: 0px;
  bottom: -2px;
  border-radius: 50%;
  transition: ease-in-out 0.5s;
}

.switch .slider:after {
  content: "";
  color: white;
  display: block;
  position: absolute;
  transform: translate(-50%, -50%);
  top: 50%;
  left: 70%;
  transition: all 0.5s;
  font-size: 10px;
  font-family: Verdana, sans-serif;
}

.switch input:checked + .slider:after {
  transition: all 0.5s;
  left: 30%;
  content: "";
}

.switch input:checked + .slider {
  background-color: #d3d6d9;
}

.switch input:checked + .slider:before {
  transform: translateX(15px);
  background-color: #ff9800;
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
  .table-wrapper {
    overflow-x: scroll;
  }
}
</style>
