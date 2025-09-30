<template>
  <div>
    <!-- Modal -->
    <div class="modal fade" id="myModal" aria-labelledby="myModal">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="myModal">Add Jobs</h5>
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
                <div class="mb-3">
                  <div class="col-12">
                    <label class="form-label">NAME</label>
                  </div>
                  <div class="col-12 mt-1">
                    <input
                      type="text"
                      class="form-control"
                      v-model="name"
                      @input="clearError('name')"
                    />
                    <div v-if="getError('name')" class="text-danger">
                      {{ getError("name") }}
                    </div>
                  </div>
                </div>

                <div class="mb-3">
                  <div class="col-12">
                    <label for="exampleFormControlTextarea1" class="form-label"
                      >COLOR</label
                    >
                  </div>
                  <div class="col-12 mt-1">
                    <input type="color" id="head" name="head" v-model="color" />
                  </div>
                </div>

                <div class="mb-3">
                  <div class="col-12">
                    <label class="form-label">DESC</label>
                  </div>
                  <div class="col-12 mt-1">
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
              class="btn btn-dark btn-cancel"
              data-bs-target="#myModal"
              data-bs-toggle="modal"
              data-bs-dismiss="modal"
            >
              Cancel
            </button>
            <button
              class="btn btn-primary rounded-4 text-capitalize fw-medium"
              data-bs-dismiss="modal"
              :disabled="isButtonDisabled"
              @click="addJob"
            >
              Add Job
            </button>
          </div>
        </div>
      </div>
    </div>
    <SuccessAlert ref="successAlert" />
  </div>
</template>

<script>
import SuccessAlert from "../../Alerts/SuccessAlert.vue";

export default {
  name: "AddJobbs",
  data() {
    return {
      name: "",
      color: "#050505",
      description: "",

      errors: {},
    };
  },
  components: { SuccessAlert },
  computed: {
    isButtonDisabled() {
      return (
        Object.values(this.errors).some((error) => error !== null) ||
        !this.name.trim() ||
        !this.description.trim()
      );
    },
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
    clearError(fieldName) {
      this.errors[fieldName] = null;
    },

    getError(fieldName) {
      return this.errors[fieldName];
    },
    isEmptyField() {
      return !this.name || !this.isValidColor(this.color) || !this.description;
    },

    validateAndAddJob() {
      this.errors = {};

      if (!this.name.trim()) {
        this.$set(this.errors, "name", "Name is required.");
      }
      if (!this.description.trim()) {
        this.$set(this.errors, "description", "Description is required.");
      }

      if (
        Object.values(this.errors).every((error) => error === null) &&
        !this.isEmptyField()
      ) {
        this.addJob();
      }
    },
    async addJob() {
      const data = {
        name: this.name,
        color: this.color,
        description: this.description,
      };
      try {
        const response = await fetch(`${VITE_API_URL}/jobs`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        if (response.ok) {
          this.$emit("jobAdded");
          // alert("Add Jobs successfully");
          const message = "Add Jobs successfully";
          this.$refs.successAlert.showSuccess(message);
          this.name = "";
          this.color = "#050505";
          this.description = "";
        } else {
        }
      } catch (error) {}
    },
  },
  mounted() {},
};
</script>

<style scoped>
.content-area {
  margin-left: 250px;
  transition: margin-left 0.3s ease;
}
@media (max-width: 1120px) {
  .content-area {
    margin-left: 0;
  }
}
.modal-body {
  border-radius: 5px;
}

.modal-footer {
  border-top: 0px;
}

#head {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
</style>
