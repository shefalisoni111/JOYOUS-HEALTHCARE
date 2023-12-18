<template>
  <div>
    <Navbar />
    <div id="main">
      <h6>Booking Page in Progress.....</h6>
    </div>
  </div>
</template>
<script setup>
import Navbar from "../components/Navbar.vue";
</script>
<style scoped>
#main {
  padding: 20px 20px;
  transition: all 0.3s;
  height: 100dvh;
  background-color: #fdce5e17;
}
ul.generalsetting h6 {
  font-size: 14px;
  font-weight: bold;
}
</style>

<!-- <template>
  <div>
    <Navbar />
    <div class="container-fluid p-0">
      <div id="main">
        <div class="pagetitle d-flex justify-content-between px-2">
          <div class="py-3">
            <ol class="breadcrumb mb-1">
              <li class="breadcrumb-item active text-uppercase fs-6">
                Dashboard / <span class="color-fonts">Bookings</span>
              </li>
            </ol>
          </div>
        </div>

        <div class="container-fluid mt-3">
          <div class="row">
            <div class="col-12">
              <div class="">
                <div>
                  <ul
                    class="nav nav-pills mb-3 d-flex justify-content-between"
                    id="pills-tab"
                    role="tablist"
                  >
                    <div class="d-flex">
                      <div class="">
                        <DateRangePicker />
                        <select
                          class="form-select"
                          aria-label="Default select example "
                        >
                          <option selected>Week</option>
                          <option value="1">One</option>
                          <option value="2">Two</option>
                          <option value="3">Three</option>
                        </select>
                      </div>
                      
                    </div>
                    <div class="d-flex gap-2">
                      <div>
                        <button
                          type="button"
                          class="btn btn-outline-success text-nowrap"
                          data-bs-toggle="modal"
                          data-bs-target="#"
                          data-bs-whatever="@mdo"
                        >
                          Delete Booking
                        </button>
                      </div>

                      <div class="searchbox position-relative">
                        <input
                          class="form-control mr-sm-2"
                          type="search"
                          placeholder="&nbsp;&nbsp;&nbsp;&nbsp; Search Booking"
                          aria-label="Search"
                        />
                      </div>
                    </div>
                  </ul>
                  <div class="tab-content" id="pills-tabContent">
                    <div
                      class="tab-pane fade show active"
                      id="pills-home"
                      role="tabpanel"
                      aria-labelledby="pills-home-tab"
                    >
                      <table class="table candidateTable">
                        <thead>
                          <tr>
                            <th scope="col">#Booking Code</th>
                            <th scope="col">Candidates</th>
                            <th scope="col">Business Unit</th>
                            <th scope="col">Job Title</th>
                            <th scope="col">Shift Dates</th>
                            <th scope="col">Booking By</th>
                            <th scope="col">Booking Date</th>
                            <th scope="col">Start</th>
                            <th scope="col">End</th>
                            <th scope="col">Break</th>
                            <th scope="col">Duration</th>
                            <th scope="col">Notes</th>
                            <th scope="col">Mailed At</th>
                            <th scope="col">Status</th>
                            <th scope="col">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr></tr>
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
    <AddVacancy />
    <PulishedVacancy />
  </div>
</template>
<script>
import axios from "axios";
import Navbar from "../components/Navbar.vue";
import DateRangePicker from "../components/pluginsdetail/DateRangePicker.vue";

export default {
  data() {
    return {
      getVacancyDetail: [],

      isActive: true,
      searchQuery: "",
    };
  },
  components: { Navbar, DateRangePicker },

  methods: {
    // async vacancyDeleteMethod(id) {
    //   if (!window.confirm("Are you Sure ?")) {
    //     return;
    //   }
    //   const token = localStorage.getItem("token");
    //   await axios
    //     .delete(`https://logezy.onrender.com/vacancies/` + id, {
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
    //     .get("https://logezy.onrender.com/vacancies", {
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
  },
};
</script>

<style scoped>
#main {
  transition: all 0.3s;
  height: 100dvh;
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
  border-bottom: 2px solid red; /* Replace with your desired border color */
  padding-bottom: 5px; /* Optional: Add padding for spacing */
}

button.nav-link.active > li.nav-item {
  /* Additional styles for the active state if needed */
}

.form-select {
  width: auto;
}

.searchbox::before {
  content: "\F52A";
  font-family: "bootstrap-icons";
  position: absolute;
  top: 8px;
  left: 10px;
  color: #ff5f30;
  font-weight: bolder;
}
input::-webkit-input-placeholder {
  margin-left: 5px;
}
</style> -->
