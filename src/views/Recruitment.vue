<template>
  <div>
    <Navbar />

    <div id="main" class="main px-sm-2">
      <div class="row">
        <div class="col-md-3 p-3 ps-5 bg-white borderight">
          <div class="leftside">
            <div class="heading mb-3 position-relative">
              <p class="bforeline"></p>
              <p class="mb-0 text-uppercase fw-bold genSetting">NAVIGATIONS</p>
              <p class="afterline"></p>
            </div>
            <div>
              <ul class="list-unstyled text-capitalize generalsetting px-3"></ul>
            </div>
            <div>
              <ul class="list-unstyled text-capitalize generalsetting px-3">
                <li class="list-items d-flex mb-2">
                  <i class="bi bi-people rounded-circle"></i>
                  <router-link to="/staffs" class="text-decoration-none">
                    <div class="job ms-2">
                      <h6 class="mb-0 text-capitalize clr">Staffs</h6>
                    </div>
                  </router-link>
                </li>
                <li class="list-items d-flex mb-2">
                  <i class="bi bi-suitcase-lg rounded-circle"></i>
                  <router-link to="/jobs" class="text-decoration-none">
                    <div class="job ms-2">
                      <h6 class="mb-0 text-capitalize clr">Jobs</h6>
                    </div>
                  </router-link>
                </li>
                <li class="list-items d-flex mb-2">
                  <i class="bi bi-gear rounded-circle"></i>
                  <router-link to="/settings" class="text-decoration-none">
                    <div class="job ms-2">
                      <h6 class="mb-0 text-capitalize clr">Settings</h6>
                    </div>
                  </router-link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="col-md-9">
          <div class="col-12 bg-white p-4">
            <router-view />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Navbar from "../components/Navbar.vue";

export default {
  components: {
    Navbar,
  },
  data() {
    return {};
  },
  methods: {},
  mounted() {},
};
</script>

<style scoped>
#main {
  padding-top: 65px;
}
.docSetting {
  margin-left: -16px;
  color: #ff5722;
}

.genSetting {
  color: #ff5722;
}

.pagetitle {
  margin-bottom: 10px;
  background-color: #fff;
  padding: 10px;
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

.heading p.gs {
  transform: translateX(18px);
}

.pagesetting {
  border-bottom: 1px solid rgb(196, 196, 196);
  width: 100%;
}

ul.generalsetting li a {
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 3px;
  align-items: center;
}

a.router-link-active::after {
  content: "\F285";
  font-family: "bootstrap-icons";
  display: flex;
  align-items: center;
  color: #ff5722;
  align-items: center;
}
ul.generalsetting li i.rounded-circle {
  border-radius: 50%;
}
a.router-link-active {
  background-color: #fff4de;
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
