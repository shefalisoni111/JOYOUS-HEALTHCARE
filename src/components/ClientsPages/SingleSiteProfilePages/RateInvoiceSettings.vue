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
                  v-model="split_rate"
                  @change="updateSplitRate"
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
                  v-model="holiday_split_rate"
                  @change="updateSplitRateHoliday"
                />
                <div class="slider round"></div>
              </label>
            </div>
          </div>
        </div>
        <div class="d-flex justify-content-between align-content-center my-3">
          <h6 class="fw-bold d-flex align-content-center">Invoice settings</h6>
          <button class="btn btn-primary"><i class="bi bi-save2-fill"></i> Save</button>
        </div>
        <div class="col-4">
          <div class="d-flex justify-content-between my-3">
            <div>Rate per mile in client invoice:</div>
            <div>
              <label class="switch">
                <input type="checkbox" id="togBtn" checked />
                <div class="slider round"></div>
              </label>
            </div>
          </div>
          <div class="d-flex justify-content-between my-3">
            <div>Rate per mile in candidate invoice:</div>
            <div>
              <label class="switch">
                <input type="checkbox" id="togBtn" checked />
                <div class="slider round"></div>
              </label>
            </div>
          </div>
        </div>
        <div class="col-11">
          <div class="d-flex my-3" style="gap: 20%">
            <div>Invoice creation period:</div>
            <div style="width: 50%">
              <select class="form-control" v-model="selectedDay">
                <option v-for="day in weekDays" :key="day" :value="day">
                  {{ day }}
                </option>
              </select>
            </div>
          </div>
          <div class="d-flex my-3" style="gap: 22%">
            <div>Invoice Due Period:</div>
            <div style="width: 50%">
              <input class="form-control" type="text" />
            </div>
          </div>
          <div class="d-flex my-3" style="gap: 20%">
            <div>Invoice Number format:</div>
            <div class="input-group mb-3" style="width: 50%">
              <input
                type="text"
                class="form-control"
                placeholder="Specify invoice number formal"
                aria-label="Specify invoice number formal"
                aria-describedby="basic-addon2"
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
                placeholder="Specily Invoice Start numbel"
              />
            </div>
          </div>
          <div class="d-flex my-3" style="gap: 28%">
            <div>VAT (%):</div>
            <div style="width: 50%">
              <input class="form-control" />
            </div>
          </div>
          <div class="d-flex my-3" style="gap: 21.6%">
            <div>Invoice PO Number:</div>
            <div style="width: 50%">
              <input class="form-control" />
            </div>
          </div>
          <div class="d-flex my-3" style="gap: 25%">
            <div>Invoice Email:</div>
            <div style="width: 50%">
              <input class="form-control" />
            </div>
          </div>
        </div>
        <div class="col-4">
          <div class="d-flex my-3 justify-content-between">
            <div>Hide email in invoice:</div>
            <div>
              <label class="switch">
                <input type="checkbox" id="togBtn" checked />
                <div class="slider round"></div>
              </label>
            </div>
          </div>
          <div class="d-flex my-3 justify-content-between">
            <div>Hide mobile in invoice:</div>
            <div>
              <label class="switch">
                <input type="checkbox" id="togBtn" checked />
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
              <input class="form-control w-100" />
            </div>
          </div>
          <div class="d-flex my-3" style="gap: 24.6%">
            <div>Site Address Line 1:</div>
            <div style="width: 50%">
              <input class="form-control" />
            </div>
          </div>
          <div class="d-flex my-3" style="gap: 24.6%">
            <div>Site Address Line 2:</div>
            <div style="width: 50%">
              <input class="form-control" />
            </div>
          </div>
          <div class="d-flex my-3" style="gap: 27.3%">
            <div>Site Post Code:</div>
            <div style="width: 50%">
              <input class="form-control" />
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
            </div>
          </div>
          <div class="d-flex my-3" style="gap: 24.6%">
            <div>Enable Vat Number:</div>
            <div style="width: 50%">
              <input class="form-control w-100" />
            </div>
          </div>
          <div class="d-flex my-3" style="gap: 22%">
            <div>Disable footer in invoice:</div>
            <div style="width: 50%">
              <input class="form-control w-100" />
            </div>
          </div>
        </div>
        <div class="col-10">
          <div class="d-flex my-3" style="gap: 24.5%">
            <div>Invoice Footer Note:</div>
            <div style="width: 60%">
              <TextFormator />
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
      holiday_split_rate: false,
      split_rate: false,
      siteData: {},

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
    };
  },
  components: {
    TextFormator,
    SuccessAlert,
    InvoiceTemplate,
  },
  created() {
    this.loadInitialSplitRate();
  },
  methods: {
    async loadInitialSplitRate() {
      await this.getSiteAllDataMethod();
      const savedHolidaySplitRate = localStorage.getItem(
        `holiday_split_rate_${this.$route.params.id}`
      );
      const savedSplitRate = localStorage.getItem(`split_rate_${this.$route.params.id}`);

      if (savedHolidaySplitRate !== null) {
        this.holiday_split_rate = savedHolidaySplitRate === "true";
      } else {
        this.holiday_split_rate = this.siteData.holiday_split_rate;
      }

      if (savedSplitRate !== null) {
        this.split_rate = savedSplitRate === "true";
      } else {
        this.split_rate = this.siteData.split_rate;
      }

      this.showSplitRate = this.split_rate;
      this.showHolidaySplitRate = this.holiday_split_rate;
    },
    async updateRate(field) {
      try {
        const formData = new FormData();
        formData.append("site_id", this.$route.params.id);
        formData.append("field", field);
        // formData.append(field, this[field] ? "true" : "false");

        let apiUrl;
        if (field === "split_rate") {
          apiUrl = this[field]
            ? `${VITE_API_URL}/enable_splite_rate_and_holiday_splite_rate`
            : `${VITE_API_URL}/disable_splite_rate_and_holiday_splite_rate`;
        } else if (field === "holiday_split_rate") {
          apiUrl = this[field]
            ? `${VITE_API_URL}/enable_splite_rate_and_holiday_splite_rate`
            : `${VITE_API_URL}/disable_splite_rate_and_holiday_splite_rate`;
        }

        const response = await axios.put(apiUrl, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        localStorage.setItem(
          `${field}_${this.$route.params.id}`,
          this[field] ? "true" : "false"
        );

        if (field === "holiday_split_rate") {
          const message = this.holiday_split_rate
            ? "Site enabled   for holidays successfully!"
            : "Site disabled  for holidays successfully!";
          this.$refs.successAlert.showSuccess(message);
        } else if (field === "split_rate" && this.holiday_split_rate) {
          const message = "Site disabled successfully!";
          this.$refs.successAlert.showSuccess(message);
        } else {
          const message = "Site enabled successfully!";
          this.$refs.successAlert.showSuccess(message);
        }
      } catch (error) {
        // console.error("Error updating profile view:", error);
      }
    },
    async updateSplitRateHoliday() {
      await this.updateRate("holiday_split_rate");
    },
    async updateSplitRate() {
      await this.updateRate("split_rate");
    },
    async getSiteAllDataMethod() {
      try {
        const response = await axios.get(
          `${VITE_API_URL}/sites/${this.$route.params.id}`
        );
        const siteData = response.data.data;

        this.holiday_split_rate = siteData.holiday_split_rate;
        this.split_rate = siteData.split_rate;

        this.siteData = siteData;
      } catch (error) {
        // console.error("Error fetching site data:", error);
      }
    },
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
