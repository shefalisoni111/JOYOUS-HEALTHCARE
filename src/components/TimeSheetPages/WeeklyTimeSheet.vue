<template>
  <div>
    <Navbar />
    <div class="container-fluid">
      <div id="main">
        <div class="pagetitle d-flex justify-content-between px-2">
          <div class="py-3">
            <ol class="breadcrumb mb-1">
              <li class="breadcrumb-item active text-uppercase fs-6">
                Dashboard / <span class="color-fonts">Weekly Timesheet</span>
              </li>
            </ol>
          </div>
        </div>
        <div class="row p-3">
          <div class="full-page-calendar pt-1 pb-0">
            <div class="calendar-header mb-2">
              <span v-if="formattedStartDate && formattedEndDate" class="fw-bold">
                {{
                  "Monday " + formattedStartDate + " to Sunday " + formattedEndDate
                }} </span
              >&nbsp; &nbsp;
              <input
                type="date"
                v-model="startDate"
                @change="updateDateRange"
                class="dateInput"
              />
            </div>
            <div class="row">
              <div class="col-3">
                <div class="card border-0 bg-transparent">
                  <div class="row g-0">
                    <div class="d-flex">
                      <div class="d-flex align-items-center">
                        <i class="bi bi-check-circle-fill text-success fs-1"></i>
                      </div>
                      <div class="">
                        <div class="card-body">
                          <h5 class="card-title fw-bold">#Approved Timesheets</h5>
                          <p class="card-text fw-bold">
                            <span class="text-success">Hours</span> 24.00
                            <span class="text-info">Amount</span> £324.00
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-3">
                <div class="card border-0 bg-transparent">
                  <div class="row g-0">
                    <div class="d-flex">
                      <div class="d-flex align-items-center">
                        <i class="bi bi-file-spreadsheet text-success fs-1"></i>
                      </div>
                      <div class="">
                        <div class="card-body">
                          <h5 class="card-title fw-bold">#Invoiced Timesheets</h5>
                          <p class="card-text fw-bold">
                            <span class="text-success">Hours</span> 0.00
                            <span class="text-info">Amount</span> €0.00
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-3">
                <div class="card border-0 bg-transparent">
                  <div class="row g-0">
                    <div class="d-flex">
                      <div class="d-flex align-items-center">
                        <i class="bi bi-exclamation-triangle-fill fs-1 text-warning"></i>
                      </div>
                      <div class="">
                        <div class="card-body">
                          <h5 class="card-title fw-bold">#Pending Timesheets</h5>
                          <p class="card-text fw-bold">
                            <span class="text-success">Hours</span> 11.50
                            <span class="text-info">Amount</span> €126.50
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-3">
                <div class="card border-0 bg-transparent">
                  <div class="row g-0">
                    <div class="d-flex">
                      <div class="d-flex align-items-center">
                        <i
                          class="bi bi-file-earmark-spreadsheet-fill text-success fs-1"
                        ></i>
                      </div>
                      <div class="">
                        <div class="card-body">
                          <h5 class="card-title fw-bold">#All Timesheets</h5>
                          <p class="card-text fw-bold">
                            <span class="text-success">Hours</span> 35.50
                            <span class="text-info">Amount</span> £450.50
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Modal -->

            <div v-if="selectedDate !== null" class="modal">
              <div class="modal-content">
                <div class="close d-flex justify-content-between my-3">
                  <h3 class="d-flex align-items-center mb-0">Edit Assigned Shift -</h3>
                  <span class="close text-white" @click="closeModal">&times;</span>
                </div>

                <h4 class="text-capitalize">{{ getCandidateName() }}</h4>
                <p>You clicked on {{ selectedDate }}</p>
                <p>Status: {{ statusForSelectedDate }}</p>
                <!-- Pass initialDate to the Calendar component -->
                <AppointmentAdd
                  :initialDate="selectedDate"
                  :candidateId="selectedCandidateId"
                  @closeModal="closeModal"
                />
              </div>
            </div>
          </div>
          <table class="table">
            <thead>
              <tr>
                <th rowspan="3">Name</th>
                <th rowspan="3">Business Unit</th>
                <th rowspan="3">Shift</th>
                <th>
                  <div class="calendar-grid">
                    <div v-for="day in daysOfWeek" :key="day" class="day-header">
                      {{ day }}
                    </div>
                    <div v-for="date in selectedDateRow" :key="date" class="day-header">
                      {{ formatDate(date) }}
                      <div v-if="formatDate(date)">
                        <th>Start</th>
                        <th>End</th>
                        <th>Total</th>
                      </div>
                    </div>
                  </div>
                </th>

                <th rowspan="3">Total Hours</th>
                <th rowspan="3">Total Cost</th>
                <th rowspan="3">Approved By</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="data in candidateList" :key="data.id">
                <td class="text-capitalize fw-bold">{{ data.name }}</td>

                <td>
                  {{ data.business_unit }}
                </td>
                <td>{{ data.shift }}</td>

                <td>
                  <div class="calendar-grid">
                    <div
                      v-for="day in selectedDateRow"
                      :key="day"
                      @click="openModal(data, day)"
                      :class="{
                        'calendar-day': true,
                        clickable: day !== '',
                      }"
                    >
                      <div v-if="formatDate(day)">
                        <td></td>
                      </div>
                    </div>
                  </div>
                </td>
                <td>{{ data.total_hours }}</td>
                <td>{{ data.total_cost }}</td>
                <td>{{ data.approved_by }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import AppointmentAdd from "../modals/Schedule/EditAssignedShift.vue";

export default {
  data() {
    return {
      startDate: "",
      endDate: { value: "", display: "" },
      currentDate: new Date(),
      selectedDate: null,
      candidateList: [],
      selectedCandidateId: null,
      selectedCandidate: null,

      statusForSelectedDate: null,
      vacancyList: [],
    };
  },
  computed: {
    daysOfWeek() {
      return [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ];
    },
    selectedCandidate() {
      return this.candidateList.find(
        (candidate) => candidate.id === this.selectedCandidateId
      );
    },
    selectedDateRow() {
      // Calculate a row of 7 days starting from the selected date (Monday to Sunday)
      const selectedDate = new Date(this.startDate);
      const selectedDateRow = [];

      // Find the first day of the week (Sunday is 0, Monday is 1, and so on)
      const dayOfWeek = selectedDate.getDay();
      const startDay = (dayOfWeek - 1 + 7) % 7; // Adjust for Monday being the start of the week

      for (let i = 0; i < 7; i++) {
        const currentDate = new Date(selectedDate);
        currentDate.setDate(selectedDate.getDate() + i - startDay);
        selectedDateRow.push(`${currentDate.getDate()}`);
      }

      return selectedDateRow;
    },
    candidateName() {
      return this.selectedCandidate ? this.selectedCandidate.first_name : "";
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
  },

  methods: {
    async handleDrop(candidateId) {
      try {
        if (!this.vacancyBeingDragged || !this.vacancyBeingDragged.id) {
          return;
        }

        const payload = {
          vacancy_id: this.vacancyBeingDragged.id,
          candidate_id: candidateId,
        };

        const response = await axios.post(
          `${VITE_API_URL}/assign_vacancy`,
          payload
        );
      } catch (error) {
      } finally {
        // Reset drag-related data
        this.vacancyBeingDragged = null;
        this.dropCandidateId = null;
        this.dropDay = null;
        this.droppedContent = null;
      }
    },

    formattedDate(day) {
      const selectedDate = new Date(this.startDate);
      selectedDate.setDate(day);
      return selectedDate.toISOString().split("T")[0];
    },
    getCandidateName() {
      return this.selectedCandidate ? this.selectedCandidate.first_name : "Default Name";
    },

    saveToLocalStorage() {
      localStorage.setItem(
        "calendarData",
        JSON.stringify({
          startDate: this.startDate,
          endDate: this.endDate.value,
        })
      );
    },
    loadStoredData() {
      const storedData = localStorage.getItem("calendarData");

      if (storedData) {
        const parsedData = JSON.parse(storedData);
        this.startDate = parsedData.startDate;
        this.endDate.value = parsedData.endDate;
      }
    },
    updateSelectedDateRow(startDate, endDate) {
      // Calculate a row of 7 days starting from the start date (Monday to Sunday)
      const selectedDateRow = [];

      // Find the first day of the week (Sunday is 0, Monday is 1, and so on)
      const dayOfWeek = startDate.getDay();
      const startDay = (dayOfWeek - 1 + 7) % 7; // Adjust for Monday being the start of the week

      for (let i = 0; i < 7; i++) {
        const currentDate = new Date(startDate);
        currentDate.setDate(startDate.getDate() + i - startDay);
        selectedDateRow.push(`${currentDate.getDate()}`);
      }

      Vue.set(this, "selectedDateRow", selectedDateRow); // Ensure reactivity
    },
    formatDate(day) {
      const selectedDate = new Date(this.startDate);
      selectedDate.setDate(day);
      return selectedDate.toLocaleDateString(); // Adjust the format as needed
    },

    openModal(candidateId, day) {
      try {
        // Extract the id property from the Proxy object
        const actualCandidateId = candidateId.id;

        // Set the selected date in the format YYYY-MM-DD
        const selectedDate = new Date(this.startDate);
        selectedDate.setDate(parseInt(day)); // Set the day of the month

        // Format the selected date exactly like the availability date
        const formattedDate = selectedDate.toISOString().split("T")[0];

        this.selectedDate = formattedDate;
        this.selectedCandidateId = actualCandidateId; // Set the actual candidate ID

        // Find the candidate in the candidateList
        const selectedCandidate = this.candidateList.find(
          (candidate) => candidate.id === actualCandidateId
        );

        // Check if the candidate details are found
        if (selectedCandidate) {
          // Use Vue.nextTick to ensure the DOM has been updated
          this.$nextTick(() => {
            this.selectedCandidate = selectedCandidate;
          });
        } else {
          // Handle case when selectedCandidate is null

          this.selectedDate = null;
          this.statusForSelectedDate = null;
        }
      } catch (error) {
        this.selectedDate = null;
        this.statusForSelectedDate = null;
      }
    },
    closeModal() {
      this.selectedDate = null;

      this.statusForSelectedDate = null;
    },
    async fetchCandidateList() {
      try {
        const response = await axios.get(`${VITE_API_URL}/weekly_timesheets`);
        this.candidateList = response.data;
      } catch (error) {}
    },
  },
  components: {
    AppointmentAdd,
  },
  mounted() {
    this.fetchCandidateList();

    this.loadStoredData();
    window.addEventListener("beforeunload", this.saveToLocalStorage);
  },
};
</script>

<style scoped>
#main {
  background-color: #fdce5e17;
}
.calendar-header {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}
input.dateInput {
  width: 1.3%;
}
.current-month {
  margin: 0 20px;
  font-size: 18px;
  font-weight: bold;
}
table {
  border: 1px solid 1px solid rgb(241 229 229);
}
table,
th,
td {
  border: 1px solid 1px solid rgb(241 229 229);
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

.day-header,
.empty-day,
.calendar-day {
  text-align: center;
  cursor: pointer;
}

.day-header {
  font-weight: bold;
}

.empty-day {
  background-color: #f3f3f3;
}

.modal-content h3 {
  color: #fff;
}
.modal-content .close {
  padding: 0px 5px;
  border-radius: 4px;
  background: #ff551f;
}

.calendar-day {
  background-color: #eaeaea;
  transition: background-color 0.3s ease;
  padding: 20px 20px;
}

.calendar-day.clickable {
  cursor: crosshair;
  font-size: 12px;

  font-weight: bold;
}

/* Modal styles */
.modal {
  display: block;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.4);
}

.modal-content {
  background-color: #fefefe;
  margin: 15% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
}

.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}
</style>
