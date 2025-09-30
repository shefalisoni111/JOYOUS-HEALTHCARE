<template>
  <div>
    <div class="settingsdetails">
      <div class="pagetitle d-flex justify-content-between mb-0">
        <div class="d-flex align-items-center">
          <ol class="breadcrumb mb-1 p-3">
            <li class="breadcrumb-item active text-uppercase fw-bold">
              Clientsetting / <span class="clr">basic permission</span>
            </li>
          </ol>
        </div>
        <!-- End Page Title -->
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <div class="bg-white">
          <div class="showdata px-4">
            <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
              <li class="nav-item" role="presentation">
                <button
                  class="nav-link active text-capitalize"
                  id="pages"
                  data-bs-toggle="pill"
                  data-bs-target="#pills-pages"
                  type="button"
                  role="tab"
                  aria-controls="pills-pages"
                  aria-selected="true"
                >
                  Pages
                </button>
              </li>
              <li class="nav-item" role="presentation">
                <button
                  class="nav-link text-capitalize"
                  id="Permission"
                  data-bs-toggle="pill"
                  data-bs-target="#pills-Permission"
                  type="button"
                  role="tab"
                  aria-controls="pills-Permission"
                  aria-selected="false"
                >
                  Permission
                </button>
              </li>
              <li class="nav-item" role="presentation">
                <button
                  class="nav-link text-capitalize"
                  id="CandidateProfile"
                  data-bs-toggle="pill"
                  data-bs-target="#pills-CandidateProfile"
                  type="button"
                  role="tab"
                  aria-controls="pills-CandidateProfile"
                  aria-selected="false"
                >
                  Staff Profile
                </button>
              </li>
            </ul>
            <div class="tab-content" id="pills-tabContent">
              <div
                class="tab-pane fade show active"
                id="pills-pages"
                role="tabpanel"
                aria-labelledby="pages"
                tabindex="0"
              >
                <div class="row">
                  <div class="col-12">
                    <div class="bg-white py-4">
                      <div>
                        <h6>
                          <b>Client:</b> Pages displayed in the Clientdashboard
                          can be enabled or disabled from here.
                        </h6>
                        <ul class="list-unstyled list-inline">
                          <li>
                            <label class="switch">
                              <input type="checkbox" id="togBtn" checked />
                              <div class="slider round"></div>
                            </label>
                            Dashboard
                          </li>
                          <li>
                            <label class="switch">
                              <input type="checkbox" id="togBtn" checked />
                              <div class="slider round"></div> </label
                            >Shifts
                          </li>
                          <li>
                            <label class="switch">
                              <input type="checkbox" id="togBtn" checked />
                              <div class="slider round"></div> </label
                            >Bookings
                          </li>
                          <li>
                            <label class="switch">
                              <input type="checkbox" id="togBtn" checked />
                              <div class="slider round"></div> </label
                            >Schedule
                          </li>
                          <li>
                            <label class="switch">
                              <input type="checkbox" id="togBtn" checked />
                              <div class="slider round"></div> </label
                            >TimeSheet
                          </li>
                          <li>
                            <label class="switch">
                              <input type="checkbox" id="togBtn" checked />
                              <div class="slider round"></div> </label
                            >Signed TimeSheet
                          </li>
                          <li>
                            <label class="switch">
                              <input type="checkbox" id="togBtn" checked />
                              <div class="slider round"></div> </label
                            >Invoices
                          </li>
                        </ul>
                      </div>
                      <div class="mt-5">
                        <h6>
                          <b>Site :</b> Pages displayed in the Site dashboard
                          can be enabled or disabled from here..
                        </h6>
                        <ul class="list-unstyled list-inline">
                          <li>
                            <label class="switch">
                              <input type="checkbox" id="togBtn" checked />
                              <div class="slider round"></div>
                            </label>
                            Dashboard
                          </li>
                          <li>
                            <label class="switch">
                              <input type="checkbox" id="togBtn" checked />
                              <div class="slider round"></div> </label
                            >Shifts
                          </li>
                          <li>
                            <label class="switch">
                              <input type="checkbox" id="togBtn" checked />
                              <div class="slider round"></div> </label
                            >Bookings
                          </li>
                          <li>
                            <label class="switch">
                              <input type="checkbox" id="togBtn" checked />
                              <div class="slider round"></div> </label
                            >Schedule
                          </li>
                          <li>
                            <label class="switch">
                              <input type="checkbox" id="togBtn" checked />
                              <div class="slider round"></div> </label
                            >TimeSheet
                          </li>
                          <li>
                            <label class="switch">
                              <input type="checkbox" id="togBtn" checked />
                              <div class="slider round"></div> </label
                            >Signed TimeSheet
                          </li>
                          <li>
                            <label class="switch">
                              <input type="checkbox" id="togBtn" checked />
                              <div class="slider round"></div> </label
                            >Invoices
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                class="tab-pane fade"
                id="pills-Permission"
                role="tabpanel"
                aria-labelledby="Permission"
                tabindex="0"
              >
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus,
                quis! Quod a ea laudantium? Sed, doloribus incidunt? Delectus
                odio recusandae, non incidunt minima ullam sint fugit quas
                possimus consectetur asperiores?
              </div>
              <div
                class="tab-pane fade"
                id="pills-CandidateProfile"
                role="tabpanel"
                aria-labelledby="CandidateProfile"
                tabindex="0"
              >
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam
                placeat rerum sed sit provident ab. Ducimus perspiciatis rem est
                vitae, maiores voluptatum ipsum, excepturi consequatur nesciunt
                eum dignissimos placeat magnam.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.content-area {
  margin-left: 250px;
  transition: margin-left 0.3s ease;
}
@media (max-width: 1120px) {
  .content-area {
    margin-left: 0;
  }
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
.list-inline li {
  display: inline-block;
  margin-right: 10px;
  background: #8a9cff;
  border-radius: 4px;
  padding: 10px;
}
ul.list-inline {
  border-bottom: 1px solid #d5c8c8;
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
.switch {
  width: 50px;
  height: 17px;
  position: relative;
  display: inline-block;
}

.switch input {
  display: none;
}

.switch .slider {
  position: absolute;
  top: -3;
  bottom: 0;
  right: 0;
  left: 0;
  cursor: pointer;
  background-color: #e7ecf1;
  border-radius: 30px !important;
  border: 0;
  padding: 0;
  display: block;
  margin: 3px 10px;
  min-height: 11px;
}

.switch .slider:before {
  position: absolute;
  background-color: #aaa;
  height: 15px;
  width: 15px;
  content: "";
  left: 0px;
  bottom: -2px;
  border-radius: 50%;
  transition: ease-in-out 0.5s;
}

.switch .slider:after {
  content: "";
  color: white;
  display: block;
  position: absolute;
  transform: translate(-50%, -50%);
  top: 50%;
  left: 70%;
  transition: all 0.5s;
  font-size: 10px;
  font-family: "Inter", sans-serif;
}

.switch input:checked + .slider:after {
  transition: all 0.5s;
  left: 30%;
  content: "";
}

.switch input:checked + .slider {
  background-color: #d3d6d9;
}

.switch input:checked + .slider:before {
  transform: translateX(15px);
  background-color: #ff9800;
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
  font-family: "Inter", sans-serif;
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
.pagesetting[data-v-6f1f6d9a] {
  border-bottom: 1px solid rgb(196, 196, 196);
  width: 100%;
}

.showdata .nav-link {
  color: #000;
}
.showdata .nav-link.active {
  background: #e8e3e3;
  margin-left: 4px;
}

.btn-primary {
  border: none;
}
</style>
