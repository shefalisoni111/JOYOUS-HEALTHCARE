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
      <div
        class="container-fluid px-5 pt-4"
        style="background: rgb(82 74 74 / 6%)"
      >
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
            <p class="lead fs-4">RecPal Support</p>
            <p>
              Use the form below to raise a ticket with the RecPal Support
              team.<br />We aim to resolve all tickets in under 24 hours.
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
                      v-model="form.helpType"
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
                    v-model="form.message"
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
                  <div v-if="form.file" class="mt-2 text-success">
                    Selected: {{ form.file.name }}
                  </div>
                </div>

                <div class="mb-3">
                  <label class="form-label"
                    >Are you human? <span class="text-danger">*</span></label
                  >
                  <div class="d-flex align-items-center gap-2">
                    <span>{{ captcha.question }}</span>
                    <input
                      type="number"
                      class="form-control w-auto"
                      v-model.number="form.captchaAnswer"
                      required
                    />
                  </div>
                  <div v-if="captchaError" class="text-danger mt-1">
                    Incorrect answer.
                  </div>
                </div>

                <button type="submit" class="btn btn-dark px-4">Submit</button>
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

export default {
  data() {
    return {
      form: {
        name: "",
        email: "",
        helpType: "General question",
        message: "",
        file: null,
        captchaAnswer: null,
      },
      helpOptions: ["General question", "Bug report", "My account", "Other"],
      captcha: {
        question: "15 + 3 =",
        answer: 18,
      },
      captchaError: false,
    };
  },
  components: {
    Navbar,
  },
  methods: {
    handleFileDrop(event) {
      this.form.file = event.dataTransfer.files[0];
    },
    handleFileSelect(event) {
      this.form.file = event.target.files[0];
    },
    submitForm() {
      if (this.form.captchaAnswer !== this.captcha.answer) {
        this.captchaError = true;
        return;
      }

      this.captchaError = false;

      // Submit logic goes here
      // console.log("Form submitted:", this.form);
      alert("Support ticket submitted!");
      this.resetForm();
    },
    resetForm() {
      this.form = {
        name: "",
        email: "",
        helpType: "General question",
        message: "",
        file: null,
        captchaAnswer: null,
      };
    },
  },
};
</script>

<style scoped>
.support-form .header {
  background-color: #f9944b;
}
.file-dropzone {
  border: 2px dashed #f9944b;
  background: #fff8f3;
  cursor: pointer;
}
</style>
