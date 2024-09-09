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
                ><span class="color-fonts"
                  >Client Invoices / {{ getClientInvoiceDetail.number }}</span
                ></router-link
              >
            </li>
          </ol>
        </div>
      </div>

      <div class="container-fluid pt-3">
        <div class="row">
          <div class="col-sm-12 col-md-7">
            <component :is="selectedTemplate"></component>
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
                  <select
                    v-model="selectedTemplate"
                    @change="updateTemplate"
                    class="form-select form-select-sm"
                  >
                    <option value="TemplateOne">Template One</option>
                    <option value="TemplateTwo">Template Two</option>
                  </select>
                </div>
              </div>
              <div class="row mt-4">
                <div class="d-flex gap-2">
                  <router-link
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
                  </router-link>

                  <button
                    type="button"
                    class="btn btn-outline-success text-nowrap text-nowrap"
                    data-bs-toggle="modal"
                    data-bs-target="#clientInvoiceMail"
                    data-bs-whatever="@mdo"
                  >
                    <i class="bi bi-envelope"></i> Email
                  </button>
                  <button
                    type="button"
                    class="btn btn-outline-success text-nowrap text-nowrap"
                    @click="generatePDF"
                  >
                    <i class="bi bi-file-earmark-pdf"></i> PDF
                  </button>
                  <button
                    type="button"
                    class="btn btn-outline-success text-nowrap text-nowrap"
                  >
                    <i class="bi bi-file-earmark-pdf"></i> Signed Timesheet PDF
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
                        Recpal<br />
                        {{ getClientInvoiceDetail.created_on }}|
                      </div>
                    </li>
                    <li class="d-flex mb-1">
                      <div>
                        <i class="bi bi-asterisk"></i>
                      </div>
                      <div class="ps-2">
                        Invoice has been opened<br />
                        {{ getClientInvoiceDetail.created_on }}|
                      </div>
                    </li>
                    <li class="d-flex mb-1">
                      <div>
                        <i class="bi bi-asterisk"></i>
                      </div>
                      <div class="ps-2">
                        Invoice has been delivered<br />
                        {{ getClientInvoiceDetail.created_on }}|
                      </div>
                    </li>
                    <li class="d-flex mb-1">
                      <div>
                        <i class="bi bi-asterisk"></i>
                      </div>
                      <div class="ps-2">
                        Invoice has been sent to lakeview.admin@cinnamoncc.com by
                        Recpal<br />
                        {{ getClientInvoiceDetail.created_on }}|
                      </div>
                    </li>
                    <li class="d-flex mb-1">
                      <div>
                        <i class="bi bi-asterisk"></i>
                      </div>
                      <div class="ps-2">
                        Edited invoice by Recpal<br />
                        {{ getClientInvoiceDetail.created_on }}|
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
    <div v-if="showEditComponent" class="table-wrapper">
      <First_TemplateEdit
        :invoice-id="getClientInvoiceDetail.id"
        @ClientInvoice-updated="createClientInvoice"
      />
    </div>
    <div v-if="showEditComponentTwo" class="table-wrapper">
      <ClientSecontTemplateEdit
        :invoice-id="getClientInvoiceDetail.id"
        @ClientInvoice-updated="createClientInvoice"
      />
    </div>
    <MailInvoice />
  </div>
</template>
<script>
import axios from "axios";
// import Navbar from "../Navbar.vue";
import MailInvoice from "../modals/InvoicePagesModal/ClientMailInvoice.vue";

import First_TemplateEdit from "../InvoicePages/TemplatesDesign/First_TemplateEdit.vue";
import ClientSecontTemplateEdit from "../InvoicePages/TemplatesDesign/ClientSecontTemplateEdit.vue";

import { defineAsyncComponent } from "vue";
import { mapState } from "vuex";
export default {
  data() {
    return {
      selectedTemplate: this.$store.state.selectedTemplate,
      getClientInvoiceDetail: [],
      selectedID: null,
      selectedInvoiceId: null,
      showEditComponent: false,
      showEditComponentTwo: false,
    };
  },
  computed: {
    ...mapState(["selectedTemplates"]),
  },
  components: {
    MailInvoice,

    TemplateOne: defineAsyncComponent(() =>
      import("../InvoicePages/TemplatesDesign/First_Templates.vue")
    ),
    TemplateTwo: defineAsyncComponent(() =>
      import("../InvoicePages/TemplatesDesign/Second_Template.vue")
    ),
    First_TemplateEdit,
    ClientSecontTemplateEdit,
  },

  methods: {
    // handleEditClick() {
    //   if (!this.getClientInvoiceDetail.invoice_lock) {
    //     this.toggleEditMode(this.getClientInvoiceDetail.id);
    //     this.showEditComponent = true;
    //     this.showEditComponentTwo = false;
    //   } else {
    //     this.showEditComponent = false;
    //     this.showEditComponentTwo = true;
    //   }
    // },
    handleEditClick(isLocked) {
      if (isLocked) {
        alert("Cannot edit. Invoice is locked.");
      } else {
        if (this.selectedTemplate === "TemplateOne") {
          this.showEditComponent = true;
          this.showEditComponentTwo = false;
        } else if (this.selectedTemplate === "TemplateTwo") {
          this.showEditComponent = false;
          this.showEditComponentTwo = true;
        }
        this.toggleEditMode(this.getClientInvoiceDetail.id);
      }
    },
    toggleEditMode(invoiceId) {
      if (this.showEditComponent) {
        this.$router.push({
          name: "First_TemplateEdit",
          params: { id: invoiceId },
        });
      } else {
        this.$router.push({
          name: "ClientSecontTemplateEdit",
          params: { id: invoiceId },
        });
      }
    },
    updateTemplate() {
      this.$store.commit("setSelectedTemplate", this.selectedTemplate);
    },
    async generatePDF() {
      try {
        const response = await axios.get(
          `${VITE_API_URL}/generate_pdf/${this.$route.params.id}`,
          {
            responseType: "blob",
          }
        );

        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `invoice_${this.id}.pdf`);
        document.body.appendChild(link);
        link.click();
      } catch (error) {
        // console.error("Error generating PDF:", error);
      }
    },
    async createClientInvoice() {
      try {
        const response = await axios.get(
          `${VITE_API_URL}/client_invoices/${this.$route.params.id}`
        );
        const clientInvoice = response.data.client_invoice;

        this.getClientInvoiceDetail = clientInvoice;
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
