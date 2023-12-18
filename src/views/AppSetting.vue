<template>
  <div>
    <Navbar />

    <div id="main" class="main">
      <div class="row">
        <div class="col-md-1"><Sidebar /></div>
        <div class="col-md-3 p-3 p-0 bg-white borderight">
          <div class="leftside">
            <div class="heading mb-3 position-relative">
              <p class="bforeline"></p>
              <p class="mb-0 text-uppercase gs">General Settings</p>
              <p class="afterline"></p>
            </div>
            <div>
              <ul class="list-unstyled text-capitalize generalsetting px-3">
                <li class="list-items d-flex">
                  <i class="bi bi-suitcase-lg rounded-circle"></i>
                  <router-link
                    to="/appsetting/addjobdetail"
                    exact
                    class="text-decoration-none"
                  >
                    <div class="job ms-2">
                      <h6 class="mb-0 text-capitalize">jobs</h6>
                      <p class="text-capitalize mb-0">
                        Add jobs, positions & roles
                      </p>
                    </div>
                  </router-link>
                </li>
                <li class="list-items d-flex mt-3">
                  <i class="bi bi-check-lg rounded-circle"></i>
                  <router-link
                    to="/appsetting/candidatestatus"
                    exact
                    class="text-decoration-none"
                  >
                    <div class="job ms-2">
                      <h6 class="mb-0 text-capitalize">candidates status</h6>
                      <p class="text-capitalize mb-0">view & modify</p>
                    </div>
                  </router-link>
                </li>
                <li class="list-items d-flex mt-3">
                  <i class="bi bi-person-square rounded-circle"></i>
                  <router-link
                    to="/appsetting/employmenttypedetail"
                    class="text-decoration-none"
                  >
                    <div class="job ms-2">
                      <h6 class="mb-0 text-capitalize">employment types</h6>
                      <p class="text-capitalize mb-0">Add & modify</p>
                    </div>
                  </router-link>
                </li>
                <li class="list-items d-flex mt-3">
                  <i class="bi bi-clock rounded-circle"></i>
                  <router-link
                    to="/appsetting/shift"
                    class="text-decoration-none"
                  >
                    <div class="job ms-2">
                      <h6 class="mb-0 text-capitalize">shift</h6>
                      <p class="text-capitalize mb-0">shift times</p>
                    </div>
                  </router-link>
                </li>
                <!-- <li class="list-items d-flex mt-3">
                  <i class="bi bi-clock rounded-circle"></i>
                  <router-link
                    to="/appsetting/holidaycalender"
                    class="text-decoration-none"
                  >
                    <div class="job ms-2">
                      <h6 class="mb-0 text-capitalize">Holiday Calender</h6>
                      <p class="text-capitalize mb-0">Add & Modify holidays</p>
                    </div>
                  </router-link>
                </li> -->
                <li class="list-items d-flex mt-3">
                  <i class="bi bi-credit-card rounded-circle"></i>
                  <router-link
                    to="/appsetting/candidatededuction"
                    class="text-decoration-none"
                  >
                    <div class="job ms-2">
                      <h6 class="mb-0 text-capitalize">Candidate Deduction</h6>
                      <p class="text-capitalize mb-0">Add & modify Deduction</p>
                    </div>
                  </router-link>
                </li>
                <li class="list-items d-flex mt-3">
                  <i class="bi bi-person-vcard rounded-circle"></i>
                  <router-link
                    to="/appsetting/candidateprofiles"
                    class="text-decoration-none"
                  >
                    <div class="job ms-2">
                      <h6 class="mb-0 text-capitalize">Candidate profile</h6>
                      <p class="text-capitalize mb-0">Add mandatory fields</p>
                    </div>
                  </router-link>
                </li>
                <li class="list-items d-flex mt-3">
                  <i class="bi bi-card-list rounded-circle"></i>
                  <router-link
                    to="/appsetting/candidatedetailfield"
                    class="text-decoration-none"
                  >
                    <div class="job ms-2">
                      <h6 class="mb-0 text-capitalize">
                        Candidate Detail Section Field
                      </h6>
                      <p class="text-capitalize mb-0">
                        Add Candidate Detail Section Field
                      </p>
                    </div>
                  </router-link>
                </li>
                <div class="heading my-3 position-relative">
                  <p class="bforeline"></p>
                  <p class="mb-0 text-uppercase gs">Documents Setting</p>
                  <p class="afterlines"></p>
                </div>
                <li class="list-items d-flex">
                  <i class="bi bi-file-earmark-medical rounded-circle"></i>
                  <router-link
                    to="/appsetting/documentcategories"
                    class="text-decoration-none"
                  >
                    <div class="job ms-2">
                      <h6 class="mb-0 text-capitalize">documents categories</h6>
                      <p class="text-capitalize mb-0">
                        create & update categories
                      </p>
                    </div>
                  </router-link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="col-md-8">
          <div class="col-12 bg-white p-4">
            <RouterView />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import Navbar from "../components/Navbar.vue";
import Sidebar from "../components/Sidebar.vue";
import AppJobDetail from "../components/appsettingcomponent/AppJobDetail.vue";

import CandidateStatus from "../components/appsettingcomponent/CandidateStatus.vue";
import EmploymentTypeDetails from "../components/appsettingcomponent/EmploymentTypeDetails.vue";
import Shift from "../components/appsettingcomponent/Shift.vue";
</script>

<style scoped>
/*--------------------------------------------------------------
# Page Title
--------------------------------------------------------------*/
.pagetitle {
  margin-bottom: 10px;
  background-color: #fff;
  padding: 10px;
}
.pagetitle h1 {
  font-size: 24px;
  margin-bottom: 0;
  font-weight: 600;
  color: #0d6efd;
}

ul.generalsetting li i.rounded-circle {
  background: #fff4de;
  width: 48px;
  height: 40px;
  text-align: center;
  line-height: 40px;
  color: #ff5722;
}
ul.generalsetting li a .job p {
  font-size: 12px;
}
ul.generalsetting li a .job p,
ul.generalsetting li a .job h6 {
  color: #000;
}

.borderight {
  border-right: 1px solid rgb(196, 196, 196);
}

ul.generalsetting h6 {
  font-size: 14px;
  font-weight: bold;
}

.heading p.bforeline {
  width: 18px;
  height: 0.3px;
  background: #d8c9c9;
  left: 0;
  top: 50%;
  position: absolute;
}
.heading p.afterline {
  width: 126px;
  height: 0.3px;
  background: #d8c9c9;
  right: 0;
  top: 50%;
  position: absolute;
}
.heading p.afterlines {
  width: 79px;
  height: 0.3px;
  background: #d8c9c9;
  right: 0;
  top: 50%;
  position: absolute;
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
  border-bottom: 3px solid #0d6efd;
}
ul.generalsetting li a {
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 3px;
}
a.router-link-active {
  color: #0d6efd;
  background-color: #fdce5e38;
}

a.router-link-active::after {
  content: "\F285";
  font-family: "bootstrap-icons";
  display: flex;
  align-items: center;
  color: #ff5722;
}
</style>
