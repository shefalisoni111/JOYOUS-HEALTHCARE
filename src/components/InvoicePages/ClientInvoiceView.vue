<template>
  <div>
    <Navbar />
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
                  >Client Invoices / INVOICE NUMBER</span
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
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
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
                  <button
                    type="button"
                    class="btn btn-outline-success text-nowrap text-nowrap"
                  >
                    <i class="bi bi-pencil-fill"></i> Edit
                  </button>

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
                        Invoice created for £1116.00 by Claudiu Burtica<br />
                        29-04-2024|
                      </div>
                    </li>
                    <li class="d-flex mb-1">
                      <div>
                        <i class="bi bi-asterisk"></i>
                      </div>
                      <div class="ps-2">
                        Invoice has been opened<br />
                        29-04-2024|
                      </div>
                    </li>
                    <li class="d-flex mb-1">
                      <div>
                        <i class="bi bi-asterisk"></i>
                      </div>
                      <div class="ps-2">
                        Invoice has been delivered<br />
                        29-04-2024|
                      </div>
                    </li>
                    <li class="d-flex mb-1">
                      <div>
                        <i class="bi bi-asterisk"></i>
                      </div>
                      <div class="ps-2">
                        Invoice has been sent to lakeview.admin@cinnamoncc.com by Claudiu
                        Burtica<br />
                        29-04-2024|
                      </div>
                    </li>
                    <li class="d-flex mb-1">
                      <div>
                        <i class="bi bi-asterisk"></i>
                      </div>
                      <div class="ps-2">
                        Edited invoice by Claudiu Burtica<br />
                        29-04-2024|
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
    <MailInvoice />
  </div>
</template>
<script>
import Navbar from "../Navbar.vue";
import MailInvoice from "../modals/InvoicePagesModal/ClientMailInvoice.vue";
import { defineAsyncComponent } from "vue";
import { mapState } from "vuex";
export default {
  data() {
    return { selectedTemplate: this.$store.state.selectedTemplate };
  },
  computed: {
    ...mapState(["selectedTemplates"]),
  },
  components: {
    Navbar,
    MailInvoice,
    TemplateOne: defineAsyncComponent(() =>
      import("../InvoicePages/TemplatesDesign/First_Templates.vue")
    ),
    TemplateTwo: defineAsyncComponent(() =>
      import("../InvoicePages/TemplatesDesign/Second_Template.vue")
    ),
  },

  methods: {
    updateTemplate() {
      this.$store.commit("setSelectedTemplate", this.selectedTemplate);
    },
  },

  created() {
    this.selectedTemplate = this.$store.state.selectedTemplate;
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
