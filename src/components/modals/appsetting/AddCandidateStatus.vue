<template>
  <div>
    <!-- Modal -->
    <div
      class="modal fade"
      id="addCandidateStatus"
      aria-labelledby="addCandidateStatus"
      tabindex="-1"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="addCandidateStatus">Add Candidate Status</h5>
          </div>
          <div class="modal-body mx-3">
            <div class="row g-3 align-items-center">
              <form>
                <div class="mb-3 d-flex justify-content-between">
                  <div class="col-2">
                    <label class="form-label">Title</label>
                  </div>
                  <div class="col-10 mt-1">
                    <input
                      type="text"
                      class="form-control"
                      v-model="title"
                      @input="clearError('title')"
                    />
                    <div v-if="getError('title')" class="text-danger">
                      {{ getError("title") }}
                    </div>
                  </div>
                </div>

                <div class="mb-3 d-flex justify-content-between">
                  <div class="col-2">
                    <label class="form-label">Desc</label>
                  </div>
                  <div class="col-10 mt-1">
                    <textarea
                      type="text"
                      class="form-control"
                      rows="3"
                      v-model="description"
                      @input="clearError('description')"
                    ></textarea>
                    <div v-if="getError('description')" class="text-danger">
                      {{ getError("description") }}
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div class="modal-footer">
            <button
              class="btn btn-secondary rounded-1"
              data-bs-target="#addCandidateStatus"
              data-bs-toggle="modal"
              data-bs-dismiss="modal"
            >
              Cancel
            </button>
            <button
              class="btn btn-primary rounded-1 text-capitalize fw-medium"
              data-bs-dismiss="modal"
              :disabled="isButtonDisabled"
              @click="validateAndAddJob"
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
  name: "AddCandidateStatus",
  data() {
    return {
      getCandidateStatus: [],
      title: "",
      description: "",
      errors: {},
    };
  },
  components: {
    SuccessAlert,
  },
  computed: {
    isButtonDisabled() {
      return (
        Object.values(this.errors).some((error) => error !== null) || this.isEmptyField()
      );
    },
  },
  methods: {
    clearError(fieldName) {
      this.errors[fieldName] = null;
    },
    handleSuccessMessage(message) {
      this.$refs.successAlert.showSuccess(message);
    },
    getError(fieldName) {
      return this.errors[fieldName];
    },
    isEmptyField() {
      return !this.title.trim() || !this.description.trim();
    },
    validateAndAddJob() {
      this.errors = {};

      if (!this.title.trim()) {
        this.$set(this.errors, "title", "Title is required.");
      }

      if (!this.description.trim()) {
        this.$set(this.errors, "description", "Description is required.");
      }

      if (
        Object.values(this.errors).every((error) => error === null) &&
        !this.isEmptyField()
      ) {
        this.addCandidateStatus();
      }
    },
    async addCandidateStatus() {
      const data = {
        title: this.title,
        description: this.description,
      };

      try {
        const response = await fetch(`${VITE_API_URL}/candidate_statuses`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        if (response.ok) {
          const newCandidateStatus = await response.json();

          this.$emit("updateList");
          const message = "Staff Status Add Successful";
          this.$refs.successAlert.showSuccess(message);
          this.title = "";
          this.description = "";
        } else {
          // console.error("Failed to add candidate status:", response.statusText);
        }
      } catch (error) {
        // console.error("Error adding candidate status:", error);
      }
    },
    getCandidateData() {
      axios
        .get(`${VITE_API_URL}/candidate_statuses`)
        .then((response) => {
          this.getCandidateStatus = response.data || [];
        })
        .catch((error) => {
          if (error.response) {
            if (error.response.status == 404) {
              // alert(error.response.data.message);
            }
          }
        });
    },
  },
};
</script>

<style scoped>
.bi-square-fill::before {
  color: #673ab7;
  font-size: 40px;
}

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
</style>
