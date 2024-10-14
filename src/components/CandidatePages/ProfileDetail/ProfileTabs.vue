<template>
  <div>
    <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
      <li class="nav-item" role="presentation">
        <button
          class="nav-link active"
          id="pills-profileOne-tab"
          data-bs-toggle="pill"
          data-bs-target="#pills-profileOne"
          type="button"
          role="tab"
          aria-controls="pills-profileOne"
          aria-selected="true"
        >
          Profile 1
        </button>
      </li>
      <li class="nav-item" role="presentation">
        <button
          class="nav-link"
          id="pills-profileTwo-tab"
          data-bs-toggle="pill"
          data-bs-target="#pills-profileTwo"
          type="button"
          role="tab"
          aria-controls="pills-profileTwo"
          aria-selected="false"
        >
          Profile 2
        </button>
      </li>
      <li class="nav-item" role="presentation">
        <button
          class="nav-link"
          id="pills-rudimentary-tab"
          data-bs-toggle="pill"
          data-bs-target="#pills-rudimentary"
          type="button"
          role="tab"
          aria-controls="pills-rudimentary"
          aria-selected="false"
        >
          Rudimentary
        </button>
      </li>
      <li class="nav-item" role="presentation">
        <button
          class="nav-link"
          id="pills-nhs-tab"
          data-bs-toggle="pill"
          data-bs-target="#pills-nhs"
          type="button"
          role="tab"
          aria-controls="pills-nhs"
          aria-selected="false"
        >
          NHS
        </button>
      </li>
    </ul>
    <div class="tab-content" id="pills-tabContent">
      <div
        class="tab-pane fade show active"
        id="pills-profileOne"
        role="tabpanel"
        aria-labelledby="pills-profileOne-tab"
      >
        <div class="row">
          <div class="text-danger d-flex justify-content-end">
            <a href="#" class="text-danger" @mousedown="downloadFile">
              <i class="bi bi-file-earmark-pdf fs-2 fw-bold"></i>
            </a>
          </div>
        </div>
        <div class="row" ref="invoiceContentOne">
          <div class="col-md-12 d-flex align-items-center">
            <div class="col-md-5 d-flex align-items-end">
              <img
                v-if="
                  getCandidatesDataInProfileTab &&
                  getCandidatesDataInProfileTab.profile_photo
                "
                :src="completeImageUrl"
                class="card-img-top position-relative profile"
                alt="profile"
                loading="eager"
              />
              <img
                v-else
                src="../profile.png"
                class="card-img-top position-relative default-profile"
                style="border: 1px solid #8080801a"
                alt="Default profile"
                loading="eager"
              />
              <div class="text-capitalize fw-bolder ps-2">
                <h6>
                  {{
                    getCandidatesDataInProfileTab.first_name +
                    " " +
                    getCandidatesDataInProfileTab.last_name
                  }}
                </h6>

                <span>{{ getCandidatesDataInProfileTab.position }}</span>
              </div>
            </div>
            <div class="col-md-4"></div>
            <div class="col-md-2 d-flex align-items-center flex-column">
              <img src="./logo.png" class="img-fluid" loading="eager" />
            </div>
          </div>

          <div class="col-md-7 d-flex">
            <div class="card-body">
              <table class="table table-borderless">
                <thead>
                  <tr class=""></tr>
                </thead>
                <tbody class="text-capitalize">
                  <tr>
                    <td>RecPal Demo 1 ID Number</td>
                    <td>:</td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>DOB</td>
                    <td>:</td>
                    <td>{{ getCandidatesDataInProfileTab.date_of_birth }}</td>
                  </tr>
                  <tr>
                    <td>Enhanced DBS Number</td>
                    <td>:</td>
                    <td>{{ getCandidatesDataInProfileTab.date_of_birth }}</td>
                  </tr>
                  <tr>
                    <td>Enhanced DBS Issues</td>
                    <td>:</td>
                    <td>{{ getCandidatesDataInProfileTab.DBS_PVG_issue_date }}</td>
                  </tr>
                  <tr>
                    <td>Deby</td>
                    <td>:</td>
                    <td>{{ getCandidatesDataInProfileTab.date_of_birth }}</td>
                  </tr>
                  <tr>
                    <td>ID</td>
                    <td>:</td>
                    <td>{{ getCandidatesDataInProfileTab.id }}</td>
                  </tr>
                  <tr>
                    <td>Address Prof</td>
                    <td>:</td>
                    <td>{{ getCandidatesDataInProfileTab.address_prof }}</td>
                  </tr>

                  <tr>
                    <td>Photo ID</td>
                    <td>:</td>
                    <td>{{ getCandidatesDataInProfileTab.date_of_birth }}</td>
                  </tr>
                  <!-- <tr>
                    <td>Nurse</td>
                    <td>:</td>
                    <td>{{ getCandidatesDataInProfileTab.date_of_birth }}</td>
                  </tr> -->

                  <tr>
                    <td>refer</td>
                    <td>:</td>
                    <td>{{ getCandidatesDataInProfileTab.refer }}</td>
                  </tr>
                </tbody>
                <tbody
                  v-if="
                    getCandidatesDataInProfileTab &&
                    getCandidatesDataInProfileTab.bank_detail
                  "
                >
                  <tr>
                    <td class="fs-6 fw-bold">Bank Detail</td>
                  </tr>
                  <tr>
                    <td>Account Number</td>
                    <td>:</td>
                    <td>{{ getCandidatesDataInProfileTab.bank_number }}</td>
                  </tr>
                  <tr>
                    <td>IFSC</td>
                    <td>:</td>
                    <td>{{ getCandidatesDataInProfileTab.ifsc_code }}</td>
                  </tr>
                  <tr>
                    <td>Bank Name</td>
                    <td>:</td>
                    <td>{{ getCandidatesDataInProfileTab.bank_name }}</td>
                  </tr>
                </tbody>
                <tbody
                  v-if="
                    getCandidatesDataInProfileTab &&
                    getCandidatesDataInProfileTab.contact_information
                  "
                >
                  <tr>
                    <td class="fs-6 fw-bold">Contact Information</td>
                  </tr>
                  <tr>
                    <td>Phone Number</td>
                    <td>:</td>
                    <td>{{ getCandidatesDataInProfileTab.phone_number }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <hr />
        </div>
      </div>
      <div
        class="tab-pane fade"
        id="pills-profileTwo"
        role="tabpanel"
        aria-labelledby="pills-profileTwo-tab"
      >
        <div class="row" ref="invoiceContent">
          <div class="card-body border-0 px-3">
            <h5 class="text-center bg-colors">RECPAL DEMO 1 EMPLOYEE PROFILE</h5>
            <table class="table table-bordered">
              <tbody class="text-capitalize">
                <tr class="d-flex justify-content-evenly">
                  <td class="">
                    <img
                      v-if="
                        getCandidatesDataInProfileTab &&
                        getCandidatesDataInProfileTab.profile_photo
                      "
                      :src="completeImageUrl"
                      class="card-img-top position-relative"
                      height="200px"
                      width="200px"
                      alt="profile"
                      loading="eager"
                    />
                    <img
                      v-else
                      src="../profile.png"
                      class="card-img-top position-relative"
                      style="border: 1px solid #8080801a"
                      height="200px"
                      width="200px"
                      alt="Default profile"
                      loading="eager"
                    />
                  </td>
                  <td class="d-flex align-items-center border-0">
                    <div>
                      <h5>
                        {{
                          getCandidatesDataInProfileTab.first_name +
                          " " +
                          getCandidatesDataInProfileTab.last_name
                        }}
                      </h5>
                      <p>Assistance Nurse, HCA</p>
                    </div>
                  </td>
                  <td class="d-flex align-items-center">
                    <div>
                      <img
                        src="./logo.png"
                        class="img-fluid"
                        width="200"
                        loading="eager"
                      />
                      <!-- <button
                        type="button"
                        class="btn btn-secondary"
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        title="Tooltip on top"
                      >
                        Download Pdf
                      </button> -->
                    </div>
                  </td>
                  <div class="text-danger">
                    <a href="#" class="text-danger" @mousedown="downloadFile">
                      <i
                        class="bi bi-file-earmark-pdf fs-2 fw-bold d-block text-center cursor-pointer"
                      ></i
                    ></a>
                  </div>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="col-md-7 d-flex">
            <div class="card-body">
              <table class="table table-bordered">
                <thead>
                  <tr class=""></tr>
                </thead>
                <tbody class="text-capitalize">
                  <tr>
                    <td>RecPal Demo 1 ID Number</td>

                    <td></td>
                  </tr>

                  <tr>
                    <td>Enhanced DBS Number</td>

                    <td>...</td>
                  </tr>
                  <tr>
                    <td>Enhanced DBS Issues</td>

                    <td>...</td>
                  </tr>
                  <tr>
                    <td>Deby</td>

                    <td>...</td>
                  </tr>
                  <tr>
                    <td>ID</td>

                    <td>{{ getCandidatesDataInProfileTab.id }}</td>
                  </tr>
                  <tr>
                    <td>Address Prof</td>

                    <td>{{ getCandidatesDataInProfileTab.address_prof }}</td>
                  </tr>
                  <tr>
                    <td>NMC/NISCC/SSSC Pin</td>

                    <td>{{ getCandidatesDataInProfileTab.NMC_NISCC_SSSC_pin }}</td>
                  </tr>
                  <tr>
                    <td>Nationality</td>

                    <td>{{ getCandidatesDataInProfileTab.nationality }}</td>
                  </tr>
                  <tr>
                    <td>Date of Birth</td>

                    <td>{{ getCandidatesDataInProfileTab.date_of_birth }}</td>
                  </tr>
                  <tr>
                    <td>Place of Birth</td>

                    <td>{{ getCandidatesDataInProfileTab.place_of_birth }}</td>
                  </tr>
                  <tr>
                    <td>Gender</td>

                    <td>{{ getCandidatesDataInProfileTab.gender }}</td>
                  </tr>
                </tbody>
                <tbody
                  v-if="
                    getCandidatesDataInProfileTab &&
                    getCandidatesDataInProfileTab.bank_detail
                  "
                >
                  <tr>
                    <td class="fs-6 fw-bold">Bank Detail</td>
                  </tr>
                  <tr>
                    <td>Account Number</td>
                    <td>:</td>
                    <td>{{ getCandidatesDataInProfileTab.bank_number }}</td>
                  </tr>
                  <tr>
                    <td>IFSC</td>
                    <td>:</td>
                    <td>{{ getCandidatesDataInProfileTab.ifsc_code }}</td>
                  </tr>
                  <tr>
                    <td>Bank Name</td>
                    <td>:</td>
                    <td>{{ getCandidatesDataInProfileTab.bank_name }}</td>
                  </tr>
                </tbody>
                <tbody
                  v-if="
                    getCandidatesDataInProfileTab &&
                    getCandidatesDataInProfileTab.contact_information
                  "
                >
                  <tr>
                    <td class="fs-6 fw-bold">Contact Information</td>
                  </tr>
                  <tr>
                    <td>Phone Number</td>
                    <td>:</td>
                    <td>{{ getCandidatesDataInProfileTab.phone_number }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div
        class="tab-pane fade"
        id="pills-rudimentary"
        role="tabpanel"
        aria-labelledby="pills-rudimentary-tab"
      >
        InProgress ....
      </div>
      <div
        class="tab-pane fade"
        id="pills-nhs"
        role="tabpanel"
        aria-labelledby="pills-nhs-tab"
      >
        InProgress ....
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import DOMPurify from "dompurify";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

export default {
  name: "ProfileTabs",
  data() {
    return { getCandidatesDataInProfileTab: [] };
  },
  components: {
    DOMPurify,
    html2canvas,
    jsPDF,
  },
  computed: {
    completeImageUrl() {
      if (
        this.getCandidatesDataInProfileTab &&
        this.getCandidatesDataInProfileTab.profile_photo
      ) {
        return `${VITE_API_URL}${this.getCandidatesDataInProfileTab.profile_photo}`;
      }
      return null;
    },
  },
  methods: {
    async downloadFile() {
      await this.$nextTick();

      const element = this.$refs.invoiceContent;
      const elementOne = this.$refs.invoiceContentOne;

      if (element) {
        try {
          const sanitizedHTML = DOMPurify.sanitize(element.innerHTML || "");
          const canvas = await html2canvas(element, {
            useCORS: true,
            allowTaint: false,
            logging: true,
            backgroundColor: null,
          });

          const imgData = canvas.toDataURL("image/png");
          const pdf = new jsPDF();

          const pageWidth = pdf.internal.pageSize.getWidth();
          const pageHeight = pdf.internal.pageSize.getHeight();
          const imgWidth = pageWidth;
          const imgHeight = (canvas.height * imgWidth) / canvas.width;

          pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
          pdf.save("Staff_Profile.pdf");
        } catch (error) {
          // console.error("Error downloading the file for invoiceContent:", error);
        }
      }

      if (elementOne) {
        try {
          const sanitizedHTMLOne = DOMPurify.sanitize(elementOne.innerHTML || "");
          const canvasOne = await html2canvas(elementOne, {
            useCORS: true,
            allowTaint: false,
            logging: true,
            backgroundColor: null,
          });

          const imgDataOne = canvasOne.toDataURL("image/png");
          const pdfOne = new jsPDF();

          const pageWidthOne = pdfOne.internal.pageSize.getWidth();
          const pageHeightOne = pdfOne.internal.pageSize.getHeight();
          const imgWidthOne = pageWidthOne;
          const imgHeightOne = (canvasOne.height * imgWidthOne) / canvasOne.width;

          pdfOne.addImage(imgDataOne, "PNG", 0, 0, imgWidthOne, imgHeightOne);
          pdfOne.save("Staff_Profile.pdf");
        } catch (error) {
          // console.error("Error downloading the file for invoiceContentOne:", error);
        }
      }
    },
    async getCandidateProfileTabMethod() {
      try {
        const response = await axios.get(
          `${VITE_API_URL}/candidates/${this.$route.params.id}`
        );
        this.getCandidatesDataInProfileTab = response.data.candidate;
        if (this.getCandidatesDataInProfileTab) {
          // this.getCandidateProfileTabMethod();
          this.$emit("getBankDetail");
        }
      } catch (error) {}
    },
  },
  async beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.this.getCandidateProfileTabMethod();
    });
  },
  async beforeRouteUpdate(to, from, next) {
    this.getCandidateProfileTabMethod();
    next();
  },
  mounted() {
    this.getCandidateProfileTabMethod();
  },
};
</script>

<style scoped>
img.profile {
  border: 1px solid #c3b6b6;
  border-radius: 8px;
  height: 200px;
  width: 200px;
}
img.default-profile {
  border: 1px solid #c3b6b6;
  border-radius: 8px;
  height: 200px;
  width: 200px;
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
.bg-colors {
  background-color: #f6851d;
  padding: 20px;
  color: aliceblue;
}

.doc-heading {
  border-bottom: 2px solid #ff5722;
}
ul.nav-pills {
  border-bottom: 1px solid grey;
}
.nav-pills .nav-link {
  border-radius: 0px;
  padding: 5px 13px;
}
</style>
