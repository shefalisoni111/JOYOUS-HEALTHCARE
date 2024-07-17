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
                  <!-- <table class="table candidateTable">
                    <thead>
                      <tr>
                        <th scope="col">Date</th>
                        <th scope="col">Start</th>
                        <th scope="col">End</th>
                        <th scope="col">Name</th>
                        <th scope="col">Job</th>
                        <th scope="col">Unit</th>
                        <th scope="col">Rate</th>
                        <th scope="col">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td scope="col">{{ getClientInvoiceDetail.start_date }}</td>
                        <td scope="col">07:40</td>
                        <td scope="col">08:00</td>
                        <td scope="col" class="text-capitalize">
                          {{ getClientInvoiceDetail.candidate }}
                        </td>
                        <td scope="col">{{ getClientInvoiceDetail.job }}</td>
                        <td scope="col">{{ getClientInvoiceDetail.unit }}</td>
                        <td scope="col">{{ getClientInvoiceDetail.rate }}</td>
                        <td scope="col">{{ getClientInvoiceDetail.total_amount }}</td>
                      </tr>
                      <tr>
                        <td scope="col">07-07-2023</td>
                        <td scope="col">07:40</td>
                        <td scope="col">08:00</td>
                        <td scope="col" class="text-capitalize">
                          {{ getClientInvoiceDetail.candidate }}
                        </td>
                        <td scope="col">{{ getClientInvoiceDetail.job }}</td>
                        <td scope="col">{{ getClientInvoiceDetail.unit }}</td>
                        <td scope="col">{{ getClientInvoiceDetail.rate }}</td>
                        <td scope="col">{{ getClientInvoiceDetail.total_amount }}</td>
                      </tr>
                    </tbody>
                  </table> -->

                  <table class="table candidateTable">
                    <thead>
                      <tr>
                        <th scope="col">Date</th>
                        <th scope="col">Start</th>
                        <th scope="col">End</th>
                        <th scope="col">Name</th>
                        <th scope="col">Job</th>
                        <th scope="col">Unit</th>
                        <th scope="col">Rate</th>
                        <th scope="col">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td scope="col">
                          {{ getClientInvoiceDetail.start_date }}
                        </td>
                        <td scope="col">
                          <input type="time" v-model="fetchCustomSheetData.start_time" />
                        </td>
                        <td scope="col">
                          <input type="time" v-model="fetchCustomSheetData.end_time" />
                        </td>
                        <td scope="col" class="text-capitalize">
                          {{ getClientInvoiceDetail.candidate }}
                        </td>
                        <td scope="col">
                          {{ getClientInvoiceDetail.job }}
                        </td>
                        <td scope="col">
                          <input type="number" v-model="fetchCustomSheetData.unit" />
                        </td>
                        <td scope="col">
                          <input type="number" v-model="fetchCustomSheetData.rate" />
                        </td>
                        <td scope="col">
                          <input
                            type="text"
                            v-model="getClientInvoiceDetail.total_amount"
                          />
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
              <div class="row"></div>
              <div class="row mt-5">
                <div class="d-flex gap-2">
                  <button
                    type="button"
                    class="btn btn-outline-success text-nowrap text-nowrap"
                    v-on:click="updateCustomTimeSheetMethod()"
                  >
                    <i class="bi bi-envelope"></i> Save
                  </button>
                  &nbsp;
                  <button
                    type="button"
                    class="btn btn-outline-success text-nowrap text-nowrap"
                    @click="cancelButtonClicked"
                  >
                    <i class="bi bi-envelope"></i> Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <SuccessAlert ref="successAlert" />
  </div>
</template>

<script>
import axios from "axios";

import SuccessAlertVue from "../../Alerts/SuccessAlert.vue";

export default {
  data() {
    return {
      selectedInvoiceId: null,
      getClientInvoiceDetail: [],
      isEditMode: false,
      fetchCustomSheetData: {
        id: "",
        shift_date: "",
        code: "",
        name: "",
        business_unit: "",
        job: "",
        approved_hour: "",
        start_time: "",
        end_time: "",
        client_rate: "",
        total_cost: "",
        custom_image: "",
      },
      options: [],
      validationClientRate: true,
      businessUnit: [],
    };
  },
  components: { SuccessAlertVue },

  methods: {
    cancelButtonClicked() {
      this.$router.push("/invoice/staff-invoice");
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
    async generatePDF() {
      if (!this.$route.params.id) {
        return;
      }
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
    async createStaffInvoice(id) {
      if (!this.$route.params.id) {
        return;
      }
      try {
        const response = await axios.get(
          `${VITE_API_URL}/staff_invoices/${this.$route.params.id}`
        );
        this.fetchCustomSheetData = {
          id: response.data.client_invoice.id,
          shift_date: response.data.client_invoice.start_date,
          job: response.data.client_invoice.job,
          start_date: response.data.client_invoice.start_date,
          end_date: response.data.client_invoice.end_date,
          client_rate: response.data.client_invoice.client_rate,
          total_amount: response.data.client_invoice.total_amount,
          paid_amount: response.data.client_invoice.paid_amount,
          balance_amount: response.data.client_invoice.balance_amount,
        };
      } catch (error) {
        // console.error("Error fetching custom timesheet data:", error);
      }
    },
    async createClientInvoice() {
      const id = this.$route.params.id;
      if (!id) {
        return;
      }
      try {
        const response = await axios.get(`${VITE_API_URL}/staff_invoices/${id}`);
        const clientInvoice = response.data.staff_invoice;

        this.getClientInvoiceDetail = clientInvoice;

        this.invoiceLogs = clientInvoice.logs.map((log) => ({
          ...log,
          isEditing: false,
        })); // Initialize logs
      } catch (error) {
        // console.error("Error fetching client invoice:", error);
      }
    },
    async updateCustomTimeSheetMethod() {
      try {
        const payload = {
          custom_timesheet: this.fetchCustomSheetData,
        };

        const response = await axios.put(
          `${VITE_API_URL}/update_staff_invoice/${this.$route.params.id}`,
          payload,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        this.$store.commit("updateCandidate", {
          id: this.fetchCustomSheetData.id,
          newData: response.data.data,
        });
        this.$emit("CustomTimeSheetData-updated");

        const message = "Staff Invoice updated successfully";
        this.$refs.successAlert.showSuccess(message);
      } catch (error) {
        // console.error("Error updating custom timesheet:", error);
        if (error.response && error.response.data) {
          //   console.error("Server response:", error.response.data);
        }
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
