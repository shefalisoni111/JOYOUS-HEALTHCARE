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
                    <label class="form-label">First Name</label>
                  </div>

                  <div class="col-10">
                    <input
                      type="text"
                      class="form-control"
                      v-model="fetchAgencySetting.first_name"
                      placeholder="Last Name"
                      style="padding-right: 1px"
                    />
                  </div>
                </div>
                <div class="mb-3 d-flex justify-content-between">
                  <div class="col-2">
                    <label class="form-label"> Last Name</label>
                  </div>

                  <div class="col-10">
                    <input
                      type="text"
                      class="form-control"
                      v-model="fetchAgencySetting.last_name"
                      placeholder="Last Name"
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
                      readonly
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
                <!-- <div class="mb-3 d-flex justify-content-between">
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
                </div> -->
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
        first_name: "",
        last_name: "",

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
  },
  methods: {
    async fetchAgencySettingMethod(id) {
      const merchantId = localStorage.getItem("merchant_id");
      if (!merchantId) {
        this.isLoading = false;
        return;
      }

      try {
        const response = await axios.get(`${VITE_API_URL}/merchants/${merchantId}`, {
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        const data = response.data.data;

        this.fetchAgencySetting.id = data.id;
        this.fetchAgencySetting.first_name = data.first_name;
        this.fetchAgencySetting.last_name = data.last_name;
        this.fetchAgencySetting.address = data.address;
        this.fetchAgencySetting.phone_number = data.phone_number;
        this.fetchAgencySetting.email = data.email;
      } catch (error) {}
    },

    async updateAgencyMethod() {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.put(
          `${VITE_API_URL}/merchants/${this.fetchAgencySetting.id}`,
          {
            first_name: this.fetchAgencySetting.first_name,
            last_name: this.fetchAgencySetting.last_name,
            address: this.fetchAgencySetting.address,

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
