<template>
  <div>
    <!-- Modal -->
    <div class="modal fade" id="addEducation" aria-labelledby="addEducation">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="addEducation">Add Education</h5>
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
                    <label class="form-label">NAME</label>
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
                    <label class="form-label">DESC</label>
                  </div>
                  <div class="col-10 mt-1">
                    <textarea
                      type="text"
                      class="form-control"
                      v-model="description"
                      rows="3"
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
              class="btn btn-dark btn-cancel"
              data-bs-target="#addEducation"
              data-bs-toggle="modal"
              data-bs-dismiss="modal"
            >
              Cancel
            </button>
            <button
              class="btn btn-primary rounded-1 text-capitalize fw-medium"
              data-bs-dismiss="modal"
              :disabled="isButtonDisabled"
              v-on:click="addEducation()"
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
import SuccessAlert from "../../../Alerts/SuccessAlert.vue";

export default {
  name: "WorkExperience",
  data() {
    return {
      title: "",

      description: "",

      errors: {},
    };
  },
  components: { SuccessAlert },
  computed: {
    isButtonDisabled() {
      return (
        Object.values(this.errors).some((error) => error !== null) ||
        this.isEmptyField()
      );
    },
  },
  methods: {
    blurActiveElement() {
      if (document.activeElement) {
        document.activeElement.blur();
      }
    },
    clearError(fieldName) {
      this.$set(this.errors, fieldName, null);
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
        this.addEducation();
      }
    },
    async addEducation() {
      const data = {
        title: this.title,
        description: this.description,
      };
      try {
        const response = await fetch(
          `${VITE_API_URL}/candidates/${this.$route.params.id}/candidate_educations`,
          {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          }
        );
        if (data) {
          // location.reload();
          this.$emit("AddEducation");
          const message = "Education details add  successfully";
          this.$refs.successAlert.showSuccess(message);
        }
      } catch (error) {}
    },
  },
  mounted() {},
};
</script>

<style scoped>
.bi-square-fill::before {
  color: #673ab7;
  font-size: 40px;
}

.modal-body {
  border-radius: 5px;
}

.modal-footer {
  border-top: 0px;
}
</style>
