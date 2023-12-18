<template>
  <div>
    <div class="settingsdetails">
      <div class="pagetitle d-flex justify-content-between">
        <div class="d-flex align-items-center">
          <ol class="breadcrumb mb-1 p-3">
            <li class="breadcrumb-item active text-capitalize fw-bold">
              Notification setting / <span>SMS</span>
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
            <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
              <li class="nav-item" role="presentation">
                <button
                  class="nav-link active text-capitalize ps-0"
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
            <div class="tab-content tabcontone" id="pills-tabContent">
              <div
                class="tab-pane fade show active"
                id="pills-home"
                role="tabpanel"
                aria-labelledby="sms-intregration"
                tabindex="0"
              >
                <div class="row">
                  <div class="col-12">
                    <div class="bg-white">
                      <div
                        class="pagetitle d-flex justify-content-between py-3"
                      >
                        <div class="d-flex align-items-center">
                          <ol class="breadcrumb mb-1">
                            <li
                              class="breadcrumb-item active text-capitalize fw-bold"
                            >
                              SMS Integration
                            </li>
                          </ol>
                        </div>
                        <!-- End Page Title -->
                        <div class="d-flex align-items-center">
                          <button
                            class="btn btn-primary rounded-1 text-uppercase fw-medium"
                          >
                            Balance :2345
                          </button>
                        </div>
                      </div>
                      <ul class="nav nav-tabs" id="myTab" role="tablist">
                        <li class="nav-item" role="presentation">
                          <button
                            class="nav-link active text-capitalize ms-0"
                            id="credit-debit"
                            data-bs-toggle="tab"
                            data-bs-target="#home"
                            type="button"
                            role="tab"
                            aria-controls="home"
                            aria-selected="true"
                          >
                            manage credit/debit cards
                          </button>
                        </li>
                        <li class="nav-item" role="presentation">
                          <button
                            class="nav-link text-capitalize"
                            id="topupaccount"
                            data-bs-toggle="tab"
                            data-bs-target="#profile"
                            type="button"
                            role="tab"
                            aria-controls="profile"
                            aria-selected="false"
                          >
                            top up account
                          </button>
                        </li>
                      </ul>
                      <div class="tab-content tabconttwo" id="myTabContent">
                        <div
                          class="tab-pane fade show active"
                          id="home"
                          role="tabpanel"
                          aria-labelledby="credit-debit"
                        >
                          <p class="p-4">
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Eaque dolore quasi architecto magni aperiam
                            totam. Quibusdam magnam eaque possimus ipsum.
                            Necessitatibus molestias rerum architecto ipsam quis
                            labore quod quo sint?
                          </p>
                        </div>
                        <div
                          class="tab-pane fade"
                          id="profile"
                          role="tabpanel"
                          aria-labelledby="topupaccount"
                        >
                          <div class="container-fluid">
                            <h6 class="fw-bold p-3">Top up Account</h6>
                            <div class="row">
                              <!-- <div class="col-12 d-flex">
                                <div class="col-3">
                                  <div class="card text-center">
                                    <div class="card-body">
                                      <p class="card-text">
                                        Approch 0.031 each
                                      </p>
                                      <h5 class="fw-bold">$ 10.00</h5>
                                      <a href="#" class="btn btn-success w-100"
                                        >Purchase</a
                                      >
                                    </div>
                                  </div>
                                </div>
                                <div class="col-3">
                                  <div class="card text-center">
                                    <div class="card-body">
                                      <p class="card-text">
                                        Approch 0.031 each
                                      </p>
                                      <h5 class="fw-bold">$ 10.00</h5>
                                      <a href="#" class="btn btn-success w-100"
                                        >Purchase</a
                                      >
                                    </div>
                                  </div>
                                </div>
                                <div class="col-3">
                                  <div class="card text-center">
                                    <div class="card-body">
                                      <p class="card-text">
                                        Approch 0.031 each
                                      </p>
                                      <h5 class="fw-bold">$ 10.00</h5>
                                      <a href="#" class="btn btn-success w-100"
                                        >Purchase</a
                                      >
                                    </div>
                                  </div>
                                </div>
                                <div class="col-3">
                                  <div class="card text-center">
                                    <div class="card-body">
                                      <p class="card-text">
                                        Approch 0.031 each
                                      </p>
                                      <h5 class="fw-bold">$ 10.00</h5>
                                      <a href="#" class="btn btn-success w-100"
                                        >Purchase</a
                                      >
                                    </div>
                                  </div>
                                </div>
                              </div> -->
                            </div>
                          </div>
                        </div>
                      </div>
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
</template>

<script setup>
// import TextFormator from "textformator/TextFormator.vue";
</script>

<style scoped>
.showdata .nav-link {
  color: #403b3b;
  background: transparent;
  margin-left: 4px;
}
.showdata .tab-content .nav-link.active {
  color: #000;
  background: none;
  margin-left: 4px;
}
.tabconttwo {
  border: 1px solid #dfd6d6;
  border-radius: 3px;
  padding-bottom: 15px;
  border-top: 1px solid transparent;
}
ol.breadcrumb li span {
  color: #0d6efd;
}
.card {
  margin: 2px;
}

.showdata .tab-content .nav-link {
  color: #fff;
  background: #0d6efd;
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

.parawrap {
  border: 1px solid #f0e5e5;
  border-radius: 2px;
  padding: 8px;
  margin-top: 1px;
}
</style>
