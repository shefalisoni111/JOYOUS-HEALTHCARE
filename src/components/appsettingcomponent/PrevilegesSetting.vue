<template>
  <div>
    <Navbar />

    <div id="main" class="main">
      <div class="row">
        <div class="col-md-1"><Sidebar /></div>
        <div class="col-md-3 p-3 bg-white borderight">
          <div class="leftside">
            <div class="heading mb-3 position-relative">
              <p class="bforeline"></p>
              <p class="mb-0 text-uppercase fw-bold genSetting">previleges Settings</p>
              <p class="afterline"></p>
            </div>
            <div>
              <ul class="list-unstyled text-capitalize generalsetting px-3">
                <li class="list-items d-flex">
                  <i class="bi bi-file-earmark-text rounded-circle"></i>
                  <router-link
                    to="/appsetting/previlegesetting"
                    class="text-decoration-none"
                  >
                    <div class="job ms-2">
                      <h6 class="mb-0 text-capitalize">user & privileges</h6>
                      <p class="text-capitalize mb-0">Add & Modify</p>
                    </div>
                  </router-link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="col-md-8">
          <div class="col-12 bg-white">
            <div class="pagetitle d-flex justify-content-between">
              <div class="d-flex align-items-center">
                <ol class="breadcrumb pt-4 mb-0">
                  <li class="breadcrumb-item active text-uppercase fw-bold">
                    privileges setting / <span class="clr">user privileges</span>
                  </li>
                </ol>
              </div>
              <!-- End Page Title -->
              <div class="d-flex align-items-center"></div>
            </div>
          </div>
          <div class="settingsdetails">
            <div class="pagetitle d-flex justify-content-between align-items-center mb-0">
              <div class="d-flex">
                <ol class="breadcrumb mb-0">
                  <li class="breadcrumb-item active text-capitalize fw-bold">
                    user roles
                  </li>
                </ol>
              </div>
              <!-- End Page Title -->
              <div class="d-flex align-items-center">
                <button
                  class="btn btn-primary rounded-1 text-uppercase fw-medium"
                  data-bs-toggle="modal"
                  data-bs-target="#myModal"
                  data-bs-whatever="@mdo"
                  type="button"
                >
                  <i class="bi bi-plus"></i> add user
                </button>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-12">
              <div class="bg-white p-2">
                <div class="showdata">
                  <ul class="nav nav-pills" id="pills-tab" role="tablist">
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
                              <th scope="col" class="bg-primary text-white">User</th>
                              <th scope="col" class="bg-primary text-white">Email</th>
                              <th scope="col" class="bg-primary text-white">
                                Mobile No:
                              </th>
                              <th scope="col" class="bg-primary text-white">Hote</th>

                              <th scope="col" class="bg-primary text-white">Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>1</td>
                              <td scope="row">Demo</td>
                              <td class="text-capitalize">demo@gmail.com</td>
                              <td>6756454534</td>
                              <td>4</td>
                              <td><i class="bi bi-trash text-danger"></i></td>

                              <!-- <td>
                                <button
                                  class="btn btn-primary text-nowrap"
                                  v-on:click="jobsInActive(jobs.id)"
                                >
                                  In-Active
                                </button>
                              </td> -->
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
                      <div class="mt-4 table-wrapper">
                        <table class="table table table-hover addjobtable">
                          <thead>
                            <tr>
                              <th scope="col" class="bg-primary text-white">Id</th>
                              <th scope="col" class="bg-primary text-white">User</th>
                              <th scope="col" class="bg-primary text-white">Email</th>
                              <th scope="col" class="bg-primary text-white">
                                Mobile No:
                              </th>
                              <th scope="col" class="bg-primary text-white">Hote</th>

                              <th scope="col" class="bg-primary text-white">Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>1</td>
                              <td scope="row">Demo</td>
                              <td class="text-capitalize">demo@gmail.com</td>
                              <td>6756454534</td>
                              <td>4</td>
                              <td><i class="bi bi-trash text-danger"></i></td>

                              <!-- <td>
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
                            </td> -->
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
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
import Navbar from "../Navbar.vue";
import Sidebar from "../Sidebar.vue";
export default {
  data() {
    return {
      activeTab: "active",
    };
  },
  components: {
    Navbar,
    Sidebar,
  },
  methods: {
    setActiveTab(tab) {
      this.activeTab = tab;
    },
    jobsEdit(jobID) {
      this.selectedjobID = jobID;
    },
  },
};
</script>
<style scoped>
#main {
  padding-top: 65px;
}
.pagetitle {
  margin-bottom: 10px;
  background-color: #fff;
  padding: 10px;
}
.pagetitle h1 {
  font-size: 24px;
  margin-bottom: 0;
  font-weight: 600;
  color: #ff5722;
}
.clr {
  color: #ff5722;
}
ul.generalsetting li i.rounded-circle {
  background: #fff4de;
  width: 48px;
  height: 40px;
  text-align: center;
  line-height: 40px;
  color: #ff5722;
}
.nav-pills .nav-link {
  color: #464444;
}
ul.generalsetting li a .job p {
  font-size: 12px;
}
ul.generalsetting li a .job p,
ul.generalsetting li a .job h6 {
  color: #000;
}
ul.generalsetting h6 {
  font-size: 14px;
  font-weight: bold;
}
ul.generalsetting li a {
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 3px;
}
a.router-link-active {
  background-color: #fff4de;
}
ul.generalsetting li i.rounded-circle a.router-link-active:active {
  border-top-left-radius: 22px !important;
  border-bottom-left-radius: 22px !important;
}
a.router-link-active {
  color: #ff5722;
}
.genSetting {
  color: #ff5722;
}
.nav-pills .nav-link.active {
  color: #ff5722;
  border-bottom: 2px solid #ff5722;
  border-radius: 0;
  background-color: transparent;
  font-weight: bold;
}
.nav-pills {
  border-bottom: 1px solid grey;
}

a.router-link-active::after {
  content: "\F285";
  font-family: "bootstrap-icons";
  display: flex;
  align-items: center;
  color: #ff5722;
}
ul.generalsetting h6 {
  font-size: 14px;
}

.heading p.gs {
  transform: translateX(18px);
}

.pagesetting {
  border-bottom: 1px solid rgb(196, 196, 196);
  width: 100%;
}

.settingsdetails p span {
  width: 100%;
  height: 0;
  left: 0;
  bottom: 5px;
  border-bottom: 3px solid #ff5722;
}
.settingsdetails p span {
  width: 100%;
  height: 0;
  left: 0;
  bottom: 5px;
  border-bottom: 3px solid #ff5722;
}
table thead th {
  background-color: #f9944b !important;
}
table {
  border-collapse: separate;
}
.pagesetting[data-v-6f1f6d9a] {
  border-bottom: 1px solid rgb(196, 196, 196);
  width: 100%;
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
