<template>
  <div class="col-12">
    <div class="pagetitle d-flex justify-content-between">
      <div class="d-flex align-items-center">
        <ul class="breadcrumb mb-1">
          <li class="breadcrumb-item active text-capitalize fw-bold">
            General settings /
            <span class="clr" style="color: #6c757dcf">jobs</span>
          </li>
        </ul>
      </div>
      <!-- End Page Title -->
      <div class="d-flex align-items-center">
        <button
          v-if="activeTab === 'active'"
          class="btn btn-primary rounded-4 fw-medium text-capitalize"
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
            class="nav-link active text-capitalize px-0 text-nowrap"
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
            <table class="table table addjobtable">
              <thead>
                <tr>
                  <th scope="col" class="bg-primary text-white">
                    Id
                    <img
                      src="../../assets/ArrowDown.png"
                      class="img-fluid pe-2"
                      alt="RecPal"
                      loading="eager"
                    />
                  </th>
                  <th scope="col" class="bg-primary text-white">
                    Colour
                    <img
                      src="../../assets/ArrowDown.png"
                      class="img-fluid pe-2"
                      alt="RecPal"
                      loading="eager"
                    />
                  </th>
                  <th scope="col" class="bg-primary text-white">
                    Name
                    <img
                      src="../../assets/ArrowDown.png"
                      class="img-fluid pe-2"
                      alt="RecPal"
                      loading="eager"
                    />
                  </th>
                  <th scope="col" class="bg-primary text-white">
                    <div
                      class="d-flex justify-content-center align-items-center gap-1"
                    >
                      Job Code
                    </div>
                  </th>
                  <th scope="col" class="bg-primary text-white">
                    <div
                      class="d-flex justify-content-center align-items-center gap-1"
                    >
                      No. of Clients
                    </div>
                  </th>
                  <th scope="col" class="bg-primary text-white text-center">
                    <div
                      class="d-flex justify-content-center align-items-center gap-1"
                    >
                      <span>No. of Staff</span>
                      <img
                        src="../../assets/ArrowDown.png"
                        class="img-fluid"
                        alt="RecPal"
                        loading="eager"
                        style="height: 7px"
                      />
                    </div>
                  </th>
                  <th scope="col" class="bg-primary text-white">
                    <div
                      class="d-flex justify-content-center align-items-center gap-1"
                    >
                      No. of Documents
                    </div>
                  </th>
                  <th scope="col" class="bg-primary text-white">
                    Action
                    <img
                      src="../../assets/ArrowDown.png"
                      class="img-fluid pe-2"
                      alt="RecPal"
                      loading="eager"
                    />
                  </th>
                </tr>
              </thead>
              <tbody v-if="paginateSiteData?.length > 0">
                <tr v-for="jobs in paginateSiteData" :key="jobs.id">
                  <td v-text="jobs.id"></td>
                  <td scope="row">
                    <i
                      class="bi bi-square-fill"
                      :style="{ color: jobs.color }"
                    ></i>
                  </td>
                  <td class="text-capitalize" v-text="jobs.name"></td>
                  <td v-text="jobs.job_code"></td>
                  <td v-text="jobs.vendors"></td>
                  <td v-text="jobs.no_of_candidates"></td>
                  <td>2</td>
                  <td>
                    <button
                      class="btn text-nowrap"
                      style="
                        background-color: rgb(255, 227, 234);
                        color: rgb(255, 59, 48);
                      "
                      v-on:click="confirmed(jobs.id)"
                    >
                      In-Active
                    </button>
                  </td>
                </tr>
              </tbody>
              <tbody v-else>
                <tr>
                  <td
                    colspan="8"
                    class="text-center text-danger"
                    v-if="!isLoading"
                  >
                    {{ "Data Not Found!" }}
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
          tabindex="1"
        >
          <table class="table table addjobtable">
            <thead>
              <tr>
                <th scope="col" class="bg-primary text-white">
                  Id
                  <img
                    src="../../assets/ArrowDown.png"
                    class="img-fluid pe-2"
                    alt="RecPal"
                    loading="eager"
                  />
                </th>
                <th scope="col" class="bg-primary text-white">
                  Colour
                  <img
                    src="../../assets/ArrowDown.png"
                    class="img-fluid pe-2"
                    alt="RecPal"
                    loading="eager"
                  />
                </th>
                <th scope="col" class="bg-primary text-white">
                  Name
                  <img
                    src="../../assets/ArrowDown.png"
                    class="img-fluid pe-2"
                    alt="RecPal"
                    loading="eager"
                  />
                </th>
                <th scope="col" class="bg-primary text-white">
                  Job Code
                  <img
                    src="../../assets/ArrowDown.png"
                    class="img-fluid pe-2"
                    alt="RecPal"
                    loading="eager"
                  />
                </th>
                <th scope="col" class="bg-primary text-white">
                  <div
                    class="d-flex justify-content-center align-items-center gap-1"
                  >
                    No. of Vendor
                    <img
                      src="../../assets/ArrowDown.png"
                      class="img-fluid pe-2"
                      alt="RecPal"
                      loading="eager"
                    />
                  </div>
                </th>
                <th scope="col" class="bg-primary text-white">
                  <div
                    class="d-flex justify-content-center align-items-center gap-1"
                  >
                    No. of Staff

                    <img
                      src="../../assets/ArrowDown.png"
                      class="img-fluid pe-2"
                      alt="RecPal"
                      loading="eager"
                    />
                  </div>
                </th>
                <th scope="col" class="bg-primary text-white">
                  <div
                    class="d-flex justify-content-center align-items-center gap-1"
                  >
                    No. of Documents
                    <img
                      src="../../assets/ArrowDown.png"
                      class="img-fluid pe-2"
                      alt="RecPal"
                      loading="eager"
                    />
                  </div>
                </th>
                <th scope="col" class="bg-primary text-white">
                  Action
                  <img
                    src="../../assets/ArrowDown.png"
                    class="img-fluid pe-2"
                    alt="RecPal"
                    loading="eager"
                  />
                </th>
              </tr>
            </thead>
            <tbody v-if="getInActiveJobs?.length > 0">
              <tr
                v-for="(jobs, index) in getInActiveJobs"
                :key="index"
                @mouseenter="hoverRow = index"
                @mouseleave="hoverRow = null"
              >
                <td v-text="jobs.id"></td>
                <td scope="row">
                  <i
                    class="bi bi-square-fill"
                    :style="{ color: jobs.color }"
                  ></i>
                </td>
                <td class="text-capitalize" v-text="jobs.name"></td>
                <td v-text="jobs.job_code"></td>
                <td v-text="jobs.vendors"></td>
                <td v-text="jobs.no_of_candidates"></td>
                <td>2</td>
                <td>
                  <!-- <button
                    class="bi bi-pencil rounded-1 text-uppercase fw-medium"
                    data-bs-toggle="modal"
                    data-bs-target="#editJob"
                    data-bs-whatever="@mdo"
                    type="button"
                    v-on:click="jobsEdit(jobs.id)"
                  ></button>

                  <span>&nbsp;</span>
                  <button
                    class="btn text-nowrap"
                    style="
                      background-color: rgb(233, 250, 239);
                      color: rgb(36, 209, 100);
                    "
                    v-on:click="jobActive(jobs.id)"
                  >
                    Re-Activate
                  </button> -->

                  <div class="action-wrapper">
                    <i class="bi bi-three-dots dot-icon"></i>

                    <div v-if="hoverRow === index" class="action-menu">
                      <button
                        type="button"
                        class="btn text-nowrap border-0"
                        data-bs-toggle="modal"
                        data-bs-target="#editJob"
                        data-bs-whatever="@mdo"
                        v-on:click="jobsEdit(jobs.id)"
                      >
                        <i
                          class="bi bi-pencil-square"
                          style="color: #f9944b"
                        ></i>
                        Edit
                      </button>
                      <button
                        class="btn text-nowrap"
                        style="
                          background-color: rgb(233, 250, 239);
                          color: rgb(36, 209, 100);
                        "
                        v-on:click="jobActive(jobs.id)"
                      >
                        Re-Activate
                      </button>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
            <tbody v-else>
              <tr>
                <td
                  colspan="8"
                  class="text-center text-danger"
                  v-if="!isLoading"
                >
                  {{ "Data Not Found!" }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div
      class="mx-3 d-flex justify-content-between"
      style="text-align: right"
      v-if="shouldShowPagination?.length >= 10"
    >
      <div class="d-flex">
        <h6 class="d-flex align-items-center">Show: &nbsp;</h6>
        <button
          class="btn btn-sm dropdown-toggle rounded-[12px] border border-[1px] p-3 border"
          style="color: #00000080"
          type="button"
          id="recordsPerPageDropdown"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          {{ itemsPerPage }} Records
        </button>
        <ul class="dropdown-menu" aria-labelledby="recordsPerPageDropdown">
          <li>
            <a class="dropdown-item" href="#" @click="setItemsPerPage(20)"
              >20 Records</a
            >
          </li>
          <li>
            <a class="dropdown-item" href="#" @click="setItemsPerPage(50)"
              >50 Records</a
            >
          </li>
          <li>
            <a class="dropdown-item" href="#" @click="setItemsPerPage(100)"
              >100 Records</a
            >
          </li>
        </ul>
      </div>
      <div class="d-flex align-items-center">
        &nbsp;&nbsp;
        <button
          class="btn btn-sm mr-2 rounded-[12px] border border-[1px] p-3 border px-4"
          style="background: #ffffff"
          :disabled="currentPage === 1"
          @click="changePage(currentPage - 1)"
        >
          <i class="bi bi-chevron-left"></i>
        </button>
        &nbsp;&nbsp;
        <button
          class="btn btn-sm mr-2 rounded-[12px] border border-[1px] p-3 border px-4 cursor-none fw-bolder"
          style="background: #ffffff; color: #f9944b"
        >
          {{ currentPage }}
        </button>
        &nbsp;&nbsp;
        <button
          class="btn btn-sm ml-2 rounded-[12px] border border-[1px] p-3 border px-4"
          style="background: #ffffff"
          :disabled="currentPage === totalPages"
          @click="changePage(currentPage + 1)"
        >
          <i class="bi bi-chevron-right"></i>
        </button>
      </div>
    </div>
    <ConfirmationAlert
      :show-modal="isModalVisible"
      :message="confirmMessage"
      @confirm="confirmCallback"
      @cancel="canceled"
    />
    <ShowDetailsMessage
      :show-modal="showModal"
      :message="alertMessage"
      @close="closeModal"
    />
    <AddJobbs @jobAdded="getJobData" />
    <EditJob :jobID="selectedjobID" @jobUpdate="getInactiveJobData" />
    <SuccessAlert ref="successAlert" />
    <loader :isLoading="isLoading"></loader>
  </div>
</template>

<script>
import axios from "axios";
import AddJobbs from "../modals/appsetting/AddJobbs.vue";
import EditJob from "../modals/appsetting/EditJob.vue";
import ConfirmationAlert from "../../components/Alerts/ConfirmationAlert.vue";
import SuccessAlert from "../Alerts/SuccessAlert.vue";
import Loader from "../Loader/Loader.vue";
import ShowDetailsMessage from "../Alerts/ShowDetailsMessage.vue";
import Swal from "sweetalert2";

export default {
  name: "AppJobDetail",
  data() {
    return {
      getJobs: [],
      getInActiveJobs: [],
      activeTab: "active",
      selectedjobID: null,
      hoverRow: null,
      isLoading: false,
      isModalVisible: false,
      confirmMessage: "",
      confirmCallback: null,
      showModal: false,
      alertMessage: "",
      currentPage: 1,
      itemsPerPage: 10,
    };
  },
  components: {
    AddJobbs,
    EditJob,
    ConfirmationAlert,
    SuccessAlert,
    Loader,
    ShowDetailsMessage,
  },
  computed: {
    shouldShowPagination() {
      return this.activeTab === "active" && this.getJobs.length >= 10;
    },
    paginateSiteData() {
      if (this.getJobs && Array.isArray(this.getJobs)) {
        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        const endIndex = startIndex + this.itemsPerPage;
        return this.getJobs.slice(startIndex, endIndex);
      }
      return [];
    },
    totalRecordsOnPage() {
      return this.paginateSiteData.length;
    },
  },
  methods: {
    confirmed(id) {
      this.isModalVisible = false;

      this.jobsInActive(id);
    },
    changePage(page) {
      this.currentPage = page;
      this.getJobData();
    },
    canceled() {
      this.isModalVisible = false;
    },

    setActiveTab(tab) {
      this.activeTab = tab;
    },
    jobsEdit(jobID) {
      this.selectedjobID = jobID;
    },
    jobActive(id) {
      this.confirmMessage = "Are you sure you want to Re-activate this job?";
      this.isModalVisible = true;
      this.confirmCallback = async () => {
        axios.put(`${VITE_API_URL}/active_job/` + id).then((response) => {
          this.getJobData();
          this.getInactiveJobData();
        });
        const message = "Record Activated successfully";
        this.$refs.successAlert.showSuccess(message);
        // alert("Record Activated ");
        this.isModalVisible = false;
      };
    },
    async jobsInActive(id) {
      this.confirmMessage = "Are you sure you want to In-activate this job?";

      this.isModalVisible = true;

      this.confirmCallback = async () => {
        try {
          const response = await axios.put(
            `${VITE_API_URL}/inactivate_job/` + id
          );
          this.getJobData();
          this.getInactiveJobData();

          if (response.data.message) {
            await Swal.fire({
              icon: "warning",
              title: "Warning!",
              text: response.data.message,
              confirmButtonText: "OK",
            });
          } else {
            const message = "Record Inactivated successfully";
            await Swal.fire({
              icon: "success",
              title: "Success!",
              text: message,
              confirmButtonText: "OK",
            });
          }
        } catch (error) {
          // Handle error
        }

        this.isModalVisible = false;
      };
    },
    closeModal() {
      this.showModal = false;
    },
    // jobsInActive(id) {
    //   if (!window.confirm("Are you Sure ?")) {
    //     return;
    //   }
    //   axios.put(`${VITE_API_URL}/inactivate_job/` + id).then((response) => {
    //     this.getJobData();
    //     this.getInactiveJobData();
    //     if (response.data.message) {
    //       // alert(response.data.message);
    //       const message = response.data.message;
    //       this.$refs.successAlert.showSuccess(message);
    //     } else {
    //       // alert("");
    //       const message = "Record Inactivated  successfully";
    //       this.$refs.successAlert.showSuccess(message);
    //     }
    //   });
    // },
    setItemsPerPage(value) {
      this.itemsPerPage = value;
      this.currentPage = 1;
      this.getJobData();
    },
    async getJobData() {
      this.isLoading = true;
      try {
        const response = await axios.get(`${VITE_API_URL}/active_job_list`, {
          per_page: this.itemsPerPage,
        });
        this.getJobs = response.data.data;
      } catch (error) {
      } finally {
        this.isLoading = false;
      }
    },
    async getInactiveJobData() {
      this.isLoading = true;
      try {
        const response = await axios.get(`${VITE_API_URL}/inactive_job_list`);
        this.getInActiveJobs = response.data.data;
        // this.getInactiveDataMethod();
      } catch (error) {
      } finally {
        this.isLoading = false;
      }
    },
    // async getInactiveDataMethod() {
    //   await axios
    //     .get(`${VITE_API_URL}/inactive_job_list`)
    //     .then((response) => {
    //       // this.getInactiveJobData();
    //     })
    //     .catch((error) => {
    //       if (error.response) {
    //         if (error.response.status == 404) {
    //           // alert(error.response.data.message);
    //         }
    //       }
    //     });
    // },
  },
  beforeRouteUpdate(to, from, next) {
    this.getJobData();

    this.getInactiveJobData();
    next();
  },
  mounted() {
    this.getJobData();
    this.getInactiveJobData();
  },
};
</script>

<style>
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
.breadcrumb-item.active {
  color: #373b3e;
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
