<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="">
          <div
            class="text-muted bg-white p-3"
            style="border: 1px solid #f8f8f8; box-shadow: 2px 2px 7px 2px #e7d7d7"
          >
            <div class="row">
              <div class="col-12">
                <div class="row">
                  <div class="col-4">
                    <h6 class="text-muted">BILLED FROM</h6>
                    <h5 class="fw-bold">Thema Healthcare</h5>
                    <p class="mb-0">Mob No: {{ agencySetting.contact }}</p>
                    <p class="mb-0">Email: {{ agencySetting.email }}</p>
                    <p class="mb-0">Address: {{ agencySetting.address }}</p>
                  </div>
                  <div class="col-4">
                    <div class="m-auto text-center mt-3">
                      <img src="../recpal_favicon.png" class="img-fluid" width="20%" />
                    </div>
                  </div>
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
                    <h6 class="text-muted">BILLED TO</h6>
                    <h5 class="fw-bold">Recpal Demo2</h5>
                    <p class="mb-0">{{ siteData.address }}</p>
                  </div>
                  <div class="col-4"></div>
                  <div class="col-4 my-3">
                    <div class="float-end">
                      <h5 class="fw-bold">Demo</h5>
                      <p class="mb-0">London, UK</p>
                      <p class="mb-0">Mob No: {{ siteData.contact_person_number }}</p>
                      <p class="mb-0">Email: {{ siteData.contact_person_email }}</p>
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
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Second_Template",
  data() {
    return {
      getClientInvoiceDetail: [],
      agencySetting: [],
      siteData: [],
    };
  },
  methods: {
    async createClientInvoice() {
      try {
        const response = await axios.get(
          `${VITE_API_URL}/client_invoices/${this.$route.params.id}`
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
  },
};
</script>
