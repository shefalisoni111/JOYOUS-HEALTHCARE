<template>
  <div>
    <!-- Modal -->
    <div
      class="modal fade"
      id="editDocCategory"
      aria-labelledby="editDocCategory"
      tabindex="-1"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="editDocCategory">Edit Category</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
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
              </form>
            </div>
          </div>
          <div class="modal-footer">
            <button
              class="btn btn-secondary rounded-1"
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
  </div>
</template>
<script>
import axios from "axios";

export default {
  name: "EditCategoryDoc",
  data() {
    return {
      fetchCategory: {
        category_name: "",
      },
    };
  },
  props: {
    categoryId: {
      type: [String, Number, null],
      required: true,
    },
  },

  methods: {
    async fetchCategoryMethod(id) {
      try {
        const response = await axios.get(`${VITE_API_URL}/document_categories/${id}`);
        this.fetchCategory = { ...this.fetchCategory, ...response.data.data };
      } catch (error) {
        // Handle error if needed
      }
    },
    async updateCategoryMethod() {
      try {
        const response = await axios.put(
          `${VITE_API_URL}/document_categories/${this.fetchCategory.id}`,
          this.fetchCategory
        );

        this.$emit("onDocAdded");
        alert("Category updated successfully");
      } catch (error) {
        // Handle error if needed
        // console.error("Error updating Category:", error);
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
  },
};
</script>
