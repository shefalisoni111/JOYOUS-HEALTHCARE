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
        <div class="">
          <div class="row mb-3">
            <div class="d-flex justify-content-between align-items-baseline">
              <div>
                <h6>Document Categories</h6>
              </div>
              <div class="d-flex gap-1">
                <button type="button" class="btn btn-primary btn-sm">
                  <i class="bi bi-download"></i> Download All
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
                      <button class="accordion-button" type="button">
                        {{ getCate.category_name }}
                      </button>

                      <ul class="list-unstyled d-inline-flex align-items-center mb-0">
                        <li class="p-3 fs-6">
                          <button class="btn btn-warning count-doc-btn">
                            <span>!</span></button
                          >&nbsp;2
                        </li>
                        <li class=" ">
                          <button class="btn border-primary-subtle">
                            <i class="bi bi-eye"></i>
                          </button>
                        </li>

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
                        </li>
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
                              @click="toggleAccordionDocument(index, docIndex)"
                            >
                              <button class="accordion-button" type="button">
                                {{ getDocs.display_name }}
                              </button>
                              <div class="d-flex align-items-center">
                                <h6 class="mb-0">Compliant</h6>
                                <label class="switch">
                                  <input type="checkbox" id="togBtn" />
                                  <div class="slider round"></div>
                                </label>
                              </div>

                              <ul
                                class="list-unstyled d-inline-flex align-items-center mb-0"
                              >
                                <li class="">
                                  <button class="btn border-primary-subtle">
                                    <i class="bi bi-download"></i>
                                  </button>
                                </li>
                                <li class="">
                                  <button class="btn border-primary-subtle">
                                    <i class="bi bi-eye"></i>
                                  </button>
                                </li>
                                <li class="">
                                  <button class="btn border-primary-subtle">
                                    <i
                                      class="bi bi-trash"
                                      v-on:click="documentDelete(getDocs.id)"
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
                                        <label class="form-label">ISSUE DATE</label>
                                        <input
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
                                        <label class="form-label">EXPIRY DATE</label>
                                        <input
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
                                      v-on:click="addCandidateDocument()"
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
        .....
      </div>
    </div>
    <AddCategory />
  </div>
</template>

<script>
import axios from "axios";
import AddCategory from "../../modals/appsetting/AddCategory.vue";

export default {
  name: "Document",
  data() {
    return {
      getCategory: [],
      getDocument: [],
      issue_date: null,
      expiry_date: null,
      description: null,
      document_image: null,
      selectedFile: null,
    };
  },
  components: { AddCategory },
  methods: {
    handleFileChange(event) {
      const files = event.target.files;
      this.document_image = files[0];
    },
    async addCandidateDocument() {
      const token = localStorage.getItem("token");

      // Make sure getDocument is not empty before using find()
      if (this.getDocument.length > 0) {
        const selectedDocument = this.getDocument.find((doc) => doc.id);
        const data = {
          issue_date: this.issue_date,
          candidate_id: this.$route.params.id,
          document_id: selectedDocument.id,
          expiry_date: this.expiry_date,
          description: this.description,
          document_image: this.document_image,
        };

        try {
          const response = await fetch(
            "https://logezy.onrender.com/admin_upload_candidate_document",
            {
              method: "POST",
              headers: {
                Accept: "application/json",
                Authorization: "bearer " + token,
              },
              body: JSON.stringify(data),
            }
          );
          console.log(data);
          alert("Successful Submit Data");
        } catch (error) {
          console.error("Error submitting data:", error);
        }
      } else {
        console.error("No documents available to associate.");
      }
    },
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
    toggleAccordionDocument(categoryIndex, documentIndex) {
      this.getCategory[categoryIndex].documents.forEach((getDocs, i) => {
        if (i !== documentIndex) {
          getDocs.isOpen = false;
        }
      });

      // Toggle the clicked document accordion
      this.getCategory[categoryIndex].documents[documentIndex].isOpen = !this.getCategory[
        categoryIndex
      ].documents[documentIndex].isOpen;
    },

    onDocumentAdded() {
      this.getDocCAtegories;
    },

    documentDelete(id) {
      if (!window.confirm("Are you Sure ?")) {
        return;
      }
      axios.delete("https://logezy.onrender.com/documents/" + id).then((response) => {
        this.getDocumentCategories();
      });
      alert("Record Deleted ");
    },

    async getDocumentCategories() {
      try {
        const response = await axios.get("https://logezy.onrender.com/documents");
        this.getDocument = response.data;
        this.getDocument.forEach((document) => {
          document.id = id;
        });
      } catch (error) {
        // console.error("Error fetching documents:", error);
      }
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
  //  candidate category doc apis start
  created() {
    this.getDocumentCategories();
    this.getDocCAtegories();
  },

  //  candidate category doc apis end
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

.expanded {
  transform: rotate(90deg);
}
</style>
