<template>
  <div>
    <div class="settingsdetails">
      <div class="pagetitle d-flex justify-content-between">
        <div class="d-flex align-items-center">
          <ol class="breadcrumb mb-1 p-3">
            <li class="breadcrumb-item active text-uppercase fw-bold">
              Notification setting / <span>SMS</span>
            </li>
          </ol>
        </div>
        <!-- End Page Title -->
      </div>
    </div>

    <div class="row">
      <div class="col-12">
        <div class="bg-white">
          <div class="showdata">
            <div class="p-4">
              <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
                <li class="nav-item" role="presentation">
                  <button
                    class="nav-link active text-capitalize"
                    id="sms-intregration"
                    data-bs-toggle="pill"
                    data-bs-target="#pills-home"
                    type="button"
                    role="tab"
                    aria-controls="pills-home"
                    aria-selected="true"
                  >
                    SMS Integration
                  </button>
                </li>
                <li class="nav-item" role="presentation">
                  <button
                    class="nav-link text-capitalize"
                    id="sms-template"
                    data-bs-toggle="pill"
                    data-bs-target="#pills-profile"
                    type="button"
                    role="tab"
                    aria-controls="pills-profile"
                    aria-selected="false"
                  >
                    SMS Template
                  </button>
                </li>
              </ul>
              <div class="tab-content" id="pills-tabContent">
                <div
                  class="tab-pane fade show active"
                  id="pills-home"
                  role="tabpanel"
                  aria-labelledby="sms-intregration"
                  tabindex="0"
                >
                  <div class="row">
                    <div class="col-12">
                      <div class="bg-white p-4">
                        <form>
                          <div class="mb-3 d-flex">
                            <div class="col-4">
                              <label class="form-label">Email :</label>
                            </div>

                            <div class="col-8">
                              <input
                                type="email"
                                class="form-control"
                                placeholder="youname@gmail.com"
                              />
                            </div>
                          </div>
                          <div class="mb-3 d-flex">
                            <div class="col-4">
                              <label class="form-label">Mobile Number :</label>
                            </div>

                            <div class="col-8">
                              <input type="text" class="form-control" />
                            </div>
                          </div>
                          <router-link
                            class="btn btn-primary rounded-1 text-capitalize fw-medium"
                            type="button"
                            to="/appsetting/notificationsetting/ActivatePayment"
                          >
                            Activate
                          </router-link>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  class="tab-pane fade"
                  id="pills-profile"
                  role="tabpanel"
                  aria-labelledby="sms-template"
                  tabindex="0"
                >
                  ...
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
.showdata .nav-link.active {
  color: #000;
  background: none;
  margin-left: 4px;
}
.nav-pills .nav-link.active {
  color: #0d6efd;
  border-bottom: 2px solid #0d6efd;
  border-radius: 0;
  background-color: transparent;
  font-weight: bold;
}
.nav-pills {
  border-bottom: 1px solid #ddd6d6;
}

.parawrap {
  border: 1px solid #f0e5e5;
  border-radius: 2px;
  padding: 8px;
  margin-top: 1px;
}
</style>
