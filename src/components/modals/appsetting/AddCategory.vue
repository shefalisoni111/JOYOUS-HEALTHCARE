<template>
  <div>
    <!-- Modal -->
    <div class="modal fade" id="addCategories" aria-labelledby="addCategories">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="addCategories">Add New Category</h5>
          </div>
          <div class="modal-body mx-3">
            <div class="row g-3 align-items-center">
              <form>
                <div class="mb-3">
                  <div class="">
                    <label class="form-label">Category Name</label>
                  </div>
                  <div class="mt-1">
                    <input
                      type="text"
                      class="form-control"
                      v-model="category_name"
                      @input="clearError('category_name')"
                    />
                    <div v-if="getError('category_name')" class="text-danger">
                      {{ getError("category_name") }}
                    </div>
                  </div>
                </div>
                <div class="mb-3">
                  <div class="col-12">
                    <label class="form-label" for="selectOption">Position</label>
                  </div>
                  <div class="col-12">
                    <div v-for="option in options" :key="option.id">
                      <input
                        type="checkbox"
                        :id="option.id"
                        :value="option.id"
                        v-model="job_id"
                        @change="clearError('job_id')"
                      />
                      <label :for="option.id" class="text-capitalize"
                        >&nbsp;{{ option.name }}</label
                      >
                    </div>
                    <div v-if="getError('job_id')" class="text-danger">
                      {{ getError("job_id") }}
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div class="modal-footer">
            <button
              class="btn btn-secondary rounded-1"
              data-bs-target="#addCategories"
              data-bs-toggle="modal"
              data-bs-dismiss="modal"
              v-on:click="clearFieldsData"
            >
              Cancel
            </button>
            <button
              class="btn btn-primary rounded-1 text-capitalize fw-medium"
              data-bs-dismiss="modal"
              :disabled="shouldDisableButton()"
              v-on:click="addCandidateStatus"
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
  name: "AddCategory",
  data() {
    return {
      category_name: "",
      job_id: [],
      options: [],

      errors: {},
    };
  },
  components: { SuccessAlert },
  computed: {
    selectedOptionText() {
      const selectedOptions = this.options.filter((option) =>
        this.job_id.includes(option.id)
      );
      return selectedOptions.map((option) => option.name).join(", ");
    },
  },
  methods: {
    clearFieldsData() {
      this.clearFields();
      setTimeout(() => {
        this.clearError();
      }, 10);
    },
    clearFields() {
      this.category_name = "";
      this.job_id = [];
    },
    async addCandidateStatus() {
      this.validateForm();

      if (Object.values(this.errors).every((error) => error === null)) {
        const data = {
          category_name: this.category_name,
          job_id: this.job_id,
        };
        try {
          const response = await fetch(`${VITE_API_URL}/document_categories`, {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          });
          if (response.ok) {
            // location.reload();
            this.$emit("onCategoryAdded");
            this.category_name = "";
            this.job_id = [];
            const message = " Add Category Successful";
            this.$refs.successAlert.showSuccess(message);
          }
        } catch (error) {}
      }
    },
    async getPositionMethod() {
      try {
        const response = await axios.get(`${VITE_API_URL}/active_job_list`);
        this.options = response.data.data;
      } catch (error) {
        if (error.response) {
          if (error.response.status == 404) {
            // alert(error.response.data.message);
          }
        }
      }
    },
    shouldDisableButton() {
      return (
        this.isEmptyField() || Object.values(this.errors).some((error) => error !== null)
      );
    },
    clearError(fieldName) {
      this.errors[fieldName] = null;
    },
    getError(fieldName) {
      return this.errors[fieldName];
    },
    isEmptyField() {
      return !this.category_name.trim() || this.job_id.length === 0;
    },
    validateForm() {
      this.errors = {};

      if (!this.category_name.trim()) {
        this.$set(this.errors, "category_name", "Category Name is required.");
      }

      if (this.job_id.length === 0) {
        this.$set(this.errors, "job_id", "Position is required.");
      }
    },
  },
  async beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.getPositionMethod();
    });
  },
  async beforeRouteUpdate(to, from, next) {
    this.getPositionMethod();

    next();
  },
  mounted() {
    // this.getPositionMethod();
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
select {
  width: 100%;
  padding: 10px;
  border-radius: 4px;
  border: 0px;
}
.modal-footer {
  border-top: 0px;
}
.table > :not(caption) > * > * {
  background: none;
}
table td > i {
  font-size: 18px;
}
</style>
