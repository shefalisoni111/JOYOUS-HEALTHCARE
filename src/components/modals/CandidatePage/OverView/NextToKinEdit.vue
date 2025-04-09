<template>
  <div>
    <!-- Modal -->
    <div
      class="modal fade"
      id="editNextToKin"
      aria-labelledby="editNextKin"
      tabindex="-1"
    >
      <div class="modal-dialog modal-dialog-centered modal-xl">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title text-center" id="editNextToKin">Edit Details</h5>
          </div>
          <div class="modal-body mx-3" v-if="fetchNExtToKinData">
            <div class="row align-items-center">
              <form>
                <div class="mb-3">
                  <div class="col-12">
                    <label class="form-label">Name</label>
                  </div>
                  <div class="col-12 mt-1">
                    <input
                      type="text"
                      class="form-control"
                      v-model="fetchNExtToKinData.name"
                    />
                  </div>
                </div>
                <div class="mb-3">
                  <div class="col-12">
                    <label class="form-label">Phone Number</label>
                  </div>
                  <div class="col-12 mt-1">
                    <input
                      type="text"
                      class="form-control"
                      v-model="fetchNExtToKinData.phone_number"
                      @input="cleanAndValidatePhoneNumber"
                    />
                    <span v-if="!validatePhoneNumber" class="text-danger"
                      >Invalid Phone Number</span
                    >
                  </div>
                </div>
                <div class="mb-3">
                  <div class="col-12">
                    <label class="form-label">Relation</label>
                  </div>
                  <div class="col-12 mt-1">
                    <input
                      type="text"
                      class="form-control"
                      v-model="fetchNExtToKinData.relation"
                    />
                  </div>
                </div>
                <div class="mb-3">
                  <div class="col-12">
                    <label class="form-label">Address Line 1</label>
                  </div>
                  <div class="col-12 mt-1">
                    <input
                      type="text"
                      class="form-control"
                      v-model="fetchNExtToKinData.address_line_1"
                    />
                  </div>
                </div>
                <div class="mb-3">
                  <div class="col-12">
                    <label class="form-label">Address Line 2</label>
                  </div>
                  <div class="col-12 mt-1">
                    <input
                      type="text"
                      class="form-control"
                      v-model="fetchNExtToKinData.address_line_2"
                    />
                  </div>
                </div>
                <div class="mb-3">
                  <div class="col-12">
                    <label class="form-label">City</label>
                  </div>
                  <div class="col-12 mt-1">
                    <input
                      type="text"
                      class="form-control"
                      v-model="fetchNExtToKinData.city"
                    />
                  </div>
                </div>
                <div class="mb-3">
                  <div class="col-12">
                    <label class="form-label">PostCode</label>
                  </div>
                  <div class="col-12 mt-1">
                    <input
                      type="text"
                      class="form-control"
                      v-model="fetchNExtToKinData.postcode"
                      @input="cleanAndValidatePostcode"
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div class="modal-footer">
            <button
              class="btn btn-secondary rounded-1"
              data-bs-target="#editNextToKin"
              data-bs-toggle="modal"
              data-bs-dismiss="modal"
            >
              Cancel
            </button>
            <button
              class="btn btn-primary rounded-1 text-capitalize fw-medium"
              data-bs-dismiss="modal"
              @click.prevent="updateNextToKinMethod()"
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
import SuccessAlert from "../../../Alerts/SuccessAlert.vue";

export default {
  name: "NextToKinEdit",
  data() {
    return {
      fetchNExtToKinData: {
        id: this.$route.params.id,
        name: "",
        phone_number: "",
        relation: "",
        address_line_1: "",
        address_line_2: "",
        city: "",
        postcode: "",
      },

      validatePhoneNumber: true,
    };
  },
  components: { SuccessAlert },
  computed: {
    isPhoneNumberValid() {
      return /^[0-9]{10}$/.test(this.fetchNExtToKinData.phone_number);
    },
    isPostcodeValid() {
      return /^[0-9]{1,6}$/.test(this.fetchNExtToKinData.postcode);
    },
    isSaveDisabled() {
      return !this.isPhoneNumberValid || !this.isPostcodeValid;
    },
  },
  props: {
    nextKinID: {
      type: [String, Number, null],
      required: true,
    },
  },
  methods: {
    cleanAndValidatePhoneNumber() {
      this.fetchNExtToKinData.phone_number = this.fetchNExtToKinData.phone_number.replace(
        /\D/g,
        ""
      );

      this.validatePhoneNumber = this.fetchNExtToKinData.phone_number.length === 10;
    },
    cleanAndValidatePostcode() {
      this.fetchNExtToKinData.postcode = this.fetchNExtToKinData.postcode.replace(
        /\D/g,
        ""
      );

      this.validatePhoneNumber = this.fetchNExtToKinData.postcode.length === 6;
    },
    async fetchNextToKinMethod(id) {
      if (!id) return;
      try {
        const response = await axios.get(
          `${VITE_API_URL}/candidates/${this.$route.params.id}/next_of_kins/${id}`
        );

        this.fetchNExtToKinData = response.data.data;
      } catch (error) {
        // console.error("Error fetching todo:", error);
      }
    },
    async updateNextToKinMethod(id) {
      try {
        await axios.put(
          `${VITE_API_URL}/candidates/${this.$route.params.id}/next_of_kins/${this.nextKinID}`,
          this.fetchNExtToKinData
        );

        // alert("NextToKin updated successfully");
        this.$emit("nextToKinAdded");
        const message = "Next To Kin updated  successfully";
        this.$refs.successAlert.showSuccess(message);
      } catch (error) {
        // console.error("Error updating candidate:", error);
      }
    },
  },
  watch: {
    nextKinID: {
      immediate: true,
      handler(newNextKinID) {
        this.fetchNextToKinMethod(newNextKinID);
      },
    },
  },
  beforeDestroy() {
    this.$options.watch.nextKinID = null;
  },
  async mounted() {
    await this.fetchNextToKinMethod();
  },
};
</script>

<style scoped>
.modal-body {
  border-radius: 5px;
  background: #dbdbdb;
}
.modal-header {
  border-bottom: 0px;
}
.modal-footer {
  border-top: 0px;
}

select {
  width: 100%;
  border: none;
  padding: 9px;
  border-radius: 4px;
}

#head {
  width: 40px;
  height: 40px;
}
.main-box {
  background: #00000008;

  padding: 100px 20px;
  height: 100vh;
  overflow: hidden;
}

.model-box {
  background: #f3f3f3;
  margin: 20px 443px;
  padding: 10px;
  border-radius: 4px;
  box-shadow: 3px 1px 12px 14px #c3bdbd;
}
.btn-primary {
  background-color: #ff5f30 !important;
  font-weight: bold;
  border: none;
  border-radius: 4px;
  outline: none;
}

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
  margin: 12px 10px;
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
  color: white;
  display: block;
  position: absolute;
  transform: translate(-50%, -50%);
  top: 50%;
  left: 70%;
  transition: all 0.5s;
  font-size: 10px;
 font-family: 'Inter', sans-serif;
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
