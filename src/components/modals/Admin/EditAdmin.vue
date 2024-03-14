<template>
  <div>
    <!-- Modal -->
    <div class="modal fade" id="editAdmin" aria-labelledby="editAdmin" tabindex="-1">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="editAdmin">Edit Candidate</h5>
           
          </div>
          <div class="modal-body mx-3">
            <div class="row align-items-center">
              <form>
                <div class="mb-3">
                  <div class="">
                    <div class="col-12">
                      <label class="form-label">Name</label>
                    </div>
                    <div class="col-12 mt-1">
                      <input
                        type="text"
                        class="form-control"
                        v-model="fetchAdmin.first_name"
                      />
                    </div>
                  </div>
                </div>

                <div class="mb-3">
                  <div class="col-12">
                    <label class="form-label">Email</label>
                  </div>
                  <div class="col-12 mt-1">
                    <input type="email" class="form-control" v-model="fetchAdmin.email" />
                  </div>
                </div>
                <div class="mb-3">
                  <div class="col-12">
                    <label class="form-label">Phone Number</label>
                  </div>
                  <div class="col-12 mt-1">
                    <input
                      type="number"
                      class="form-control"
                      v-model="fetchAdmin.phone_number"
                    />
                  </div>
                </div>
                <div class="mb-3">
                  <div class="col-12">
                    <label class="form-label">Address</label>
                  </div>
                  <div class="col-12 mt-1">
                    <input
                      type="text"
                      class="form-control"
                      v-model="fetchAdmin.address"
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div class="modal-footer">
            <button
              class="btn btn-secondary rounded-1"
              data-bs-target="#editAdmin"
              data-bs-toggle="modal"
              data-bs-dismiss="modal"
            >
              Cancel
            </button>
            <button
              class="btn btn-primary rounded-1 text-capitalize fw-medium"
              data-bs-dismiss="modal"
              @click.prevent="updateAdminMethod()"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";

export default {
  name: "editAdmin",
  data() {
    return {
      fetchAdmin: {
        id: 1,
        first_name: "",
        last_name: "",

        address: "",

        phone_number: "",
        email: "",
      },
    };
  },
  mounted() {
    this.fetchAdminMethod(1);
  },
  methods: {
    async fetchAdminMethod(id) {
      try {
        const response = await axios.get(`${VITE_API_URL}/merchants/${id}`);

        this.fetchAdmin = { ...this.fetchAdmin, ...response.data };
      } catch (error) {
        // console.error("Error fetching admin data:", error);
      }
    },
    async updateAdminMethod() {
      try {
        const response = await axios.put(
          `${VITE_API_URL}/merchants/${this.fetchAdmin.id}`,
          this.fetchAdmin
        );
        this.$emit("admin-updated");

        alert("Admin updated successfully");
      } catch (error) {
        // console.error("Error updating candidate:", error);
      }
    },
  },
};
</script>
