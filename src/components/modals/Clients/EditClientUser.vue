<template>
  <div>
    <!-- Modal -->
    <div
      class="modal fade"
      id="editClientUser"
      aria-labelledby="editClientUserPages"
      tabindex="-1"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="editClientUser">Add Client User</h5>
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
                    <span
                      v-if="
                        fetchSite.email &&
                        !validateEmailFormat(fetchSite.email) &&
                        !autofilled
                      "
                      class="text-danger"
                      >Invalid Email</span
                    >
                  </div>
                </div>
                <div class="mb-3 d-flex justify-content-between">
                  <div class="col-2">
                    <label class="form-label">Password</label>
                  </div>
                  <div class="col-10">
                    <input
                      type="password"
                      class="form-control"
                      v-model="fetchSite.password"
                      @input="validateEmailFormat"
                      @change="detectAutofill"
                    />
                  </div>
                </div>
                <div class="mb-3 d-flex justify-content-between">
                  <div class="col-2">
                    <label class="form-label">Confirm Password</label>
                  </div>
                  <div class="col-10">
                    <input
                      type="password"
                      class="form-control"
                      v-model="fetchSite.confirm_password"
                      @input="validateEmailFormat"
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
              data-bs-target="#editClientUser"
              data-bs-toggle="modal"
              data-bs-dismiss="modal"
            >
              Cancel
            </button>
            <button
              class="btn btn-primary rounded-1 text-capitalize fw-medium"
              data-bs-target="#editClientUser"
              data-bs-toggle="modal"
              data-bs-dismiss="modal"
              v-on:click="updateUser()"
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
import Swal from "sweetalert2";
export default {
  name: "AddClientSite",
  data() {
    return {
      fetchSite: {
        id: "",

        client_id: this.$route.params.id,
        password: "",
        confirm_password: "",

        email: "",
      },
      clientFirstName: "",
    };
  },
  props: {
    ClientUserId: {
      type: Number,
      required: true,
    },
  },
  components: { SuccessAlert },
  computed: {
    selectClients() {
      const client_id = this.clientData.find((option) => option.id === this.client_id);
      return client_id ? client_id.client_name : "";
    },
  },
  watch: {
    ClientUserId: {
      immediate: true,
      handler(newClientID) {
        this.fetchUserData(newClientID);
      },
    },
  },
  methods: {
    validateEmailFormat(email) {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      return emailRegex.test(email);
    },
    detectAutofill(event) {
      this.autofilled = !!event.target.value;
    },
    async fetchUserData(ClientUserId) {
      if (!ClientUserId) {
        return;
      }
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get(`${VITE_API_URL}/client_users/${ClientUserId}`, {
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.data.data) {
          const { id, client_id, email, password, confirm_password } = response.data.data;
          this.fetchSite.id = id;
          this.fetchSite.client_id = client_id;
          this.fetchSite.email = email;
          this.fetchSite.password = password;
          this.fetchSite.confirm_password = confirm_password;
        }
      } catch (error) {
        // console.error("Error fetching user data:", error);
        // Swal.fire({
        //   icon: "error",
        //   title: "Error",
        //   text: "Failed to fetch user data.",
        // });
      }
    },
    async updateUser() {
      const token = localStorage.getItem("token");
      const updatedData = {
        email: this.fetchSite.email,
        password: this.fetchSite.password,
        confirm_password: this.fetchSite.confirm_password,
        client_id: this.$route.params.id,
      };

      try {
        const response = await axios.put(
          `${VITE_API_URL}/client_users/${this.fetchSite.id}`,
          updatedData,
          {
            headers: {
              "content-type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.status === 200) {
          this.$emit("updatedUser");
          Swal.fire({
            icon: "success",
            title: "Success",
            text: "User updated successfully.",
          });

          this.fetchUserData(this.fetchSite.id);
        }
      } catch (error) {
        let errorMessage = "Failed to update user.";

        if (error.response) {
          if (error.response.data && error.response.data.message) {
            errorMessage = error.response.data.message;
          } else {
            errorMessage = `Error ${error.response.status}: ${error.response.statusText}`;
          }
        } else if (error.request) {
          errorMessage = "No response from the server. Please check your connection.";
        } else {
          errorMessage = `Unexpected error: ${error.message}`;
        }

        Swal.fire({
          icon: "error",
          title: "Error",
          text: errorMessage,
        });
      }
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
      //   vm.getClientMethod();
    });
  },
  async beforeRouteUpdate(to, from, next) {
    this.client_id = to.params.id;
    // this.getClientMethod();

    next();
  },
  mounted() {
    // this.getClientMethod();
    this.getClientFetchSiteMethod();
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

select {
  width: 100%;
  padding: 10px;
  border-radius: 4px;
  border: 0px;
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
