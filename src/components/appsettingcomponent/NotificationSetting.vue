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
              <p class="mb-0 text-uppercase gs">notifications Settings</p>
              <p class="afterline"></p>
            </div>
            <div>
              <ul class="list-unstyled text-capitalize generalsetting px-3">
                <li class="list-items d-flex mt-2">
                  <i class="bi bi-envelope rounded-circle"></i>
                  <router-link
                    to="/appsetting/notificationsetting"
                    class="text-decoration-none"
                  >
                    <div class="job ms-2">
                      <h6 class="mb-0 text-capitalize">Email</h6>
                      <p class="text-capitalize mb-0">
                        modify email integeration
                      </p>
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
                      <p class="text-capitalize mb-0">
                        modify shift & vacancy alerts
                      </p>
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
</style>
