<template>
  <div>
    <div class="settingsdetails">
      <div class="pagetitle d-flex justify-content-between">
        <div class="d-flex align-items-center">
          <ol class="breadcrumb mb-1 p-3">
            <li class="breadcrumb-item active text-uppercase fw-bold">
              Notification setting / <span>Email Templates</span>
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
            <div class="tab-content tabcontenttwo" id="myTabContent">
              <div
                class="tab-pane fade show active"
                id="home"
                role="tabpanel"
                aria-labelledby="shift"
              >
                <div class="p-4">
                  <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
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
                aria-labelledby="business-unit"
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
                <p class="p-4">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque
                  dolore quasi architecto magni aperiam totam. Quibusdam magnam
                  eaque possimus ipsum. Necessitatibus molestias rerum
                  architecto ipsam quis labore quod quo sint?
                </p>
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
.showdata .nav-link.active {
  color: #000;
  background: none;
  margin-left: 4px;
}
ol.breadcrumb li span {
  color: #0d6efd;
}
.tabcontenttwo {
  border: 1px solid #dfd6d6;
  border-radius: 3px;
  border-top: 1px solid transparent;
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
