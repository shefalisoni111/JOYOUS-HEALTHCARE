<template>
  <div>
    <!-- <Navbar /> -->

    <div id="main" class="main d-flex">
      <div
        class=""
        style="
          background: #fff;

          border-radius: 20px;
        "
      >
        <Navbar />
      </div>
      <div class="container-fluid px-5" style="background: rgb(82 74 74 / 6%)">
        <div class="col-10 pt-4 pt-3">
          <div class="col-12">
            <ol class="breadcrumb mb-1">
              <li class="breadcrumb-item active">
                <a
                  class="nav-link d-inline fs-4 fw-bolder"
                  style="color: #000000"
                  >App Settings</a
                >
              </li>
            </ol>
          </div>
        </div>
        <div class="d-flex gap-3 mt-4">
          <div class=""><Sidebar /></div>
          <div
            class="col-3 p-3 bg-white borderight"
            style="border-radius: 30px"
          >
            <div class="leftside">
              <div class="heading mb-3 position-relative">
                <p class="bforeline"></p>
                <p class="mb-0 text-capitalize fw-bold genSetting">
                  invoice Settings
                </p>
                <p class="afterline"></p>
              </div>
              <div>
                <ul class="list-unstyled text-capitalize generalsetting px-3">
                  <li class="list-items d-flex">
                    <router-link
                      to="/appsetting/invoicesetting"
                      class="text-decoration-none"
                    >
                      <div class="job d-flex">
                        <i class="bi bi-file-earmark-text rounded-circle"></i>
                        <div>
                          <h6 class="mb-0 text-capitalize">invoice setting</h6>
                          <p class="text-capitalize mb-0">
                            check invoice dues date
                          </p>
                        </div>
                      </div>
                    </router-link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="col-8 px-3 bg-white" style="border-radius: 30px">
            <div class="col-12">
              <div class="pagetitle d-flex justify-content-between">
                <div class="d-flex align-items-center">
                  <ol class="breadcrumb mb-1 p-3">
                    <li class="breadcrumb-item active text-capitalize fw-bold">
                      invoice setting /
                      <span class="clr">rate And invoice setting</span>
                    </li>
                  </ol>
                </div>
                <!-- End Page Title -->
                <div class="d-flex align-items-center"></div>
              </div>
            </div>
            <div class="row ps-4">
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
                          @input="handleInputChange"
                        />
                        <div class="slider round"></div>
                      </label>
                    </div>
                  </div>
                  <div class="col-12">
                    <div class="d-flex my-3">
                      <div class="card p-2 alert alert-warning">
                        <b>Warning!</b> Changes you made on split rate, will
                        affect the entire site accordingly.
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-12">
                  <div
                    class="d-flex justify-content-between align-content-center"
                  >
                    <h6 class="fw-bold">INVOICE SETTINGS DETAILS</h6>
                    <button
                      class="btn btn-primary me-3"
                      @click.prevent="updateInvoiceMethod()"
                      :disabled="!isModified"
                    >
                      <i class="bi bi-save2-fill"></i> Save
                    </button>
                  </div>
                </div>

                <div class="d-flex my-3" style="gap: 3.3%">
                  <div class="">
                    <div>Invoice cut off day (Weekly):</div>
                  </div>

                  <div style="width: 56%">
                    <select
                      class="form-control"
                      v-model="fetchInvoiceSetting.invoice_cut_off_day"
                      @change="handleInputChange"
                    >
                      <option v-for="day in weekDays" :key="day" :value="day">
                        {{ day }}
                      </option>
                    </select>
                  </div>
                </div>
                <div class="col-9">
                  <div class="d-flex my-3">
                    <div class="card p-2 alert alert-primary">
                      If the cutoff day is chosen, each invoice created prior to
                      the cutoff day will be placed in the
                      previous/corresponding week, depending on the date.<br />
                      After the cutoff day, any invoice created will be for the
                      current week. Only applicable to weekly invoices.
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
                        @change="handleInputChange"
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
                          @input="handleInputChange"
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
                          v-model="
                            fetchInvoiceSetting.enable_site_name_in_invoice
                          "
                          @input="handleInputChange"
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
                      <span
                        v-if="!fetchInvoiceSetting.invoice_number_format"
                        class="input-group-text"
                        id="basic-addon2"
                        >INV-</span
                      >
                      <input
                        type="text"
                        class="form-control ps-2"
                        aria-label="Specify invoice number formal"
                        aria-describedby="basic-addon2"
                        v-model="fetchInvoiceSetting.invoice_number_format"
                        @input="updateInvoiceNumberFormat"
                      />
                      <!-- <span class="input-group-text" id="basic-addon2">1234</span> -->
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
                  <div
                    class="d-flex my-3 justify-content-between"
                    style="gap: 12.55%"
                  >
                    <div>Client Invoice Template:</div>
                    <div class="w-100">
                      <select
                        v-model="fetchInvoiceSetting.client_invoice_template"
                        @change="updateTemplateClient"
                        class="form-control"
                      >
                        <option value="TemplateOneClient">Template One</option>
                        <option value="TemplateTwoClient">Template Two</option>
                      </select>
                    </div>
                  </div>
                  <div
                    class="d-flex my-3 justify-content-between"
                    style="gap: 13%"
                  >
                    <div>Staff Invoice Template:</div>
                    <div class="w-100">
                      <select
                        v-model="fetchInvoiceSetting.staff_invoice_template"
                        @change="updateTemplateStaff"
                        class="form-control"
                      >
                        <option value="TemplateOneStaff">Template One</option>
                        <option value="TemplateTwoStaff">Template Two</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div class="col-8">
                  <div class="d-flex my-3" style="gap: 42%"></div>

                  <div class="d-flex my-3" style="gap: 30.6%"></div>

                  <div class="d-flex my-3" style="gap: 54.6%">
                    <div>Enable Booking Code:</div>
                    <div>
                      <label class="switch">
                        <input
                          type="checkbox"
                          id="togBtn"
                          v-model="fetchInvoiceSetting.enable_booking_code"
                          @input="handleInputChange"
                        />
                        <div class="slider round"></div>
                      </label>
                    </div>
                  </div>
                  <div class="col-12">
                    <div class="d-flex my-3">
                      <div class="card p-2 alert alert-warning">
                        <b>Warning!</b> Changes you made on enable booking code,
                        will affect the entire client invoice and signed
                        timesheet accordingly.
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
                          @input="handleInputChange"
                        />
                        <div class="slider round"></div>
                      </label>
                    </div>
                  </div>
                  <div class="col-12">
                    <div class="d-flex my-3">
                      <div class="card p-2 alert alert-warning">
                        <b>Warning!</b> Changes you made on enable Exclude VAT
                        on mileage or new row, will affect the entire site
                        accordingly.
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-12">
                  <div class="d-flex my-3" style="gap: 10%">
                    <div>Client Invoice Footer Note:</div>
                    <div style="width: 50%">
                      <!-- <TextFormator
                      v-model="fetchInvoiceSetting.client_invoice_footer_note"
                    /> -->

                      <textarea
                        class="form-control"
                        v-model="fetchInvoiceSetting.client_invoice_footer_note"
                        @input="handleInputChange"
                        rows="3"
                      ></textarea>
                    </div>
                  </div>
                </div>
                <div class="col-12 mb-3">
                  <div class="d-flex my-3" style="gap: 10%">
                    <div>Staff Invoice Footer Note:</div>
                    <div style="width: 50%">
                      <!-- <TextFormator
                      v-model="fetchInvoiceSetting.staff_invoice_footer_note"
                    /> -->
                      <textarea
                        class="form-control"
                        v-model="fetchInvoiceSetting.staff_invoice_footer_note"
                        @input="handleInputChange"
                        rows="3"
                      ></textarea>
                    </div>
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
import { mapState } from "vuex";
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
      isModified: false,
      creation: ["Weekly", "Monthly"],
      selectedDay: "Monday",
      fetchInvoiceSetting: {
        invoice_creation_period: "",
        invoice_cut_off_day: "",
        staff_invoice_table_head: "",
        pdf_name_format: "",
        invoice_start_number: "",
        invoice_number_format: "",
        client_invoice_template: this.$store.state.selectedTemplateClient,
        staff_invoice_template: this.$store.state.selectedTemplateStaff,
        client_invoice_footer_note: "",
        staff_invoice_footer_note: "",
        reference_code: false,
        NI_number_for_staff: false,
        NI_number_for_client: false,
        vat_number: false,
        enable_booking_code: false,
        break_time: false,
        split_rate: false,
        // rate_per_mile_in_client: false,
        // rate_per_mile_in_staff: false,
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
  computed: {
    ...mapState(["selectedTemplateClient", "selectedTemplateStaff"]),
  },
  methods: {
    handleInputChange() {
      this.isModified = true;
    },
    updateTemplateStaff() {
      this.$store.commit(
        "setSelectedTemplateStaff",
        this.fetchInvoiceSetting.staff_invoice_template
      );
    },
    updateTemplateClient() {
      this.$store.commit(
        "setSelectedTemplateClient",
        this.fetchInvoiceSetting.client_invoice_template
      );
    },
    validationNumber(value, maxLength) {
      let validatedValue = value.replace(/\D/g, "");

      if (validatedValue.length > maxLength) {
        validatedValue = validatedValue.slice(0, maxLength);
      }

      return validatedValue;
    },
    updateInvoiceNumberFormat() {
      this.isModified = true;
      this.fetchInvoiceSetting.invoice_number_format =
        this.validationNumberString(
          this.fetchInvoiceSetting.invoice_number_format,
          10
        );
    },
    validationNumberString(value, maxLength) {
      if (!value) return "";

      if (value.length > maxLength) {
        value = value.slice(0, maxLength);
      }

      return value;
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
        this.pdfNameFormatError =
          "PDF Name Format must Not exceed 10 characters.";
        this.fetchInvoiceSetting.pdf_name_format =
          this.fetchInvoiceSetting.pdf_name_format.slice(0, 10);
      } else if (!regex.test(this.fetchInvoiceSetting.pdf_name_format)) {
        this.pdfNameFormatError = "PDF Name Format can only contain letters.";
        this.fetchInvoiceSetting.pdf_name_format =
          this.fetchInvoiceSetting.pdf_name_format.replace(/[^A-Za-z\s]/g, "");
      }
      this.handleInputChange();
    },

    validateInvoiceTableHead() {
      this.invoiceTableHeadError = "";

      const regex = /^[A-Za-z\s]*$/;

      if (this.fetchInvoiceSetting.staff_invoice_table_head.length > 10) {
        this.invoiceTableHeadError =
          "Invoice Table Head must Not exceed 10 characters.";
        this.fetchInvoiceSetting.staff_invoice_table_head =
          this.fetchInvoiceSetting.staff_invoice_table_head.slice(0, 10);
      } else if (
        !regex.test(this.fetchInvoiceSetting.staff_invoice_table_head)
      ) {
        this.invoiceTableHeadError =
          "Invoice Table Head can only contain letters.";
        this.fetchInvoiceSetting.staff_invoice_table_head =
          this.fetchInvoiceSetting.staff_invoice_table_head.replace(
            /[^A-Za-z\s]/g,
            ""
          );
      }
      this.handleInputChange();
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
          `${VITE_API_URL}/set_invoice_setting`,
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
  // created() {
  //   this.selectedTemplate = this.$store.state.selectedTemplate;
  // },
};
</script>

<style scoped>
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
.router-link-active,
.router-link-exact-active {
  background-color: #e6f0ff !important;
  border-radius: 8px;
  display: flex;
  align-items: center;
  padding: 10px;
}

.router-link-active h6,
.router-link-active p,
.router-link-active i,
.router-link-exact-active h6,
.router-link-exact-active p,
.router-link-exact-active i {
  color: #0d6efd !important;
}

ul.generalsetting li i.rounded-circle a.router-link-active:active {
  border-top-left-radius: 22px !important;
  border-bottom-left-radius: 22px !important;
}

.nav-pills .nav-link.active,
.nav-pills .show > .nav-link {
  color: #ff5722;
  border-radius: 0;
  background-color: transparent;
  font-weight: bold;
}
.nav-pills {
  border-bottom: 1px solid #ddd6d6;
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
</style>
