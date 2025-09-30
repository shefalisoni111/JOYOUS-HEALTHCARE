<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="">
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
                      <h1 class="mb-0">{{ getClientInvoiceDetail.number }}</h1>
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

                      <h5 class="fw-bold">{{ getClientInvoiceDetail.site }}</h5>

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
                    <h5>DATE: {{ getClientInvoiceDetail.start_date }}</h5>
                    <!-- <h5>DUE DATE: {{ getClientInvoiceDetail.due_date }}</h5> -->
                  </div>
                  <div class="col-4 text-center">
                    <p>{{ getClientInvoiceDetail.number }}</p>
                  </div>
                  <div class="col-4">
                    <div class="pe-3 float-end">
                      <h5>FROM: {{ getClientInvoiceDetail.end_date }}</h5>
                      <h5>TO : {{ getClientInvoiceDetail.end_date }}</h5>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-12 mt-4">
              <div v-if="showEditComponent" class="table-wrapper">
                <First_TemplateEdit :invoice-id="getClientInvoiceDetail.id" />
              </div>
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
                      <td colspan="7" class="text-start fw-bold">Total Cost</td>
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
                        {{ "£" + getClientInvoiceDetail.rate_per_mile }} and Total Cost to
                        be paid {{ "£" + getClientInvoiceDetail.grand_total }}
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
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import First_TemplateEdit from "../../InvoicePages/TemplatesDesign/First_TemplateEdit.vue";

export default {
  name: "TemplateOne",
  data() {
    return {
      getClientInvoiceDetail: [],
      agencySetting: [],
      siteData: [],

      selectedDeduction: "",
      showEditComponent: false,
    };
  },

  components: {
    First_TemplateEdit,
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
    async createClientInvoice() {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get(
          `${VITE_API_URL}/client_invoices/${this.$route.params.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const clientInvoice = response.data.client_invoice;
        const invoiceNumber = clientInvoice.number;
        this.getClientInvoiceDetail = clientInvoice;

        this.agencySetting = clientInvoice.agency_setting;

        this.siteData = clientInvoice.site_data;
      } catch (error) {
        // console.error("Error fetching client invoice:", error);
      }
    },
  },
  created() {
    this.selectedTemplate = this.$store.state.selectedTemplate;
    this.createClientInvoice();
    // this.fetchDeductions();
  },
  mounted() {},
};
</script>
