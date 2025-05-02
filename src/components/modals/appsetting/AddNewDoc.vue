<template>
  <div>
    <!-- Modal -->
    <div class="modal fade" id="addDoc" aria-labelledby="addDoc">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="addDoc">Add New Document</h5>
          </div>
          <div class="modal-body mx-3">
            <div class="row g-3 align-items-center">
              <form>
                <div class="mb-3">
                  <div class="">
                    <label class="form-label">DOCUMENT NAME</label>
                  </div>
                  <div class="mt-1">
                    <input
                      type="text"
                      class="form-control"
                      v-model="document_name"
                    />
                  </div>
                </div>

                <div class="mb-3">
                  <table class="table">
                    <thead></thead>
                    <tbody>
                      <tr>
                        <td>MANDATORY</td>
                        <td>
                          <label class="switch">
                            <input
                              type="checkbox"
                              id="togBtn"
                              v-model="mandatory"
                            />
                            <div class="slider round"></div>
                          </label>
                        </td>
                      </tr>
                      <tr>
                        <td>HIDE</td>
                        <td>
                          <label class="switch">
                            <input
                              type="checkbox"
                              id="togBtn"
                              v-model="hide_document"
                            />
                            <div class="slider round"></div>
                          </label>
                        </td>
                      </tr>
                      <tr>
                        <td>PROFILE VIEW</td>
                        <td>
                          <label class="switch">
                            <input
                              type="checkbox"
                              id="togBtn"
                              v-model="profile_view"
                            />
                            <div class="slider round"></div>
                          </label>
                        </td>
                      </tr>

                      <!-- <tr>
                        <td>EXPIRY DATE</td>
                        <td>
                          <label class="switch">
                            <input type="checkbox" id="togBtn" v-model="mandatory" />
                            <div class="slider round"></div>
                          </label>
                        </td>
                      </tr> -->
                    </tbody>
                  </table>
                </div>
              </form>
            </div>
          </div>
          <div class="modal-footer">
            <button
              class="btn btn-dark btn-cancel"
              data-bs-target="#addDoc"
              data-bs-toggle="modal"
              data-bs-dismiss="modal"
            >
              Cancel
            </button>
            <button
              class="btn btn-primary rounded-1 text-capitalize fw-medium"
              data-bs-dismiss="modal"
              v-on:click="addCandidateStatus()"
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
  name: "AddNewDoc",
  props: {
    categoryId: {
      type: [String, Number, null],
      required: true,
    },
  },
  data() {
    return {
      id: "",
      document_name: "",
      document_category_id: "",
      mandatory: null,
      hide_document: null,
      profile_view: null,
      error: [],
      getCategoryData: [],
    };
  },
  components: { SuccessAlert },
  methods: {
    async addCandidateStatus() {
      try {
        const data = {
          document_name: this.document_name,
          document_category_id: this.categoryId,
          mandatory: this.mandatory,
          hide_document: this.hide_document,
          profile_view: this.profile_view,
        };

        const response = await fetch(`${VITE_API_URL}/documents`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        if (response.ok) {
          this.$emit("documentAdded");
          const message = "Staff Document Add Successful";
          this.$refs.successAlert.showSuccess(message);
          this.document_name = "";
          this.document_category_id = "";
          this.mandatory = "";
          this.hide_document = "";
          this.profile_view = "";
        }
      } catch (error) {
        // console.error("Error adding document:", error);
      }
    },
    async newDocAdd() {
      try {
        const response = await axios.get(`${VITE_API_URL}/document_categories`);
        this.getCategoryData = response.data;

        const currentCategory = this.getCategoryData.find(
          (category) => category.document_category_id !== null
        );

        if (currentCategory) {
          this.document_category_id = currentCategory.id;
        }
      } catch (error) {
        // console.error("Error fetching documents:", error);
      }
    },
  },
  async beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.newDocAdd();
    });
  },
  async beforeRouteUpdate(to, from, next) {
    this.newDocAdd();

    next();
  },
  created() {},
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

.modal-footer {
  border-top: 0px;
}
.table > :not(caption) > * > * {
  background: none;
}
table td > i {
  font-size: 18px;
}

.switch {
  position: relative;
  display: inline-block;
  width: 90px;
  height: 34px;
}

.switch input {
  display: none;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #b8b1b1;
  -webkit-transition: 0.4s;
  transition: 0.4s;
  border-radius: 34px;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: #ff5722;
  -webkit-transition: 0.4s;
  transition: 0.4s;
  border-radius: 50%;
}

input:checked + .slider {
  background-color: #b8b1b1;
}

input:focus + .slider {
  box-shadow: 0 0 1px #2196f3;
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(55px);
}

/*------ ADDED CSS ---------*/
.slider:after {
  content: "OFF";
  color: rgb(18, 16, 16);
  display: block;
  position: absolute;
  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;
  font-size: 10px;
  font-family: "Inter", sans-serif;
}

input:checked + .slider:after {
  content: "ON";
}

/*--------- END --------*/
</style>
