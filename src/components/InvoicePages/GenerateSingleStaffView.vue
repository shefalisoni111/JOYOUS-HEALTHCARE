<template>
  <div>
    <!-- <Navbar /> -->
    <div id="main">
      <div class="pagetitle d-flex justify-content-between px-2">
        <div class="py-3">
          <ol class="breadcrumb mb-1">
            <li class="breadcrumb-item active text-uppercase fs-6">
              <router-link class="nav-link d-inline" aria-current="page" to="/home"
                >Dashboard</router-link
              >
              /
              <router-link to="/invoice/staff-payroll" class="text-decoration-none"
                ><span class="color-fonts"
                  >Staff Invoices / Generate Staff View</span
                ></router-link
              >
            </li>
          </ol>
        </div>
      </div>

      <div class="container-fluid pt-3">
        <div class="row">
          <div class="col-sm-12 col-md-7" ref="invoiceContent">
            <!-- <component :is="selectedTemplate"></component> -->
            <div
              class="text-muted bg-white p-3"
              style="border: 1px solid #f8f8f8; box-shadow: 2px 2px 7px 2px #e7d7d7"
            >
              <div class="">
                <div class="col-12">
                  <div class="row">
                    <div class="col-4">
                      <h6 class="text-muted">BILLED FROM</h6>
                      <h5 class="fw-bold">{{ invoiceData?.merchant_name }}</h5>

                      <p class="mb-0">Mob No:{{ invoiceData?.merchant_phone }}</p>
                      <p class="mb-0">Email:{{ invoiceData?.merchant_email }}</p>
                    </div>
                    <div class="col-4"></div>
                    <div class="col-4">
                      <div class="float-end">
                        <h6 class="text-muted">Invoice Number</h6>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="mt-4">
                <div class="col-12">
                  <div class="row">
                    <div class="col-4">
                      <h6 class="text-muted">SUPPLIER</h6>
                      <h5 class="fw-bold">{{ invoiceData?.candidate_name }}</h5>
                      <p class="mb-0">
                        Mob No: {{ invoiceData?.candidate_phone_number }}
                      </p>
                      <p class="mb-0">Email: {{ invoiceData?.candidate_email }}</p>
                    </div>
                    <div class="col-4">
                      <!-- <p>{{ invoiceData?.number }}</p> -->
                      <!-- <h6 class="text-muted">SHIP To</h6>
                        <h5 class="fw-bold">{{ invoiceData?.site_name }}</h5>
                        <p class="mb-0">Mob No: {{ invoiceData?.site_phone_number }}</p>
                        <p class="mb-0">Email: {{ invoiceData?.site_email }}</p> -->
                    </div>
                    <div class="col-4">
                      <div class="pe-3 float-end">
                        <h6 class="text-muted">INVOICE INFORMATION</h6>
                        <h5>FROM: {{ this.formatDate(invoiceData?.start_date) }}</h5>
                        <h5>TO : {{ this.formatDate(invoiceData?.end_date) }}</h5>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="col-12 mt-4">
                <div class="table-wrapper">
                  <table class="table candidateTable">
                    <thead>
                      <tr>
                        <th scope="col">Date</th>
                        <th scope="col">Start</th>
                        <th scope="col">End</th>
                        <th scope="col">Site</th>
                        <th scope="col">Staff</th>
                        <th scope="col">Job</th>
                        <th scope="col">Unit</th>
                        <th scope="col">Rate</th>
                        <th scope="col">Total Hour</th>
                      </tr>
                    </thead>
                    <tbody>
                      <!-- Loop through site details and timesheets -->
                      <template
                        v-for="(candidate, candidateIndex) in invoiceData?.site_details"
                        :key="candidateIndex"
                      >
                        <tr
                          v-for="(timesheet, timesheetIndex) in candidate.site_timesheets"
                          :key="timesheetIndex"
                        >
                          <td scope="col">
                            {{
                              this.formatDate(
                                timesheetIndex === 0
                                  ? invoiceData?.start_date
                                  : invoiceData?.end_date
                              )
                            }}
                          </td>
                          <td scope="col">{{ timesheet?.start_time || "" }}</td>
                          <td scope="col">{{ timesheet?.end_time || "" }}</td>
                          <td scope="col">{{ candidate.site_name }}</td>
                          <td scope="col" class="text-capitalize">
                            {{ invoiceData?.candidate_name }}
                          </td>
                          <td scope="col">{{ invoiceData?.job_position || "" }}</td>
                          <td scope="col">{{ invoiceData?.unit || "" }}</td>
                          <td scope="col">{{ timesheet?.staff_rate || "" }}</td>
                          <td scope="col">{{ timesheet?.hours || "" }}</td>
                        </tr>
                      </template>

                      <tr>
                        <td colspan="8" class="text-start font-weight-bold">
                          Total Cost
                        </td>
                        <td colspan="8" class="font-weight-bold">
                          {{ invoiceData?.total_amount || 0 }}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div class="mt-3">
                  <div class="col-12">
                    <div class="row mt-5">
                      <div class="col-4">
                        <h6>NOTES</h6>
                        <p class="mb-0">Thanks for doing business with us!</p>
                        <p class="mb-0">Account Number:</p>
                        <p class="mb-0">Sort Code:</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="col-sm-12 col-md-5 mt-4 mt-lg-0 mt-md-0">
            <div
              class="text-muted bg-white p-3"
              style="border: 1px solid #f8f8f8; box-shadow: 2px 2px 7px 2px #e7d7d7"
            >
              <div class="row mt-4">
                <div class="d-flex gap-2">
                  <button
                    type="button"
                    class="btn btn-outline-success text-nowrap text-nowrap"
                    @mousedown="downloadFile"
                  >
                    <i class="bi bi-file-earmark-pdf"></i> PDF
                  </button>
                </div>
              </div>
              <div class="row mt-2 p-4"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
// import Navbar from "../Navbar.vue";

import DOMPurify from "dompurify";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import Swal from "sweetalert2";
import { defineAsyncComponent } from "vue";
import { mapState } from "vuex";
export default {
  data() {
    return {
      //   selectedTemplate: this.$store.state.selectedTemplate,
      //   invoiceData: [],
      selectedID: null,
      //   agencySetting: [],
      //   selectedInvoiceId: null,
      //   showEditComponent: false,
      //   showEditComponentTwo: false,
    };
  },
  props: ["id"],
  computed: {
    ...mapState(["selectedTemplates"]),
    invoiceData() {
      const index = parseInt(this.id, 10);
      const data = this.$store.getters.getInvoiceStaffData;
      return data && data[index] ? data[index] : null;
    },
  },
  components: {
    DOMPurify,
    html2canvas,
    jsPDF,
  },

  methods: {
    formatDate(date) {
      const d = new Date(date);
      let day = d.getDate();
      let month = d.getMonth() + 1;
      let year = d.getFullYear();

      if (day < 10) day = "0" + day;
      if (month < 10) month = "0" + month;

      return `${day}-${month}-${year}`;
    },

    async downloadFile() {
      await this.$nextTick();

      const element = this.$refs.invoiceContent;

      if (!element || !document.body.contains(element)) {
        return;
      }

      const sanitizedHTML = DOMPurify.sanitize(element.innerHTML || "");

      try {
        const canvas = await html2canvas(element, {
          useCORS: true,
          allowTaint: false,
          logging: true,
          backgroundColor: null,
        });

        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF();

        const pageWidth = pdf.internal.pageSize.getWidth();
        const imgWidth = pageWidth;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
        const fileName = `Staff_invoice.pdf`;
        pdf.save(fileName);
      } catch (error) {
        // console.error("Error downloading the file:", error);
      }
    },
    //   async createClientInvoice() {
    //     try {
    //       const response = await axios.get(
    //         `${VITE_API_URL}/client_invoices/${this.$route.params.id}`
    //       );
    //       const clientInvoice = response.data.client_invoice;

    //       this.invoiceData = clientInvoice;
    //       this.agencySetting = clientInvoice.agency_setting;
    //     } catch (error) {
    //       // console.error("Error fetching client invoice:", error);
    //     }
    //   },
  },

  created() {
    // this.selectedTemplate = this.$store.state.selectedTemplate;
    //   this.createClientInvoice();
  },
};
</script>

<style scoped>
#main {
  transition: all 0.3s;
  height: 100vh;
  padding-top: 65px;
  background-color: #fdce5e17;
}
.disabled-link {
  pointer-events: none;
  opacity: 0.5;
  cursor: not-allowed;
}
.main-content {
  transition: all 0.3s;
}
.bg-define {
  background-color: #fdce5e17;
}
.color-fonts {
  color: #ff5f30;
  font-weight: bold;
}
.btn-primary {
  border: none;
}
.form-check-input {
  border: 2px solid grey;
}
select {
  padding: 10px;
  border-radius: 4px;
  border: 0px;
  border: 1px solid rgb(202, 198, 198);
}
.rounded-circle {
  border: 1px solid #ff5f30;
  padding: 8px 11px;
  cursor: pointer;
}
.border-left {
  border-left: 1px solid #ded9d9;
  height: 100vh;
}
a[data-v-507f63b7] {
  text-decoration: none;
}
.form-select {
  width: 100% !important;
}
.candidateTable tr:nth-child(odd) td {
  background: #fdce5e17 !important;
}
.btn-primary {
  border-radius: 4px;
}

.nav-pills .nav-link.active,
.nav-pills .show > .nav-link {
  background-color: transparent;
  border: 1px solid green;
  border-radius: 22px;
  color: green;
}

.nav-pills .nav-link {
  background-color: transparent;
  border: 1px solid #0d6efd;
  border-radius: 22px;
}
ul.nav-pills {
  height: 53px;
  border-bottom: 1px solid #b8b1b1;
}
table th {
  background-color: #ff5f30;
}

button.nav-link > li.nav-item {
  border-bottom: 2px solid red;
  padding-bottom: 5px;
}

.form-select {
  width: auto;
}

input::-webkit-input-placeholder {
  margin-left: 5px;
}
@media (max-width: 1120px) {
  .candidateTable {
    width: 700px;
  }
  .table-wrapper {
    overflow-x: scroll;
  }
}
</style>
