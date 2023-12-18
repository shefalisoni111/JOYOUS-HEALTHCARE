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
              <p class="mb-0 text-uppercase gs">invoice Settings</p>
              <p class="afterline"></p>
            </div>
            <div>
              <ul class="list-unstyled text-capitalize generalsetting px-3">
                <li class="list-items d-flex">
                  <i class="bi bi-file-earmark-text rounded-circle"></i>
                  <router-link
                    to="/appsetting/invoicesetting"
                    class="text-decoration-none"
                  >
                    <div class="job ms-2">
                      <h6 class="mb-0 text-capitalize">invoice setting</h6>
                      <p class="text-capitalize mb-0">
                        check invoice dues date
                      </p>
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
                <ol class="breadcrumb mb-1 p-3">
                  <li class="breadcrumb-item active text-uppercase fw-bold">
                    invoice setting / <span>invoice setting</span>
                  </li>
                </ol>
              </div>
              <!-- End Page Title -->
              <div class="d-flex align-items-center"></div>
            </div>
          </div>
          <div class="row">
            <div class="col-12">
              <div class="bg-white px-3">
                <div class="showdata">
                  <ul class="nav nav-tabs" id="myTab" role="tablist">
                    <li class="nav-item" role="presentation">
                      <button
                        class="nav-link active text-capitalize ms-0"
                        id="shift"
                        data-bs-toggle="tab"
                        data-bs-target="#home"
                        type="button"
                        role="tab"
                        aria-controls="home"
                        aria-selected="true"
                      >
                        shift
                      </button>
                    </li>
                    <li class="nav-item" role="presentation">
                      <button
                        class="nav-link text-capitalize"
                        id="candidate"
                        data-bs-toggle="tab"
                        data-bs-target="#profile"
                        type="button"
                        role="tab"
                        aria-controls="profile"
                        aria-selected="false"
                      >
                        candidate
                      </button>
                    </li>
                    <li class="nav-item" role="presentation">
                      <button
                        class="nav-link text-capitalize"
                        id="business-unit"
                        data-bs-toggle="tab"
                        data-bs-target="#contact"
                        type="button"
                        role="tab"
                        aria-controls="contact"
                        aria-selected="false"
                      >
                        business-unit
                      </button>
                    </li>
                    <li class="nav-item" role="presentation">
                      <button
                        class="nav-link text-capitalize"
                        id="reminders"
                        data-bs-toggle="tab"
                        data-bs-target="#contact"
                        type="button"
                        role="tab"
                        aria-controls="contact"
                        aria-selected="false"
                      >
                        reminders
                      </button>
                    </li>
                  </ul>
                  <div class="tab-content" id="myTabContent">
                    <div
                      class="tab-pane fade show active"
                      id="home"
                      role="tabpanel"
                      aria-labelledby="shift"
                    >
                      <div class="p-4">
                        <ul
                          class="nav nav-pills mb-3"
                          id="pills-tab"
                          role="tablist"
                        >
                          <li class="nav-item" role="presentation">
                            <button
                              class="nav-link active"
                              id="vacancy"
                              data-bs-toggle="pill"
                              data-bs-target="#pills-home"
                              type="button"
                              role="tab"
                              aria-controls="pills-home"
                              aria-selected="true"
                            >
                              Vacancy
                            </button>
                          </li>
                          <li class="nav-item" role="presentation">
                            <button
                              class="nav-link"
                              id="assignshift"
                              data-bs-toggle="pill"
                              data-bs-target="#pills-profile"
                              type="button"
                              role="tab"
                              aria-controls="pills-profile"
                              aria-selected="false"
                            >
                              Assign Shifts
                            </button>
                          </li>
                          <li class="nav-item" role="presentation">
                            <button
                              class="nav-link"
                              id="cancleshifts"
                              data-bs-toggle="pill"
                              data-bs-target="#pills-contact"
                              type="button"
                              role="tab"
                              aria-controls="pills-contact"
                              aria-selected="false"
                            >
                              Cancle Shifts
                            </button>
                          </li>
                        </ul>
                        <div class="tab-content" id="pills-tabContent">
                          <div
                            class="tab-pane fade show active"
                            id="pills-home"
                            role="tabpanel"
                            aria-labelledby="vacancy"
                            tabindex="0"
                          >
                            <div class="row">
                              <div class="col-12 d-flex">
                                <div class="col-10">
                                  <div class="">
                                    <form>
                                      <input
                                        type="email"
                                        class="form-control"
                                        placeholder="New Vacancy Created"
                                      />
                                    </form>
                                  </div>
                                </div>
                                <div class="col-2">
                                  <button
                                    class="btn btn-primary rounded-1 float-end text-uppercase fw-medium"
                                    type="button"
                                  >
                                    <i class="bi bi-floppy pe-2"></i>
                                    save
                                  </button>
                                </div>
                              </div>
                              <div class="taxtformator mt-4">
                                <TextFormator />
                              </div>
                            </div>
                          </div>
                          <div
                            class="tab-pane fade"
                            id="pills-profile"
                            role="tabpanel"
                            aria-labelledby="assignshift"
                            tabindex="0"
                          >
                            ...
                          </div>
                          <div
                            class="tab-pane fade"
                            id="pills-contact"
                            role="tabpanel"
                            aria-labelledby="cancleshifts"
                            tabindex="0"
                          >
                            ...
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      class="tab-pane fade"
                      id="profile"
                      role="tabpanel"
                      aria-labelledby="candidate"
                    >
                      <p class="p-4">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Eaque dolore quasi architecto magni aperiam totam.
                        Quibusdam magnam eaque possimus ipsum. Necessitatibus
                        molestias rerum architecto ipsam quis labore quod quo
                        sint?
                      </p>
                    </div>
                    <div
                      class="tab-pane fade"
                      id="contact"
                      role="tabpanel"
                      aria-labelledby="business-unit"
                    >
                      <p class="p-4">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Eaque dolore quasi architecto magni aperiam totam.
                        Quibusdam magnam eaque possimus ipsum. Necessitatibus
                        molestias rerum architecto ipsam quis labore quod quo
                        sint?
                      </p>
                    </div>
                    <div
                      class="tab-pane fade"
                      id="contact"
                      role="tabpanel"
                      aria-labelledby=" reminders"
                    >
                      <p class="p-4">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Eaque dolore quasi architecto magni aperiam totam.
                        Quibusdam magnam eaque possimus ipsum. Necessitatibus
                        molestias rerum architecto ipsam quis labore quod quo
                        sint?
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
import TextFormator from "../textformator/TextFormator.vue";
</script>

<style scoped>
/*--------------------------------------------------------------
  # Page Title
  --------------------------------------------------------------*/
#logo {
  width: 119px;

  margin: auto;
  background: url("./logo.png") center / cover no-repeat;
}
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
.showdata .nav-link {
  color: #000;
  background: none;
  margin-left: 4px;
}

.nav-pills .nav-link.active,
.nav-pills .show > .nav-link {
  color: #0d6efd;
  border-bottom: 2px solid #0d6efd;
  border-radius: 0;
  background-color: transparent;
  font-weight: bold;
}
.nav-pills {
  border-bottom: 1px solid #ddd6d6;
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

ul.generalsetting h6 {
  font-size: 14px;
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
.showdata {
  border-left: 1px solid #dfd6d6;
  border-radius: 3px;
}
.settingsdetails p span {
  width: 100%;
  height: 0;
  left: 0;
  bottom: 5px;
  border-bottom: 3px solid #0d6efd;
}

table thead th {
  background-color: #f9944b !important;
}
.btn-primary {
  border: none;
}
</style>
