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
              <p class="mb-0 text-uppercase gs">agency Settings</p>
              <p class="afterline"></p>
            </div>
            <div>
              <ul class="list-unstyled text-capitalize generalsetting px-3">
                <li class="list-items d-flex">
                  <i class="bi bi-person rounded-circle"></i>
                  <router-link
                    to="/appsetting/agencysetting"
                    class="text-decoration-none"
                  >
                    <div class="job ms-2">
                      <h6 class="mb-0 text-capitalize">profile</h6>
                      <p class="text-capitalize mb-0">
                        view & update agency profiles & logos
                      </p>
                    </div>
                  </router-link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="col-md-8 p-0">
          <div class="settingsdetails">
            <div class="pagetitle d-flex justify-content-between">
              <div class="d-flex align-items-center">
                <ol class="breadcrumb mb-1 p-3">
                  <li class="breadcrumb-item active text-uppercase fw-bold">
                    agency setting / <span>profile</span>
                  </li>
                </ol>
              </div>
              <!-- End Page Title -->
            </div>
          </div>
          <div class="col-12 bg-white"></div>
          <div class="row">
            <div class="col-12">
              <div class="bg-white">
                <div class="col-5">
                  <div class="d-flex justify-content-between align-items-center px-4">
                    <img src="./logo.png" class="" alt="RecPal" width="180" height="51" />
                    <div class="d-flex flex-column text-capitalize">
                      <h5 class="mb-0">RecPal</h5>
                      <p class="mb-0">recruitment</p>
                      <span>Description</span>
                    </div>
                  </div>
                </div>
                <div class="showdata p-4">
                  <ul class="nav nav-tabs" id="myTab" role="tablist">
                    <li class="nav-item" role="presentation">
                      <button
                        class="nav-link active ms-0"
                        id="about"
                        data-bs-toggle="tab"
                        data-bs-target="#home"
                        type="button"
                        role="tab"
                        aria-controls="home"
                        aria-selected="true"
                      >
                        About
                      </button>
                    </li>
                    <li class="nav-item" role="presentation">
                      <button
                        class="nav-link"
                        id="additional"
                        data-bs-toggle="tab"
                        data-bs-target="#profile"
                        type="button"
                        role="tab"
                        aria-controls="profile"
                        aria-selected="false"
                      >
                        Additional
                      </button>
                    </li>
                    <li class="nav-item" role="presentation">
                      <button
                        class="nav-link"
                        id="RecPal"
                        data-bs-toggle="tab"
                        data-bs-target="#contact"
                        type="button"
                        role="tab"
                        aria-controls="contact"
                        aria-selected="false"
                      >
                        Logo
                      </button>
                    </li>
                    <li class="nav-item" role="presentation">
                      <button
                        class="nav-link"
                        id="changepass"
                        data-bs-toggle="tab"
                        data-bs-target="#contact"
                        type="button"
                        role="tab"
                        aria-controls="contact"
                        aria-selected="false"
                      >
                        Change Password
                      </button>
                    </li>
                  </ul>
                  <div class="tab-content" id="myTabContent">
                    <div
                      class="tab-pane fade show active"
                      id="home"
                      role="tabpanel"
                      aria-labelledby="about"
                    >
                      <div class="p-4 table-wrapper">
                        <table class="table table-borderless">
                          <thead>
                            <tr>
                              <th scope="col">Agency name</th>
                              <th scope="col">RecPal</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <th scope="row">authorized person</th>
                              <td>--</td>
                            </tr>
                            <tr>
                              <th scope="row">email</th>
                              <td>raj@gmail.com</td>
                            </tr>
                            <tr>
                              <th scope="row">address</th>
                              <td colspan="2">nikunj bihar indore</td>
                            </tr>
                            <tr>
                              <th scope="row">mobile number</th>
                              <td colspan="2">...</td>
                            </tr>
                            <tr>
                              <th scope="row">phone number</th>
                              <td colspan="2">...</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <div
                      class="tab-pane fade"
                      id="profile"
                      role="tabpanel"
                      aria-labelledby="additional"
                    >
                      <p class="p-4">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque
                        dolore quasi architecto magni aperiam totam. Quibusdam magnam
                        eaque possimus ipsum. Necessitatibus molestias rerum architecto
                        ipsam quis labore quod quo sint?
                      </p>
                    </div>
                    <div
                      class="tab-pane fade"
                      id="contact"
                      role="tabpanel"
                      aria-labelledby="logoimg"
                    >
                      <p class="p-4">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque
                        dolore quasi architecto magni aperiam totam. Quibusdam magnam
                        eaque possimus ipsum. Necessitatibus molestias rerum architecto
                        ipsam quis labore quod quo sint?
                      </p>
                    </div>
                    <div
                      class="tab-pane fade"
                      id="contact"
                      role="tabpanel"
                      aria-labelledby=" changepass"
                    >
                      <p class="p-4">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque
                        dolore quasi architecto magni aperiam totam. Quibusdam magnam
                        eaque possimus ipsum. Necessitatibus molestias rerum architecto
                        ipsam quis labore quod quo sint?
                      </p>
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
<script setup>
import Navbar from "../Navbar.vue";
import Sidebar from "../Sidebar.vue";
</script>

<style scoped>
/*--------------------------------------------------------------
  # Page Title
  --------------------------------------------------------------*/

table th,
table tr td {
  text-transform: capitalize;
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
ul.generalsetting li a .job h6 {
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
  background-color: #fdce5e38;
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
.pagesetting[data-v-6f1f6d9a] {
  border-bottom: 1px solid rgb(196, 196, 196);
  width: 100%;
}

.showdata .tab-content > .active {
  border: 1px solid #e5e0e0;
  border-top: none;
}

.showdata .nav-link {
  color: #ffffff;
  background: #0d6efd;
  margin-left: 4px;
}
.showdata .nav-link.active {
  color: #000;
  background: none;
  margin-left: 4px;
}

.btn-primary {
  border: none;
}

/*--------------------------------------------------------------
  # Main
  --------------------------------------------------------------*/

@media (max-width: 1199px) {
  #main {
    padding: 20px;
  }
}
</style>
