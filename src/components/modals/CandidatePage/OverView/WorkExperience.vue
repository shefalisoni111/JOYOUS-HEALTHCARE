<template>
  <div>
    <!-- Modal -->
    <div
      class="modal fade"
      id="addWorkExperience"
      aria-labelledby="addWorkExperience"
      tabindex="-1"
    >
      <div class="modal-dialog modal-dialog-centered modal-xl">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="addWorkExperience">Add Work Experience</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body mx-3">
            <div class="row g-3 align-items-center">
              <form>
                <div class="mb-3 d-flex justify-content-between">
                  <div class="col-2">
                    <label class="form-label">Name</label>
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
                    <label class="form-label">Company Name</label>
                  </div>
                  <div class="col-10 mt-1">
                    <input
                      type="text"
                      class="form-control"
                      v-model="company_name"
                      @input="clearError('company_name')"
                    />
                    <div v-if="getError('title')" class="text-danger">
                      {{ getError("title") }}
                    </div>
                  </div>
                </div>
                <div class="mb-3 d-flex justify-content-between">
                  <div class="col-2">
                    <label class="form-label">Experience</label>
                  </div>
                  <div class="col-10 mt-1">
                    <input
                      type="text"
                      class="form-control"
                      v-model="experience"
                      @input="clearError('experience')"
                    />
                    <div v-if="getError('title')" class="text-danger">
                      {{ getError("title") }}
                    </div>
                  </div>
                </div>
                <div class="mb-3 d-flex justify-content-between">
                  <div class="col-2">
                    <label class="form-label">Position</label>
                  </div>
                  <div class="col-10 mt-1">
                    <input
                      type="text"
                      class="form-control"
                      v-model="position"
                      @input="clearError('position')"
                    />
                    <div v-if="getError('title')" class="text-danger">
                      {{ getError("title") }}
                    </div>
                  </div>
                </div>

                <div class="mb-3 d-flex justify-content-between">
                  <div class="col-2">
                    <label for="exampleFormControlTextarea1" class="form-label"
                      >Description</label
                    >
                  </div>
                  <div class="col-10 mt-1">
                    <textarea
                      type="text"
                      class="form-control"
                      id="exampleFormControlTextarea1"
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
              class="btn btn-secondary rounded-1"
              data-bs-target="#addWorkExperience"
              data-bs-toggle="modal"
              data-bs-dismiss="modal"
            >
              Cancel
            </button>
            <button
              class="btn btn-primary rounded-1 text-capitalize fw-medium"
              data-bs-dismiss="modal"
              :disabled="isButtonDisabled"
              v-on:click="addWorkExperience()"
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
export default {
  name: "WorkExperience",
  data() {
    return {
      title: "",

      company_name: "",
      experience: "",
      position: "",
      description: "",

      errors: {},
    };
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

      if (!this.company_name.trim()) {
        this.$set(this.errors, "company_name", "Company Name is required.");
      }

      if (!this.experience.trim()) {
        this.$set(this.errors, "experience", "Experience is required.");
      }

      if (!this.position.trim()) {
        this.$set(this.errors, "position", "Position is required.");
      }

      if (!this.description.trim()) {
        this.$set(this.errors, "description", "Description is required.");
      }

      if (
        Object.values(this.errors).every((error) => error === null) &&
        !this.isEmptyField()
      ) {
        this.addWorkExperience();
      }
    },
    async addWorkExperience() {
      const candidateId = parseInt(this.$route.params.id);
      if (isNaN(candidateId)) {
        return;
      }

      const data = {
        candidate_id: candidateId,
        title: this.title,
        company_name: this.company_name,
        experience: this.experience,
        position: this.position,
        description: this.description,
      };
      try {
        const response = await fetch(`${VITE_API_URL}work_experiences`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        if (response.ok) {
          console.log("Event emitted successfully");
          this.$emit("AddExperienceData");
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
  background: #dbdbdb;
}
.modal-header {
  border-bottom: 0px;
}
.modal-footer {
  border-top: 0px;
}
</style>
