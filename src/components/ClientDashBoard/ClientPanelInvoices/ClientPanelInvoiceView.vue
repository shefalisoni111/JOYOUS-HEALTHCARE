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
              <router-link to="/invoice/client-invoice" class="text-decoration-none"
                ><span class="color-fonts">
                  Invoices / {{ getClientInvoiceDetail.number }}</span
                ></router-link
              >
            </li>
          </ol>
        </div>
      </div>

      <div class="container-fluid pt-3">
        <div class="row">
          <div class="col-sm-12 col-md-7" ref="invoiceContent">
            <ClientPanel_FirstTemplate />
          </div>

          <div class="col-sm-12 col-md-5 mt-4 mt-lg-0 mt-md-0">
            <div
              class="text-muted bg-white p-3"
              style="border: 1px solid #f8f8f8; box-shadow: 2px 2px 7px 2px #e7d7d7"
            >
              <!-- <div class="row">
                <div class="d-flex gap-4">
                  <select class="form-select form-select-sm">
                    <option selected>Created</option>
                    <option value="1">Generated</option>
                  </select>
                  <select
                    v-model="selectedTemplate"
                    @change="updateTemplate"
                    class="form-select form-select-sm"
                  >
                    <option value="TemplateOne">Template One</option>
                    <option value="TemplateTwo">Template Two</option>
                  </select>
                </div>
              </div> -->
              <div class="row mt-4">
                <div class="d-flex gap-2">
                  <!-- <router-link
                    :to="{
                      name: 'First_TemplateEdit',
                      params: {
                        id: getClientInvoiceDetail.id,
                      },
                    }"
                    class="btn btn-outline-success text-nowrap"
                    :class="{ 'disabled-link': getClientInvoiceDetail.invoice_lock }"
                    @click.prevent="handleEditClick(getClientInvoiceDetail.invoice_lock)"
                  >
                    <i class="bi bi-pencil-fill"></i> Edit
                  </router-link> -->

                  <!-- <button
                    type="button"
                    class="btn btn-outline-success text-nowrap text-nowrap"
                    data-bs-toggle="modal"
                    data-bs-target="#clientInvoiceMail"
                    data-bs-whatever="@mdo"
                  >
                    <i class="bi bi-envelope"></i> Email
                  </button> -->
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
                        Invoice created for £{{ getClientInvoiceDetail.grand_total }} by
                        <b>{{ getClientInvoiceDetail?.client_name }}</b
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
  </div>
</template>
<script>
import axios from "axios";
// import Navbar from "../Navbar.vue";
// import MailInvoice from "../modals/InvoicePagesModal/ClientMailInvoice.vue";
import ClientPanel_FirstTemplate from "../ClientPanelInvoices/ClientPanel_FirstTemplate.vue";
// import First_TemplateEdit from "../../InvoicePages/TemplatesDesign/First_TemplateEdit.vue";
// import ClientSecontTemplateEdit from "../../InvoicePages/TemplatesDesign/ClientSecontTemplateEdit.vue";
import DOMPurify from "dompurify";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import Swal from "sweetalert2";
import { defineAsyncComponent } from "vue";
import { mapState } from "vuex";
export default {
  data() {
    return {
      // selectedTemplate: this.$store.state.selectedTemplate,
      getClientInvoiceDetail: [],
      selectedID: null,
      agencySetting: [],
      selectedInvoiceId: null,
      showEditComponent: false,
      showEditComponentTwo: false,
    };
  },
  computed: {
    // ...mapState(["selectedTemplates"]),
  },
  components: {
    // TemplateOne: defineAsyncComponent(() =>
    //   import("../../InvoicePages/TemplatesDesign/First_Templates.vue")
    // ),
    // TemplateTwo: defineAsyncComponent(() =>
    //   import("../../InvoicePages/TemplatesDesign/Second_Template.vue")
    // ),
    ClientPanel_FirstTemplate,
    // First_TemplateEdit,
    // ClientSecontTemplateEdit,
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
    // handleEditClick(isLocked) {
    //   if (isLocked) {
    //     // alert("Can't edit. Invoice is locked.");
    //     Swal.fire({
    //       icon: "warning",
    //       title: "Edit Locked",
    //       text: "Can't edit. Invoice is locked.",
    //       confirmButtonText: "OK",
    //     });
    //   } else {
    //     if (this.selectedTemplate === "TemplateOne") {
    //       this.showEditComponent = true;
    //       this.showEditComponentTwo = false;
    //     } else if (this.selectedTemplate === "TemplateTwo") {
    //       this.showEditComponent = false;
    //       this.showEditComponentTwo = true;
    //     }
    //     this.toggleEditMode(this.getClientInvoiceDetail.id);
    //   }
    // },
    // toggleEditMode(invoiceId) {
    //   if (this.showEditComponent) {
    //     this.$router.push({
    //       name: "First_TemplateEdit",
    //       params: { id: invoiceId },
    //     });
    //   } else {
    //     this.$router.push({
    //       name: "ClientSecontTemplateEdit",
    //       params: { id: invoiceId },
    //     });
    //   }
    // },
    // updateTemplate() {
    //   this.$store.commit("setSelectedTemplate", this.selectedTemplate);
    // },
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
        const fileName = `ClientPanel_invoice.pdf`;
        pdf.save(fileName);
      } catch (error) {
        // console.error("Error downloading the file:", error);
      }
    },
    async createClientInvoice() {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get(
          `${VITE_API_URL}/client_dashboard/client_invoices/${this.$route.params.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const clientInvoice = response.data.client_invoice;
        // console.log(clientInvoice);

        this.getClientInvoiceDetail = clientInvoice;
        // this.agencySetting = clientInvoice.agency_setting;
      } catch (error) {
        // console.error("Error fetching client invoice:", error);
      }
    },
  },

  created() {
    this.selectedTemplate = this.$store.state.selectedTemplate;
    this.createClientInvoice();
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
