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
              / <span class="color-fonts">Staff Invoice</span>
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
                        <select>
                          <option>By Created Date :</option>
                        </select>
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
                    </div>
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
                          <th scope="col">Due Date</th>
                          <th scope="col" class="text-center">Total Amount</th>
                          <th scope="col" class="text-center">Paid Amount</th>
                          <th scope="col" class="text-center">Balance Amount</th>
                          <th scope="col">Status</th>

                          <th scope="col">Invoice Lock</th>
                          <th scope="col">Generated By</th>
                          <th scope="col">Email Status</th>
                          <th scope="col">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="data in getStaffInvoiceDetail" :key="data.id">
                          <td scope="col">#1</td>
                          <td scope="col">{{ data.staff }}</td>

                          <td scope="col">{{ data.start_date }}</td>
                          <td scope="col">{{ data.end_date }}</td>
                          <td scope="col">{{ data.created_on }}</td>
                          <td scope="col">
                            {{ data.due_date ? data.due_date : "Null" }}
                          </td>
                          <td scope="col" class="text-center">{{ data.total_amount }}</td>
                          <td scope="col" class="text-center">{{ data.paid_amount }}</td>
                          <td scope="col" class="text-center">
                            {{ data.balance_amount }}
                          </td>
                          <td scope="col">{{ data.status ? data.status : "Null" }}</td>

                          <td scope="col">{{ data.invoice_lock }}</td>
                          <td scope="col">{{ data.generated_by }}</td>
                          <td scope="col">
                            {{ data.email_status ? email_status : "Null" }}
                          </td>
                          <td>
                            <router-link
                              to="/invoice/staff-invoice/StaffInvoiceView"
                              class="text-success"
                              ><i class="bi bi-eye"></i
                            ></router-link>
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
                          <th scope="col">Due Date</th>
                          <th scope="col" class="text-center">Total Amount</th>
                          <th scope="col" class="text-center">Paid Amount</th>
                          <th scope="col" class="text-center">Balance Amount</th>
                          <th scope="col">Status</th>

                          <th scope="col">Invoice Lock</th>
                          <th scope="col">Generated By</th>
                          <th scope="col">Email Status</th>
                          <th scope="col">Action</th>
                        </tr>
                      </thead>
                      <tbody v-if="searchResults?.length > 0">
                        <tr v-for="data in searchResults" :key="data.id">
                          <td scope="col">#1</td>
                          <td scope="col">{{ data.staff }}</td>

                          <td scope="col">{{ data.start_date }}</td>
                          <td scope="col">{{ data.end_date }}</td>
                          <td scope="col">{{ data.created_on }}</td>
                          <td scope="col">
                            {{ data.due_date ? data.due_date : "Null" }}
                          </td>
                          <td scope="col" class="text-center">{{ data.total_amount }}</td>
                          <td scope="col" class="text-center">{{ data.paid_amount }}</td>
                          <td scope="col" class="text-center">
                            {{ data.balance_amount }}
                          </td>
                          <td scope="col">{{ data.status ? data.status : "Null" }}</td>

                          <td scope="col">{{ data.invoice_lock }}</td>
                          <td scope="col">{{ data.generated_by }}</td>
                          <td scope="col">
                            {{ data.email_status ? email_status : "Null" }}
                          </td>
                          <td>
                            <router-link
                              to="/invoice/staff-invoice/StaffInvoiceView"
                              class="text-success"
                              ><i class="bi bi-eye"></i
                            ></router-link>
                          </td>
                        </tr>
                      </tbody>
                      <tbody v-else>
                        <tr>
                          <td colspan="14" class="text-danger text-center">
                            {{ "Not Match Found !" }}
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
  </div>
</template>
<script>
import axios from "axios";
import Navbar from "../Navbar.vue";

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
    };
  },
  components: { Navbar },
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
    //search api start

    async search() {
      try {
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
    //       this.createVacancy();
    //     });
    //   // alert("Record Deleted ");
    // },
    async createVacancy() {
      const token = localStorage.getItem("token");
      axios
        .get(`${VITE_API_URL}/staff_invoices`, {
          headers: {
            "content-type": "application/json",
            Authorization: "bearer " + token,
          },
        })
        .then((response) => (this.getStaffInvoiceDetail = response.data.data));
    },
  },

  mounted() {
    this.createVacancy();
    this.loadDateRangeFromLocalStorage();
    this.updateDateRange();
    // const currentDate = new Date();
    // const startOfWeek = new Date(currentDate);
    // startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay() + 1);
    // this.startDate = startOfWeek;

    // const endOfWeek = new Date(currentDate);
    // endOfWeek.setDate(endOfWeek.getDate() + (7 - endOfWeek.getDay()));
    // this.endDate = endOfWeek;
    // const currentDate = new Date();
    // const dayOfWeek = currentDate.getDay();
    // const startOfWeek = new Date(currentDate);

    // const diff = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
    // startOfWeek.setDate(startOfWeek.getDate() + diff);

    // this.startDate = startOfWeek;

    // const endOfWeek = new Date(startOfWeek);
    // endOfWeek.setDate(endOfWeek.getDate() + 6);
    // this.endDate = endOfWeek;
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
