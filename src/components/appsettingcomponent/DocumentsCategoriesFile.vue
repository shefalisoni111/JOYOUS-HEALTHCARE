<template>
  <div class="col-12">
    <div class="settingsdetails">
      <div class="pagetitle d-flex justify-content-between">
        <div class="d-flex align-items-center">
          <ol class="breadcrumb mb-1 py-2">
            <li class="breadcrumb-item active text-uppercase fw-bold">
              genral setting / <span>Document Categories</span>
            </li>
          </ol>
        </div>
        <!-- End Page Title -->
      </div>
    </div>
    <div class="col-12 d-flex justify-content-between align-items-center my-4">
      <div class="text-uppercase">
        <h6 class="fw-bold">Document Categories</h6>
      </div>
      <div class="">
        <button
          class="btn btn-primary rounded-1 text-uppercase fw-bold"
          data-bs-toggle="modal"
          data-bs-target="#addCategories"
          data-bs-whatever="@mdo"
          type="button"
        >
          Add categories
        </button>
      </div>
    </div>
    <div class="col-12">
      <div class="">
        <div
          class="accordion mt-3"
          v-for="(getCate, index) in getCategory"
          :key="index"
        >
          <div class="accordion-item">
            <h2
              class="accordion-header d-flex justify-content-between align-items-center"
              @click="toggleAccordion(index)"
            >
              <button class="accordion-button" type="button">
                {{ getCate.category_name }}
              </button>

              <ul class="list-unstyled d-inline-flex align-items-center mb-0">
                <li class="p-3">
                  <i class="bi bi-pen"></i>
                </li>
                <li class="p-3">
                  <i
                    class="bi bi-trash"
                    v-on:click="categoryDelete(getCate.id)"
                  ></i>
                </li>
                <li class="p-3">
                  <button
                    class="btn border-primary-subtle rounded-1 text-capitalize fw-bold"
                    data-bs-toggle="modal"
                    data-bs-target="#addDoc"
                    data-bs-whatever="@mdo"
                    type="button"
                    @click="selectCategory(getCate.id)"
                  >
                    + Add Document
                  </button>
                </li>
              </ul>
            </h2>

            <div class="">
              <div class="accordion-body" v-if="getCate.isOpen">
                <table class="table table-hover">
                  <thead>
                    <tr>
                      <th scope="col">Document</th>
                      <th scope="col">Mandatory</th>
                      <th scope="col">Hide</th>
                      <th scope="col">Profile View</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="getDocs in getCate.documents" :key="getDocs.id">
                      <td>{{ getDocs.display_name }}</td>
                      <td>
                        <label
                          class="switch"
                          :class="{ checked: getDocs.mandatory }"
                        >
                          <input
                            type="checkbox"
                            id="togBtn"
                            :checked="getDocs.mandatory"
                          />
                          <div class="slider round"></div>
                        </label>
                      </td>
                      <td>
                        <label
                          class="switch"
                          :class="{ checked: getDocs.hide_document }"
                        >
                          <input
                            type="checkbox"
                            id="togBtn"
                            :checked="getDocs.hide_document"
                            @change="getDocumentCategories"
                          />
                          <div class="slider round"></div>
                        </label>
                      </td>
                      <td>
                        <label
                          class="switch"
                          :class="{ checked: getDocs.profile_view }"
                        >
                          <input
                            type="checkbox"
                            id="togBtn"
                            :checked="getDocs.profile_view"
                            @change="getDocumentCategories"
                          />
                          <div class="slider round"></div>
                        </label>
                      </td>
                      <td>
                        <i
                          class="bi bi-trash"
                          @click="documentDelete(getDocs.id)"
                        ></i>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <AddNewDoc
      :categoryId="selectedCategoryId"
      @documentAdded="onDocumentAdded"
    />
    <AddCategory />
  </div>
</template>

<script>
import axios from "axios";
import AddNewDoc from "../modals/appsetting/AddNewDoc.vue";
import AddCategory from "../modals/appsetting/AddCategory.vue";

export default {
  name: "DocumentCategories",

  data() {
    return {
      getCategory: [],
      getDocument: [],
      selectedCategoryId: null,
    };
  },
  components: {
    AddNewDoc,
    AddCategory,
  },

  methods: {
    toggleAccordion(index) {
      // Close all accordions
      this.getCategory.forEach((getCate, i) => {
        if (i !== index) {
          getCate.isOpen = false;
        }
      });

      // Toggle the clicked accordion
      this.getCategory[index].isOpen = !this.getCategory[index].isOpen;
    },
    onDocumentAdded() {
      this.getDocCAtegories;
    },
    selectCategory(categoryId) {
      this.selectedCategoryId = categoryId;
    },
    categoryDelete(id) {
      if (!window.confirm("Are you Sure ?")) {
        return;
      }
      axios
        .delete("https://logezy.onrender.com/document_categories/" + id)
        .then((response) => {
          this.getDocCAtegories();
        });
      alert("Record Deleted ");
    },
    documentDelete(id) {
      if (!window.confirm("Are you Sure ?")) {
        return;
      }
      axios
        .delete(`https://logezy.onrender.com/documents/` + id)
        .then((response) => {
          this.getDocCAtegories();
        });
      alert("Record Deleted ");
    },
    getDocumentCategories() {
      axios
        .get("https://logezy.onrender.com/documents")
        .then((response) => (this.getDocument = response.data));
    },
    async getDocCAtegories() {
      try {
        const response = await axios.get(
          "https://logezy.onrender.com/document_categories"
        );

        this.getCategory = response.data;
      } catch (error) {
        // console.error("Error fetching document categories:", error);
      }
    },
  },
  created() {
    // this.getDocumentCategories();
    this.getDocCAtegories();
  },
};
</script>

<style scoped>
/* Add your styling for accordion here */

.main-doc {
  border: 1px solid rgb(167, 167, 167);
  border-radius: 4px;
}
ul li i {
  border: 1px solid rgb(167, 167, 167);
  padding: 8px;
  font-size: 15px;
}
.accordion-button {
  width: 25%;
}
.accordion-button:focus {
  z-index: 3;
  border-color: none;
  outline: 0;
  box-shadow: none;
}
.accordion-button:not(.collapsed) {
  border: none;
  background: transparent;
  box-shadow: none;
}
.switch {
  width: 50px;
  height: 17px;
  position: relative;
  display: inline-block;
}

.switch input {
  display: none;
}

.switch .slider {
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  cursor: pointer;
  background-color: #e7ecf1;
  border-radius: 30px !important;
  border: 0;
  padding: 0;
  display: block;
  margin: 12px 10px;
  min-height: 11px;
}

.switch .slider:before {
  position: absolute;
  background-color: #aaa;
  height: 15px;
  width: 15px;
  content: "";
  left: 0px;
  bottom: -2px;
  border-radius: 50%;
  transition: ease-in-out 0.5s;
}

.switch .slider:after {
  content: "";
  color: white;
  display: block;
  position: absolute;
  transform: translate(-50%, -50%);
  top: 50%;
  left: 70%;
  transition: all 0.5s;
  font-size: 10px;
  font-family: Verdana, sans-serif;
}

.switch input:checked + .slider:after {
  transition: all 0.5s;
  left: 30%;
  content: "";
}

.switch input:checked + .slider {
  background-color: #d3d6d9;
}

.switch input:checked + .slider:before {
  transform: translateX(15px);
  background-color: #ff9800;
}

table thead th {
  background-color: #f9944b !important;
}
.accordion-header {
  cursor: pointer;
  padding: 10px;
  background-color: #f1f1f1;
  border: 1px solid #ddd;
  position: relative;
}

.arrow-up,
.arrow-down {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
}

.arrow-up::before {
  content: "\F235"; /* Unicode character for up arrow */
}

.arrow-down::before {
  content: " \F229"; /* Unicode character for down arrow */
}

.accordion-content {
  padding: 10px;
  border-top: 1px solid #ddd;
}

.btn-primary {
  border: none;
}
</style>
