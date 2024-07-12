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
                ><span class="color-fonts">Staff Invoices</span></router-link
              >
            </li>
          </ol>
        </div>
      </div>

      <div class="container-fluid pt-3">
        <div class="row">
          <div class="col-sm-12 col-md-7">
            <div
              class="text-muted bg-white p-3"
              style="border: 1px solid #f8f8f8; box-shadow: 2px 2px 7px 2px #e7d7d7"
            >
              <div class="">
                <div class="col-12">
                  <div class="row">
                    <div class="col-4">
                      <p class="mb-1">BILLED FROM</p>
                      <h5 class="fw-bold">Recpal Demo1</h5>
                      <p class="mb-0">Mob No: +91 70206 07635</p>
                      <p class="mb-0">Email: geethu@recpal.co.uk</p>
                    </div>
                    <div class="col-4"></div>
                    <div class="col-4">
                      <div class="float-end">
                        <p class="mb-0">INVOICE NUMBER</p>
                        <h6>#ZSINV-16-1</h6>
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
                      <h5 class="fw-bold">Zeba S</h5>
                      <p class="mb-0">Mob No: +91 70206 07635</p>
                      <p class="mb-0">Email: geethu@recpal.co.uk</p>
                    </div>
                    <div class="col-4">
                      <p class="mb-1">SHIP TO</p>
                      <h5 class="fw-bold">Recpal Demo1</h5>
                      <p class="mb-0">+91 70206 07635</p>
                      <p class="mb-0">Email: geethu@recpal.co.uk</p>
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
                        <td scope="col">07-07-2023</td>
                        <td scope="col">
                          Nurse<br />
                          Demo
                        </td>
                        <td scope="col">0.33</td>
                        <td scope="col">12.00</td>
                        <td scope="col">3.96</td>
                      </tr>
                      <tr>
                        <td scope="col">07-07-2023</td>
                        <td scope="col">
                          Nurse<br />
                          Demo
                        </td>
                        <td scope="col">0.33</td>
                        <td scope="col">12.00</td>
                        <td scope="col">3.96</td>
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
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </select>
                </div>
              </div>
              <div class="row mt-5">
                <div class="d-flex gap-2">
                  <button
                    type="button"
                    class="btn btn-outline-success text-nowrap text-nowrap"
                    @click="toggleEditMode(getClientInvoiceDetail.id)"
                    data-bs-toggle="modal"
                    data-bs-target="#editInvoiceFirstTemplate"
                    data-bs-whatever="@mdo"
                  >
                    <i class="bi bi-pencil-fill"></i> Edit
                  </button>

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
                  >
                    <i class="bi bi-file-earmark-pdf"></i> PDF
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <ClientMailInvoice />
    <CandidateMail />
    <EditeTemplate :InvoiceId="selectedInvoiceId" />
  </div>
</template>
<script>
import axios from "axios";
// import Navbar from "../Navbar.vue";
import ClientMailInvoice from "../modals/InvoicePagesModal/ClientMailInvoice.vue";
import CandidateMail from "../modals/InvoicePagesModal/CandidateMail.vue";
import EditeTemplate from "../InvoicePages/TemplatesDesign/EditeTemplate.vue";
export default {
  data() {
    return { selectedInvoiceId: null, getClientInvoiceDetail: [] };
  },
  components: { ClientMailInvoice, CandidateMail, EditeTemplate },

  methods: {},

  mounted() {},
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
