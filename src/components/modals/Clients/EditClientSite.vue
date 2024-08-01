<template>
  <div>
    <!-- Modal -->
    <div
      class="modal fade"
      id="editClientSite"
      aria-labelledby="editClientSite"
      tabindex="-1"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="editClientSite">Edit Client Site</h5>
          </div>
          <div class="modal-body mx-3">
            <div class="row g-3 align-items-center">
              <form>
                <div class="mb-3 d-flex justify-content-between">
                  <div class="col-2">
                    <label class="form-label" for="selectJobTitle">Address</label>
                  </div>
                  <div class="col-10">
                    <input
                      type="text"
                      class="form-control"
                      v-model="fetchSite.address"
                      style="padding-right: 1px"
                    />
                    <!-- <span v-if="!validationSelectedOptionText" class="text-danger"
                            >Position Required</span
                          > -->
                  </div>
                </div>

                <div class="mb-3 d-flex justify-content-between">
                  <div class="col-2">
                    <label class="form-label">email</label>
                  </div>
                  <div class="col-10">
                    <input
                      type="email"
                      class="form-control"
                      v-model="fetchSite.email"
                      @input="validateEmailFormat"
                      @change="detectAutofill"
                      ref="email"
                      autocomplete="new-email"
                    />

                    <span v-if="fetchSite.email && !isEmailValid" class="text-danger">
                      Please enter a valid email address.
                    </span>
                    <!-- <span
                              v-if="email && !validateEmailFormat(email)"
                              class="text-danger"
                              >Invalid Email format</span
                            > -->
                  </div>
                </div>
                <div class="mb-3 d-flex justify-content-between">
                  <div class="col-2">
                    <label class="form-label">phone number</label>
                  </div>
                  <div class="col-10">
                    <input
                      type="text"
                      class="form-control"
                      v-model="fetchSite.phone_number"
                      @input="cleanPhoneNumber"
                      @change="detectAutofill"
                      inputmode="numeric"
                      pattern="[0-9]*"
                    />
                    <!-- <span v-if="!validatePhoneNumber" class="text-danger"
                            >Invalid Phone Number</span
                          > -->
                    <!-- <span
                            v-if="phone_number && !validatePhoneNumberFormat(phone_number)"
                            class="text-danger"
                            >Invalid Phone Number</span
                          > -->
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div class="modal-footer">
            <button
              class="btn btn-secondary rounded-1"
              data-bs-target="#editClientSite"
              @click="resetChanges"
              data-bs-dismiss="modal"
            >
              Cancel
            </button>
            <button
              class="btn btn-primary rounded-1 text-capitalize fw-medium"
              data-bs-dismiss="modal"
              @click.prevent="updateVacancyMethod()"
              :disabled="isSaveDisabled"
            >
              Save
            </button>
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

import store from "@/store";
export default {
  name: "VacancyEdit",
  data() {
    return {
      fetchSite: {
        id: "",

        client_id: "",

        address: "",

        phone_number: "",
        email: "",
      },

      clientData: [],
      emailValid: true,
      originalData: null,
    };
  },
  props: {
    siteId: {
      type: Number,
      required: true,
    },
  },
  components: { SuccessAlert },
  computed: {
    selectedSplitRate: {
      get() {
        return this.fetchSite.split_rate ? "true" : "false";
      },
      set(value) {
        this.fetchSite.split_rate = value === "true";
      },
    },
    selectClients() {
      const client = this.clientData.find(
        (option) => option.id === this.fetchSite.client_id
      );
      return client ? client.first_name : "";
    },

    getVacancyDetail() {
      return this.$store.state.vacancies;
    },
    isPhoneNumberValid() {
      // return /^[0-9]{10}$/.test(this.fetchSite.phone_number);
      return /^[789]\d{9}$/.test(this.fetchSite.phone_number);
    },
    isEmailValid() {
      return this.emailValid;
    },
    isSaveDisabled() {
      return !this.isPhoneNumberValid && !this.emailValid;
    },
  },
  methods: {
    resetChanges() {
      this.fetchSite = { ...this.originalData };
    },
    validateEmailFormat() {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      this.emailValid = emailRegex.test(this.fetchSite.email);
    },
    removeDate(index) {
      this.fetchSite.dates.splice(index, 1);
    },
    cleanPhoneNumber() {
      this.fetchSite.phone_number = this.fetchSite.phone_number.replace(/\D/g, "");
    },
    formatDate(date) {
      const [day, month, year] = date.split("-");
      return `${year}-${month}-${day}`;
    },

    async fetchSiteMethod(id) {
      try {
        const response = await axios.get(`${VITE_API_URL}/sites/${id}`, {
          headers: {
            "content-type": "application/json",
          },
        });

        if (response.data.id !== undefined) {
          this.fetchSite.id = response.data.id;
        }

        this.fetchSite.address = response.data.data.address;
        this.fetchSite.phone_number = response.data.data.phone_number;
        this.fetchSite.email = response.data.data.email;
        this.originalData = { ...this.fetchSite };
      } catch (error) {}
    },

    async updateVacancyMethod() {
      try {
        const response = await axios.put(
          `${VITE_API_URL}/sites/${this.siteId}`,
          {
            address: this.fetchSite.address,

            phone_number: this.fetchSite.phone_number,
            email: this.fetchSite.email,
          },
          {
            headers: {
              "content-type": "application/json",
            },
          }
        );

        store.commit("updateVacancy", {
          id: this.fetchSite.id,
          newData: response.data,
        });
        this.$emit("UpdateSite");
        // this.$emit("updateVacancyInactive");
        // alert("Vacancy updated successfully");
        const message = "Site Updated successfully";
        this.$refs.successAlert.showSuccess(message);
      } catch (error) {
        // console.error("Error updating vacancy:", error);
      }
    },

    async getClientMethod() {
      try {
        const response = await axios.get(`${VITE_API_URL}/clients`);
        this.clientData = response.data.data;
      } catch (error) {
        if (error.response) {
          if (error.response.status == 404) {
            // alert(error.response.data.message);
          }
        }
      }
    },
  },

  async mounted() {
    // await this.getClientMethod();
  },
  watch: {
    siteId: {
      immediate: true,
      handler(newsiteId) {
        if (newsiteId !== 0) {
          this.fetchSiteMethod(newsiteId);
        } else {
        }
      },
    },
  },
};
</script>

<style scoped>
select {
  width: 100%;
  padding: 9px;

  border-radius: 4px;
  border: 1px solid #80808059;
}
.modal {
  --bs-modal-width: 841px;
}
.modal-body {
  border-radius: 5px;
  background: #dbdbdb;
}
</style>
