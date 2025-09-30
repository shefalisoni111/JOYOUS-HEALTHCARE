<template>
  <div>
    <!-- Modal -->
    <div
      class="modal fade"
      id="editSiteProfileDetails"
      aria-labelledby="editSiteProfileDetails"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="editSiteProfileDetails">
              Edit Site Profile
            </h5>
            <button
              type="button"
              class="custom-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              @click="blurActiveElement"
            ></button>
          </div>
          <div class="modal-body mx-3">
            <div class="row g-3 align-items-center">
              <form>
                <div class="mb-3 d-flex justify-content-between">
                  <div class="col-2">
                    <label class="form-label" for="selectJobTitle"
                      >Address</label
                    >
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
                      @input="validateEmailFormat(email)"
                      @change="detectAutofill"
                      ref="email"
                      autocomplete="new-email"
                    />
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
                <div class="mb-3 d-flex justify-content-between">
                  <div class="col-2">
                    <label class="form-label"> Contact person's name:</label>
                  </div>
                  <div class="col-10">
                    <input
                      type="text"
                      class="form-control"
                      v-model="fetchSite.contact_person_name"
                      @change="detectAutofill"
                      disabled
                    />
                  </div>
                </div>
                <div class="mb-3 d-flex justify-content-between">
                  <div class="col-2">
                    <label class="form-label"> Contact person's email:</label>
                  </div>
                  <div class="col-10">
                    <input
                      type="text"
                      class="form-control"
                      v-model="fetchSite.contact_person_email"
                      @input="cleanPhoneNumber"
                      @change="detectAutofill"
                      disabled
                    />
                  </div>
                </div>
                <div class="mb-3 d-flex justify-content-between">
                  <div class="col-2">
                    <label class="form-label"> Contact person's number:</label>
                  </div>
                  <div class="col-10">
                    <input
                      type="text"
                      class="form-control"
                      v-model="fetchSite.contact_person_number"
                      @input="cleanPhoneNumber"
                      @change="detectAutofill"
                      disabled
                    />
                  </div>
                </div>
                <div class="mb-3 d-flex justify-content-between">
                  <div class="col-2">
                    <label class="form-label"> Bookings email:</label>
                  </div>
                  <div class="col-10">
                    <input
                      type="text"
                      class="form-control"
                      v-model="fetchSite.booking_email"
                      @change="detectAutofill"
                      disabled
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div class="modal-footer">
            <button
              class="btn btn-dark btn-cancel"
              data-bs-target="#editSiteProfileDetails"
              data-bs-toggle="modal"
              data-bs-dismiss="modal"
            >
              Cancel
            </button>
            <button
              class="btn btn-primary rounded-4 text-capitalize fw-medium"
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
  name: "EditSiteProfileEmailContactNumberDetails",
  data() {
    return {
      fetchSite: {
        id: "",
        contact_person_name: "",
        contact_person_email: "",
        contact_person_number: "",
        booking_email: "",
        client_id: "",

        address: "",

        phone_number: "",
        email: "",
      },

      clientData: [],
    };
  },
  props: {
    siteID: {
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
      return /^[0-9]{11}$/.test(this.fetchSite.phone_number);
    },

    isEmailValid() {
      const emailRegex =
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|in|co\.uk|org|edu|care|net|jp)$/;
      return emailRegex.test(this.fetchSite.email);
    },

    isSaveDisabled() {
      return !this.isPhoneNumberValid || !this.isEmailValid;
    },
  },
  methods: {
    toggleActionMenu(index) {
      this.selectedRow = this.selectedRow === index ? null : index;
    },
    blurActiveElement() {
      if (document.activeElement) {
        document.activeElement.blur();
      }
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

        this.fetchSite.address = response.data.data.address;
        this.fetchSite.phone_number = response.data.data.phone_number;
        this.fetchSite.email = response.data.data.email;
        this.fetchSite.contact_person_name =
          response.data.data.contact_person_name;
        this.fetchSite.contact_person_email =
          response.data.data.contact_person_email;
        this.fetchSite.contact_person_number =
          response.data.data.contact_person_number;
        this.fetchSite.booking_email = response.data.data.booking_email;
      } catch (error) {}
    },

    async updateVacancyMethod() {
      try {
        const response = await axios.put(
          `${VITE_API_URL}/sites/${this.siteID}`,
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
        this.$emit("site-updatedProfileDetails");
        // this.$emit("updateVacancyInactive");
        // alert("Vacancy updated successfully");
        const message = "Site Profile Details Updated successfully";
        this.$refs.successAlert.showSuccess(message);
      } catch (error) {
        // console.error("Error updating vacancy:", error);
      }
    },
  },

  mounted() {
    // this.getClientMethod();
  },
  watch: {
    siteID: {
      immediate: true,
      handler(newsiteID) {
        if (newsiteID !== 0) {
          this.fetchSiteMethod(newsiteID);
        } else {
        }
      },
    },
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
.form-control:disabled {
  background-color: transparent;
}
</style>
