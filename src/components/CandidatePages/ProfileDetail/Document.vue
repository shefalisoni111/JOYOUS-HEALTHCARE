<template>
  <div>
    <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
      <li class="nav-item" role="presentation">
        <button
          class="nav-link active"
          id="pills-document-tab"
          data-bs-toggle="pill"
          data-bs-target="#pills-activeDocuments"
          type="button"
          role="tab"
          aria-controls="pills-activeDocuments"
          aria-selected="true"
        >
          Active Documents
        </button>
      </li>
      <li class="nav-item" role="presentation">
        <button
          class="nav-link"
          id="deletedDocument"
          data-bs-toggle="pill"
          data-bs-target="#pills-deleteDocuments"
          type="button"
          role="tab"
          aria-controls="pills-deleteDocuments"
          aria-selected="false"
        >
          Deleted Documents
        </button>
      </li>
    </ul>

    <div class="tab-content" id="pills-tabContent">
      <div
        class="tab-pane fade show active"
        id="pills-activeDocuments"
        role="tabpanel"
        aria-labelledby="pills-document-tab"
      >
        <div>
          <div class="row mb-3">
            <div class="d-flex justify-content-between align-items-baseline">
              <div>
                <h6>Document Categories</h6>
              </div>
              <div class="d-flex gap-1">
                <button
                  type="button"
                  class="btn btn-primary btn-sm"
                  v-on:click="getDownloadDocMethod()"
                >
                  <i class="bi bi-download"></i>
                  Download All
                </button>
                <div class="d-flex align-items-center">
                  <h6 class="mb-0">Compliant All</h6>
                  <label class="switch">
                    <input type="checkbox" id="togBtn" />
                    <div class="slider round"></div>
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div class="row">
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
                      <button
                        class="accordion-button"
                        type="button"
                        :class="{ collapsed: !getCate.isOpen }"
                      >
                        {{ getCate.document_category.category_name }}
                      </button>

                      <ul class="list-unstyled d-inline-flex align-items-center mb-0">
                        <li class="p-3 fs-6">
                          <button class="btn btn-warning count-doc-btn">
                            <span>!</span></button
                          >&nbsp;{{ getCate.document_category.total_document }}
                        </li>
                        <!-- <li class=" ">
                          <button class="btn border-primary-subtle">
                            <i class="bi bi-eye"></i>
                          </button>
                        </li> -->
                        <!-- 
                        <li class="">
                          <button
                            class="btn border-primary-subtle rounded-1 text-capitalize fw-bold"
                            data-bs-toggle="modal"
                            data-bs-target="#addCategories"
                            data-bs-whatever="@mdo"
                            type="button"
                          >
                            +
                          </button>
                        </li> -->
                      </ul>
                    </h2>

                    <div class="">
                      <div class="accordion-body" v-if="getCate.isOpen">
                        <div
                          class="accordion"
                          v-for="(getDocs, docIndex) in getCate.documents"
                          :key="getDocs.id"
                        >
                          <div class="accordion-item">
                            <h2
                              class="accordion-header"
                              @click="
                                toggleAccordionDocument(
                                  getDocs.document.id,
                                  index,
                                  docIndex
                                )
                              "
                            >
                              <button
                                class="accordion-button"
                                type="button"
                                :class="{ collapsed: !getDocs.isOpen }"
                              >
                                {{ getDocs.document.document_name }}
                                <span
                                  v-if="getDocs.document.mandatory"
                                  class="ps-1"
                                  style="color: red"
                                  >*</span
                                >
                              </button>
                              <div class="d-flex align-items-center">
                                <!-- <h6 class="mb-0">Compliant</h6>
                                <label class="switch">
                                  <input type="checkbox" id="togBtn" />
                                  <div class="slider round"></div>
                                </label> -->
                              </div>

                              <ul
                                class="list-unstyled d-inline-flex align-items-center mb-0 gap-2"
                              >
                                <li class="">
                                  <button
                                    v-if="getDocs.candidate_document === null"
                                    class="d-none"
                                  ></button>
                                  <button
                                    v-else
                                    type="button"
                                    class="btn border-primary-subtle"
                                    data-bs-toggle="modal"
                                    data-bs-target="#viewDocCandidate"
                                    data-bs-whatever="@mdo"
                                    @click="
                                      viewDocument(getDocs.candidate_document.id, $event)
                                    "
                                  >
                                    <i class="bi bi-eye"></i>
                                  </button>
                                </li>

                                <li class="">
                                  <button
                                    class="d-none"
                                    v-if="getDocs.candidate_document === null"
                                  ></button>
                                  <button class="btn border-primary-subtle" v-else>
                                    <i
                                      class="bi bi-trash border-0 border-0"
                                      v-on:click="
                                        confirmed(getDocs.candidate_document.id, $event)
                                      "
                                    ></i>
                                  </button>
                                </li>
                              </ul>
                            </h2>
                            <div class="">
                              <div class="accordion-body" v-if="getDocs.isOpen">
                                <form>
                                  <div class="row">
                                    <div class="col-md-6">
                                      <div class="mb-3">
                                        <label class="form-label" for="issue"
                                          >ISSUE DATE</label
                                        >
                                        <input
                                          v-if="getDocs.candidate_document !== null"
                                          type="date"
                                          class="form-control"
                                          id="issue"
                                          placeholder="issue date"
                                          v-model="getDocs.candidate_document.issue_date"
                                          title="issue date"
                                          readonly
                                        />
                                        <input
                                          v-else
                                          type="date"
                                          class="form-control"
                                          id="issue"
                                          placeholder="issue date"
                                          v-model="issue_date"
                                          title="issue date"
                                        />
                                      </div>
                                    </div>
                                    <div class="col-6">
                                      <div class="mb-3">
                                        <label class="form-label" for="expiry"
                                          >EXPIRY DATE</label
                                        >
                                        <input
                                          v-if="getDocs.candidate_document !== null"
                                          type="date"
                                          class="form-control"
                                          id="expiry"
                                          placeholder="expiry date"
                                          v-model="getDocs.candidate_document.expiry_date"
                                          title="expiry date"
                                          readonly
                                        />
                                        <input
                                          v-else
                                          type="date"
                                          class="form-control"
                                          id="expiry"
                                          placeholder="expiry date"
                                          v-model="expiry_date"
                                          title="expiry date"
                                        />
                                      </div>
                                    </div>
                                  </div>

                                  <div class="row">
                                    <div class="mb-3">
                                      <label class="form-label">Description</label>
                                      <textarea
                                        v-if="getDocs.candidate_document !== null"
                                        class="form-control"
                                        readonly
                                        rows="3"
                                        v-model="getDocs.candidate_document.description"
                                      ></textarea>
                                      <textarea
                                        v-else
                                        class="form-control"
                                        rows="3"
                                        v-model="description"
                                      ></textarea>
                                    </div>
                                    <div class="mb-3">
                                      <label for="formFile" class="form-label"
                                        >UPLOAD DOCUMENT</label
                                      >
                                      <input
                                        v-if="getDocs.candidate_document !== null"
                                        class="form-control"
                                        type="file"
                                        id="formFile"
                                        ref="fileInput"
                                        accept="image/*"
                                        v-on:change="handleFileChange"
                                        disabled
                                      />
                                      <input
                                        v-else
                                        class="form-control"
                                        type="file"
                                        id="formFile"
                                        ref="fileInput"
                                        accept="image/*"
                                        v-on:change="handleFileChange"
                                      />
                                    </div>

                                    <button
                                      type="button"
                                      class="btn btn-primary"
                                      :disabled="!isFormValid"
                                      v-on:click="
                                        addCandidateDocument(getDocs.document.id)
                                      "
                                    >
                                      Save
                                    </button>
                                  </div>
                                </form>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        class="tab-pane fade"
        id="pills-deleteDocuments"
        role="tabpanel"
        aria-labelledby="deletedDocument"
      >
        <!-- Work in Progress... -->
        <div class="row p-2">
          <table class="table">
            <thead>
              <tr>
                <th scope="col">id</th>
                <th scope="col">Document Name</th>
                <th scope="col">Issue Date</th>
                <th scope="col">Expiry Date</th>
                <th scope="col">Description</th>
                <!-- <th scope="col" class="width-row">Image Url</th> -->
              </tr>
            </thead>
            <tbody v-if="getDeletedDocument?.length > 0">
              <tr v-for="data in getDeletedDocument" :key="data.id">
                <td>{{ data.id }}</td>
                <td>{{ data.document_name }}</td>
                <td>{{ data.issue_date }}</td>
                <td>{{ data.expiry_date }}</td>
                <td>{{ data.description }}</td>
                <!-- <td>{{ `${VITE_API_URL}${data.url}` }}</td> -->
                <td></td>
              </tr>
            </tbody>
            <tbody v-else>
              <tr>
                <td colspan="5" class="text-center text-danger" v-if="!isLoading">
                  {{ "Data Not Found!" }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <!-- <AddCategory /> -->
    <ConfirmationAlert
      :show-modal="isModalVisible"
      :message="confirmMessage"
      @confirm="confirmCallback"
      @cancel="canceled"
    />
    <!-- <ShowDetailsMessage v-if="showModal" :message="alertMessage" @close="closeModal" /> -->
    <ViewDocuments :documentId="selectedDocumentId" ref="viewDocuments" />
    <loader :isLoading="isLoading"></loader>
    <SuccessAlert ref="successAlert" />
  </div>
</template>

<script>
import axios from "axios";
// import AddCategory from "../../modals/appsetting/AddCategory.vue";
import ViewDocuments from "../../modals/CandidatePage/Documents/ViewDocuments.vue";
import { saveAs } from "file-saver";
import ConfirmationAlert from "../../Alerts/ConfirmationAlert.vue";
import Loader from "../../Loader/Loader.vue";
import SuccessAlert from "../../Alerts/SuccessAlert.vue";
import Swal from "sweetalert2";
export default {
  name: "Document",
  data() {
    return {
      getCategory: [],
      getDocument: [],
      getDeletedDocument: [],
      selectedDocumentId: 0,
      isLoading: false,
      issue_date: null,
      expiry_date: null,
      description: null,
      url: null,
      selectedFile: null,
      selectedCandidateId: null,
      errorMessage: null,
      isModalVisible: false,
      confirmMessage: "",
      confirmCallback: null,
      StaffDocumentDetails: [],
      getStaffDoc: [],
      selectedDocumentId: null,
      // showModal: false,
      // alertMessage: "",
    };
  },
  components: { ViewDocuments, ConfirmationAlert, Loader, SuccessAlert },
  computed: {
    isFormValid() {
      return this.issue_date && this.expiry_date && this.description && this.url;
    },
  },

  methods: {
    isDownloadDisabled() {
      return !this.getCate.documents;
    },
    viewDocument(documentId, event) {
      event.stopPropagation();
      this.selectedCandidateId = documentId;
      this.$refs.viewDocuments.getDocumentDetails();
    },
    handleFileChange(event) {
      const files = event.target.files;

      if (files.length > 0) {
        this.url = files[0];
        // this.filePreview = URL.createObjectURL(this.url);
      }
    },
    async addCandidateDocument(id) {
      const token = localStorage.getItem("token");

      if (this.getDocument.length > 0) {
        const selectedDocument = this.getDocument[0];

        const formData = new FormData();
        formData.append("candidate_document[candidate_id]", this.$route.params.id);
        formData.append("candidate_document[document_id]", id);
        formData.append("candidate_document[issue_date]", this.issue_date);
        formData.append("candidate_document[expiry_date]", this.expiry_date);
        formData.append("candidate_document[description]", this.description);
        formData.append("candidate_document[document_image]", this.url);

        try {
          const response = await fetch(
            `${VITE_API_URL}/admin_upload_candidate_document`,
            {
              method: "POST",
              headers: {
                Accept: "application/json",
                Authorization: "bearer " + token,
              },
              body: formData,
            }
          );

          const responseData = await response.json();

          if (response.ok) {
            this.getDocCAtegories();
            // alert("Successful Submit Data");
            this.issue_date = null;
            this.expiry_date = null;
            this.description = null;
            this.url = null;
            const message = "Successful Submit Data";
            this.$refs.successAlert.showSuccess(message);
          } else {
            // Handle error appropriately
            // console.error("Error submitting data:", responseData);
          }
        } catch (error) {
          // console.error("Error submitting data:", error);
        }
      } else {
        // console.error("No documents available to associate.");
      }
    },
    toggleAccordion(index) {
      this.getCategory.forEach((getCate, i) => {
        if (i !== index) {
          getCate.isOpen = false;
        }
      });

      this.getCategory[index].isOpen = !this.getCategory[index].isOpen;
    },
    toggleAccordionDocument(documentId, categoryIndex, documentIndex) {
      //     this.getCategory[categoryIndex].documents.forEach((doc, i) => {
      //     doc.isOpen = i === documentIndex ? !doc.isOpen : false;
      //  });
      this.getCategory[categoryIndex].documents.forEach((getDocs, i) => {
        if (i !== documentIndex) {
          getDocs.isOpen = false;
        }
      });

      this.getCategory[categoryIndex].documents[documentIndex].isOpen = !this.getCategory[
        categoryIndex
      ].documents[documentIndex].isOpen;
    },

    onDocumentAdded() {
      this.getDocCAtegories();
    },
    confirmed(id, event) {
      this.isModalVisible = false;

      this.documentDelete(id, event);
    },
    canceled() {
      this.isModalVisible = false;
    },
    documentDelete(id, event) {
      event.stopPropagation();
      this.confirmMessage = "Are you sure want to delete?";
      this.isModalVisible = true;
      this.confirmCallback = async () => {
        axios.put(`${VITE_API_URL}/delete_candidate_document/` + id).then((response) => {
          this.getDocCAtegories();
          this.getDeletedDocumentListMethod();
        });
        this.isModalVisible = false;
        const message = "Successful Deleted Data";
        this.$refs.successAlert.showSuccess(message);
      };
    },

    async getDocumentCategories() {
      this.isLoading = true;
      try {
        const response = await axios.get(`${VITE_API_URL}/documents`);
        this.getDocument = response.data;

        this.getDocument.forEach((document) => {
          document.id = id;
        });
      } catch (error) {
        // console.error("Error fetching documents:", error);
      } finally {
        this.isLoading = false;
      }
    },
    // closeModal() {
    //   this.showModal = false;
    // },
    async getDownloadDocMethod() {
      try {
        try {
          const response = await axios.get(
            `${VITE_API_URL}/download_document/${this.$route.params.id}`,
            { responseType: "json" }
          );

          const imageUrls = response.data.image_urls;

          for (const imageUrlObject of imageUrls) {
            const imageUrl = `${VITE_API_URL}${imageUrlObject.image_url.split("?")[0]}`;
            const documentId = imageUrlObject.document_id;
            const filename = imageUrl
              .split("/")
              .pop()
              .split("?")[0]
              .replace(/[^\w\s.]/gi, "");
            const imageResponse = await axios.get(imageUrl, { responseType: "blob" });
            saveAs(imageResponse.data, filename);
          }
        } catch (error) {
          if (error.response && error.response.status === 404) {
            await Swal.fire({
              icon: "warning",

              text: "Staff document Not found!",
              confirmButtonText: "OK",
            });
          }
          // console.error("Error fetching document:", error);
        }
      } catch (error) {
        // console.error("Error fetching documents:", error);
      }
    },
    async getDeletedDocumentListMethod() {
      this.isLoading = true;
      try {
        const candidateId = this.$route.params.id;
        const response = await axios.get(
          `${VITE_API_URL}/deleted_candidate_document_list?candidate_id=${candidateId}`
        );
        this.getDeletedDocument = response.data;
        // this.getDeletedDocumentListMethod();
      } catch (error) {
        // console.error("Error fetching documents:", error);
      } finally {
        this.isLoading = false;
      }
    },
    async getDocCAtegories() {
      try {
        const response = await axios.get(
          `${VITE_API_URL}/candidate_documentlist_on_admin/${this.$route.params.id}`
        );

        this.getCategory = response.data;
        this.StaffDocumentDetails = response.data.candidate_document;

        this.getCategory.forEach((category) => {
          category.documents.forEach((doc) => {
            this.getStaffDoc = {
              ...doc.candidate_document,
              issue_date: doc.candidate_document.issue_date || "",
              expiry_date: doc.candidate_document.expiry_date || "",
              description: doc.candidate_document.description || "",
            };
            if (doc.candidate_document !== null) {
              if (doc.candidate_document.document_name === doc.document.document_name) {
                if (doc.candidate_document !== null) {
                  if (
                    doc.candidate_document.document_name === doc.document.document_name
                  ) {
                  }
                } else {
                  this.issue_date = "";
                  this.expiry_date = "";
                  this.description = "";
                }
              }
            } else {
              this.issue_date = "";
              this.expiry_date = "";
              this.description = "";
            }
          });
        });
      } catch (error) {
        // console.error("Error fetching document categories:", error);
      }
    },
    async viewDocument(id, event) {
      this.selectedDocumentId = id;
      event.stopPropagation();
    },
  },
  async beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.this.getDocumentCategories();
      vm.this.getDocCAtegories();
      vm.this.getDeletedDocumentListMethod();
    });
  },
  async beforeRouteUpdate(to, from, next) {
    this.getDocumentCategories();
    this.getDocCAtegories();
    this.getDeletedDocumentListMethod();
    next();
  },

  mounted() {
    this.getDocumentCategories();
    this.getDocCAtegories();
    this.getDeletedDocumentListMethod();
  },
};
</script>

<style scoped>
.fs-smaller {
  font-size: smaller;
}
.borderbottom {
  border-bottom: 1px solid #ebe2e2;
}

button.count-doc-btn {
  border-radius: 50%;
  padding: 4px 13px;
  font-weight: bold;
}
.accordion-button {
  width: 25%;
  background-color: transparent;
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
.profile {
  border-radius: 0px;
  border-top: 1px solid transparent;
}
#main {
  transition: all 0.3s;
  padding: 10px;
  transition: all 0.3s;
}
.bg-white {
  border-left: 1px solid #dedede;
}

.bg-orange-light {
  background: #fef8f8;
  background-color: #fdce5e17;
}
.card ul li {
  display: inline-block;
}

table th {
  font-size: 14px;
}
.card {
  border-radius: 0px;
}

.border-box {
  border: 1px solid lightgrey;
  padding: 12px;
  border-radius: 4px;
}
.card .round {
  background: #ff572266;
  border-radius: 50%;
  padding: 10px 7px;
  margin-right: 8px;
}

.card .hround {
  background: #ff572266;
  border-radius: 50%;
  padding: 10px 11px;
  margin-right: 8px;
}
.card .dround {
  background: #ff572266;
  border-radius: 50%;
  padding: 12px 17px;
  margin-right: 8px;
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
.form-check-input {
  border: 2px solid grey;
}
.btn-primary {
  border: none;
}
.switch .slider {
  position: absolute;
  top: -3;
  bottom: 0;
  right: 0;
  left: 0;
  cursor: pointer;
  background-color: #e7ecf1;
  border-radius: 30px !important;
  border: 0;
  padding: 0;
  display: block;
  margin: 3px 10px;
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
  font-family: "Inter", sans-serif;
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

.nav-pills .nav-link.active,
.nav-pills .show > .nav-link {
  color: #ff5722;

  border-bottom: 3px solid #ff5722;
  border-radius: 0px;
  background-color: transparent;
}
.nav-pills .nav-link {
  color: grey;
}
ul.nav-pills {
  border-bottom: 1px solid grey;
}
.nav-pills .nav-link {
  border-radius: 0px;
  padding: 5px 13px;
}

.accordion-item {
  margin-bottom: 8px;
}

.accordion-header {
  padding: 8px;
  cursor: pointer;
  background-color: #f1f1f1;
  border-bottom: 1px solid #ccc;
  display: flex;
  justify-content: space-between;
}

.accordion-icon {
  font-size: 16px;
  transition: transform 0.3s;
}
table tr th.width-row {
  width: 50px;
}
.expanded {
  transform: rotate(90deg);
}
</style>
