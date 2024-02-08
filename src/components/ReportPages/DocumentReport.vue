<!-- <template>
  <div>
    <Navbar />
    <div id="main">
      <h6>PAyroll Page in Progress.....</h6>
    </div>
  </div>
</template>
<script>
import Navbar from "../Navbar.vue";

export default {
  components: {
    Navbar,
  },
};
</script>
<style scoped>
#main {
  padding: 20px 20px;
  transition: all 0.3s;

  height: 100dvh;
  background-color: #fdce5e17;
}
</style> -->

<template>
  <div>
    <Navbar />
    <div id="main">
      <div class="container-fluid mt-3">
        <div class="row">
          <div class="col-12">
            <div class="">
              <div class="gap-2 d-flex ms-2">
                <select>
                  <option value="">All</option>
                </select>
                <select>
                  <option value="">All Candidate Status</option>
                </select>
                <select>
                  <option value="">All Candidate</option>
                </select>
                <select>
                  <option value="">All Document Category</option>
                </select>
                <select>
                  <option value="">All Document Type</option>
                </select>
              </div>
              <div>
                <div class="p-2">
                  <div class="d-flex justify-content-between">
                    <div class="d-flex">
                      <ul class="nav nav-pills mt-2 gap-2" id="pills-tab" role="tablist">
                        <li class="nav-item" role="presentation">
                          <button
                            class="nav-link active"
                            id="pills-all-tab"
                            data-bs-toggle="pill"
                            data-bs-target="#pills-all"
                            type="button"
                            role="tab"
                            aria-controls="pills-all"
                            aria-selected="true"
                          >
                            All
                          </button>
                        </li>
                        <li class="nav-item" role="presentation">
                          <button
                            class="nav-link"
                            id="pills-active-tab"
                            data-bs-toggle="pill"
                            data-bs-target="#pills-active"
                            type="button"
                            role="tab"
                            aria-controls="pills-active"
                            aria-selected="false"
                          >
                            Active
                          </button>
                        </li>
                        <li class="nav-item" role="presentation">
                          <button
                            class="nav-link"
                            id="pills-dueDate-tab"
                            data-bs-toggle="pill"
                            data-bs-target="#pills-dueDate"
                            type="button"
                            role="tab"
                            aria-controls="pills-dueDate"
                            aria-selected="false"
                          >
                            Due(30 days)
                          </button>
                        </li>
                        <li class="nav-item" role="presentation">
                          <button
                            class="nav-link"
                            id="pills-expired-tab"
                            data-bs-toggle="pill"
                            data-bs-target="#pills-expired"
                            type="button"
                            role="tab"
                            aria-controls="pills-expired"
                            aria-selected="false"
                          >
                            Expired
                          </button>
                        </li>
                      </ul>
                    </div>

                    <div class="d-flex align-items-center">
                      <button type="button" class="btn btn-outline-success text-nowrap">
                        <i class="bi bi-eye"></i> Customize View
                      </button>
                    </div>
                  </div>
                </div>

                <div class="tab-content" id="pills-tabContent">
                  <div
                    class="tab-pane fade show active"
                    id="pills-all"
                    role="tabpanel"
                    aria-labelledby="pills-all-tab"
                  >
                    <table class="table candidateTable">
                      <thead>
                        <tr>
                          <th scope="col">Sl No</th>
                          <th scope="col">Candidate</th>

                          <th scope="col">Document Category</th>
                          <th scope="col">Document Type</th>
                          <th scope="col">Upload Date</th>
                          <th scope="col">Issue Date</th>
                          <th scope="col">Expiry Date</th>
                          <th scope="col">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td scope="col">1</td>
                          <td scope="col">Aniket</td>

                          <td scope="col">ID Proof</td>
                          <td scope="col">Pancard</td>
                          <td scope="col">24/1/2024</td>
                          <td scope="col">3/2/2024</td>
                          <td scope="col">7/8/2024</td>
                          <td scope="col">Active</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div
                    class="tab-pane fade"
                    id="pills-active"
                    role="tabpanel"
                    aria-labelledby="pills-active-tab"
                  >
                    ...
                  </div>
                  <div
                    class="tab-pane fade"
                    id="pills-dueDate"
                    role="tabpanel"
                    aria-labelledby="pills-dueDate-tab"
                  >
                    ...
                  </div>
                  <div
                    class="tab-pane fade"
                    id="pills-expired"
                    role="tabpanel"
                    aria-labelledby="pills-expired-tab"
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
      startDate: new Date(),
      endDate: new Date(),
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
      const currentDate = new Date();
      if (this.currentView === "weekly") {
        const weekStart = new Date(this.startDate);
        weekStart.setDate(this.startDate.getDate() - this.startDate.getDay());
        this.startDate = weekStart;
        this.endDate = new Date(weekStart);
        this.endDate.setDate(this.endDate.getDate() + 6);
      } else if (this.currentView === "monthly") {
        const currentDate = new Date();
        this.startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
        this.endDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
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
      return date.toLocaleDateString();
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
    // async createVacancy() {
    //   const token = localStorage.getItem("token");
    //   axios
    //     .get(`${VITE_API_URL}/vacancies`, {
    //       headers: {
    //         "content-type": "application/json",
    //         Authorization: "bearer " + token,
    //       },
    //     })
    //     .then((response) => (this.getVacancyDetail = response.data));
    // },
  },

  mounted() {
    // this.createVacancy();
    this.loadDateRangeFromLocalStorage();
  },
};
</script>

<style scoped>
#main {
  transition: all 0.3s;
  height: 100vh;

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
a {
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
  border: 1px solid #ff5f30;
  border-radius: 22px;
  color: #ff5f30;
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
