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
                    invoice setting / <span class="clr">rate And invoice setting</span>
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
                      <input
                        type="checkbox"
                        id="togBtn"
                        v-model="fetchInvoiceSetting.split_rate"
                      />
                      <div class="slider round"></div>
                    </label>
                  </div>
                </div>
                <div class="col-12">
                  <div class="d-flex my-3">
                    <div class="card p-2 alert alert-warning">
                      <b>Warning!</b> Changes you made on split rate, will affect the
                      entire site accordingly.
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-12">
                <div class="d-flex justify-content-between align-content-center">
                  <h6 class="fw-bold">INVOICE SETTINGS DETAILS</h6>
                  <button
                    class="btn btn-primary me-3"
                    @click.prevent="updateInvoiceMethod()"
                  >
                    <i class="bi bi-save2-fill"></i> Save
                  </button>
                </div>

                <div class="col-6">
                  <div class="d-flex justify-content-between my-3">
                    <div>Rate per mile in client invoice:</div>
                    <div>
                      <label class="switch">
                        <input
                          type="checkbox"
                          id="togBtn"
                          v-model="fetchInvoiceSetting.rate_per_mile_in_client"
                        />
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
                    <input
                      type="checkbox"
                      id="togBtn"
                      v-model="fetchInvoiceSetting.rate_per_mile_in_staff"
                    />
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
                    <select
                      class="form-control"
                      v-model="fetchInvoiceSetting.invoice_creation_period"
                    >
                      <option v-for="day in creation" :key="day" :value="day">
                        {{ day }}
                      </option>
                    </select>
                  </div>
                </div>
              </div>
              <div class="col-9">
                <div class="d-flex my-3" style="">
                  <div>Invoice Table Head (Staff/Description):</div>
                  <div class="w-75">
                    <input
                      class="form-control w-100"
                      v-model="fetchInvoiceSetting.staff_invoice_table_head"
                      @input="validateInvoiceTableHead"
                    />
                    <div v-if="invoiceTableHeadError" class="text-danger">
                      {{ invoiceTableHeadError }}
                    </div>
                  </div>
                </div>
                <div class="d-flex my-3" style="gap: 56.3%">
                  <div>Hash (#):</div>
                  <div>
                    <label class="switch">
                      <input
                        type="checkbox"
                        id="togBtn"
                        v-model="fetchInvoiceSetting.invoice_hash"
                      />
                      <div class="slider round"></div>
                    </label>
                  </div>
                </div>
                <div class="d-flex my-3" style="gap: 25.8%">
                  <div>Enable Site name in the invoice number:</div>
                  <div>
                    <label class="switch">
                      <input
                        type="checkbox"
                        id="togBtn"
                        v-model="fetchInvoiceSetting.enable_site_name_in_invoice"
                      />
                      <div class="slider round"></div>
                    </label>
                  </div>
                </div>

                <div class="d-flex my-3" style="gap: 0.3%">
                  <div class="col-3">
                    <div>PDF Name Format (which should be shown first?):</div>
                  </div>

                  <div class="col-9">
                    <input
                      type="text"
                      class="form-control ps-2"
                      aria-label="Specify invoice number formal"
                      aria-describedby="basic-addon2"
                      v-model="fetchInvoiceSetting.pdf_name_format"
                      @input="validatePDFNameFormat"
                    />
                    <div v-if="pdfNameFormatError" class="text-danger">
                      {{ pdfNameFormatError }}
                    </div>
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
                      v-model="fetchInvoiceSetting.invoice_number_format"
                      @input="updateInvoiceNumberFormat"
                    />
                    <span class="input-group-text" id="basic-addon2">1234</span>
                  </div>
                </div>
                <div class="d-flex my-3" style="gap: 13.55%">
                  <div>Invoice Start number:</div>
                  <div class="w-100">
                    <input
                      class="form-control"
                      v-model="fetchInvoiceSetting.invoice_start_number"
                      @input="updateInvoiceStartNumber"
                    />
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
                      <input
                        type="checkbox"
                        id="togBtn"
                        v-model="fetchInvoiceSetting.reference_code"
                      />
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
                      <input
                        type="checkbox"
                        id="togBtn"
                        v-model="fetchInvoiceSetting.NI_number_for_client"
                      />
                      <div class="slider round"></div>
                    </label>
                  </div>
                </div>
                <div class="col-12">
                  <div class="d-flex my-3">
                    <div class="card p-2 alert alert-warning">
                      <b>Warning!</b> Changes you made on Client Invoice NI Number, will
                      affect the entire site accordingly.
                    </div>
                  </div>
                </div>
                <div class="d-flex my-3" style="gap: 38.4%">
                  <div>Enable NI Number in Staff Invoice:</div>
                  <div>
                    <label class="switch">
                      <input
                        type="checkbox"
                        id="togBtn"
                        v-model="fetchInvoiceSetting.NI_number_for_staff"
                      />
                      <div class="slider round"></div>
                    </label>
                  </div>
                </div>
                <div class="col-12">
                  <div class="d-flex my-3">
                    <div class="card p-2 alert alert-warning">
                      <b>Warning!</b> Changes you made on staff Invoice NI Number, will
                      affect the entire staff invoice accordingly.
                    </div>
                  </div>
                </div>
                <div class="d-flex my-3" style="gap: 55.6%">
                  <div>Enable Vat Number:</div>
                  <div>
                    <label class="switch">
                      <input
                        type="checkbox"
                        id="togBtn"
                        v-model="fetchInvoiceSetting.vat_number"
                      />
                      <div class="slider round"></div>
                    </label>
                  </div>
                </div>
                <div class="col-12">
                  <div class="d-flex my-3">
                    <div class="card p-2 alert alert-warning">
                      <b>Warning:</b> Changes you made on enable vat number, will affect
                      the entire site accordingly.
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
                      new row, will affect the entire site accordingly.
                    </div>
                  </div>
                </div>
                <div class="d-flex my-3" style="gap: 54.6%">
                  <div>Enable Booking Code:</div>
                  <div>
                    <label class="switch">
                      <input
                        type="checkbox"
                        id="togBtn"
                        v-model="fetchInvoiceSetting.enable_booking_code"
                      />
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
                      <input
                        type="checkbox"
                        id="togBtn"
                        v-model="fetchInvoiceSetting.break_time"
                      />
                      <div class="slider round"></div>
                    </label>
                  </div>
                </div>
                <div class="col-12">
                  <div class="d-flex my-3">
                    <div class="card p-2 alert alert-warning">
                      <b>Warning!</b> Changes you made on enable Exclude VAT on mileage or
                      new row, will affect the entire site accordingly.
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-12">
                <div class="d-flex my-3" style="gap: 10%">
                  <div>Client Invoice Footer Note:</div>
                  <div>
                    <TextFormator
                      v-model="fetchInvoiceSetting.client_invoice_footer_note"
                    />
                  </div>
                </div>
              </div>
              <div class="col-12">
                <div class="d-flex my-3" style="gap: 10%">
                  <div>Staff Invoice Footer Note:</div>
                  <div>
                    <TextFormator
                      v-model="fetchInvoiceSetting.staff_invoice_footer_note"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ClientInvoiceTemplatesVue />
      <StaffInvoiceTemplates />
      <SuccessAlert ref="successAlert" />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import ClientInvoiceTemplatesVue from "../modals/appsetting/InvoiceSetting/ClientInvoiceTemplates.vue";
import Navbar from "../Navbar.vue";
import Sidebar from "../Sidebar.vue";
import TextFormator from "../textformator/TextFormator.vue";
import SuccessAlert from "../Alerts/SuccessAlert.vue";
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
      creation: ["Weekly", "Monthly"],
      selectedDay: "Monday",
      fetchInvoiceSetting: {
        invoice_creation_period: "",
        invoice_cut_off_day: "",
        staff_invoice_table_head: "",
        pdf_name_format: "",
        invoice_start_number: "",
        invoice_number_format: "",
        client_invoice_template: "",
        staff_invoice_template: "",
        client_invoice_footer_note: "",
        staff_invoice_footer_note: "",
        reference_code: false,
        NI_number_for_staff: false,
        NI_number_for_client: false,
        vat_number: false,
        enable_booking_code: false,
        break_time: false,
        split_rate: false,
        rate_per_mile_in_client: false,
        rate_per_mile_in_staff: false,
        invoice_hash: false,
        enable_site_name_in_invoice: false,
      },
      pdfNameFormatError: "",
      invoiceTableHeadError: "",
    };
  },
  components: {
    Navbar,
    Sidebar,
    TextFormator,
    SuccessAlert,
    StaffInvoiceTemplates,
    ClientInvoiceTemplatesVue,
  },
  methods: {
    validationNumber(value, maxLength) {
      let validatedValue = value.replace(/\D/g, "");

      if (validatedValue.length > maxLength) {
        validatedValue = validatedValue.slice(0, maxLength);
      }

      return validatedValue;
    },
    updateInvoiceNumberFormat() {
      this.fetchInvoiceSetting.invoice_number_format = this.validationNumber(
        this.fetchInvoiceSetting.invoice_number_format,
        10
      );
    },

    updateInvoiceStartNumber() {
      this.fetchInvoiceSetting.invoice_start_number = this.validationNumber(
        this.fetchInvoiceSetting.invoice_start_number,
        5
      );
    },
    validatePDFNameFormat() {
      this.pdfNameFormatError = "";

      const regex = /^[A-Za-z\s]*$/;

      if (this.fetchInvoiceSetting.pdf_name_format.length > 10) {
        this.pdfNameFormatError = "PDF Name Format must not exceed 10 characters.";
        this.fetchInvoiceSetting.pdf_name_format = this.fetchInvoiceSetting.pdf_name_format.slice(
          0,
          10
        );
      } else if (!regex.test(this.fetchInvoiceSetting.pdf_name_format)) {
        this.pdfNameFormatError = "PDF Name Format can only contain letters.";
        this.fetchInvoiceSetting.pdf_name_format = this.fetchInvoiceSetting.pdf_name_format.replace(
          /[^A-Za-z\s]/g,
          ""
        );
      }
    },

    validateInvoiceTableHead() {
      this.invoiceTableHeadError = "";

      const regex = /^[A-Za-z\s]*$/;

      if (this.fetchInvoiceSetting.staff_invoice_table_head.length > 10) {
        this.invoiceTableHeadError = "Invoice Table Head must not exceed 10 characters.";
        this.fetchInvoiceSetting.staff_invoice_table_head = this.fetchInvoiceSetting.staff_invoice_table_head.slice(
          0,
          10
        );
      } else if (!regex.test(this.fetchInvoiceSetting.staff_invoice_table_head)) {
        this.invoiceTableHeadError = "Invoice Table Head can only contain letters.";
        this.fetchInvoiceSetting.staff_invoice_table_head = this.fetchInvoiceSetting.staff_invoice_table_head.replace(
          /[^A-Za-z\s]/g,
          ""
        );
      }
    },
    async fetchInvoiceSettingMethod() {
      try {
        const response = await axios.get(`${VITE_API_URL}/invoice_setting`);

        this.fetchInvoiceSetting = {
          ...this.fetchInvoiceSetting,
          ...response.data.invoice_setting,
        };
      } catch (error) {}
    },
    async updateInvoiceMethod() {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.put(
          `${VITE_API_URL}set_invoice_setting`,
          this.fetchInvoiceSetting,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const message = "Invoice updated successfully";
        this.$refs.successAlert.showSuccess(message);

        this.fetchInvoiceSettingMethod();
      } catch (error) {
        // console.error("Error updating candidate:", error);
      }
    },
  },
  mounted() {
    this.fetchInvoiceSettingMethod();
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
