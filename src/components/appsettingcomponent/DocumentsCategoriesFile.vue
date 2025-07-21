<template>
  <div class="col-12">
    <div class="settingsdetails">
      <div class="pagetitle d-flex justify-content-between">
        <div class="d-flex align-items-center">
          <ul class="breadcrumb mb-1 py-2">
            <li class="breadcrumb-item active text-capitalize fw-bold">
              General setting /
              <span style="color: #000000">Document Categories</span>
            </li>
          </ul>
        </div>
        <!-- End Page Title -->
      </div>
    </div>
    <div class="col-12 d-flex justify-content-between align-items-center my-4">
      <div class="text-capitalize">
        <h6 class="fw-bold">Document Categories</h6>
      </div>
      <div class="">
        <button
          class="btn btn-primary rounded-1 text-capitalize fw-bold"
          data-bs-toggle="modal"
          data-bs-target="#addCategories"
          data-bs-whatever="@mdo"
          type="button"
          @click="handleAddCategory()"
        >
          + Add categories
        </button>
      </div>
    </div>
    <div class="col-12">
      <div class="" v-if="paginateSiteData?.length > 0">
        <div class="row">
          <div class="col-md-12">
            <div class="d-flex flex-wrap gap-2">
              <div
                class="accordion-item mb-2"
                v-for="(getCate, index) in paginateSiteData"
                :key="index"
                style="flex: 1 1 150px"
              >
                <h2
                  class="accordion-header d-flex justify-content-between align-items-center px-3 py-2 rounded"
                  style="
                    cursor: pointer;
                    background: none !important;
                    border: none;
                  "
                  @click="toggleAccordion(index)"
                >
                  <button
                    class="accordion-button bg-white border-0 p-0 w-100 d-flex flex-column text-center"
                    type="button"
                    :class="{ collapsed: activeIndex !== index }"
                  >
                    <img
                      src="../../assets/file.png"
                      class="img-fluid pe-2"
                      alt="file"
                      loading="eager"
                    />
                    {{ getCate.category_name }}
                  </button>
                </h2>
              </div>
            </div>
          </div>

          <div class="col-md-12 mt-3">
            <div
              v-if="activeIndex !== null && paginateSiteData[activeIndex]"
              class="accordion-body rounded"
            >
              <div
                class="d-flex justify-content-between align-items-center border p-3"
              >
                <h4 class="mb-3">
                  {{ paginateSiteData[activeIndex].category_name }}
                </h4>

                <div class="mb-3 d-flex justify-content-end gap-2">
                  <button
                    class="btn btn-lg border-0"
                    data-bs-toggle="modal"
                    data-bs-target="#editDocCategory"
                    @click="
                      editCategory($event, paginateSiteData[activeIndex].id)
                    "
                  >
                    <i class="bi bi-pen-fill" style="color: #ffc107"></i> Edit
                  </button>

                  <button
                    class="btn text-danger btn-lg border-0"
                    @click="confirmedCat(paginateSiteData[activeIndex].id)"
                  >
                    <i class="bi bi-trash-fill" style="color: #ffc107"></i>
                    <span style="color: #ffc107">Delete</span>
                  </button>

                  <button
                    class="btn btn-primary rounded-1 text-capitalize fw-bold"
                    data-bs-toggle="modal"
                    data-bs-target="#addDoc"
                    @click="selectCategory(paginateSiteData[activeIndex].id)"
                  >
                    + Add Document
                  </button>
                </div>
              </div>

              <table class="table">
                <thead>
                  <tr class="text-center">
                    <th>Document</th>
                    <th>Mandatory</th>
                    <th>Expiry Date</th>
                    <th>Profile View</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="getDocs in paginateSiteData[activeIndex].documents"
                    :key="getDocs.id"
                    class="text-center"
                  >
                    <td>{{ getDocs.display_name }}</td>
                    <td>
                      <label class="switch">
                        <input
                          type="checkbox"
                          :checked="getDocs.mandatory"
                          :disabled="isCheckboxDisabled(getDocs, 'mandatory')"
                        />
                        <span class="slider round"></span>
                      </label>
                    </td>
                    <td>
                      <label class="switch">
                        <input
                          type="checkbox"
                          :checked="getDocs.hide_document"
                          :disabled="
                            isCheckboxDisabled(getDocs, 'hide_document')
                          "
                        />
                        <span class="slider round"></span>
                      </label>
                    </td>
                    <td>
                      <label class="switch">
                        <input
                          type="checkbox"
                          :checked="getDocs.profile_view"
                          :disabled="
                            isCheckboxDisabled(getDocs, 'profile_view')
                          "
                        />
                        <span class="slider round"></span>
                      </label>
                    </td>
                    <td>
                      <i
                        class="bi bi-trash-fill text-danger"
                        @click="confirmed(getDocs.id)"
                        style="cursor: pointer"
                      ></i>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <div class="text-center text-danger" v-if="!isLoading">
          {{ "Data Not Found!" }}
        </div>
      </div>
    </div>
    <div
      class="mx-3 mt-3 d-flex justify-content-between"
      style="text-align: right"
      v-if="getCategory?.length > 10"
    >
      <div class="d-flex">
        <h6 class="d-flex align-items-center">Show: &nbsp;</h6>
        <button
          class="btn btn-sm dropdown-toggle rounded-[12px] border border-[1px] p-3 border"
          style="color: #00000080"
          type="button"
          id="recordsPerPageDropdown"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          {{ itemsPerPage }} Records
        </button>
        <ul class="dropdown-menu" aria-labelledby="recordsPerPageDropdown">
          <li>
            <a class="dropdown-item" href="#" @click="setItemsPerPage(20)"
              >20 Records</a
            >
          </li>
          <li>
            <a class="dropdown-item" href="#" @click="setItemsPerPage(50)"
              >50 Records</a
            >
          </li>
          <li>
            <a class="dropdown-item" href="#" @click="setItemsPerPage(100)"
              >100 Records</a
            >
          </li>
        </ul>
      </div>
      <div class="d-flex align-items-center">
        &nbsp;&nbsp;
        <button
          class="btn btn-sm mr-2 rounded-[12px] border border-[1px] p-3 border px-4"
          style="background: #ffffff"
          :disabled="currentPage === 1"
          @click="changePage(currentPage - 1)"
        >
          <i class="bi bi-chevron-left"></i>
        </button>
        &nbsp;&nbsp;
        <button
          class="btn btn-sm mr-2 rounded-[12px] border border-[1px] p-3 border px-4 cursor-none fw-bolder"
          style="background: #ffffff; color: #f9944b"
        >
          {{ currentPage }}
        </button>
        &nbsp;&nbsp;
        <button
          class="btn btn-sm ml-2 rounded-[12px] border border-[1px] p-3 border px-4"
          style="background: #ffffff"
          :disabled="currentPage === totalPages"
          @click="changePage(currentPage + 1)"
        >
          <i class="bi bi-chevron-right"></i>
        </button>
      </div>
    </div>
    <ConfirmationAlert
      :show-modal="isModalVisible"
      :message="confirmMessage"
      @confirm="confirmCallback"
      @cancel="canceled"
    />
    <AddNewDoc
      :categoryId="selectedCategoryId"
      @documentAdded="onDocumentAdded"
      ref="addNewDoc"
    />
    <EditCategoryDoc
      :categoryId="selectedCategoryId"
      @onDocAdded="getDocCAtegories"
      ref="editCategory"
    />
    <AddCategory
      :categoryId="selectedCategoryId"
      @onCategoryAdded="getDocCAtegories"
      ref="addCategory"
    />
    <loader :isLoading="isLoading"></loader>
  </div>
</template>

<script>
import axios from "axios";
import AddNewDoc from "../modals/appsetting/AddNewDoc.vue";
import AddCategory from "../modals/appsetting/AddCategory.vue";
import EditCategoryDoc from "../modals/appsetting/EditCategoryDoc.vue";
import Loader from "../Loader/Loader.vue";
import ConfirmationAlert from "../Alerts/ConfirmationAlert.vue";

export default {
  name: "DocumentCategories",

  data() {
    return {
      getCategory: [],
      getDocument: [],
      selectedCategoryId: null,
      activeIndex: null,
      isLoading: false,
      isModalVisible: false,
      confirmMessage: "",
      confirmCallback: null,
      currentPage: 1,
      itemsPerPage: 10,
      totalPages: 0,
    };
  },
  components: {
    AddNewDoc,
    AddCategory,
    EditCategoryDoc,
    Loader,
    ConfirmationAlert,
  },
  watch: {
    // paginateSiteData(newVal) {
    //   if (
    //     this.activeIndex !== null &&
    //     (this.activeIndex < 0 || this.activeIndex >= newVal.length)
    //   ) {
    //     this.activeIndex = null;
    //   }
    // },
  },
  computed: {
    paginateSiteData() {
      if (this.getCategory && Array.isArray(this.getCategory)) {
        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        const endIndex = startIndex + this.itemsPerPage;
        return this.getCategory.slice(startIndex, endIndex);
      }
      return [];
    },
    totalRecordsOnPage() {
      return this.paginateSiteData.length;
    },
  },
  methods: {
    toggleActionMenu(index) {
      this.selectedRow = this.selectedRow === index ? null : index;
    },
    isCheckboxDisabled(doc, field) {
      return doc[field] !== undefined;
    },
    handleAddCategory() {
      this.$refs.addCategory.getPositionMethod();
    },
    editCategory(event, categoryId) {
      event.stopPropagation();
      this.selectedCategoryId = categoryId;

      this.$refs.editCategory.getJobTitleMethod();
      this.$refs.editCategory.fetchCategoryMethod(categoryId);
    },
    toggleAccordion(index) {
      this.activeIndex = this.activeIndex === index ? null : index;
    },
    onDocumentAdded() {
      this.getDocCAtegories();
    },
    selectCategory(categoryId) {
      this.selectedCategoryId = categoryId;
      this.$refs.addNewDoc.addNewDocMEthod();
    },
    confirmed(id) {
      this.isModalVisible = false;

      this.confirmed(id);
      this.documentDelete(id);
    },
    canceled() {
      this.isModalVisible = false;
    },

    confirmed(id) {
      this.confirmMessage = "Are you sure want to delete?";
      this.isModalVisible = true;
      this.confirmCallback = async () => {
        try {
          await axios.delete(`${VITE_API_URL}/documents/` + id);
          this.getDocCAtegories();
        } catch (error) {
          // console.error("Error deleting document:", error);
        } finally {
          this.isModalVisible = false;
        }
      };
    },
    confirmedCat(id) {
      this.confirmMessage = "Are you sure want to delete?";
      this.isModalVisible = true;
      this.confirmCallback = async () => {
        try {
          await axios.delete(`${VITE_API_URL}/document_categories/` + id);
          this.getDocCAtegories();
        } catch (error) {
          // console.error("Error deleting document:", error);
        } finally {
          this.isModalVisible = false;
        }
      };
    },
    documentDelete(id) {
      this.confirmMessage = "Are you sure want to delete?";
      this.isModalVisible = true;
      this.confirmCallback = async () => {
        axios.delete(`${VITE_API_URL}/documents/` + id).then((response) => {
          this.getDocCAtegories();
        });
        this.isModalVisible = false;
      };
    },
    getDocumentCategories() {
      axios
        .get(`${VITE_API_URL}/documents`)
        .then((response) => (this.getDocument = response.data));
    },
    setItemsPerPage(value) {
      this.itemsPerPage = value;
      this.currentPage = 1;
      this.getDocCAtegories();
    },
    changePage(page) {
      this.currentPage = page;
      this.getDocCAtegories();
    },
    async getDocCAtegories() {
      this.isLoading = true;
      try {
        const response = await axios.get(
          `${VITE_API_URL}/document_categories`,
          {
            page: this.currentPage,
            per_page: this.itemsPerPage,
          }
        );

        this.getCategory = response.data;
        this.totalPages = response.data.total_pages || 1;
        this.totalCount = response.data.total_count || this.getCategory.length;
      } catch (error) {
        // console.error("Error fetching document categories:", error);
      } finally {
        this.isLoading = false;
      }
    },
  },
  beforeRouteUpdate(to, from, next) {
    this.getDocCAtegories();
    next();
  },
  mounted() {
    // this.getDocumentCategories();
    this.getDocCAtegories();
  },
};
</script>

<style scoped>
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
.cursor-pointer {
  cursor: pointer;
}
.accordion-button:focus {
  z-index: 3;
  border-color: none;
  outline: 0;
  box-shadow: none;
}
.accordion-button {
  background-color: transparent !important;
}
.accordion-button:after {
  display: none;
}
.accordion-button:not(.collapsed) {
  border: none;
  background: transparent;
  box-shadow: none;
}

.accordion-header {
  cursor: pointer;
  padding: 10px;
  background-color: #f1f1f1;

  position: relative;
}
.accordion-item {
  border: 1px solid #ffc107;
  transition: 0.3s ease-in-out;
}
.accordion-item:hover {
  transform: scale(1.02);
}
.arrow-up,
.arrow-down {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
}

.arrow-up::before {
  content: "\F235";
}

.arrow-down::before {
  content: " \F229";
}
.accordion-content {
  padding: 10px;
  border-top: 1px solid #ddd;
}

.btn-primary {
  border: none;
}
</style>
