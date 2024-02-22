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
              <p class="mb-0 text-uppercase fw-bold genSetting">notifications Settings</p>
              <p class="afterline"></p>
            </div>
            <div>
              <ul class="list-unstyled text-capitalize generalsetting px-3">
                <li class="list-items d-flex mt-2">
                  <i class="bi bi-envelope rounded-circle"></i>
                  <router-link to="email" class="text-decoration-none">
                    <div class="job ms-2">
                      <h6 class="mb-0 text-capitalize">Email</h6>
                      <p class="text-capitalize mb-0">modify email integeration</p>
                    </div>
                  </router-link>
                </li>
                <li class="list-items d-flex mt-2">
                  <i class="bi bi-chat-dots rounded-circle"></i>
                  <router-link
                    to="/appsetting/notificationsetting/sms"
                    class="text-decoration-none"
                  >
                    <div class="job ms-2">
                      <h6 class="mb-0 text-uppercase">sms</h6>
                      <p class="text-capitalize mb-0">
                        modify & integeration SMS messages
                      </p>
                    </div>
                  </router-link>
                </li>
                <li class="list-items d-flex mt-2">
                  <i class="bi bi-phone rounded-circle"></i>
                  <router-link
                    to="/appsetting/notificationsetting/pushnotification"
                    class="text-decoration-none"
                  >
                    <div class="job ms-2">
                      <h6 class="mb-0 text-capitalize">push notification</h6>
                      <p class="text-capitalize mb-0">add & edit push</p>
                    </div>
                  </router-link>
                </li>
                <li class="list-items d-flex mt-2">
                  <i class="bi bi-stopwatch rounded-circle"></i>
                  <router-link
                    to="/appsetting/notificationsetting/notificationalert"
                    class="text-decoration-none"
                  >
                    <div class="job ms-2">
                      <h6 class="mb-0 text-capitalize">notification alerts</h6>
                      <p class="text-capitalize mb-0">modify shift & vacancy alerts</p>
                    </div>
                  </router-link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="col-md-8 mt-3">
          <div class="col-12 bg-white"></div>

          <router-view />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "../Navbar.vue";
import Sidebar from "../Sidebar.vue";

export default {
  components: {
    Navbar,
    Sidebar,
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

ul.generalsetting li i.rounded-circle {
  background: #fff4de;
  width: 48px;
  height: 40px;
  text-align: center;
  line-height: 40px;
  color: #ff5722;
}
ul.generalsetting li {
  padding: 4px;
}
ul.generalsetting li a .job p {
  font-size: 12px;
}
ul.generalsetting li a .job p,
ul.generalsetting li a .job h6 {
  color: #000;
}
.genSetting {
  color: #ff5722;
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
  color: #ff5722;
}

a.router-link-active::after {
  content: "\F285";
  font-family: "bootstrap-icons";
  display: flex;
  align-items: center;
  color: #ff5722;
}

.heading p.gs {
  transform: translateX(18px);
}
</style>
