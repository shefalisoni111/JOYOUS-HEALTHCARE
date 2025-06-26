<template>
  <div>
    <!-- Modal -->
    <div class="modal fade" id="addSiteNote" aria-labelledby="addSiteNote">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="addSiteNote">Add Site Notes</h5>
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
              <form @submit.prevent="submitForm">
                <div class="mb-3 d-flex justify-content-between">
                  <div class="col-4">
                    <label class="form-label">Add Notes</label>
                  </div>
                  <div class="col-8">
                    <input type="text" class="form-control" v-model="notes" />
                    <!-- <span v-if="!isValidForm" class="text-danger">Notes Required</span> -->
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div class="modal-footer">
            <button
              class="btn btn-dark btn-cancel"
              data-bs-target="#addSiteNote"
              data-bs-toggle="modal"
              data-bs-dismiss="modal"
              v-on:click="clearFieldsData"
            >
              Cancel
            </button>
            <button
              class="btn btn-primary rounded-1 text-capitalize fw-medium"
              type="submit"
              :disabled="!isValidForm"
              data-bs-dismiss="modal"
              @click="submitForm"
            >
              Add
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
  name: "AddNotes",
  data() {
    return {
      notes: "",
    };
  },
  computed: {
    isValidForm() {
      return this.notes.trim() !== "";
    },
  },
  components: { SuccessAlert },
  methods: {
    blurActiveElement() {
      if (document.activeElement) {
        document.activeElement.blur();
      }
    },
    clearFieldsData() {
      setTimeout(() => {
        this.notes = "";
      }, 10);
    },
    submitForm() {
      if (this.isValidForm) {
        this.addSiteNote();
      }
    },
    async addSiteNote() {
      const data = {
        notes: this.notes,
      };

      try {
        const formData = new FormData();
        formData.append("site_id", this.$route.params.id);
        formData.append("notes", this.notes);

        const response = await fetch(`${VITE_API_URL}/create_site_notes`, {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          this.$emit("addSiteNote");
          this.notes = "";
          const message = "Successful Note added";
          this.$refs.successAlert.showSuccess(message);
        } else {
          // Handle error response
        }
      } catch (error) {
        // Handle fetch error
      }
    },

    clearError() {
      this.notes = "";
    },
  },
};
</script>

<style scoped>
.modal-body {
  border-radius: 5px;
}

.modal-footer {
  border-top: 0px;
}

#head {
  width: 40px;
  height: 40px;
}
label.form-label {
  text-transform: capitalize;
}

select {
  width: 100%;
  padding: 10px;
  border-radius: 4px;
  border: 0px;
}
.btn-primary {
  background-color: #ff5f30 !important;
  font-weight: bold;
  border: none;
  border-radius: 4px;
  outline: none;
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
</style>
