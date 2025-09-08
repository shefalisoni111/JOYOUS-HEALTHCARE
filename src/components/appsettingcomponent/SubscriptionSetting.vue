<template>
  <div>
    <!-- <Navbar /> -->

    <div id="main" class="main">
      <div class="row">
        <div class="col-md-1"><Sidebar /></div>
        <div class="col-md-3 p-3 bg-white borderight">
          <div class="leftside">
            <div class="heading mb-3 position-relative">
              <p class="bforeline"></p>
              <p class="mb-0 text-uppercase fw-bold genSetting">subscription Settings</p>
              <p class="afterline"></p>
            </div>
            <div>
              <ul class="list-unstyled text-capitalize generalsetting px-3">
                <li class="list-items d-flex">
                  <i class="bi bi-person rounded-circle"></i>
                  <router-link
                    to="/appsetting/SubscriptionSetting"
                    class="text-decoration-none"
                  >
                    <div class="job ms-2">
                      <h6 class="mb-0 text-capitalize clr">Subscription Settings</h6>
                      <p class="text-capitalize mb-0">View and Change Subscription</p>
                    </div>
                  </router-link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="col-md-8 p-0">
          <div class="settingsdetails">
            <div class="pagetitle d-flex justify-content-between mb-0">
              <div class="d-flex align-items-center">
                <ol class="breadcrumb mb-1 p-3">
                  <li class="breadcrumb-item active text-uppercase fw-bold">
                    subscription Settings / <span class="clr">SUBSCRIPTION details</span>
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
                <div class="showdata px-4">
                  <ul class="nav nav-tabs" id="myTab" role="tablist">
                    <li class="nav-item" role="presentation">
                      <button
                        class="nav-link active ms-0 ps-0 fw-bold"
                        id="SubscriptionID"
                        data-bs-toggle="tab"
                        data-bs-target="#Subscription"
                        type="button"
                        aria-controls="Subscription"
                        aria-selected="true"
                      >
                        Subscription
                      </button>
                    </li>
                    <li class="nav-item" role="presentation">
                      <button
                        class="nav-link fw-bold"
                        id="BillingID"
                        data-bs-toggle="tab"
                        data-bs-target="#Billing"
                        type="button"
                        aria-controls="Billing"
                        aria-selected="false"
                      >
                        Billing
                      </button>
                    </li>
                    <li class="nav-item" role="presentation">
                      <button
                        class="nav-link fw-bold"
                        id="RecentActivitiesID"
                        data-bs-toggle="tab"
                        data-bs-target="#RecentActivities"
                        type="button"
                        aria-controls="RecentActivities"
                        aria-selected="false"
                      >
                        Recent Activities
                      </button>
                    </li>
                  </ul>
                  <div class="tab-content">
                    <div
                      class="tab-pane fade show active"
                      id="Subscription"
                      role="tabpanel"
                      aria-labelledby="SubscriptionID"
                    >
                      <div class="row mt-3">
                        <div class="col-4">
                          <div class="card mb-3" style="max-width: 18rem">
                            <div class="card-header text-center">Testing demo</div>
                            <div class="card-body ">
                              <h5 class="card-title text-center">$0.00</h5>
                              <p class="text-center">plus VAT</p>
                              <p class="card-text">
                                <ul>
                                  <li>
                                    2 Admin User
                                  </li>
                                  <li>
                                    Up to 100 Staft
                                  </li>
                                </ul>
                              </p>
                            </div>
                          </div>
                        </div>
                        <div class="col-8"></div>
                      </div>
                    </div>
                    <div
                      class="tab-pane fade"
                      id="Billing"
                      role="tabpanel"
                      aria-labelledby="BillingID"
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
                      id="RecentActivities"
                      role="tabpanel"
                      aria-labelledby="RecentActivitiesID"
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

<script>
// import Navbar from "../Navbar.vue";
import Sidebar from "../Sidebar.vue";

export default {
  name: "SubscriptionSetting",
  data() {
    return {};
  },
  components: {
    // Navbar,
    Sidebar,
  },

  methods: {
    toggleActionMenu(index) {
      this.selectedRow = this.selectedRow === index ? null : index;
    },},

  mounted() {},
};
</script>

<style scoped>
#main {
  padding-top: 65px;
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
.nav-tabs .nav-link:hover,
.nav-tabs .nav-link:focus,
.nav-tabs .nav-link {
  border: none;
}
a.router-link-active {
  background-color: #fff4de;
}
ul.generalsetting li i.rounded-circle a.router-link-active:active {
  border-top-left-radius: 22px !important;
  border-bottom-left-radius: 22px !important;
}
a.router-link-active::after {
  content: "\F285";
  font-family: 'Inter', sans-serif;
  display: flex;
  align-items: center;
  color: #ff5722;}
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
}
.clr {
  color: #ff5722;
}
a.router-link-active::after {
  content: "\F285";
  font-family: 'Inter', sans-serif;
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
.genSetting {
  color: #ff5722;
}

.settingsdetails p span {
  width: 100%;
  height: 0;
  left: 0;
  bottom: 5px;
  border-bottom: 3px solid #0d6efd;
}
.pagesetting {
  border-bottom: 1px solid rgb(196, 196, 196);
  width: 100%;
}

.nav-tabs .nav-link.active,
.nav-tabs .nav-item.show .nav-link {
  border: none;
}

.showdata .nav-link {
  color: #000;
}
.showdata .nav-link.active {
  border-bottom: 3px solid #ff5722;
  margin-left: 4px;
}

.btn-primary {
  border: none;
}


</style>
