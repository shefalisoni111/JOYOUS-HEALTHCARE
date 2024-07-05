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
              <p class="mb-0 text-uppercase fw-bold genSetting">invoice Settings</p>
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
                      <p class="text-capitalize mb-0">check invoice dues date</p>
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
                    invoice setting / <span class="clr">rate / invoice setting</span>
                  </li>
                </ol>
              </div>
              <!-- End Page Title -->
              <div class="d-flex align-items-center"></div>
            </div>
          </div>
          <div class="row">
            <div class="col-12">
              <h6 class="fw-bold">RATE SETTINGS DETAILS</h6>
              <div class="col-6">
                <div class="d-flex justify-content-between my-3">
                  <div>Split rate:</div>
                  <div>
                    <label class="switch">
                      <input type="checkbox" id="togBtn" />
                      <div class="slider round"></div>
                    </label>
                  </div>
                </div>
                <div class="col-12">
                  <div class="d-flex my-3">
                    <div class="card p-2 alert alert-warning">
                      <b>Warning!</b> Changes you made on split rate, will affect the
                      entire business unit accordingly.
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-12">
                <h6 class="fw-bold">INVOICE SETTINGS DETAILS</h6>
                <div class="col-6">
                  <div class="d-flex justify-content-between my-3">
                    <div>Rate per mile in client invoice:</div>
                    <div>
                      <label class="switch">
                        <input type="checkbox" id="togBtn" />
                        <div class="slider round"></div>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div class="d-flex my-3" style="gap: 29.6%">
                <div>Rate per mile in Staff invoice:</div>
                <div>
                  <label class="switch">
                    <input type="checkbox" id="togBtn" />
                    <div class="slider round"></div>
                  </label>
                </div>
              </div>
              <div class="d-flex my-3" style="gap: 3.3%">
                <div class="">
                  <div>Invoice cut off day (Weekly):</div>
                </div>

                <div style="width: 56%">
                  <select class="form-control" v-model="selectedDay">
                    <option v-for="day in weekDays" :key="day" :value="day">
                      {{ day }}
                    </option>
                  </select>
                </div>
              </div>
              <div class="col-9">
                <div class="d-flex my-3">
                  <svg
                    class="bi flex-shrink-0 me-2"
                    width="24"
                    height="24"
                    role="img"
                    aria-label="Info:"
                  >
                    <use xlink:href="#info-fill" />
                  </svg>

                  <div class="card p-2 alert alert-primary">
                    If the cutoff day is chosen, each invoice created prior to the cutoff
                    day will be placed in the previous/corresponding week, depending on
                    the date.<br />
                    After the cutoff day, any invoice created will be for the current
                    week. Only applicable to weekly invoices.
                  </div>
                </div>
              </div>
              <div class="col-9">
                <div class="d-flex justify-content-between my-3">
                  <div class="col-3">
                    <div>Invoice creation period:</div>
                  </div>

                  <div class="col-9">
                    <select class="form-control" v-model="selectedDay">
                      <option v-for="day in weekDays" :key="day" :value="day">
                        {{ day }}
                      </option>
                    </select>
                  </div>
                </div>
                <div class="d-flex justify-content-between my-3">
                  <div class="col-3">
                    <div>Invoice Due Period (Days):</div>
                  </div>

                  <div class="col-9">
                    <select class="form-control">
                      <option value="week">Week</option>
                    </select>
                  </div>
                </div>
              </div>
              <div class="col-9">
                <div class="d-flex my-3" style="">
                  <div>Invoice Table Head (Candidate/Description):</div>
                  <div class="w-100">
                    <input class="form-control w-100" />
                  </div>
                </div>
                <div class="d-flex my-3" style="gap: 56.3%">
                  <div>Hash (#):</div>
                  <div>
                    <label class="switch">
                      <input type="checkbox" id="togBtn" />
                      <div class="slider round"></div>
                    </label>
                  </div>
                </div>
                <div class="d-flex my-3" style="gap: 25.8%">
                  <div>Enable Business unit name in the invoice number:</div>
                  <div>
                    <label class="switch">
                      <input type="checkbox" id="togBtn" />
                      <div class="slider round"></div>
                    </label>
                  </div>
                </div>
                <div class="d-flex my-3" style="gap: 26%">
                  <div>Enable Business unit name in the invoice number:</div>
                  <div>
                    <label class="switch">
                      <input type="checkbox" id="togBtn" />
                      <div class="slider round"></div>
                    </label>
                  </div>
                </div>
                <div class="d-flex my-3" style="gap: 0.3%">
                  <div class="col-3">
                    <div>PDF Name Format (which should be shown first?):</div>
                  </div>

                  <div class="col-9">
                    <select class="form-control" v-model="selectedDay">
                      <option v-for="day in weekDays" :key="day" :value="day">
                        {{ day }}
                      </option>
                    </select>
                  </div>
                </div>
                <div class="d-flex my-3" style="gap: 8%">
                  <div>Invoice Number format:</div>
                  <div class="input-group mb-3" style="width: 75%">
                    <input
                      type="text"
                      class="form-control ps-2"
                      placeholder="INV-"
                      aria-label="Specify invoice number formal"
                      aria-describedby="basic-addon2"
                    />
                    <span class="input-group-text" id="basic-addon2">1234</span>
                  </div>
                </div>
                <div class="d-flex my-3" style="gap: 13.55%">
                  <div>Invoice Start number:</div>
                  <div class="w-100">
                    <input class="form-control" />
                  </div>
                </div>
              </div>
              <div class="col-9">
                <div class="d-flex my-3 justify-content-between" style="gap: 12.55%">
                  <div>Client Invoice Template:</div>
                  <div class="w-100">
                    <button
                      type="button"
                      class="btn btn-light"
                      data-bs-toggle="modal"
                      data-bs-target="#ClientInvoiceTemplateView"
                      data-bs-whatever="@mdo"
                    >
                      Select Invoice Template
                    </button>
                  </div>
                </div>
                <div class="d-flex my-3 justify-content-between" style="gap: 13%">
                  <div>Staff Invoice Template:</div>
                  <div class="w-100">
                    <button
                      type="button"
                      class="btn btn-light"
                      data-bs-toggle="modal"
                      data-bs-target="#StaffInvoiceTemplateView"
                      data-bs-whatever="@mdo"
                    >
                      Select Invoice Template
                    </button>
                  </div>
                </div>
              </div>

              <div class="col-8">
                <div class="d-flex my-3" style="gap: 57.3%">
                  <div>Reference Code:</div>
                  <div>
                    <label class="switch">
                      <input type="checkbox" id="togBtn" />
                      <div class="slider round"></div>
                    </label>
                  </div>
                </div>
                <div class="col-12">
                  <div class="d-flex my-3">
                    <div class="card p-2 alert alert-warning">
                      To enable or disable the reference code in the client invoice.
                    </div>
                  </div>
                </div>
                <div class="d-flex my-3" style="gap: 42%">
                  <div>Enable NI Number in Client Invoice:</div>
                  <div>
                    <label class="switch">
                      <input type="checkbox" id="togBtn" />
                      <div class="slider round"></div>
                    </label>
                  </div>
                </div>
                <div class="col-12">
                  <div class="d-flex my-3">
                    <div class="card p-2 alert alert-warning">
                      <b>Warning!</b> Changes you made on Client Invoice NI Number, will
                      affect the entire business unit accordingly.
                    </div>
                  </div>
                </div>
                <div class="d-flex my-3" style="gap: 38.4%">
                  <div>Enable NI Number in Candidate Invoice:</div>
                  <div>
                    <label class="switch">
                      <input type="checkbox" id="togBtn" />
                      <div class="slider round"></div>
                    </label>
                  </div>
                </div>
                <div class="col-12">
                  <div class="d-flex my-3">
                    <div class="card p-2 alert alert-warning">
                      <b>Warning!</b> Changes you made on Candidate Invoice NI Number,
                      will affect the entire candidate invoice accordingly.
                    </div>
                  </div>
                </div>
                <div class="d-flex my-3" style="gap: 55.6%">
                  <div>Enable Vat Number:</div>
                  <div>
                    <label class="switch">
                      <input type="checkbox" id="togBtn" />
                      <div class="slider round"></div>
                    </label>
                  </div>
                </div>
                <div class="col-12">
                  <div class="d-flex my-3">
                    <div class="card p-2 alert alert-warning">
                      <b>Warning:</b> Changes you made on enable vat number, will affect
                      the eptire business unit accordingly.
                    </div>
                  </div>
                </div>
                <div class="d-flex my-3" style="gap: 30.6%">
                  <div class="d-flex justify-content-between gap-3">
                    <div>Exclude VAT:</div>
                    <div>
                      <div>
                        Mileage:
                        <label class="switch">
                          <input type="checkbox" id="togBtn" />
                          <div class="slider round"></div>
                        </label>
                      </div>

                      <div>
                        New row:
                        <label class="switch">
                          <input type="checkbox" id="togBtn" />
                          <div class="slider round"></div>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-12">
                  <div class="d-flex my-3">
                    <div class="card p-2 alert alert-warning">
                      <b>Warning!</b> Changes you made on enable Exclude VAT on mileage or
                      new row, will affect the entire business unit accordingly.
                    </div>
                  </div>
                </div>
                <div class="d-flex my-3" style="gap: 54.6%">
                  <div>Enable Booking Code:</div>
                  <div>
                    <label class="switch">
                      <input type="checkbox" id="togBtn" />
                      <div class="slider round"></div>
                    </label>
                  </div>
                </div>
                <div class="col-12">
                  <div class="d-flex my-3">
                    <div class="card p-2 alert alert-warning">
                      <b>Warning!</b> Changes you made on enable booking code, will affect
                      the entire client invoice and signed timesheet accordingly.
                    </div>
                  </div>
                </div>
                <div class="d-flex my-3" style="gap: 57%">
                  <div>Enable Break Time:</div>
                  <div>
                    <label class="switch">
                      <input type="checkbox" id="togBtn" />
                      <div class="slider round"></div>
                    </label>
                  </div>
                </div>
                <div class="col-12">
                  <div class="d-flex my-3">
                    <div class="card p-2 alert alert-warning">
                      <b>Warning!</b> Changes you made on enable Exclude VAT on mileage or
                      new row, will affect the entire business unit accordingly.
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-12">
                <div class="d-flex my-3" style="gap: 10%">
                  <div>Client Invoice Footer Note:</div>
                  <div>
                    <TextFormator />
                  </div>
                </div>
              </div>
              <div class="col-12">
                <div class="d-flex my-3" style="gap: 10%">
                  <div>Staff Invoice Footer Note:</div>
                  <div>
                    <TextFormator />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ClientInvoiceTemplatesVue />
      <StaffInvoiceTemplates />
    </div>
  </div>
</template>

<script>
import ClientInvoiceTemplatesVue from "../modals/appsetting/InvoiceSetting/ClientInvoiceTemplates.vue";
import Navbar from "../Navbar.vue";
import Sidebar from "../Sidebar.vue";
import TextFormator from "../textformator/TextFormator.vue";
import StaffInvoiceTemplates from "../modals/appsetting/InvoiceSetting/StaffInvoiceTemplates.vue";

export default {
  data() {
    return {
      weekDays: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      selectedDay: "Monday",
    };
  },
  components: {
    Navbar,
    Sidebar,
    TextFormator,
    StaffInvoiceTemplates,
    ClientInvoiceTemplatesVue,
  },
};
</script>

<style scoped>
#main {
  padding-top: 65px;
}
#logo {
  width: 119px;

  margin: auto;
  background: url("./logo.png") center / cover no-repeat;
}
table th,
table tr td {
  text-transform: capitalize;
}
select {
  width: 100%;
  padding: 10px;
  border-radius: 4px;
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
.clr {
  color: #ff5722;
}
a.router-link-active {
  background-color: #fff4de;
}
ul.generalsetting li i.rounded-circle a.router-link-active:active {
  border-top-left-radius: 22px !important;
  border-bottom-left-radius: 22px !important;
}
.genSetting {
  color: #ff5722;
}

.nav-pills .nav-link.active,
.nav-pills .show > .nav-link {
  color: #ff5722;
  border-bottom: 2px solid #ff5722;
  border-radius: 0;
  background-color: transparent;
  font-weight: bold;
}
.nav-pills {
  border-bottom: 1px solid #ddd6d6;
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
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  cursor: pointer;
  background-color: #e7ecf1;
  border-radius: 30px !important;
  border: 0;
  padding: 0;
  display: block;
  margin: 7px 10px;
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
  color: rgb(189, 84, 15);
  display: block;
  position: absolute;
  transform: translate(-50%, -50%);
  top: 50%;
  left: 70%;
  transition: all 0.5s;
  font-size: 10px;
  font-family: Verdana, sans-serif;
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
</style>
