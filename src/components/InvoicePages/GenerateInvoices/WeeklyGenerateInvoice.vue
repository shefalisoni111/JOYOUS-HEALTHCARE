<template>
  <div class="container-fluid p-0">
    <div class="row">
      <div class="col-12 table-wrapper">
        <div class="p-2">
          <div class="d-flex justify-content-between">
            <div class="d-flex">
              <div class="d-flex align-items-center">
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

            <!-- <div class="d-flex gap-3 align-items-center">
              <select v-model="site_id" id="selectBusinessUnit">
                <option value="">All Site</option>
                <option
                  v-for="option in businessUnit"
                  :key="option.id"
                  :value="option.id"
                  placeholder="Select BusinessUnit"
                >
                  {{ option.site_name }}
                </option>
              </select>
            </div> -->
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
        <table class="table candidateTable">
          <thead>
            <tr>
              <th rowspan="3">ID</th>

              <th scope="col" style="width: 153px">Name</th>
              <th scope="col">Site</th>
              <th scope="col">Job</th>
              <th scope="col">Shift Date</th>
              <th scope="col">Start Time</th>
              <th scope="col">End Time</th>
              <th scope="col">Total Hours</th>
              <th scope="col">Client Rate</th>
              <th scope="col">Total Cost</th>

              <th rowspan="3">Approved Status</th>
              <th rowspan="3">Action</th>
            </tr>
          </thead>
          <tbody v-if="candidateList?.length > 0">
            <tr v-for="data in candidateList" :key="data.id">
              <td>{{ data.id }}</td>

              <td scope="col" class="text-capitalize">{{ data.name }}</td>
              <td scope="col">{{ data.site }}</td>
              <td scope="col">{{ data.job }}</td>
              <td scope="col">{{ data.shift_date }}</td>
              <td scope="col">
                {{ data.start_time ? data.start_time : "null" }}
              </td>
              <td scope="col">
                {{ data.end_time ? data.end_time : "null" }}
              </td>
              <td scope="col">
                {{ data.total_hours }}
              </td>
              <td scope="col">
                {{ data.client_rate ? data.client_rate : "null" }}
              </td>
              <td scope="col">
                {{ data.total_cost }}
              </td>

              <td>{{ data.approved_hour }}</td>
              <td>
                <button
                  type="button"
                  class="btn btn-outline-success text-nowrap text-nowrap"
                  data-bs-toggle="modal"
                  data-bs-target="#generateInvoice"
                  data-bs-whatever="@mdo"
                >
                  <i class="bi bi-receipt-cutoff"></i>
                  +
                </button>
                &nbsp;
                <button
                  type="button"
                  class="btn btn-outline-success text-nowrap text-nowrap"
                  data-bs-toggle="modal"
                  data-bs-target="#editGenerateInvoice"
                  data-bs-whatever="@mdo"
                  @click="openEditModal(data.id)"
                >
                  <i class="bi bi-pencil"></i>
                </button>
              </td>
              <!-- <th>
                  <div class="form-check">
                    <input class="form-check-input" type="checkbox" value="" />
                  </div>
                </th> -->
            </tr>
          </tbody>
          <tbody v-else>
            <tr>
              <td colspan="12" class="text-danger text-center">
                {{ errorMessage }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <GenerateInvoiceAdd />
    <GenerateInvoiceEdit
      :customDataId="selectedCustomTimesheetId"
      @CustomTimeSheetData-updated="fetWeekTimeSheetData"
      ref="customEdit"
    />
  </div>
</template>

<script>
import axios from "axios";

import GenerateInvoiceAdd from "../../modals/InvoicePagesModal/GenerateInvoiceAdd.vue";
import GenerateInvoiceEdit from "../../modals/InvoicePagesModal/GenerateInvoiceEdit.vue";
export default {
  data() {
    return {
      currentView: "weekly",
      daysOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      startDate: new Date(),
      endDate: new Date(),
      site_id: "",
      businessUnit: [],
      candidateList: [],
      errorMessage: "",
      selectedCustomTimesheetId: null,
    };
  },
  components: { GenerateInvoiceAdd, GenerateInvoiceEdit },
  computed: {
    selectBusinessUnit() {
      const site_id = this.businessUnit.find((option) => option.id === this.site_id);
      return site_id ? site_id.site_name : "";
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

    formattedDates() {
      return this.selectedDateRow.map((day) => this.formatDate(day));
    },

    formattedStartDate() {
      return this.formatDate(this.selectedDateRow[0]);
    },
    formattedEndDate() {
      return this.formatDate(this.selectedDateRow[this.selectedDateRow.length - 1]);
    },
    selectedDateRow() {
      const selectedDate = new Date(this.startDate);
      const selectedDateRow = [];
      const dayOfWeek = selectedDate.getDay();
      const startDay = (dayOfWeek - 1 + 7) % 7;

      for (let i = 0; i < 7; i++) {
        const currentDate = new Date(selectedDate);
        currentDate.setDate(selectedDate.getDate() + i - startDay);

        const lastDayOfMonth = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth() + 1,
          0
        ).getDate();
        if (currentDate.getDate() > lastDayOfMonth) {
          currentDate.setMonth(currentDate.getMonth() + 1);

          currentDate.setDate(1);

          currentDate.setDate(i + 1 - startDay);
        }

        selectedDateRow.push(currentDate);
      }

      return selectedDateRow;
    },
  },
  methods: {
    openEditModal(customDataId) {
      this.selectedCustomTimesheetId = customDataId;
      this.$refs.customEdit.fetchCustomTimeSheetData(customDataId);
    },
    // async getBusinessUnitMethod() {
    //   try {
    //     const response = await axios.get(`${VITE_API_URL}/activated_site`);
    //     this.businessUnit = response.data.data;
    //   } catch (error) {
    //     if (error.response) {
    //       if (error.response.status == 404) {
    //         // alert(error.response.data.message);
    //       }
    //     }
    //   }
    // },
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
    async fetWeekTimeSheetData() {
      this.isLoading = true;
      try {
        const requestData = {
          date: this.formattedStartDate,
        };

        const response = await axios.get(
          `${VITE_API_URL}/find_timesheets_according_week`,
          {
            params: requestData,
          }
        );
        this.dataCustomTimeSheet = response.data.custom_timesheets;
        const mergedTimeSheets = [
          ...response.data.custom_timesheets,
          ...response.data.sign_timesheets,
        ];
        this.candidateList = mergedTimeSheets;
        if (this.candidateList.length === 0) {
          this.errorMessage = "No Weekly timesheets found for the specified Week";
        } else {
          this.errorMessage = "";
        }
      } catch (error) {
      } finally {
        this.isLoading = false;
      }
    },
  },

  async mounted() {
    // this.createVacancy();
    await this.loadDateRangeFromLocalStorage();
    // await this.getBusinessUnitMethod();
    // this.updateDateRange();
    // window.addEventListener("beforeunload", this.saveToLocalStorage);
    // const currentDate = new Date();
    // const startOfWeek = new Date(currentDate);
    // startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay() + 1);
    // this.startDate = startOfWeek;

    // const endOfWeek = new Date(currentDate);
    // endOfWeek.setDate(endOfWeek.getDate() + (7 - endOfWeek.getDay()));
    // this.endDate = endOfWeek;
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
select {
  width: 100%;
  padding: 10px;
  border-radius: 4px;
  border: 0px;
  border: 1px solid rgb(202, 198, 198);
}
.color-fonts {
  color: #ff5f30;
  font-weight: bold;
}
.calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 5px;
}

.nav-pills .nav-link {
  color: #ff5f30;
  border: 1px solid #ff5f30 !important;
}
.btn-primary {
  border: none;
}
.form-check-input {
  border: 2px solid grey;
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
  border: 1px solid green !important;
  border-radius: 22px;
  color: green;
}

.nav-pills .nav-link {
  background-color: transparent;

  border-radius: 22px;
}
ul.nav-pills {
  height: 53px;
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
</style>
