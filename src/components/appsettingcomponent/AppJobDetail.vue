<template>
  <div class="col-12">
    <div class="pagetitle d-flex justify-content-between">
      <div class="d-flex align-items-center">
        <ul class="breadcrumb mb-1">
          <li class="breadcrumb-item active text-uppercase fw-bold">
            General settings / <span class="clr">jobs</span>
          </li>
        </ul>
      </div>
      <!-- End Page Title -->
      <div class="d-flex align-items-center">
        <button
          v-if="activeTab === 'active'"
          class="btn btn-primary rounded-1 text-uppercase fw-medium"
          data-bs-toggle="modal"
          data-bs-target="#myModal"
          data-bs-whatever="@mdo"
          type="button"
          @click="showPopup"
        >
          + Add jobs
        </button>
      </div>
    </div>
    <div class="showdata">
      <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
        <li class="nav-item" role="presentation">
          <button
            class="nav-link active text-capitalize ps-0 text-nowrap"
            id="active"
            data-bs-toggle="pill"
            data-bs-target="#pills-home"
            type="button"
            role="tab"
            aria-controls="pills-home"
            aria-selected="true"
            @click="setActiveTab('active')"
          >
            Active
          </button>
        </li>
        <li class="nav-item" role="presentation">
          <button
            class="nav-link text-capitalize text-nowrap"
            id="inactive"
            data-bs-toggle="pill"
            data-bs-target="#pills-profile"
            type="button"
            role="tab"
            aria-controls="pills-profile"
            aria-selected="false"
            @click="setActiveTab('inactive')"
          >
            Inactive
          </button>
        </li>
      </ul>
      <div class="tab-content" id="pills-tabContent">
        <div
          class="tab-pane fade show active"
          id="pills-home"
          role="tabpanel"
          aria-labelledby="active"
          tabindex="0"
        >
          <div class="mt-4 table-wrapper">
            <table class="table table table-hover addjobtable">
              <thead>
                <tr>
                  <th scope="col" class="bg-primary text-white">Id</th>
                  <th scope="col" class="bg-primary text-white">Colour</th>
                  <th scope="col" class="bg-primary text-white">Name</th>
                  <th scope="col" class="bg-primary text-white">Job Code</th>
                  <th scope="col" class="bg-primary text-white">No. of Vendors</th>
                  <th scope="col" class="bg-primary text-white">No. of Staff</th>
                  <th scope="col" class="bg-primary text-white">No. of Documents</th>
                  <th scope="col" class="bg-primary text-white">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="jobs in getJobs" :key="jobs.id">
                  <td v-text="jobs.id"></td>
                  <td scope="row">
                    <i class="bi bi-square-fill" :style="{ color: jobs.color }"></i>
                  </td>
                  <td class="text-capitalize" v-text="jobs.name"></td>
                  <td v-text="jobs.job_code"></td>
                  <td v-text="jobs.no_of_client"></td>
                  <td v-text="jobs.no_of_candidates"></td>
                  <td>2</td>
                  <td>
                    <button
                      class="btn btn-primary text-nowrap"
                      v-on:click="jobsInActive(jobs.id)"
                    >
                      In-Active
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div
          class="tab-pane fade"
          id="pills-profile"
          role="tabpanel"
          aria-labelledby="inactive"
          tabindex="0"
        >
          <table class="table table table-hover addjobtable">
            <thead>
              <tr>
                <th scope="col" class="bg-primary text-white">Id</th>
                <th scope="col" class="bg-primary text-white">Colour</th>
                <th scope="col" class="bg-primary text-white">Name</th>
                <th scope="col" class="bg-primary text-white">Job Code</th>
                <th scope="col" class="bg-primary text-white">No. of Vendor</th>
                <th scope="col" class="bg-primary text-white">No. of Staff</th>
                <th scope="col" class="bg-primary text-white">No. of Documents</th>
                <th scope="col" class="bg-primary text-white">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="jobs in getInActiveJobs" :key="jobs.id">
                <td v-text="jobs.id"></td>
                <td scope="row">
                  <i class="bi bi-square-fill" :style="{ color: jobs.color }"></i>
                </td>
                <td class="text-capitalize" v-text="jobs.name"></td>
                <td v-text="jobs.job_code"></td>
                <td v-text="jobs.no_of_client"></td>
                <td v-text="jobs.no_of_candidates"></td>
                <td>2</td>
                <td>
                  <button
                    class="bi bi-pencil btn-sm btn btn-primary rounded-1 text-uppercase fw-medium"
                    data-bs-toggle="modal"
                    data-bs-target="#editJob"
                    data-bs-whatever="@mdo"
                    type="button"
                    v-on:click="jobsEdit(jobs.id)"
                  ></button>

                  <span>&nbsp;</span>
                  <button
                    class="btn btn-primary btn-sm text-nowrap"
                    v-on:click="jobActive(jobs.id)"
                  >
                    Re-Activate
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <ConfirmationModal :message="confirmMessage" @confirmed="performAction" />
    <AddJobbs @jobAdded="getJobData" />
    <EditJob :jobID="selectedjobID" @jobUpdate="getInactiveJobData" />
  </div>
</template>

<script>
import axios from "axios";
import AddJobbs from "../modals/appsetting/AddJobbs.vue";
import EditJob from "../modals/appsetting/EditJob.vue";
import ConfirmationModal from "../../components/Alerts/ConfirmationAlert.vue";

export default {
  name: "AppJobDetail",
  data() {
    return {
      getJobs: [],
      getInActiveJobs: [],
      activeTab: "active",
      selectedjobID: null,
      confirmMessage: "",
    };
  },
  components: {
    AddJobbs,
    EditJob,
    ConfirmationModal,
  },

  methods: {
    showConfirmation(message, callback) {
      this.confirmMessage = message;
      this.confirmCallback = callback;
      $("#confirmationModal").modal("show");
    },
    performAction() {
      if (typeof this.confirmCallback === "function") {
        this.confirmCallback();
      }
    },
    setActiveTab(tab) {
      this.activeTab = tab;
    },
    jobsEdit(jobID) {
      this.selectedjobID = jobID;
    },
    jobActive(id) {
      if (!window.confirm("Are you Sure ?")) {
        return;
      }
      axios.put(`${VITE_API_URL}/active_job/` + id).then((response) => {
        this.getJobData();
        this.getInactiveJobData();
      });
      alert("Record Activated ");
    },

    jobsInActive(id) {
      if (!window.confirm("Are you Sure ?")) {
        return;
      }
      axios.put(`${VITE_API_URL}/inactivate_job/` + id).then((response) => {
        this.getJobData();
        this.getInactiveJobData();
        if (response.data.message) {
          alert(response.data.message);
        } else {
          alert("Record Inactivated ");
        }
      });
    },
    async getJobData() {
      await axios
        .get(`${VITE_API_URL}/active_job_list`)
        .then((response) => {
          this.getJobs = response.data.data;
        })
        .catch((error) => {
          if (error.response) {
            if (error.response.status == 404) {
              // alert(error.response.data.message);
            }
          }
        });
    },
    async getInactiveJobData() {
      await axios
        .get(`${VITE_API_URL}/inactive_job_list`)
        .then((response) => {
          this.getInActiveJobs = response.data.data;
          // this.getInactiveDataMethod();
        })
        .catch((error) => {
          if (error.response) {
            if (error.response.status == 404) {
              // alert(error.response.data.message);
            }
          }
        });
    },
    async getInactiveDataMethod() {
      await axios
        .get(`${VITE_API_URL}/inactive_job_list`)
        .then((response) => {
          // this.getInactiveJobData();
        })
        .catch((error) => {
          if (error.response) {
            if (error.response.status == 404) {
              // alert(error.response.data.message);
            }
          }
        });
    },
  },

  mounted() {
    this.getJobData();
    this.getInactiveJobData();
  },
};
</script>

<style scoped>
td i.bi-trash {
  border: 1px solid #9e9e9e;
  padding: 3px 15px;
  border-radius: 4px;
}
.showdata .nav-link {
  color: #000;
}
.showdata .nav-link.active {
  background: #e8e3e3;
  margin-left: 4px;
}
.nav-pills .nav-link.active {
  color: #ff5722;
  border-bottom: 2px solid #ff5722;
  border-radius: 0;
  background-color: transparent;
  font-weight: bold;
}
.nav-pills {
  border-bottom: 1px solid #ddd6d6;
}
.pagesetting p span::after {
  content: "";
}

.btn-primary {
  border: none;
}

table thead th {
  background-color: #f9944b !important;
}
table {
  border-collapse: separate;
}
.table th,
.table td {
  text-align: center;
  width: 11.2857%;
}
.table td:last-child {
  width: 16% !important;
}
.table th:last-child {
  width: 16% !important;
}
</style>
