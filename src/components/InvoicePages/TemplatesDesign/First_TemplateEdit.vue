<template>
  <div>
    <!-- <Navbar /> -->
    <div id="main">
      <div class="pagetitle d-flex justify-content-between px-2">
        <div class="py-3">
          <ol class="breadcrumb mb-1">
            <li class="breadcrumb-item active text-uppercase fs-6">
              <router-link
                class="nav-link d-inline"
                aria-current="page"
                to="/home"
                >Dashboard</router-link
              >
              /
              <router-link
                to="/invoice/client-invoice"
                class="text-decoration-none"
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
              style="
                border: 1px solid #f8f8f8;
                box-shadow: 2px 2px 7px 2px #e7d7d7;
              "
            >
              <div class="row">
                <div class="col-12">
                  <div class="row">
                    <div class="col-4">
                      <h6 class="text-muted">BILLED FROM</h6>
                      <h5 class="fw-bold">
                        {{ getClientInvoiceDetail?.merchant_data?.merc_name }}
                      </h5>
                      <p class="mb-0">
                        Mob No:
                        {{ getClientInvoiceDetail?.merchant_data?.mer_phone }}
                      </p>
                      <p class="mb-0">
                        Email:
                        {{ getClientInvoiceDetail?.merchant_data?.mer_email }}
                      </p>
                      <p class="mb-0">
                        Address:
                        {{ getClientInvoiceDetail?.merchant_data?.mer_address }}
                      </p>
                    </div>
                    <div class="col-4"></div>
                    <div class="col-4">
                      <div class="float-end">
                        <h6 class="text-muted">INVOICE NUMBER</h6>
                        <h1 class="mb-0">
                          {{ getClientInvoiceDetail.number }}
                        </h1>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="my-3">
                <div class="col-12">
                  <div class="row">
                    <div class="col-4">
                      <h6 class="text-muted">SUPPLIER</h6>
                      <h5 class="fw-bold">
                        {{ getClientInvoiceDetail?.client_data?.client_name }}
                      </h5>
                      <p class="mb-0">
                        {{ getClientInvoiceDetail?.client_data?.client_add }}
                      </p>
                      <p class="mb-0">
                        {{ getClientInvoiceDetail?.client_data?.client_email }}
                      </p>
                    </div>
                    <div class="col-4"></div>
                    <div class="col-4 my-3">
                      <div class="float-end">
                        <h6 class="text-muted">SHIP To</h6>

                        <h5 class="fw-bold">
                          {{ getClientInvoiceDetail.site }}
                        </h5>

                        <p class="mb-0">
                          Mob No: {{ siteData?.contact_person_number }}
                        </p>
                        <p class="mb-0">
                          Email: {{ siteData?.contact_person_email }}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="mt-4">
                <div class="col-12">
                  <div class="row">
                    <div class="col-4">
                      <h5>
                        DATE:
                        {{ this.formatDate(getClientInvoiceDetail.start_date) }}
                      </h5>
                      <!-- <h5>DUE DATE: {{ getClientInvoiceDetail.due_date }}</h5> -->
                    </div>
                    <div class="col-4 text-center">
                      <p>{{ getClientInvoiceDetail.number }}</p>
                    </div>
                    <div class="col-4">
                      <div class="pe-3 float-end">
                        <!-- <p class="mb-0">
                          Date: {{ this.formatDate(getClientInvoiceDetail.start_date) }}
                        </p> -->
                        <!-- <p class="mb-0">Due Date:19-07-2023</p> -->
                        <p class="mb-0">
                          From:
                          {{
                            this.formatDate(getClientInvoiceDetail.start_date)
                          }}
                        </p>
                        <p class="mb-0">
                          To:
                          {{ this.formatDate(getClientInvoiceDetail.end_date) }}
                        </p>
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
                        <!-- <th scope="col" style="width: 13%">Staff Deduction</th> -->
                        <th scope="col">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="(
                          candidate, index
                        ) in getClientInvoiceDetail.candidate_data"
                        :key="index"
                      >
                        <td scope="col">
                          {{ formatDate(candidate.date) }}
                        </td>
                        <td scope="col">{{ candidate.start_time || "N/A" }}</td>
                        <td scope="col">{{ candidate.end_time || "N/A" }}</td>
                        <td scope="col">{{ candidate.can_name || "N/A" }}</td>
                        <td scope="col">{{ candidate.job || "N/A" }}</td>
                        <td scope="col">
                          {{ getClientInvoiceDetail.unit || "N/A" }}
                        </td>
                        <td scope="col">
                          {{ candidate.rate ? "£" + candidate.rate : "N/A" }}
                        </td>
                        <td scope="col">
                          {{
                            candidate.total_cost
                              ? "£" + candidate.total_cost
                              : "N/A"
                          }}
                        </td>
                      </tr>

                      <tr>
                        <td colspan="7" class="text-start fw-bold">
                          Total Cost
                        </td>
                        <td colspan="2" class="font-weight-bold">
                          {{
                            getClientInvoiceDetail?.total_amount !== undefined
                              ? "£" + getClientInvoiceDetail.total_amount
                              : ""
                          }}
                        </td>
                      </tr>
                      <tr>
                        <td colspan="7" class="text-start fw-bold">
                          Rate Per Mile
                        </td>
                        <td colspan="2" class="font-weight-bold">
                          {{
                            getClientInvoiceDetail?.rate_per_mile !== undefined
                              ? "£" + getClientInvoiceDetail?.rate_per_mile
                              : ""
                          }}
                        </td>
                      </tr>
                      <tr>
                        <td colspan="7" class="text-start fw-bold">
                          Grand Total
                        </td>
                        <td colspan="2" class="font-weight-bold">
                          {{
                            getClientInvoiceDetail?.grand_total !== undefined
                              ? "£" + getClientInvoiceDetail?.grand_total
                              : ""
                          }}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <!-- <div class="mt-3">
                  <div class="col-12">
                    <div class="row mt-5">
                      <div class="col-12">
                        <h6>
                          Addition Rate Per Mile
                          {{ "£" + getClientInvoiceDetail.rate_per_mile }} and Total Cost
                          to be paid {{ "£" + getClientInvoiceDetail.grand_total }}
                        </h6>
                      </div>
                    </div>
                  </div>
                </div> -->
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
              style="
                border: 1px solid #f8f8f8;
                box-shadow: 2px 2px 7px 2px #e7d7d7;
              "
            >
              <div class="row">
                <div class="d-flex">
                  <label class="col-2 form-label">Rate Per Mile</label>
                  <div class="col-10">
                    <div class="input-group">
                      <span class="input-group-text">£</span>
                      <input
                        type="text"
                        class="form-control"
                        v-model="fetchCustomSheetData.rate_per_mile"
                        placeholder="Enter rate per mile"
                        @input="validateInput"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div class="row mt-5">
                <div class="d-flex gap-2">
                  <button
                    type="button"
                    class="btn btn-success text-nowrap text-nowrap"
                    v-on:click="updateCustomTimeSheetMethod()"
                    :disabled="!isSaveEnabled"
                  >
                    Save
                  </button>
                  &nbsp;
                  <button
                    type="button"
                    class="btn btn-danger text-nowrap text-nowrap"
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
        rate_per_mile: "",
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
        grand_total: "",
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
  computed: {
    isSaveEnabled() {
      const value = this.fetchCustomSheetData.rate_per_mile;
      return value && value.length >= 0;
    },
  },
  methods: {
    toggleActionMenu(index) {
      this.selectedRow = this.selectedRow === index ? null : index;
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
    validateInput() {
      this.fetchCustomSheetData.rate_per_mile =
        this.fetchCustomSheetData.rate_per_mile.replace(/[^0-9.]/g, "");

      const decimalCount = (
        this.fetchCustomSheetData.rate_per_mile.match(/\./g) || []
      ).length;
      if (decimalCount > 1) {
        this.fetchCustomSheetData.rate_per_mile =
          this.fetchCustomSheetData.rate_per_mile.slice(0, -1);
      }
    },
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
    // async generatePDF() {
    //   if (!this.$route.params.id) {
    //     return;
    //   }
    //   try {
    //     const response = await axios.get(
    //       `${VITE_API_URL}/generate_pdf/${this.$route.params.id}`,
    //       {
    //         responseType: "blob",
    //       }
    //     );

    //     const url = window.URL.createObjectURL(new Blob([response.data]));
    //     const link = document.createElement("a");
    //     link.href = url;
    //     link.setAttribute("download", `invoice_${this.id}.pdf`);
    //     document.body.appendChild(link);
    //     link.click();
    //   } catch (error) {
    //     // console.error("Error generating PDF:", error);
    //   }
    // },

    validatePayload(payload) {
      let isValid = true;

      // Example validation rules
      if (!payload.shift_date) {
        // console.error("Validation Error: shift_date is required");
        isValid = false;
      }

      if (!payload.name) {
        // console.error("Validation Error: name is required");
        isValid = false;
      }
      // Add more validation rules as per your API requirements

      return isValid;
    },
    async createClientInvoice() {
      const token = localStorage.getItem("token");
      const id = this.$route.params.id;
      if (!id) {
        return;
      }
      try {
        const response = await axios.get(
          `${VITE_API_URL}/client_invoices/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
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
          rate_per_mile: clientInvoice.rate_per_mile,
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

      // if (!this.validatePayload(payload)) {
      //   // console.error("Payload validation failed");
      //   return;
      // }

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

        this.$store.commit("updateCandidate", {
          id: this.fetchCustomSheetData.id,
          newData: response.data.client_invoice,
        });
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
.content-area {
  margin-left: 250px;
  transition: margin-left 0.3s ease;
}
@media (max-width: 1120px) {
  .content-area {
    margin-left: 0;
  }
}
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
