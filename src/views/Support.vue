<template>
  <div>
    <div id="main" class="d-flex">
      <div
        style="
          background: #fff;

          border-radius: 20px;
        "
      >
        <Navbar />
      </div>
      <div class="container-fluid px-5 pt-4 content-area" style="height: 100vh">
        <div class="p-0">
          <div class="">
            <ol class="breadcrumb my-2">
              <li class="breadcrumb-item active fs-6">
                <a
                  class="nav-link d-inline fs-4 fw-bolder"
                  style="color: #000000; background: none !important"
                  >Support</a
                >
              </li>
            </ol>
          </div>
        </div>
        <div class="support-form my-5">
          <div class="header text-center p-4 rounded-top text-white">
            <h1 class="fw-bold">Need Help?</h1>
            <p class="lead fs-4">{{ getCompanyName }} Support</p>
            <p>
              Use the form below to raise a ticket with the
              {{ getCompanyName }} Support team.<br />We aim to resolve all
              tickets in under 24 hours.
            </p>
          </div>
          <div class="col-12 bg-white rounded-bottom shadow d-flex py-3">
            <div class="col-2"></div>
            <div class="col-8">
              <form class="p-4" @submit.prevent="submitForm">
                <div class="mb-3">
                  <label for="name" class="form-label"
                    >Name <span class="text-danger">*</span></label
                  >
                  <input
                    type="text"
                    class="form-control"
                    v-model="form.name"
                    required
                  />
                </div>

                <div class="mb-3">
                  <label for="email" class="form-label"
                    >Email <span class="text-danger">*</span></label
                  >
                  <input
                    type="email"
                    class="form-control"
                    v-model="form.email"
                    required
                  />
                </div>

                <div class="mb-3">
                  <label class="form-label"
                    >What can we help you with today?</label
                  >
                  <div
                    v-for="(option, i) in helpOptions"
                    :key="i"
                    class="form-check"
                  >
                    <input
                      class="form-check-input"
                      type="radio"
                      :id="'help-' + i"
                      v-model="form.issue_type"
                      :value="option"
                      required
                    />
                    <label class="form-check-label" :for="'help-' + i">{{
                      option
                    }}</label>
                  </div>
                </div>

                <div class="mb-3">
                  <label class="form-label"
                    >Issue / Message <span class="text-danger">*</span></label
                  >
                  <textarea
                    class="form-control"
                    rows="4"
                    v-model="form.issue"
                    required
                  ></textarea>
                </div>

                <div class="mb-3">
                  <label class="form-label"
                    >Have you got a file to share with our team? Upload it
                    here.</label
                  >
                  <div
                    class="file-dropzone border rounded p-3 text-center"
                    @dragover.prevent
                    @drop.prevent="handleFileDrop"
                  >
                    <input
                      type="file"
                      ref="fileInput"
                      hidden
                      @change="handleFileSelect"
                    />
                    <i class="bi bi-upload fs-4"></i>
                    <p class="m-0">
                      Click or drag a file to this area to upload
                    </p>
                    <button
                      type="button"
                      class="btn btn-sm btn-outline-secondary mt-2"
                      @click="$refs.fileInput.click()"
                    >
                      Browse
                    </button>
                  </div>
                  <div v-if="!form.files && showErrors" class="text-danger">
                    Please upload a file.
                  </div>
                  <div v-if="form.files" class="mt-2 text-success">
                    Selected: {{ form.files.name }}
                  </div>
                </div>

                <button
                  type="submit"
                  class="btn btn-primary px-4 btn-bg-color"
                  :disabled="!isFormValid"
                >
                  Submit
                </button>
              </form>
            </div>
            <div class="col-2"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import Swal from "sweetalert2";
import Navbar from "../components/Navbar.vue";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      form: {
        name: "",
        email: "",
        issue_type: "General question",
        issue: "",
        files: null,
      },
      showErrors: false,
      helpOptions: ["General question", "Bug report", "My account", "Other"],
    };
  },
  computed: {
    ...mapGetters(["getCompanyName"]),
    isFormValid() {
      return (
        this.form.name.trim() !== "" &&
        this.form.email.trim() !== "" &&
        this.form.issue.trim() !== "" &&
        this.form.issue_type.trim() !== "" &&
        this.form.files !== null
      );
    },
  },
  components: {
    Navbar,
  },
  methods: {
    toggleActionMenu(index) {
      this.selectedRow = this.selectedRow === index ? null : index;
    },
    isSubmitting() {
      return (
        this.form.name.trim() &&
        this.form.email.trim() &&
        this.form.issue.trim() &&
        this.form.issue_type.trim() &&
        this.form.files
      );
    },
    handleFileDrop(event) {
      this.form.files = event.dataTransfer.files[0];
    },
    handleFileSelect(event) {
      this.form.files = event.target.files[0];
    },
    async submitForm() {
      if (!this.isFormValid) {
        this.showErrors = true;
        return;
      }
      this.showErrors = false;
      const token = localStorage.getItem("token");
      const formData = new FormData();

      formData.append("name", this.form.name);
      formData.append("email", this.form.email);
      formData.append("issue_type", this.form.issue_type);
      formData.append("issue", this.form.issue);
      if (this.form.files) {
        formData.append("files", this.form.files);
      }

      try {
        const response = await axios.post(
          `${VITE_API_URL}/support_mail`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            validateStatus: (status) => status >= 200 && status < 300,
          }
        );

        if (response.status === 200) {
          Swal.fire({
            icon: "success",
            title: "Ticket Submitted",
            text: "Your support request has been submitted successfully.",
            confirmButtonText: "OK",
          });
          this.resetForm();
        }
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Submission Failed",
          text: error.response?.error || "please provide all details!",
          confirmButtonText: "OK",
        });
      }
    },
    resetForm() {
      this.form = {
        name: "",
        email: "",
        issue_type: "General question",
        issue: "",
        files: null,
      };
      this.$refs.fileInput.value = "";
    },
  },
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
.support-form .header {
  background-color: #52732d;
}
.file-dropzone {
  border: 2px dashed #52732d;
  background: #fff8f3;
  cursor: pointer;
}

#main {
  background-color: #f9f9f9;
}
</style>
