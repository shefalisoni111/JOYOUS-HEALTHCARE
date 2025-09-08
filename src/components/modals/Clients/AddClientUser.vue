<template>
  <div>
    <!-- Modal -->
    <div
      class="modal fade"
      id="addClientUser"
      aria-labelledby="addClientUserPages"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="addClientUser">Add Client User</h5>
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
                <!-- <div class="mb-3 d-flex justify-content-between">
                  <div class="col-2">
                    <label for="selectClients" class="form-label">Client Name</label>
                  </div>
                  <div class="col-10">
                    <input
                      type="text"
                      class="form-control"
                      :value="clientFirstName"
                      style="padding-right: 1px"
                      @input="clearError"
                      disabled
                    />
                  
                  </div>
                </div> -->

                <div class="mb-3 d-flex justify-content-between">
                  <div class="col-2">
                    <label class="form-label" for="selectBusinessUnit"
                      >Site Name</label
                    >
                  </div>
                  <div class="col-10">
                    <div
                      v-for="option in businessUnit"
                      :key="option.site_id"
                      class="form-check"
                    >
                      <input
                        type="checkbox"
                        class="form-check-input"
                        :id="'site-' + option.site_id"
                        :value="option.site_id"
                        v-model="site_ids"
                      />
                      <label
                        class="form-check-label"
                        :for="'site-' + option.site_id"
                      >
                        {{ option.site_name }}
                      </label>
                    </div>
                    <span v-if="siteError" class="text-danger">
                      Please select a site.
                    </span>
                    <!-- <select
                      v-model="site_id"
                      id="selectBusinessUnit"
                      @change="filterData"
                    >
                      <option value="" disabled>All Site</option>
                      <option
                        v-for="option in businessUnit"
                        :key="option.id"
                        :value="option.id"
                        placeholder="Select BusinessUnit"
                      >
                        {{ option.site_name }}
                      </option>
                    </select> -->
                  </div>

                  <!-- <span
                      v-if="!validateCandidateLName && !autofilled"
                      class="text-danger"
                      >Site Name Required</span
                    > -->
                </div>
                <div class="col-6">
                  <div class="mb-3">
                    <div class="col-12">
                      <label class="form-label">email</label>
                    </div>
                    <div class="col-12">
                      <input
                        type="email"
                        class="form-control"
                        v-model="email"
                        @input="validateEmailFormat"
                        @change="detectAutofill"
                        ref="email"
                        autocomplete="new-email"
                      />
                      <span v-if="email && emailInUse" class="text-danger"
                        >Email already in use</span
                      >
                      <span
                        v-if="email && !validateEmailFormat(email)"
                        class="text-danger"
                        >Invalid Email</span
                      >
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-6">
                    <div class="mb-3">
                      <div class="col-12">
                        <label class="form-label">Password</label>
                      </div>
                      <div class="col-12">
                        <input
                          type="password"
                          class="form-control"
                          v-model="password"
                          @input="validatePasswordCriteria"
                          @change="detectAutofill"
                          ref="password"
                          autocomplete="new-password"
                        />
                        <span
                          v-if="password && !isPasswordValid"
                          class="text-danger"
                        >
                          Password must be at least 8 characters long and
                          include uppercase, lowercase, numeric, and special
                          characters.
                        </span>
                      </div>
                    </div>
                  </div>
                  <div class="col-6">
                    <div class="mb-3">
                      <div class="col-12">
                        <label class="form-label">Confirm Password</label>
                      </div>
                      <div class="col-12">
                        <input
                          type="password"
                          class="form-control"
                          v-model="confirm_password"
                          @input="validatePasswordMatch"
                          @change="detectAutofill"
                        />
                        <span
                          v-if="confirm_password && !passwordsMatch"
                          class="text-danger"
                        >
                          Passwords do No match.
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div class="modal-footer">
            <button
              class="btn btn-dark btn-cancel"
              data-bs-target="#addClientUser"
              data-bs-toggle="modal"
              data-bs-dismiss="modal"
              v-on:click="clearFieldsData"
            >
              Cancel
            </button>
            <button
              data-bs-target="#addClientUser"
              :disabled="!isFormValid"
              :class="{ disabled: !isFormValid }"
              class="btn btn-primary rounded-4 text-capitalize fw-medium"
              v-on:click="addClientSiteMethod()"
              :data-bs-dismiss="isFormValid ? 'modal' : null"
            >
              Add Client Site
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

import Swal from "sweetalert2";
export default {
  name: "AddClientUser",
  data() {
    return {
      clientFirstName: "",
      client_id: this.$route.params.id,
      clientData: [],
      site_name: "",
      password: "",
      confirm_password: "",
      email: "",
      site_id: "",
      site_ids: [],

      businessUnit: [],
      passwordsMatch: true,
      autofilled: false,
      emailInUse: false,
      isPasswordValid: true,
      siteError: false,
    };
  },

  components: {},
  computed: {
    isFormValid() {
      return (
        this.site_ids !== "" &&
        this.email !== "" &&
        this.password !== "" &&
        this.confirm_password !== ""
      );
    },

    selectClients() {
      const client_id = this.clientData.find(
        (option) => option.id === this.client_id
      );
      return client_id ? client_id.client_name : "";
    },
  },
  watch: {
    email: "validateEmailFormat",

    password: "validatePasswordMatch",
    confirm_password: "validatePasswordMatch",
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
    validatePasswordCriteria() {
      const sanitizedPassword = this.password.replace(/\s+/g, "");

      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
      this.isPasswordValid = passwordRegex.test(sanitizedPassword);

      this.password = sanitizedPassword;
      this.validatePasswordMatch();
    },
    validatePasswordMatch() {
      const trimmedPassword = this.password.trim();
      const trimmedConfirmPassword = this.confirm_password.trim();
      this.passwordsMatch = trimmedPassword === trimmedConfirmPassword;
    },

    validateStatus() {
      return this.status !== null;
    },

    clearFieldsData() {
      setTimeout(() => {
        this.clearFields();
      }, 10);
    },

    detectAutofill() {
      let emailAutofilled = false;
      let passwordAutofilled = false;

      if (this.email && this.email === this.$refs.email.value) {
        emailAutofilled = true;
      }

      if (this.password && this.password === this.$refs.password.value) {
        passwordAutofilled = true;
      }

      this.autofilled = emailAutofilled && passwordAutofilled;
    },

    removeDate(index) {
      this.dates.splice(index, 1);
      this.clearError();
    },
    async addClientSiteMethod() {
      const token = localStorage.getItem("token");
      this.passwordsMatch =
        this.password.trim() === this.confirm_password.trim();

      // Frontend Validation
      if (!this.email) {
        Swal.fire("Error", "Email is required.", "error");
        return;
      }

      if (!this.validateEmailFormat(this.email)) {
        Swal.fire("Error", "Invalid email format.", "error");
        return;
      }

      if (!this.password) {
        Swal.fire("Error", "Password is required.", "error");
        return;
      }

      if (!this.passwordsMatch) {
        Swal.fire("Error", "Passwords do not match.", "error");
        return;
      }

      if (this.site_ids.length === 0) {
        this.siteError = true;
        return;
      } else {
        this.siteError = false;
      }

      if (!this.client_id) {
        Swal.fire("Error", "Client ID is missing.", "error");
        return;
      }

      const data = {
        email: this.email,
        password: this.password,
        confirm_password: this.confirm_password,
        site_ids: this.site_ids,
        client_id: this.$route.params.id,
      };

      try {
        const response = await axios.post(
          `${VITE_API_URL}/client_users`,
          data,
          {
            headers: {
              "content-type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200 || response.status === 201) {
          this.$emit("addUser");
          this.clearFieldsData();

          Swal.fire({
            icon: "success",
            title: "Success",
            text: "User added successfully.",
          });
        }
      } catch (error) {
        const apiError = error.response?.data?.error;

        if (apiError?.site_ids && apiError.site_ids.length) {
          Swal.fire("Error", "Please select valid site.", "error");
        } else {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: error.response?.data?.message || "Error adding user.",
          });
        }
      }
    },

    validateEmailFormat(email) {
      const emailRegex =
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|in|co\.uk|org|edu|care|net|jp)$/;
      return emailRegex.test(email);
    },

    clearFields() {
      this.site_ids = "";
      this.confirm_password = "";
      this.password = "";
      this.email = "";
    },
    async getClientMethod() {
      try {
        const response = await axios.get(
          `${VITE_API_URL}/clients/${this.$route.params.id}`
        );
        this.clientFirstName = response.data.client_name;
        if (response.data && response.data.data) {
          const client = response.data.data;
          this.clientData = [{ id: client.id, first_name: client.client_name }];
          this.client_id = client.id;
        }
      } catch (error) {
        if (error.response) {
          if (error.response.status == 404) {
            // alert(error.response.data.message);
          }
        } else {
          // console.error("Error fetching candidates:", error);
        }
      }
    },
    async getClientFetchSiteMethod() {
      if (!this.$route.params.id) {
        return;
      }
      try {
        const response = await axios.get(
          `${VITE_API_URL}/fetch_site_by_client_id/${this.$route.params.id}`
        );
        this.businessUnit = response.data.sites;

        // this.site_ids = this.businessUnit.map((site) => site.id);
      } catch (error) {
        if (error.response) {
          if (error.response.status == 404) {
            // alert(error.response.data.message);
          }
        }
      }
    },
  },
  async beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.client_id = to.params.id;
      vm.getClientFetchSiteMethod();
    });
  },
  async beforeRouteUpdate(to, from, next) {
    this.client_id = to.params.id;
    this.getClientFetchSiteMethod();

    next();
  },
  mounted() {
    this.client_id = this.$route.params.id;
    this.getClientFetchSiteMethod(this.client_id);
  },
};
</script>

<style scoped>
.modal-body {
  border-radius: 5px;
}

select {
  width: 100%;
  padding: 10px;
  border-radius: 4px;
}
label.form-label {
  text-transform: capitalize;
}
.modal-footer {
  border-top: 0px;
}
.btn-primary {
  border: none;
}
#head {
  width: 40px;
  height: 40px;
}

.modal {
  --bs-modal-width: 881px;
}
</style>
