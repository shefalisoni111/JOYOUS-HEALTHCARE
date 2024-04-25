<template>
  <div>
    <!-- Modal -->
    <div
      class="modal fade"
      id="editAgencyData"
      aria-labelledby="editAgencyData"
      tabindex="-1"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="editAgencyData">Edit Agency Setting</h5>
          </div>
          <div class="modal-body mx-3">
            <div class="row g-3 align-items-center">
              <form>
                <div class="mb-3 d-flex justify-content-between">
                  <div class="col-2">
                    <label class="form-label">Agency Name</label>
                  </div>

                  <div class="col-10">
                    <input
                      type="text"
                      class="form-control"
                      v-model="fetchAgencySetting.agency_name"
                      style="padding-right: 1px"
                    />
                  </div>
                </div>

                <div class="mb-3 d-flex justify-content-between">
                  <div class="col-2">
                    <label class="form-label" for="selectJobTitle">Address</label>
                  </div>
                  <div class="col-10">
                    <input
                      type="text"
                      class="form-control"
                      v-model="fetchAgencySetting.address"
                      style="padding-right: 1px"
                    />
                  </div>
                </div>

                <div class="mb-3 d-flex justify-content-between">
                  <div class="col-2">
                    <label class="form-label">Email</label>
                  </div>
                  <div class="col-10">
                    <input
                      type="email"
                      class="form-control"
                      v-model="fetchAgencySetting.email"
                      @input="validateEmailFormat(email)"
                      @change="detectAutofill"
                      ref="email"
                      autocomplete="new-email"
                    />
                  </div>
                </div>
                <div class="mb-3 d-flex justify-content-between">
                  <div class="col-2">
                    <label class="form-label">Phone Number</label>
                  </div>
                  <div class="col-10">
                    <input
                      type="text"
                      class="form-control"
                      v-model="fetchAgencySetting.phone_number"
                      @input="cleanPhoneNumber"
                      @change="detectAutofill"
                    />
                  </div>
                </div>
                <div class="mb-3 d-flex justify-content-between">
                  <div class="col-2">
                    <label class="form-label">Mobile Number</label>
                  </div>
                  <div class="col-10">
                    <input
                      type="text"
                      class="form-control"
                      v-model="fetchAgencySetting.mobile_number"
                      @input="cleanPhoneNumber"
                      @change="detectAutofill"
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div class="modal-footer">
            <button
              class="btn btn-secondary rounded-1"
              data-bs-target="#editAgencyData"
              data-bs-toggle="modal"
              data-bs-dismiss="modal"
            >
              Cancel
            </button>
            <button
              class="btn btn-primary rounded-1 text-capitalize fw-medium"
              data-bs-dismiss="modal"
              @click.prevent="updateAgencyMethod()"
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

export default {
  name: "EditSite",
  data() {
    return {
      fetchAgencySetting: {
        id: 1,
        agency_name: "",

        mobile_number: "",
        address: "",

        phone_number: "",
        email: "",
      },

      clientData: [],
    };
  },
  props: {
    agencyId: {
      type: Number,
      required: true,
    },
  },
  components: { SuccessAlert },
  computed: {
    isPhoneNumberValid() {
      return /^[0-9]{10}$/.test(this.fetchAgencySetting.phone_number);
    },
    isMobileNumberValid() {
      return /^[0-9]{10}$/.test(this.fetchAgencySetting.mobile_number);
    },

    isEmailValid() {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(this.fetchAgencySetting.email);
    },
    isSaveDisabled() {
      return !this.isPhoneNumberValid || !this.isEmailValid || !this.isMobileNumberValid;
    },
  },
  methods: {
    async fetchAgencySettingMethod(id) {
      try {
        const response = await axios.get(`${VITE_API_URL}/agency_settings/${id}`, {
          headers: {
            "content-type": "application/json",
          },
        });

        const data = response.data;

        this.fetchAgencySetting.id = data.id;
        this.fetchAgencySetting.agency_name = data.agency_name;
        this.fetchAgencySetting.address = data.address;
        this.fetchAgencySetting.phone_number = data.phone_number;
        this.fetchAgencySetting.email = data.email;
        this.fetchAgencySetting.mobile_number = data.mobile_number;
      } catch (error) {}
    },

    async updateAgencyMethod() {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.put(
          `${VITE_API_URL}/agency_settings/${this.fetchAgencySetting.id}`,
          {
            agency_name: this.fetchAgencySetting.agency_name,

            address: this.fetchAgencySetting.address,
            mobile_number: this.fetchAgencySetting.mobile_number,
            phone_number: this.fetchAgencySetting.phone_number,
            email: this.fetchAgencySetting.email,
          },
          {
            headers: {
              Authorization: "bearer " + token,
            },
          }
        );

        this.$emit("editAgency");
        // this.$emit("updateVacancyInactive");
        // alert("Vacancy updated successfully");
        const message = "Agency Updated successfully";
        this.$refs.successAlert.showSuccess(message);
      } catch (error) {
        // console.error("Error updating vacancy:", error);
      }
    },
  },

  mounted() {},
  watch: {
    agencyId: {
      immediate: true,
      handler(newagencyId) {
        if (newagencyId !== 0) {
          this.fetchAgencySettingMethod(newagencyId);
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
