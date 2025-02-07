<template>
  <div>
    <!-- Modal -->
    <div
      class="modal fade"
      id="candidateMail"
      aria-labelledby="candidatePage"
      tabindex="-1"
    >
      <div class="modal-dialog modal-dialog-centered modal-xl">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="candidateMail">Mail to Staff</h5>
          </div>
          <div class="modal-body mx-3">
            <div class="row g-3 align-items-center">
              <form @submit.prevent="sendInvoice">
                <div>
                  <div class="row align-items-center mt-3">
                    <div class="col-2">
                      <label for="mailto" class="col-form-label">MAIL TO:</label>
                    </div>
                    <div class="col-10">
                      <input
                        type="text"
                        id="mailto"
                        class="form-control"
                        v-model="email"
                        :class="{ 'is-invalid': email && !isValidEmail(email) }"
                      />
                      <div v-if="email && !isValidEmail(email)" class="text-danger">
                        Please enter a valid email address.
                      </div>
                    </div>
                  </div>
                  <div class="row align-items-center mt-3">
                    <div class="col-2">
                      <label for="subject" class="col-form-label">SUBJECT:</label>
                    </div>
                    <div class="col-10">
                      <input
                        type="text"
                        id="subject"
                        class="form-control"
                        v-model="subject"
                      />
                    </div>
                  </div>
                  <div class="row align-items-center mt-3 ms-3">
                    <div class="col-2">
                      <label for="body" class="col-form-label"></label>
                    </div>
                    <div class="col-10 ms-5 p-0" style="margin-left: 90px">
                      <!-- <TextFormator v-model="body" /> -->
                      <div style="width: 90.7%; margin-left: 12.1%">
                        <textarea
                          class="form-control"
                          v-model="body"
                          @input="handleInputChange"
                          rows="3"
                        ></textarea>
                      </div>
                    </div>
                  </div>
                  <div class="row align-items-center mt-3">
                    <div class="col-2">
                      <label for="attachments" class="col-form-label">ATTACHMENTS:</label>
                    </div>
                    <div class="col-10">
                      <input
                        class="form-control"
                        type="file"
                        id="attachments"
                        ref="fileInput"
                        multiple
                        @change="handleFileUpload"
                      />
                    </div>
                  </div>
                </div>
                <div class="modal-footer">
                  <button
                    class="btn btn-secondary rounded-1"
                    data-bs-target="#candidateMail"
                    data-bs-toggle="modal"
                    data-bs-dismiss="modal"
                    @click="resetForm"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    class="btn btn-primary rounded-1 text-capitalize fw-medium"
                    data-bs-dismiss="modal"
                    v-on:click="sendInvoice()"
                    :disabled="!isFormValid"
                  >
                    <i class="bi bi-send"></i>
                    Send
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    <SuccessAlert ref="successAlert" />
  </div>
</template>

<script>
import axios from "axios";
import TextFormator from "../../textformator/TextFormator.vue";
import SuccessAlert from "../../Alerts/SuccessAlert.vue";

export default {
  name: "MailInvoice",
  components: {
    TextFormator,
    SuccessAlert,
  },
  data() {
    return {
      email: "",
      subject: "",
      body: "",
      attachments: [],
      // signAttachments: null,
    };
  },
  computed: {
    isFormValid() {
      return (
        this.isValidEmail(this.email) &&
        this.subject &&
        this.body &&
        this.attachments.length > 0
      );
    },
  },
  methods: {
    isValidEmail(email) {
      const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|in|co\.uk|org|edu|care|net|jp)$/;
      return emailPattern.test(email);
    },
    handleFileUpload(event) {
      this.attachments = Array.from(event.target.files);
    },
    // handleSignUpload(event) {
    //   this.signAttachments = event.target.files[0];
    // },
    async sendInvoice() {
      console.log("Sending invoice with body:", this.body);
      const formData = new FormData();
      formData.append("staff_invoice[email][]", this.email);
      formData.append("staff_invoice[subject]", this.subject);
      formData.append("staff_invoice[body]", this.body);

      this.attachments.forEach((file, index) => {
        formData.append(`staff_invoice[attachments][]`, file);
      });

      // if (this.signAttachments) {
      //   formData.append("staff_invoice[sign_attachments]", this.signAttachments);
      // }

      try {
        const response = await axios.put(
          `${VITE_API_URL}/send_staff_invoice_with_attachments/${this.$route.params.id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        if (response.status === 200) {
          this.resetForm();
          const message = "Successfully Mail Send";
          this.$refs.successAlert.showSuccess(message);
        }
        // console.log("Invoice sent:", response.data);
      } catch (error) {
        // console.error("Error sending invoice:", error);
      }
    },
    resetForm() {
      this.email = "";
      this.subject = "";
      this.body = "";
      this.attachments = [];
      // this.signAttachments = null;

      if (this.$refs.fileInput) {
        this.$refs.fileInput.value = null;
      }
    },
  },
};
</script>

<style scoped>
.modal-body {
  border-radius: 5px;
  background: #dbdbdb;
}
.modal-header {
  border-bottom: 0px;
}
.modal-footer {
  border-top: 0px;
}

#head {
  width: 40px;
  height: 40px;
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
label.form-label {
  text-transform: capitalize;
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
</style>
