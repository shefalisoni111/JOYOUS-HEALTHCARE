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
              <p class="mb-0 text-uppercase gs">previleges Settings</p>
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
                <ol class="breadcrumb mb-1 py-3">
                  <li class="breadcrumb-item active text-uppercase fw-bold">
                    previleges setting / <span>user previleges</span>
                  </li>
                </ol>
              </div>
              <!-- End Page Title -->
              <div class="d-flex align-items-center"></div>
            </div>
          </div>
          <div class="settingsdetails">
            <div
              class="pagetitle d-flex justify-content-between align-items-center"
            >
              <div class="d-flex">
                <ol class="breadcrumb mb-1">
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
              <div class="bg-white p-4"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Navbar from "../Navbar.vue";
import Sidebar from "../Sidebar.vue";
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
  background: #ebf2f8;
  width: 48px;
  height: 40px;
  text-align: center;
  line-height: 40px;
  color: #0d6efd;
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
  color: #0d6efd;
  background-color: #fafdff;
}

a.router-link-active::after {
  content: "\F285";
  font-family: "bootstrap-icons";
  display: flex;
  align-items: center;
}
ul.generalsetting h6 {
  font-size: 14px;
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
.settingsdetails p span {
  width: 100%;
  height: 0;
  left: 0;
  bottom: 5px;
  border-bottom: 3px solid #0d6efd;
}
.pagesetting[data-v-6f1f6d9a] {
  border-bottom: 1px solid rgb(196, 196, 196);
  width: 100%;
}
</style>
