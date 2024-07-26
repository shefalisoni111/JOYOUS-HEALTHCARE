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
                ><span class="color-fonts">Client Invoices</span> /
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
                      <h5 class="fw-bold">Recpal Demo1</h5>
                      <p class="mb-0">Mob No: {{ agencySetting.contact }}</p>
                      <p class="mb-0">Email: {{ agencySetting.email }}</p>
                    </div>
                    <div class="col-4"></div>
                    <div class="col-4">
                      <div class="float-end">
                        <h5 class="fw-bold">Demo</h5>
                        <p class="mb-0">London, UK</p>
                        <p class="mb-0">Mob No: {{ agencySetting.contact }}</p>
                        <p class="mb-0">Email: {{ agencySetting.email }}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="mt-4">
                <div class="col-12">
                  <div class="row">
                    <div class="col-4">
                      <h5>DATE: {{ getClientInvoiceDetail.start_date }}</h5>
                      <h5>DUE DATE: {{ getClientInvoiceDetail.due_date }}</h5>
                    </div>
                    <div class="col-4 text-center">
                      <p>{{ getClientInvoiceDetail.number }}</p>
                    </div>
                    <div class="col-4">
                      <div class="pe-3 float-end">
                        <h5>FROM: 03-07-2023</h5>
                        <h5>TO : 09-07-2023</h5>
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
                        <!-- <td scope="col">
                          {{ getClientInvoiceDetail.start_time }}
                        </td>
                        <td scope="col">
                          {{ getClientInvoiceDetail.end_time }}
                        </td> -->
                        <td scope="col">07:40</td>
                        <td scope="col">08:00</td>
                        <!-- <td scope="col">
                          <input type="time" v-model="fetchCustomSheetData.start_time" />
                        </td>
                        <td scope="col">
                          <input type="time" v-model="fetchCustomSheetData.end_time" />
                        </td> -->
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
                      <tr>
                        <td scope="col">
                          {{ getClientInvoiceDetail.end_date }}
                        </td>
                        <!-- <td scope="col">
                          {{ getClientInvoiceDetail.start_time }}
                        </td>
                        <td scope="col">
                          {{ getClientInvoiceDetail.end_time }}
                        </td> -->
                        <td scope="col">07:40</td>
                        <td scope="col">08:00</td>
                        <!-- <td scope="col">
                          <input type="time" v-model="fetchCustomSheetData.start_time" />
                        </td>
                        <td scope="col">
                          <input type="time" v-model="fetchCustomSheetData.end_time" />
                        </td> -->
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
                    Cancel
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

import SuccessAlert from "../../Alerts/SuccessAlert.vue";

export default {
  data() {
    return {
      selectedInvoiceId: null,
      getClientInvoiceDetail: [],
      isEditMode: false,
      fetchCustomSheetData: {
        // id: "",
        shift_date: "",
        code: "",
        name: "",
        business_unit: "",
        job: "",
        unit: "",
        approved_hour: "",
        start_time: "",
        end_time: "",
        rate: "",
        total_amount: "",
        custom_image: "",
      },
      options: [],
      validationClientRate: true,
      businessUnit: [],
      agencySetting: [],
      siteData: [],
      showEditComponent: false,
    };
  },
  components: { SuccessAlert },
  props: {
    invoiceId: {
      type: Number,
    },
  },
  methods: {
    cancelButtonClicked() {
      this.$router.push("/invoice/client-invoice");
    },
    // toggleEditMode(invoiceId) {
    //   this.$router.push({
    //     name: "ClientInvoiceViewEdit",
    //     params: { id: invoiceId },
    //   });
    // },
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
    // async createStaffInvoice(id) {
    //   if (!this.$route.params.id) {
    //     return;
    //   }
    //   try {
    //     const response = await axios.get(
    //       `${VITE_API_URL}/client_invoices/${this.$route.params.id}`
    //     );
    //     this.fetchCustomSheetData = {
    //       id: response.data.client_invoice.id,
    //       shift_date: response.data.client_invoice.start_date,
    //       job: response.data.client_invoice.job,
    //       start_date: response.data.client_invoice.start_date,
    //       end_date: response.data.client_invoice.end_date,
    //       unit: response.data.client_invoice.unit,
    //       rate: response.data.client_invoice.rate,
    //       total_amount: response.data.client_invoice.total_amount,
    //       paid_amount: response.data.client_invoice.paid_amount,
    //       balance_amount: response.data.client_invoice.balance_amount,
    //     };
    //   } catch (error) {
    //     // console.error("Error fetching custom timesheet data:", error);
    //   }
    // },
    validatePayload(payload) {
      let isValid = true;

      // Example validation rules
      if (!payload.shift_date) {
        console.error("Validation Error: shift_date is required");
        isValid = false;
      }

      if (!payload.name) {
        console.error("Validation Error: name is required");
        isValid = false;
      }
      // Add more validation rules as per your API requirements

      return isValid;
    },
    async createClientInvoice() {
      const id = this.$route.params.id;
      if (!id) {
        return;
      }
      try {
        const response = await axios.get(`${VITE_API_URL}/client_invoices/${id}`);
        const clientInvoice = response.data.client_invoice;

        this.getClientInvoiceDetail = clientInvoice;

        this.getClientInvoiceDetail = clientInvoice;

        this.agencySetting = clientInvoice.agency_setting;

        this.siteData = clientInvoice.site_data;

        // this.invoiceLogs = clientInvoice.logs.map((log) => ({
        //   ...log,
        //   isEditing: false,
        // }));
        this.fetchCustomSheetData = {
          shift_date: clientInvoice.start_date,

          name: clientInvoice.candidate,
          business_unit: clientInvoice.business_unit,
          job: clientInvoice.job,
          unit: clientInvoice.unit,
          approved_hour: clientInvoice.approved_hour,
          start_time: clientInvoice.start_time,
          end_time: clientInvoice.end_time,
          rate: clientInvoice.rate,
          total_amount: clientInvoice.total_amount,
          custom_image: clientInvoice.custom_image,
        };
      } catch (error) {
        // console.error("Error fetching client invoice:", error);
      }
    },
    async updateCustomTimeSheetMethod() {
      const payload = { ...this.fetchCustomSheetData };

      if (!this.validatePayload(payload)) {
        // console.error("Payload validation failed");
        return;
      }

      try {
        const payload = { ...this.fetchCustomSheetData };

        const response = await axios.put(
          `${VITE_API_URL}/update_client_invoice/${this.$route.params.id}`,
          payload,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        // this.$store.commit("updateCandidate", {
        //   id: this.fetchCustomSheetData.id,
        //   newData: response.data.client_invoice,
        // });
        this.$emit("ClientInvoice-updated");

        const message = "Client Invoice updated successfully";
        this.$refs.successAlert.showSuccess(message);
      } catch (error) {
        // if (error.response) {
        //   console.error("Error response data:", error.response.data);
        //   console.error("Error response status:", error.response.status);
        //   console.error("Error response headers:", error.response.headers);
        //   if (error.response.data.errors) {
        //     console.error("Validation errors:", error.response.data.errors);
        //   }
        // } else if (error.request) {
        //   console.error("Error request:", error.request);
        // } else {
        //   console.error("Error message:", error.message);
        // }
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
input,
button,
select,
optgroup,
textarea {
  width: 55%;
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
