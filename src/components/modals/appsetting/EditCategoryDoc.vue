<template>
  <div>
    <!-- Modal -->
    <div
      class="modal fade"
      id="editDocCategory"
      aria-labelledby="editDocCategory"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="editDocCategory">Edit Category</h5>
            <button
              type="button"
              class="custom-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              @click="blurActiveElement"
            ></button>
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
                        v-model="fetchCategory.category_name"
                      />
                    </div>
                  </div>
                </div>
                <div class="mb-3">
                  <div class="col-12">
                    <label class="form-label" for="selectJobTitle"
                      >Position</label
                    >
                  </div>
                  <div class="col-12">
                    <div v-for="option in options" :key="option.id">
                      <input
                        type="checkbox"
                        :id="option.id"
                        :value="option.id"
                        v-model="fetchCategory.job_id"
                      />
                      <label :for="option.id" class="text-capitalize"
                        >&nbsp;{{ option.name }}</label
                      >
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div class="modal-footer">
            <button
              class="btn btn-dark btn-cancel"
              data-bs-target="#editDocCategory"
              data-bs-toggle="modal"
              data-bs-dismiss="modal"
            >
              Cancel
            </button>
            <button
              class="btn btn-primary rounded-1 text-capitalize fw-medium"
              data-bs-dismiss="modal"
              @click.prevent="updateCategoryMethod()"
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
  name: "EditCategoryDoc",
  data() {
    return {
      fetchCategory: {
        category_name: "",
        job_id: [],
      },
      options: [],
    };
  },
  props: {
    categoryId: {
      type: [String, Number, null],
      required: true,
    },
  },
  components: { SuccessAlert },
  computed: {
    selectJobTitle() {
      const job_title = this.options.find(
        (option) => option.id === this.fetchVacancy.job_id
      );
      return job_title ? job_title.name : "";
    },
  },
  methods: {
    async fetchCategoryMethod(id) {
      if (!id) return;
      try {
        const response = await axios.get(
          `${VITE_API_URL}/document_categories/${id}`
        );
        const categoryData = response.data.category;

        this.fetchCategory = {
          category_name: categoryData.category_name || "",
          job_id: categoryData.job_id || [],
          id: categoryData.id || id,
        };

        // console.log("Fetched category ID:", categoryData);
      } catch (error) {}
    },
    async updateCategoryMethod() {
      if (!this.fetchCategory.id) {
        return;
      }
      try {
        const response = await axios.put(
          `${VITE_API_URL}/document_categories/${this.fetchCategory.id}`,
          this.fetchCategory
        );

        this.$emit("onDocAdded");

        const message = "Category updated successfully";
        this.$refs.successAlert.showSuccess(message);
      } catch (error) {
        // console.error("Error updating Category:", error);
      }
    },
    async getJobTitleMethod() {
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
  },
  watch: {
    categoryId: {
      immediate: true,
      handler(newCategoryId) {
        this.fetchCategoryMethod(newCategoryId);
      },
    },
  },
  beforeDestroy() {
    this.$options.watch.categoryId = null;
    this.getJobTitleMethod();
  },
  mounted() {},
};
</script>
