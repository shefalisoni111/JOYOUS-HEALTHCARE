<template>
  <div>
    <!-- Modal -->
    <div class="modal fade" id="editSite" aria-labelledby="editSite">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="editSite">Edit Site</h5>
            <button
              type="button"
              class="custom-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body mx-3">
            <div class="row g-3 align-items-center">
              <form>
                <div class="row">
                  <div class="col-6">
                    <div class="mb-3">
                      <div class="col-12">
                        <label for="selectClients" class="form-label"
                          >Client Name</label
                        >
                      </div>
                      <div class="col-12">
                        <select
                          v-model="fetchSite.client_id"
                          id="selectClients"
                          @change="onClientSelect"
                        >
                          <option
                            v-for="option in clientData"
                            :key="option.id"
                            :value="option.id"
                            aria-placeholder="Select Job"
                          >
                            {{ option.client_name }}
                          </option>
                        </select>
                        <!-- <span v-if="!validationSelectedClient" class="text-danger"
                              >Client Required</span
                            > -->
                      </div>
                    </div>
                  </div>
                  <div class="col-6">
                    <div class="mb-3">
                      <div class="col-12">
                        <label class="form-label" for="selectJobTitle"
                          >Contact Person Name</label
                        >
                      </div>
                      <div class="col-12">
                        <input
                          type="text"
                          class="form-control"
                          v-model="fetchSite.contact_person_name"
                          @input="clearError"
                          @change="detectAutofill"
                          style="padding-right: 1px"
                        />
                        <!-- <span v-if="!validateSiteNameFormate" class="text-danger"
                          >Contact Person Name Required</span
                        > -->
                      </div>
                    </div>
                  </div>
                </div>

                <div class="row">
                  <div class="col-6">
                    <div class="mb-3">
                      <div class="col-12">
                        <label class="form-label">Contact Person Email</label>
                      </div>
                      <div class="col-12">
                        <input
                          type="email"
                          class="form-control"
                          v-model="fetchSite.contact_person_email"
                          @input="validateEmailFormat"
                          @change="detectAutofill"
                          ref="email"
                          autocomplete="new-email"
                        />
                        <span
                          v-if="
                            fetchSite.contact_person_email &&
                            !isEmailContactValid
                          "
                          class="text-danger"
                        >
                          Invalid Email format
                        </span>
                      </div>
                    </div>
                  </div>
                  <div class="col-6">
                    <div class="mb-3">
                      <div class="col-12">
                        <label class="form-label">Contact Person phone</label>
                      </div>
                      <div class="col-12">
                        <input
                          type="text"
                          class="form-control"
                          v-model="fetchSite.contact_person_number"
                          @input="cleanPhoneNumber"
                          inputmode="numeric"
                          pattern="[0-9]*"
                        />
                        <span
                          v-if="!contactPhoneNumberValid"
                          class="text-danger"
                        >
                          Invalid Phone Number
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="row">
                  <div class="col-6">
                    <div class="mb-3">
                      <div class="col-12">
                        <label class="form-label" for="selectBusinessUnit"
                          >Site Name</label
                        >
                      </div>

                      <div class="col-12">
                        <input
                          type="text"
                          class="form-control"
                          v-model="fetchSite.site_name"
                          style="padding-right: 1px"
                        />
                        <!-- <span v-if="!validationSelectedBusinessUnit" class="text-danger"
                              >Site Required</span
                            > -->
                      </div>
                    </div>
                  </div>
                  <div class="col-6">
                    <div class="mb-3">
                      <div class="col-12">
                        <label class="form-label" for="selectJobTitle"
                          >Address</label
                        >
                      </div>
                      <div class="col-12">
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
                  </div>
                </div>

                <div class="row">
                  <div class="col-6">
                    <div class="mb-3">
                      <div class="col-12">
                        <label class="form-label">email</label>
                      </div>
                      <div class="col-12">
                        <input
                          type="email"
                          class="form-control"
                          v-model="fetchSite.email"
                          @input="validateEmailFormat"
                          ref="email"
                          autocomplete="new-email"
                        />
                        <span v-if="!emailValid" class="text-danger">
                          Invalid Email format
                        </span>
                        <!-- <span
                                v-if="email && !validateEmailFormat(email)"
                                class="text-danger"
                                >Invalid Email format</span
                              > -->
                      </div>
                    </div>
                  </div>
                  <div class="col-6">
                    <div class="mb-3">
                      <div class="col-12">
                        <label class="form-label">phone number</label>
                      </div>
                      <div class="col-12">
                        <input
                          type="text"
                          class="form-control"
                          v-model="fetchSite.phone_number"
                          @input="cleanPhoneNumber"
                          inputmode="numeric"
                          pattern="[0-9]*"
                        />
                        <span v-if="!phoneNumberValid" class="text-danger">
                          Invalid Phone Number
                        </span>
                        <!-- <span
                              v-if="phone_number && !validatePhoneNumberFormat(phone_number)"
                              class="text-danger"
                              >Invalid Phone Number</span
                            >-->
                      </div>
                    </div>
                  </div>
                </div>

                <div class="row">
                  <div class="col-6">
                    <div class="mb-3">
                      <div class="col-12">
                        <label class="form-label">Split Rate</label>
                      </div>
                      <div class="col-12">
                        <select id="selectOption" v-model="selectedSplitRate">
                          <option value="true">True</option>
                          <option value="false">False</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div class="col-6">
                    <div class="mb-3">
                      <div class="col-12">
                        <label class="form-label">Status</label>
                      </div>
                      <div class="col-12">
                        <select id="selectOption" v-model="fetchSite.status">
                          <option value="true">Active</option>
                          <option value="false">In-active</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="mb-3">
                  <div class="col-12">
                    <label class="form-label">Portal Access</label>
                  </div>
                  <div class="col-12">
                    <select id="selectOption" v-model="fetchSite.portal_access">
                      <option value="true">True</option>
                      <option value="false">False</option>
                    </select>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div class="modal-footer">
            <button
              class="btn btn-dark btn-cancel"
              data-bs-target="#editSite"
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
    <!-- <AddClients @client-updated="createdClient" /> -->
  </div>
</template>

<script>
import axios from "axios";
import SuccessAlert from "../../Alerts/SuccessAlert.vue";
// import AddClients from "../Clients/AddClients.vue";

import store from "@/store";
export default {
  name: "EditSite",
  data() {
    return {
      fetchSite: {
        id: "",
        client_name: "",
        client_id: "",
        site_name: "",
        address: "",
        split_rate: "",
        status: "",
        phone_number: "",
        email: "",
        contact_person_name: "",
        contact_person_email: "",
        contact_person_number: "",
      },
      clientData: [],
      originalData: null,
      emailValid: true,
      emailContactValid: true,
      phoneNumberValid: true,
      contactPhoneNumberValid: true,
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
      return /^[0-9]{10}$/.test(this.fetchSite.phone_number);
    },

    isEmailValid() {
      return this.emailValid;
    },
    isEmailContactValid() {
      return this.emailContactValid;
    },
    isSaveDisabled() {
      return (
        !this.emailValid ||
        !this.emailContactValid ||
        !this.phoneNumberValid ||
        !this.contactPhoneNumberValid
      );
    },
  },
  methods: {
    validateEmailFormat() {
      const emailRegex =
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|in|co\.uk|org|edu|care|net|jp)$/;
      this.emailValid = emailRegex.test(this.fetchSite.email);
      this.emailContactValid = emailRegex.test(
        this.fetchSite.contact_person_email
      );
    },

    cleanPhoneNumber() {
      const phoneRegex = /^[0-9]{10}$/;
      const phoneRegexWithZero = /^0\d{10}$/;
      const phoneRegexWithCountryCode = /^91\d{10}$/;
      const numericRegex = /^[0-9]*$/;

      const isNumericPhoneNumber = numericRegex.test(
        this.fetchSite.phone_number
      );
      const isNumericContactPhoneNumber = numericRegex.test(
        this.fetchSite.contact_person_number
      );

      this.phoneNumberValid =
        isNumericPhoneNumber &&
        (phoneRegex.test(this.fetchSite.phone_number) ||
          phoneRegexWithZero.test(this.fetchSite.phone_number) ||
          phoneRegexWithCountryCode.test(this.fetchSite.phone_number));

      this.contactPhoneNumberValid =
        isNumericContactPhoneNumber &&
        (phoneRegex.test(this.fetchSite.contact_person_number) ||
          phoneRegexWithZero.test(this.fetchSite.contact_person_number) ||
          phoneRegexWithCountryCode.test(this.fetchSite.contact_person_number));
    },
    resetChanges() {
      this.fetchSite = { ...this.originalData };
      this.emailValid = true;
      this.emailContactValid = true;
      this.phoneNumberValid = true;
      this.contactPhoneNumberValid = true;
    },
    removeDate(index) {
      this.fetchSite.dates.splice(index, 1);
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

        this.fetchSite.site_name = response.data.data.site_name;
        this.fetchSite.client_id = response.data.data.client_id;
        this.fetchSite.address = response.data.data.address;
        this.fetchSite.phone_number = response.data.data.phone_number;
        this.fetchSite.email = response.data.data.email;
        this.fetchSite.split_rate = response.data.data.split_rate;
        this.fetchSite.status = response.data.data.status;
        this.fetchSite.portal_access = response.data.data.portal_access;
        this.fetchSite.contact_person_name =
          response.data.data.contact_person_name;
        this.fetchSite.contact_person_email =
          response.data.data.contact_person_email;
        this.fetchSite.contact_person_number =
          response.data.data.contact_person_number;

        this.originalData = { ...this.fetchSite };
      } catch (error) {}
    },

    async updateVacancyMethod() {
      try {
        const response = await axios.put(
          `${VITE_API_URL}/sites/${this.siteId}`,
          {
            site_name: this.fetchSite.site_name,
            client_id: this.fetchSite.client_id,
            address: this.fetchSite.address,
            status: this.fetchSite.status,
            phone_number: this.fetchSite.phone_number,
            email: this.fetchSite.email,
            split_rate: this.fetchSite.split_rate,
            portal_access: this.fetchSite.portal_access,
            contact_person_name: this.fetchSite.contact_person_name,
            contact_person_email: this.fetchSite.contact_person_email,
            contact_person_number: this.fetchSite.contact_person_number,
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
        this.$emit("editSite");
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
  async beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.getClientMethod();
    });
  },
  async beforeRouteUpdate(to, from, next) {
    this.getClientMethod();

    next();
  },
  mounted() {
    // this.getClientMethod();
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
}
</style>
