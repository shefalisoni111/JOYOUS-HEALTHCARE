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
              <router-link to="/invoice/staff-invoice" class="text-decoration-none"
                ><span class="color-fonts">Staff Invoices</span> /
                <span class="color-fonts">{{
                  getClientInvoiceDetail.invoice_number
                }}</span>
              </router-link>
            </li>
          </ol>
        </div>
      </div>

      <div class="container-fluid pt-3">
        <div class="row">
          <div class="col-sm-12 col-md-7">
            <div
              class="text-muted bg-white p-3"
              ref="invoiceContent"
              style="border: 1px solid #f8f8f8; box-shadow: 2px 2px 7px 2px #e7d7d7"
            >
              <div class="">
                <div class="col-12">
                  <div class="row">
                    <div class="col-4">
                      <p class="mb-1">BILLED FROM</p>
                      <h5 class="fw-bold">
                        {{ getClientInvoiceDetail.agency_setting?.agency_name }}
                      </h5>
                      <p class="mb-0">
                        Mob No: {{ getClientInvoiceDetail.agency_setting?.contact }}
                      </p>
                      <p class="mb-0">
                        Email: {{ getClientInvoiceDetail.agency_setting?.email }}
                      </p>
                    </div>
                    <div class="col-4"></div>
                    <div class="col-4">
                      <div class="float-end">
                        <p class="mb-0">INVOICE NUMBER</p>
                        <h6>{{ getClientInvoiceDetail.invoice_number }}</h6>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="mt-5">
                <div class="col-12">
                  <div class="row">
                    <div class="col-4">
                      <p class="mb-1">SUPPLIER</p>
                      <h5 class="fw-bold">{{ getClientInvoiceDetail.staff }}</h5>
                      <p class="mb-0">Mob No: {{ getClientInvoiceDetail.staff }}</p>
                      <p class="mb-0">Email: geethu@recpal.co.uk</p>
                    </div>
                    <div class="col-4">
                      <p class="mb-1">SHIP TO</p>
                      <h5 class="fw-bold">
                        {{ getClientInvoiceDetail.agency_setting?.agency_name }}
                      </h5>
                      <p class="mb-0">
                        {{ getClientInvoiceDetail.agency_setting?.email }}
                      </p>
                      <p class="mb-0">
                        Email: {{ getClientInvoiceDetail.agency_setting?.email }}
                      </p>
                    </div>
                    <div class="col-4">
                      <div class="float-end">
                        <p class="mb-1">INVOICE INFORMATION</p>

                        <p class="mb-0">Date: 07-07-2023 15:33</p>
                        <p class="mb-0">Due Date:19-07-2023</p>
                        <p class="mb-0">From: 03-07-2023</p>
                        <p class="mb-0">To: 09-07-2023</p>
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
                        <th scope="col">Description</th>

                        <th scope="col">Unit</th>
                        <th scope="col">Rate</th>
                        <th scope="col">Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td scope="col">{{ getClientInvoiceDetail.start_date }}</td>
                        <td scope="col">{{ getClientInvoiceDetail.notes }}</td>

                        <td scope="col">{{ getClientInvoiceDetail.unit }}</td>
                        <td scope="col">{{ getClientInvoiceDetail.rate }}</td>
                        <td scope="col">{{ getClientInvoiceDetail.total_amount }}</td>
                      </tr>
                      <tr>
                        <td scope="col">{{ getClientInvoiceDetail.end_date }}</td>
                        <td scope="col">{{ getClientInvoiceDetail.notes }}</td>

                        <td scope="col">{{ getClientInvoiceDetail.unit }}</td>
                        <td scope="col">{{ getClientInvoiceDetail.rate }}</td>
                        <td scope="col">{{ getClientInvoiceDetail.total_amount }}</td>
                      </tr>
                      <tr>
                        <!-- Leave the first 4 columns blank -->
                        <td colspan="8" class="text-end fw-bold">Total Cost:</td>
                        <!-- Display the total in the last column -->
                        <td class="fw-bold">
                          {{ getClientInvoiceDetail?.total_amount || "" }}
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
              <div class="row">
                <div class="d-flex gap-4">
                  <select class="form-select form-select-sm">
                    <option selected>Created</option>
                    <option value="1">Generated</option>
                    <!-- <option value="2">Two</option>
                    <option value="3">Three</option> -->
                  </select>
                </div>
              </div>
              <div class="row mt-5">
                <div class="d-flex gap-2">
                  <router-link
                    :to="{
                      name: 'StaffInvoiceViewEdit',
                      params: {
                        id: getClientInvoiceDetail.id,
                      },
                    }"
                    class="btn btn-outline-success text-nowrap"
                    :class="{ 'disabled-link': getClientInvoiceDetail.invoice_lock }"
                    @click.prevent="handleEditClick"
                  >
                    <i class="bi bi-pencil-fill"></i> Edit
                  </router-link>
                  <!-- <button
                    v-else
                    type="button"
                    class="btn btn-outline-success text-nowrap text-nowrap"
                    @click="toggleEditMode(getClientInvoiceDetail.id)"
                  >
                    <i class="bi bi-pencil-fill"></i> Edit
                  </button> -->
                  <button
                    type="button"
                    class="btn btn-outline-success text-nowrap text-nowrap"
                    data-bs-toggle="modal"
                    data-bs-target="#candidateMail"
                    data-bs-whatever="@mdo"
                  >
                    <i class="bi bi-envelope"></i> Email
                  </button>
                  <button
                    type="button"
                    class="btn btn-outline-success text-nowrap text-nowrap"
                    @mousedown="downloadFile"
                  >
                    <i class="bi bi-file-earmark-pdf"></i> PDF
                  </button>
                </div>
              </div>
              <div class="row mt-2 p-4">
                <div>
                  <ul class="list-unstyled">
                    <li class="d-flex mb-1">
                      <div>
                        <i class="bi bi-asterisk"></i>
                      </div>

                      <div class="ps-2">
                        Invoice created for £{{ getClientInvoiceDetail.rate }} by
                        <b>{{ agencySetting?.agency_name }}</b
                        ><br />
                        {{ this.formatDate(getClientInvoiceDetail.created_on) }}
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <ClientMailInvoice />
    <CandidateMail />
    <!-- <EditStaffInvoiceTemplate :InvoiceId="selectedInvoiceId" /> -->
    <!-- <StaffInvoiceViewEdit @StaffInvoice-updated="createStaffInvoice" /> -->
  </div>
</template>
<script>
import axios from "axios";
// import Navbar from "../Navbar.vue";
import ClientMailInvoice from "../modals/InvoicePagesModal/ClientMailInvoice.vue";
import CandidateMail from "../modals/InvoicePagesModal/CandidateMail.vue";
import EditStaffInvoiceTemplate from "../InvoicePages/TemplatesDesign/EditStaffInvoiceTemplate.vue";
import StaffInvoiceViewEdit from "../InvoicePages/TemplatesDesign/StaffInvoiceViewEdit.vue";
import DOMPurify from "dompurify";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

export default {
  data() {
    return {
      selectedInvoiceId: null,
      getClientInvoiceDetail: [],
      isEditMode: false,
      agencySetting: [],
    };
  },
  components: {
    ClientMailInvoice,
    CandidateMail,
    EditStaffInvoiceTemplate,
    StaffInvoiceViewEdit,
    DOMPurify,
    html2canvas,
    jsPDF,
  },
  computed: {},
  methods: {
    async downloadFile() {
      await this.$nextTick();

      const element = this.$refs.invoiceContent;

      if (!element) {
        // console.error("Element not found");
        return;
      }

      const sanitizedHTML = DOMPurify.sanitize(element.innerHTML || "");

      let trustedHTML = sanitizedHTML;

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
        const pageHeight = pdf.internal.pageSize.getHeight();
        const imgWidth = pageWidth;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
        pdf.save("Staff_invoice.pdf");
      } catch (error) {
        // console.error("Error downloading the file:", error);
      }
    },
    formatDate(date) {
      const d = new Date(date);
      let day = d.getDate();
      let month = d.getMonth() + 1;
      let year = d.getFullYear();

      if (day < 10) day = "0" + day;
      if (month < 10) month = "0" + month;

      return `${day}-${month}-${year}`;
    },
    // async generatePDF() {
    //   try {
    //     const response = await axios.get(
    //       `${VITE_API_URL}/generate_staff_pdf/${this.$route.params.id}`,
    //       {
    //         responseType: "blob",
    //       }
    //     );

    //     const url = window.URL.createObjectURL(new Blob([response.data]));
    //     const link = document.createElement("a");
    //     link.href = url;
    //     link.setAttribute("download", `invoice_${this.$route.params.id}.pdf`);
    //     document.body.appendChild(link);
    //     link.click();
    //   } catch (error) {
    //     // console.error("Error generating PDF:", error);
    //   }
    // },
    handleEditClick() {
      if (!this.getClientInvoiceDetail.invoice_lock) {
        this.toggleEditMode(this.getClientInvoiceDetail.id);
      }
    },
    toggleEditMode(invoiceId) {
      this.$router.push({
        name: "StaffInvoiceViewEdit",
        params: { id: invoiceId },
      });
    },
    updateTemplate() {
      this.$store.commit("setSelectedTemplate", this.selectedTemplate);
    },

    async createStaffInvoice() {
      const id = this.$route.params.id;
      if (!id) {
        return;
      }
      try {
        const response = await axios.get(`${VITE_API_URL}/staff_invoices/${id}`);
        const clientInvoice = response.data.staff_invoice;

        this.getClientInvoiceDetail = clientInvoice;
        this.agencySetting = clientInvoice.agency_setting;
        this.invoiceLogs = clientInvoice.logs.map((log) => ({
          ...log,
          isEditing: false,
        }));
      } catch (error) {
        // console.error("Error fetching client invoice:", error);
      }
    },
    saveLog(log) {
      log.isEditing = false;

      axios
        .put(`${VITE_API_URL}/update_log/${log.id}`, { message: log.message })
        .then((response) => {
          // console.log("Log updated successfully:", response.data);
        })
        .catch((error) => {
          // console.error("Error updating log:", error);
        });
    },
  },

  created() {
    this.selectedTemplate = this.$store.state.selectedTemplate;
    this.createStaffInvoice();
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
