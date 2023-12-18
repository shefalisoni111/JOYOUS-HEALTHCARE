<template>
  <div>
    <div class="settingsdetails">
      <div class="pagetitle d-flex justify-content-between">
        <div class="d-flex align-items-center">
          <ol class="breadcrumb mb-1 p-3">
            <li class="breadcrumb-item active text-uppercase fw-bold">
              Notification setting / <span>Notification Alert</span>
            </li>
          </ol>
        </div>
        <!-- End Page Title -->
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
                  id="vacancy"
                  data-bs-toggle="tab"
                  data-bs-target="#home"
                  type="button"
                  role="tab"
                  aria-controls="home"
                  aria-selected="true"
                >
                  vacancy
                </button>
              </li>
              <li class="nav-item" role="presentation">
                <button
                  class="nav-link text-capitalize"
                  id="assignshift"
                  data-bs-toggle="tab"
                  data-bs-target="#profile"
                  type="button"
                  role="tab"
                  aria-controls="profile"
                  aria-selected="false"
                >
                  assign shift
                </button>
              </li>
              <li class="nav-item" role="presentation">
                <button
                  class="nav-link text-capitalize"
                  id="cancleshift"
                  data-bs-toggle="tab"
                  data-bs-target="#contact"
                  type="button"
                  role="tab"
                  aria-controls="contact"
                  aria-selected="false"
                >
                  cancle shift
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
            <div class="tab-content tabcontenttwo" id="myTabContent">
              <div
                class="tab-pane fade show active"
                id="home"
                role="tabpanel"
                aria-labelledby="vacancy"
              >
                <div class="p-4">
                  <div class="row">
                    <div class="col-12">
                      <div class="d-flex justify-content-between">
                        <div>
                          <h5 class="fw-bold">Enable SMS for mobile phones</h5>
                          <p>Enable SMS, so you can enable text alert</p>
                        </div>
                        <div><i class="bi bi-toggle-on"></i></div>
                      </div>
                      <div class="d-flex justify-content-between">
                        <div>
                          <h5 class="fw-bold">
                            Enable push notification for mobile phones
                          </h5>
                          <p>Download the candidate app for IOS,or Android</p>
                        </div>
                        <div><i class="bi bi-toggle-on"></i></div>
                      </div>
                      <div class="d-flex justify-content-between">
                        <div>
                          <h5 class="fw-bold">Via e-mail</h5>
                          <p>Enable vacancy alert via email</p>
                        </div>
                        <div><i class="bi bi-toggle-on"></i></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                class="tab-pane fade"
                id="profile"
                role="tabpanel"
                aria-labelledby="assignshift"
              >
                <p class="p-4">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque
                  dolore quasi architecto magni aperiam totam. Quibusdam magnam
                  eaque possimus ipsum. Necessitatibus molestias rerum
                  architecto ipsam quis labore quod quo sint?
                </p>
              </div>
              <div
                class="tab-pane fade"
                id="contact"
                role="tabpanel"
                aria-labelledby="cancleshift"
              >
                <p class="p-4">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque
                  dolore quasi architecto magni aperiam totam. Quibusdam magnam
                  eaque possimus ipsum. Necessitatibus molestias rerum
                  architecto ipsam quis labore quod quo sint?
                </p>
              </div>
              <div
                class="tab-pane fade"
                id="contact"
                role="tabpanel"
                aria-labelledby=" reminders"
              >
                <div class="p-4">
                  <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
                    <li class="nav-item" role="presentation">
                      <button
                        class="nav-link active text-capitalize"
                        id="shiftalarm"
                        data-bs-toggle="pill"
                        data-bs-target="#pills-home"
                        type="button"
                        role="tab"
                        aria-controls="pills-home"
                        aria-selected="true"
                      >
                        shift alarm
                      </button>
                    </li>
                    <li class="nav-item" role="presentation">
                      <button
                        class="nav-link text-capitalize"
                        id="doceexpiryalarm"
                        data-bs-toggle="pill"
                        data-bs-target="#pills-profile"
                        type="button"
                        role="tab"
                        aria-controls="pills-profile"
                        aria-selected="false"
                      >
                        Document Expiry alarm
                      </button>
                    </li>
                  </ul>
                  <div class="tab-content" id="pills-tabContent">
                    <div
                      class="tab-pane fade show active"
                      id="pills-home"
                      role="tabpanel"
                      aria-labelledby="shiftalarm"
                      tabindex="0"
                    >
                      <div class="row"></div>
                    </div>
                    <div
                      class="tab-pane fade"
                      id="pills-profile"
                      role="tabpanel"
                      aria-labelledby="doceexpiryalarm"
                      tabindex="0"
                    >
                      <div class="row"></div>
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
// import TextFormator from "textformator/TextFormator.vue";
</script>

<style scoped>
.showdata .nav-link {
  color: #ffffff;
  background: #0d6efd;
  margin-left: 4px;
}
.bi-toggle-on {
  font-size: 40px;
  color: #0d6efd;
}
.showdata .nav-link.active {
  color: #000;
  background: none;
  margin-left: 4px;
}
.tabcontenttwo {
  border: 1px solid #dfd6d6;
  border-radius: 3px;
  border-top: 1px solid transparent;
}
ul.generalsetting h6 {
  font-size: 14px;
  font-weight: bold;
}
.showdata .tab-content .nav-link {
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
</style>
