<template>
  <div>
    <!-- Modal -->
    <div
      class="modal fade"
      id="addRestrictedLocation"
      aria-labelledby="addRestrictedLocation"
    >
      <div class="modal-dialog modal-dialog-centered modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="addRestrictedLocation">Add Location</h5>
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
              <form @submit.prevent="addRestrictedLocationMethod">
                <div class="mb-3">
                  <div class="col-12">
                    <label for="selectClients" class="form-label">Client</label>
                  </div>
                  <div class="col-12">
                    <select
                      v-model="client_id"
                      id="selectClients"
                      @change="onClientSelect"
                    >
                      <option
                        v-for="option in clientData"
                        :key="option.id"
                        :value="option.id"
                        :id="option.id"
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
                <div class="mb-3">
                  <div class="col-12">
                    <label class="form-label" for="selectBusinessUnit"
                      >Site</label
                    >
                  </div>

                  <div class="col-12">
                    <select v-model="site_id" id="selectBusinessUnit">
                      <option
                        v-for="option in businessUnit"
                        :key="option.id"
                        :value="option.id"
                        placeholder="Select BusinessUnit"
                      >
                        {{ option.site_name }}
                      </option>
                    </select>
                    <!-- <span v-if="!validationBusinessUnit && !site_id" class="text-danger"
                      >Site Required</span
                    > -->
                  </div>
                </div>
              </form>
            </div>
            <div class="modal-footer">
              <button
                class="btn btn-dark btn-cancel"
                data-bs-target="#addRestrictedLocation"
                data-bs-toggle="modal"
                data-bs-dismiss="modal"
                v-on:click="clearFieldsData"
              >
                Cancel
              </button>
              <button
                :disabled="!isFormValid"
                :class="{ disabled: !isFormValid }"
                class="btn btn-primary rounded-1 text-capitalize fw-medium"
                :data-bs-dismiss="isFormValid ? 'modal' : null"
                @click="submitForm"
              >
                Add Location
              </button>
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
  name: "AddRestrictedLocation",
  data() {
    return {
      site_id: "",
      candidate_id: "",
      businessUnit: [],
      client_id: "",
      clientData: [],
      validationSelectedClient: true,
      validationBusinessUnit: true,
    };
  },
  components: { SuccessAlert },
  watch: {
    client_id: "validationSelectedClient",
    site_id: "validationBusinessUnit",

    site_id: function (newValue) {
      this.validationBusinessUnit = this.validateBusinessUnit(newValue);
    },
    client_id: function (newValue) {
      this.validationSelectedClient = this.ValidationClient(newValue);
    },
  },
  computed: {
    isFormValid() {
      return this.site_id !== "" && this.client_id !== "";
    },
    // isFormValid() {
    //   return this.validationBusinessUnit && this.validationSelectedClient;
    // },
    selectBusinessUnit() {
      const site_id = this.businessUnit.find(
        (option) => option.id === this.site_id
      );
      return site_id ? site_id.site_name : "";
    },

    selectClients() {
      const client_id = this.clientData.find(
        (option) => option.id === this.client_id
      );
      return this.client_id;
    },
  },
  methods: {
    blurActiveElement() {
      if (document.activeElement) {
        document.activeElement.blur();
      }
    },
    clearFieldsData() {
      this.site_id = "";
      this.client_id = "";
      setTimeout(() => {
        this.clearError();
      }, 10);
    },
    async getClientMethod() {
      try {
        const response = await axios.get(`${VITE_API_URL}/get_client_id_name`);
        this.clientData = response.data.data;
      } catch (error) {
        if (error.response && error.response.status === 404) {
          // Handle 404 error
          // console.error('Error fetching client data:', error.response.data.message);
        } else {
          // console.error('Error fetching client data:', error);
        }
      }
    },
    ValidationClient(newValue) {
      const clientRegex = /[a-zA-Z0-9]/;
      return clientRegex.test(newValue);
    },
    onClientSelect() {
      const selectedClientId = this.client_id;

      this.getSiteAccordingClientMethod(selectedClientId);
    },
    async submitForm() {
      this.validateBusinessUnit(this.site_id);
      this.ValidationClient(this.client_id);
      if (this.isFormValid) {
        this.addRestrictedLocationMethod();
      } else {
      }
    },
    async getSiteAccordingClientMethod() {
      try {
        const response = await axios.get(
          `${VITE_API_URL}/site_according_client/${this.client_id}`
        );
        this.businessUnit = response.data.site;
      } catch (error) {
        if (error.response) {
          if (error.response.status == 404) {
            // alert(error.response.data.message);
          }
        }
      }
    },
    validateBusinessUnit(value) {
      const businessUnitRegex = /[a-zA-Z0-9]/;
      return businessUnitRegex.test(value);
    },

    async addRestrictedLocationMethod() {
      const data = {
        site_id: [this.site_id],
        candidate_id: this.$route.params.id,
        client_id: this.client_id,
      };
      try {
        const response = await fetch(
          `${VITE_API_URL}/restricted_business_units`,
          {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(data),
          }
        );
        if (response.ok) {
          this.$emit("getLocationAdded");
          this.site_id = "";
          this.client_id = "";
          this.Staff_id = "";
          const message = "Successful added Restrict Location";
          this.$refs.successAlert.showSuccess(message);
        } else {
        }
      } catch (error) {}
    },
    async getBusinessUnitMethod() {
      try {
        const response = await axios.get(`${VITE_API_URL}/activated_site`);
        this.businessUnit = response.data.data;
      } catch (error) {
        if (error.response) {
          if (error.response.status == 404) {
            alert(error.response.data.message);
          }
        }
      }
    },
    clearError() {
      this.validationSelectedBusinessUnit = true;
      this.validationSelectedClient = true;
    },
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.this.getClientMethod();
      vm.this.getBusinessUnitMethod();
    });
  },
  beforeRouteUpdate(to, from, next) {
    this.getClientMethod();
    this.getBusinessUnitMethod();
    next();
  },
  async mounted() {
    // await this.getBusinessUnitMethod();
    this.candidate_id = this.$route.params.id;
    // await this.getClientMethod();
    this.clearError();
  },
};
</script>

<style scoped>
select {
  width: 100%;
  padding: 9px;
}
</style>
