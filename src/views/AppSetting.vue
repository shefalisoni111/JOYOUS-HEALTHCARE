<template>
  <div>
    <div id="main" class="main d-flex flex-column flex-lg-row">
      <!-- Sidebar section -->
      <div class="bg-white" style="border-radius: 20px">
        <Navbar />
      </div>

      <!-- Main content wrapper -->
      <div
        class="flex-grow-1 container-fluid px-4 py-4"
        style="background: rgb(82 74 74 / 6%)"
      >
        <!-- Breadcrumb -->
        <div class="row">
          <div class="col-12">
            <ol class="breadcrumb mb-1 mt-2">
              <li class="breadcrumb-item active">
                <a class="nav-link d-inline fs-4 fw-bolder text-dark">App Settings</a>
              </li>
            </ol>
          </div>
        </div>

        <!-- Main content row -->
        <div class="row mt-4">
          <!-- Left Sidebar Panel -->

          <div class="col-2 col-md-2 col-lg-1"><Sidebar /></div>
          <div class="col-10 col-md-10 col-lg-3 mb-4 ps-0">
            <div class="bg-white p-3" style="border-radius: 30px">
              <!-- General Settings -->
              <div class="heading mb-3 position-relative">
                <p class="bforeline"></p>
                <p class="mb-0 fw-bold text-capitalize genSetting">General Settings</p>
                <p class="afterline"></p>
              </div>

              <!-- Settings List -->
              <ul class="list-unstyled generalsetting">
                <li class="list-items d-flex mb-3">
                  <router-link to="/addjobdetail" class="text-decoration-none d-flex">
                    <i class="bi bi-suitcase-lg rounded-circle"></i>
                    <div class="job ms-2">
                      <h6 class="mb-0 text-capitalize">jobs</h6>
                      <p class="mb-0 text-capitalize">Add jobs, positions & roles</p>
                    </div>
                  </router-link>
                </li>
                <!-- <li class="list-items d-flex mt-3">
                    <router-link
                      to="/staff-status"
                      class="text-decoration-none"
                    >
                      <i class="bi bi-check-lg rounded-circle"></i>
                      <div class="job">
                        <h6 class="mb-0 text-capitalize">Staff status</h6>
                        <p class="text-capitalize mb-0">view & modify</p>
                      </div>
                    </router-link>
                  </li> -->
                <li class="list-items d-flex mt-3">
                  <router-link to="/employmenttypedetail" class="text-decoration-none">
                    <i class="bi bi-person-square rounded-circle"></i>
                    <div class="job">
                      <h6 class="mb-0 text-capitalize">employment types</h6>
                      <p class="text-capitalize mb-0">Add & modify</p>
                    </div>
                  </router-link>
                </li>
                <li class="list-items d-flex mt-3">
                  <router-link to="/shift" class="text-decoration-none">
                    <i class="bi bi-clock rounded-circle"></i>
                    <div class="job">
                      <h6 class="mb-0 text-capitalize">shift</h6>
                      <p class="text-capitalize mb-0">shift times</p>
                    </div>
                  </router-link>
                </li>
                <li class="list-items d-flex mt-3">
                  <router-link to="/holidaycalender" class="text-decoration-none">
                    <i class="bi bi-calendar2-range-fill rounded-circle"></i>
                    <div class="job">
                      <h6 class="mb-0 text-capitalize">Holiday Calendar</h6>
                      <p class="text-capitalize mb-0">Add & Modify holidays</p>
                    </div>
                  </router-link>
                </li>
                <li class="list-items d-flex mt-3">
                  <router-link to="/staff-deduction" class="text-decoration-none">
                    <i class="bi bi-credit-card rounded-circle"></i>
                    <div class="job">
                      <h6 class="mb-0 text-capitalize">Staff Deduction</h6>
                      <p class="text-capitalize mb-0">Add & modify Deduction</p>
                    </div>
                  </router-link>
                </li>
                <!-- <li class="list-items d-flex mt-3">
                    <i class="bi bi-person-vcard rounded-circle"></i>
                    <router-link
                      to="/staff-profiles"
                      class="text-decoration-none"
                    >
                      <div class="job">
                        <h6 class="mb-0 text-capitalize">Staff profile</h6>
                        <p class="text-capitalize mb-0">Add mandatory fields</p>
                      </div>
                    </router-link>
                  </li>-->
                <!-- <li class="list-items d-flex mt-3">
                    <i class="bi bi-card-list rounded-circle"></i>
                    <router-link
                      to="/staff-detail-field"
                      class="text-decoration-none"
                    >
                      <div class="job">
                        <h6 class="mb-0 text-capitalize">
                          Staff Detail Section Field
                        </h6>
                        <p class="text-capitalize mb-0">
                          Add Staff Detail Section Field
                        </p>
                      </div>
                    </router-link>
                  </li> -->
                <div class="heading my-3 position-relative px-sm-2">
                  <p class="bforeline"></p>
                  <p class="mb-0 text-capitalize fw-bold docSetting ms-1">
                    Documents Setting
                  </p>
                  <p class="afterlines"></p>
                </div>
                <li class="list-items d-flex">
                  <i class="bi bi-file-earmark-medical rounded-circle"></i>
                  <router-link to="/documentcategories" class="text-decoration-none">
                    <div class="job">
                      <h6 class="mb-0 text-capitalize ms-1">documents categories</h6>
                      <p class="text-capitalize mb-0">create & update categories</p>
                    </div>
                  </router-link>
                </li>
              </ul>
            </div>
          </div>

          <!-- Right Content -->
          <div class="col-12 col-lg-8" style="height: 100vh">
            <div class="bg-white p-4">
              <RouterView />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Navbar from "../components/Navbar.vue";
import Sidebar from "../components/Sidebar.vue";
// import AppJobDetail from "../components/appsettingcomponent/AppJobDetail.vue";

// import CandidateStatus from "../components/appsettingcomponent/CandidateStatus.vue";
// import EmploymentTypeDetails from "../components/appsettingcomponent/EmploymentTypeDetails.vue";
// import Shift from "../components/appset-tingcomponent/Shift.vue";

export default {
  components: {
    Navbar,
    Sidebar,
    // AppJobDetail,
    // CandidateStatus,
    // EmploymentTypeDetails,
    // Shift,
  },
  data() {
    return {};
  },
  methods: {
    toggleActionMenu(index) {
      this.selectedRow = this.selectedRow === index ? null : index;
    },
  },
  mounted() {},
};
</script>

<style scoped>
.docSetting {
  margin-left: -16px;
  color: #6c757d;
}

.pagetitle {
  margin-bottom: 10px;
  background-color: #fff;
  padding: 10px;
}

ul.generalsetting li a .job p {
  font-size: 12px;
}

ul.generalsetting h6 {
  font-size: 14px;
  font-weight: bold;
}

.heading p.gs {
  transform: translateX(18px);
}

.pagesetting {
  border-bottom: 1px solid rgb(196, 196, 196);
  width: 100%;
}
.nav-pills .nav-link.active,
.nav-pills .show > .nav-link {
  color: #f9944b !important;
}
ul.generalsetting li a {
  display: flex;
  color: #4d4d4d;

  width: 100%;
  padding: 3px;
}
ul.generalsetting li i.rounded-circle {
  color: #4d4d4d;
}

ul.generalsetting li i.rounded-circle {
  border-radius: 50%;
}
.router-link-active,
.router-link-exact-active {
  background-color: #e6f0ff !important;
  border-radius: 8px;
  display: flex;
  align-items: center;
  padding: 10px;
}

.router-link-active h6,
.router-link-active p,
.router-link-active i,
.router-link-exact-active h6,
.router-link-exact-active p,
.router-link-exact-active i {
  color: #0d6efd !important;
}
ul.generalsetting li i.rounded-circle a.router-link-active:active {
  border-top-left-radius: 22px !important;
  border-bottom-left-radius: 22px !important;
}
@media (max-width: 1400px) {
  #main {
    padding-top: 51px;
  }
}
@media (max-width: 420px) {
  .docSetting {
    margin-left: -4px !important;
  }
}
</style>
