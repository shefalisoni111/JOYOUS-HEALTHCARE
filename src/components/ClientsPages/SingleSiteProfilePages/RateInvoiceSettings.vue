<template>
  <div>
    <div class="row">
      <div class="col-12">
        <h6 class="fw-bold">Rate settings</h6>
        <div class="col-4">
          <div class="d-flex justify-content-between my-3">
            <div>Split rate:</div>
            <div>
              <label class="switch">
                <input
                  type="checkbox"
                  id="togBtn"
                  v-model="fetchInvoiceSetting.split_rate"
                />
                <div class="slider round"></div>
              </label>
            </div>
          </div>
          <div class="d-flex justify-content-between my-3">
            <div>Enable split rate only for Holidays:</div>
            <div>
              <label class="switch">
                <input
                  type="checkbox"
                  id="togBtn"
                  v-model="fetchInvoiceSetting.holiday_split_rate"
                />
                <div class="slider round"></div>
              </label>
            </div>
          </div>
        </div>
        <div class="d-flex justify-content-between align-content-center my-3">
          <h6 class="fw-bold d-flex align-content-center">Invoice settings</h6>
          <button class="btn btn-primary" @click.prevent="updateInvoiceMethod()">
            <i class="bi bi-save2-fill"></i> Save
          </button>
        </div>
        <div class="col-4">
          <div class="d-flex justify-content-between my-3">
            <div>Rate per mile in client invoice:</div>
            <div>
              <label class="switch">
                <input
                  type="checkbox"
                  id="togBtn"
                  v-model="fetchInvoiceSetting.rate_per_mile_client_invoice"
                />
                <div class="slider round"></div>
              </label>
            </div>
          </div>
          <div class="d-flex justify-content-between my-3">
            <div>Rate per mile in staff invoice:</div>
            <div>
              <label class="switch">
                <input
                  type="checkbox"
                  id="togBtn"
                  v-model="fetchInvoiceSetting.rate_per_mile_staff_invoice"
                />
                <div class="slider round"></div>
              </label>
            </div>
          </div>
        </div>
        <div class="col-11">
          <div class="d-flex my-3" style="gap: 20%">
            <div>Invoice creation period:</div>
            <div style="width: 50%">
              <select
                class="form-control"
                v-model="fetchInvoiceSetting.invoice_creation_period"
              >
                <option v-for="day in creation" :key="day" :value="day">
                  {{ day }}
                </option>
              </select>
            </div>
          </div>
          <!-- <div class="d-flex my-3" style="gap: 22%">
            <div>Invoice Due Period:</div>
            <div style="width: 50%">
              <select
                class="form-control"
                id="invoiceDuePeriod"
                v-model="duePeriod"
                @change="updateDuePeriod"
              ></select>
            </div>
          </div> -->
          <div class="d-flex my-3" style="gap: 20%">
            <div>Invoice Number format:</div>
            <div class="input-group mb-3" style="width: 50%">
              <input
                type="text"
                class="form-control"
                placeholder="Specify invoice number format"
                aria-label="Specify invoice number format"
                aria-describedby="basic-addon2"
                v-model="fetchInvoiceSetting.invoice_number_format"
                @input="validateInvoiceNumberTypes(invoice_number_format, 10)"
              />

              <span class="input-group-text" id="basic-addon2">1234</span>
            </div>
          </div>
          <div class="d-flex my-3" style="gap: 21%">
            <div>Invoice Start number:</div>
            <div style="width: 50%">
              <input
                class="form-control"
                type="text"
                placeholder="Specily Invoice Start number"
                v-model="fetchInvoiceSetting.invoice_start_number"
                @input="validateInvoiceNumberTypes(invoice_start_number, 4)"
              />
              <div v-if="errorInvoiceStartNumber" class="text-danger">
                {{ errorInvoiceStartNumber }}
              </div>
            </div>
          </div>
          <div class="d-flex my-3" style="gap: 28%">
            <div>VAT (%):</div>
            <div style="width: 50%">
              <input
                class="form-control"
                v-model="fetchInvoiceSetting.vat"
                @input="validateInvoiceNumberTypes(vat, 4)"
              />
              <div v-if="errorVAT" class="text-danger">
                {{ errorVAT }}
              </div>
            </div>
          </div>
          <div class="d-flex my-3" style="gap: 21.6%">
            <div>Invoice PO Number:</div>
            <div style="width: 50%">
              <input
                class="form-control"
                v-model="fetchInvoiceSetting.invoice_po_number"
                @input="validateInvoiceNumberTypes(invoice_po_number, 5)"
              />
              <div v-if="errorInvoicePotNumber" class="text-danger">
                {{ errorInvoicePotNumber }}
              </div>
            </div>
          </div>
          <div class="d-flex my-3" style="gap: 25%">
            <div>Invoice Email:</div>
            <div style="width: 50%">
              <input class="form-control" v-model="fetchInvoiceSetting.invoice_email" />
            </div>
          </div>
        </div>
        <div class="col-4">
          <div class="d-flex my-3 justify-content-between">
            <div>Hide email in invoice:</div>
            <div>
              <label class="switch">
                <input
                  type="checkbox"
                  id="togBtn"
                  v-model="fetchInvoiceSetting.hide_email"
                />
                <div class="slider round"></div>
              </label>
            </div>
          </div>
          <div class="d-flex my-3 justify-content-between">
            <div>Hide mobile in invoice:</div>
            <div>
              <label class="switch">
                <input
                  type="checkbox"
                  id="togBtn"
                  v-model="fetchInvoiceSetting.hide_mobile"
                />
                <div class="slider round"></div>
              </label>
            </div>
          </div>
        </div>
        <div class="col-4">
          <div class="d-flex my-3">
            <div class="card p-2">
              You can manage the client invoice's site details here.
            </div>
          </div>
        </div>
        <div class="col-10">
          <div class="d-flex my-3" style="gap: 27.3%">
            <div>Site unit Name:</div>
            <div style="width: 50%">
              <input
                class="form-control w-100"
                v-model="fetchInvoiceSetting.site_name"
                @input="validateInvoiceTableHead"
              />
              <div v-if="errorSiteUnitName" class="text-danger">
                {{ errorSiteUnitName }}
              </div>
            </div>
          </div>
          <div class="d-flex my-3" style="gap: 24.6%">
            <div>Site Address Line 1:</div>
            <div style="width: 50%">
              <input
                class="form-control"
                v-model="fetchInvoiceSetting.site_address_line_one"
              />
            </div>
          </div>
          <div class="d-flex my-3" style="gap: 24.6%">
            <div>Site Address Line 2:</div>
            <div style="width: 50%">
              <input
                class="form-control"
                v-model="fetchInvoiceSetting.site_address_line_two"
              />
            </div>
          </div>
          <div class="d-flex my-3" style="gap: 27.3%">
            <div>Site Post Code:</div>
            <div style="width: 50%">
              <input
                class="form-control"
                v-model="fetchInvoiceSetting.site_post_code"
                @input="validateInvoiceNumberTypes(site_post_code, 5)"
              />
              <div v-if="errorSitePostCodeNumber" class="text-danger">
                {{ errorSitePostCodeNumber }}
              </div>
            </div>
          </div>
          <div class="d-flex my-3" style="gap: 26.2%">
            <div>Invoice Template:</div>
            <div style="width: 50%">
              <button
                type="button"
                class="btn btn-light"
                data-bs-toggle="modal"
                data-bs-target="#SiteInvoiceTemplate"
                data-bs-whatever="@mdo"
              >
                Select Invoice Template
              </button>
              <!-- <p v-if="fetchInvoiceSetting.invoice_template">
                Selected Template: {{ selectedTemplate.name }}
              </p> -->
            </div>
          </div>
          <div class="d-flex my-3" style="gap: 24.6%">
            <div>Enable Vat Number:</div>
            <div style="width: 50%">
              <label class="switch">
                <input
                  type="checkbox"
                  id="togBtn"
                  v-model="fetchInvoiceSetting.vat_number"
                />
                <div class="slider round"></div>
              </label>
            </div>
          </div>
          <div class="d-flex my-3" style="gap: 22%">
            <div>Disable footer in invoice:</div>
            <div style="width: 50%">
              <label class="switch">
                <input
                  type="checkbox"
                  id="togBtn"
                  v-model="fetchInvoiceSetting.enable_invoice_footer_note"
                />
                <div class="slider round"></div>
              </label>
            </div>
          </div>
        </div>
        <div class="col-10">
          <div class="d-flex my-3" style="gap: 24.5%">
            <div>Invoice Footer Note:</div>
            <div style="width: 60%">
              <TextFormator v-model="fetchInvoiceSetting.invoice_footer_note" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <SuccessAlert ref="successAlert" />
    <InvoiceTemplate />
  </div>
</template>
<script>
import axios from "axios";
import TextFormator from "../../textformator/TextFormator.vue";
import SuccessAlert from "../../Alerts/SuccessAlert.vue";
import InvoiceTemplate from "../../modals/Site/InvoiceTemplate.vue";

export default {
  name: "RateInvoiceSettings",
  data() {
    return {
      fetchInvoiceSetting: {
        invoice_creation_period: null,
        invoice_number_format: null,
        invoice_start_number: null,
        invoice_po_number: null,
        invoice_email: "",
        site_name: "",
        site_address_line_one: null,
        site_address_line_two: null,
        invoice_template: "",
        invoice_footer_note: null,
        site_post_code: null,
        vat: null,
        hide_email: "",
        hide_mobile: null,
        vat_number: null,
        enable_invoice_footer_note: null,
        split_rate: true,
        holiday_split_rate: true,
        rate_per_mile_client_invoice: null,
        rate_per_mile_staff_invoice: null,
      },
      errorSiteUnitName: "",
      errorInvoiceNumberFormat: "",
      errorInvoiceStartNumber: "",
      errorInvoicePotNumber: "",
      errorSitePostCodeNumber: "",
      errorVAT: "",
      weekDays: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      selectedDay: "Monday",
      creation: ["Weekly", "Monthly"],
      duePeriod: Number(localStorage.getItem("duePeriod")) || 0,
      duePeriodDays: Array.from({ length: 30 }, (_, i) => i + 1),
    };
  },
  components: {
    TextFormator,
    SuccessAlert,
    InvoiceTemplate,
  },

  methods: {
    validateNumberInput(field, maxLength) {
      const regex = /^\d*$/;
      this[`error${field}`] = "";

      if (this.fetchInvoiceSetting[field].length > maxLength) {
        this[`error${field}`] = `${field.replace(
          /_/g,
          " "
        )} must not exceed ${maxLength} characters.`;
        this.fetchInvoiceSetting[field] = this.fetchInvoiceSetting[field].slice(
          0,
          maxLength
        );
      } else if (!regex.test(this.fetchInvoiceSetting[field])) {
        this[`error${field}`] = `${field.replace(/_/g, " ")} can only contain numbers.`;
        this.fetchInvoiceSetting[field] = this.fetchInvoiceSetting[field].replace(
          /[^0-9]/g,
          ""
        );
      }
    },

    validateInvoiceNumberTypes() {
      this.validateNumberInput("invoice_number_format", 10);
      this.validateNumberInput("invoice_start_number", 10);
      this.validateNumberInput("invoice_po_number", 5);
      this.validateNumberInput("vat", 3);
      this.validateNumberInput("site_post_code", 5);
    },
    validateInvoiceTableHead() {
      this.errorSiteUnitName = "";

      const regex = /^[A-Za-z\s]*$/;

      if (this.fetchInvoiceSetting.site_name.length > 10) {
        this.errorSiteUnitName = "Invoice site name must not exceed 10 characters.";
        this.fetchInvoiceSetting.site_name = this.fetchInvoiceSetting.site_name.slice(
          0,
          10
        );
      } else if (!regex.test(this.fetchInvoiceSetting.site_name)) {
        this.errorSiteUnitName = "Invoice site name can only contain letters.";
        this.fetchInvoiceSetting.site_name = this.fetchInvoiceSetting.site_name.replace(
          /[^A-Za-z\s]/g,
          ""
        );
      }
    },
    async fetchInvoiceSettingMethod() {
      try {
        const response = await axios.get(
          `${VITE_API_URL}/site_invoice_setting/${this.$route.params.id}`
        );

        this.fetchInvoiceSetting = {
          ...this.fetchInvoiceSetting,
          ...response.data.invoice_setting,
        };
      } catch (error) {}
    },
    async updateInvoiceMethod() {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.put(
          `${VITE_API_URL}set_site_invoice_setting`,
          this.fetchInvoiceSetting,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const message = "Invoice updated successfully";
        this.$refs.successAlert.showSuccess(message);

        this.fetchInvoiceSettingMethod();
      } catch (error) {
        // console.error("Error updating candidate:", error);
      }
    },
  },
  mounted() {
    this.fetchInvoiceSettingMethod();
  },
};
</script>

<style scoped>
.switch {
  width: 50px;
  height: 17px;
  position: relative;
  display: inline-block;
}

.switch input {
  display: none;
}

.switch .slider {
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  cursor: pointer;
  background-color: #e7ecf1;
  border-radius: 30px !important;
  border: 0;
  padding: 0;
  display: block;
  margin: 7px 10px;
  min-height: 11px;
}

.switch .slider:before {
  position: absolute;
  background-color: #aaa;
  height: 15px;
  width: 15px;
  content: "";
  left: 0px;
  bottom: -2px;
  border-radius: 50%;
  transition: ease-in-out 0.5s;
}

.switch .slider:after {
  content: "";
  color: rgb(189, 84, 15);
  display: block;
  position: absolute;
  transform: translate(-50%, -50%);
  top: 50%;
  left: 70%;
  transition: all 0.5s;
  font-size: 10px;
  font-family: Verdana, sans-serif;
}

.switch input:checked + .slider:after {
  transition: all 0.5s;
  left: 30%;
  content: "";
}

.switch input:checked + .slider {
  background-color: #d3d6d9;
}

.switch input:checked + .slider:before {
  transform: translateX(15px);
  background-color: #ff9800;
}
</style>
