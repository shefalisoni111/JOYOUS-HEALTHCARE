<template>
  <div>
    <!-- <Navbar /> -->

    <div id="main" class="main d-flex">
      <div
        class=""
        style="
          background: #fff;

          border-radius: 20px;
        "
      >
        <Navbar :logo-url="filteredLogos?.logo_url" />
      </div>
      <div class="container-fluid px-5" style="background: rgb(82 74 74 / 6%)">
        <div class="col-10 pt-4 pt-3">
          <div class="col-12">
            <ol class="breadcrumb mb-1">
              <li class="breadcrumb-item active">
                <a
                  class="nav-link d-inline fs-4 fw-bolder"
                  style="color: #000000"
                  >App Settings</a
                >
              </li>
            </ol>
          </div>
        </div>
        <div class="d-flex gap-3 mt-4">
          <div class=""><Sidebar /></div>
          <div
            class="col-3 p-3 bg-white borderight"
            style="border-radius: 30px"
          >
            <div class="leftside">
              <div class="heading mb-3 position-relative">
                <p class="bforeline"></p>
                <p class="mb-0 text-capitalize fw-bold genSetting">
                  agency Settings
                </p>
                <p class="afterline"></p>
              </div>
              <div>
                <ul class="list-unstyled text-capitalize generalsetting px-3">
                  <li class="list-items d-flex">
                    <router-link
                      to="/appsetting/agencysetting"
                      class="text-decoration-none"
                      ><i class="bi bi-person rounded-circle"></i>
                      <div class="job ms-2">
                        <h6 class="mb-0 text-capitalize clr">profile</h6>
                        <p class="text-capitalize mb-0">
                          view & update agency profiles & logos
                        </p>
                      </div>
                    </router-link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="col-8 px-3 bg-white" style="border-radius: 30px">
            <div class="settingsdetails">
              <div class="pagetitle d-flex justify-content-between">
                <div class="d-flex align-items-center">
                  <ol class="breadcrumb mb-1 p-3">
                    <li class="breadcrumb-item active text-capitalize fw-bold">
                      agency setting / <span class="clr">profile</span>
                    </li>
                  </ol>
                </div>
                <!-- End Page Title -->
              </div>
            </div>
            <div
              class="col-12 bg-white"
              style="border-radius: 30px !important"
            ></div>
            <div class="row">
              <div class="col-12">
                <div class="">
                  <div class="col-5">
                    <div
                      class="d-flex justify-content-between align-items-center px-4"
                    >
                      <div class="position-relative">
                        <div>
                          <div v-if="filteredLogo">
                            <img
                              :src="filteredLogo.logo_url"
                              class=""
                              alt="Agency Logo"
                              width="160"
                              height="160"
                              loading="eager"
                            />
                            <!-- <input
                            type="file"
                            id="agencyMainInput"
                            style="display: none"
                            accept="image/*"
                            @change="previewAgencyLogo($event, 2)"
                          />
                          <label
                            for="agencyMainInput"
                            class="fs-3 fw-bold w-20 position-absolute end-0 top-0 text-center"
                            style="border-radius: 0px; background-color: #57bd8e"
                            >+</label
                          > -->
                          </div>
                        </div>
                      </div>

                      <div class="d-flex flex-column text-capitalize">
                        <h5 class="mb-0">
                          {{
                            getAgencyData.first_name +
                            " " +
                            getAgencyData.last_name
                          }}
                        </h5>
                        <!-- <p class="mb-0">recruitment</p>
                      <span>Description</span> -->
                      </div>
                    </div>
                  </div>
                  <div class="showdata p-4">
                    <ul
                      class="nav nav-pills"
                      id="myTab"
                      role="tablist"
                      style="border-bottom: 1px solid #ddd"
                    >
                      <li class="nav-item" role="presentation">
                        <button
                          class="nav-link active ms-0"
                          id="about"
                          data-bs-toggle="tab"
                          data-bs-target="#home"
                          type="button"
                          role="tab"
                          aria-controls="home"
                          aria-selected="true"
                        >
                          <img
                            src="../../assets/about.png"
                            class="img-fluid pe-2"
                            alt="RecPal"
                            loading="eager"
                          />
                          About
                        </button>
                      </li>
                      <li class="nav-item" role="presentation">
                        <button
                          class="nav-link"
                          id="additional"
                          data-bs-toggle="tab"
                          data-bs-target="#profile"
                          type="button"
                          role="tab"
                          aria-controls="profile"
                          aria-selected="false"
                        >
                          <img
                            src="../../assets/additioal.png"
                            class="img-fluid pe-2"
                            alt="RecPal"
                            loading="eager"
                          />
                          Additional
                        </button>
                      </li>
                      <li class="nav-item" role="presentation">
                        <button
                          class="nav-link"
                          id="RecPal"
                          data-bs-toggle="tab"
                          data-bs-target="#contact"
                          type="button"
                          role="tab"
                          aria-controls="contact"
                          aria-selected="false"
                        >
                          <i
                            class="bi bi-house-door-fill"
                            style="color: #f9944b"
                          ></i>
                          Favicon & Logo
                        </button>
                      </li>
                      <!-- <li class="nav-item" role="presentation">
                      <button
                        class="nav-link"
                        id="customUrl"
                        data-bs-toggle="tab"
                        data-bs-target="#contacts"
                        type="button"
                        role="tab"
                        aria-controls="contacts"
                        aria-selected="false"
                      >
                        Custom Url
                      </button>
                    </li> -->
                    </ul>
                    <div class="tab-content border-0" id="myTabContent">
                      <div
                        class="tab-pane fade show active"
                        id="home"
                        role="tabpanel"
                        aria-labelledby="about"
                      >
                        <div class="p-2 float-end">
                          <button
                            type="button"
                            class="btn btn-outline-success text-nowrap text-nowrap"
                            data-bs-toggle="modal"
                            data-bs-target="#editAgencyData"
                            data-bs-whatever="@mdo"
                            @click="editagencyId(getAgencyData.id)"
                          >
                            <i class="bi bi-pencil"></i> Edit
                          </button>
                        </div>
                        <div class="p-4 table-wrapper">
                          <table class="table" v-if="getAgencyData">
                            <thead></thead>
                            <tbody v-if="getAgencyData">
                              <tr>
                                <th scope="row">
                                  <i
                                    class="bi bi-person-fill"
                                    style="
                                      font-size: 20px;
                                      color: #f9944b;
                                      background: #ffdbc2;
                                      border-radius: 50%;
                                      padding: 8px 10px;
                                    "
                                  ></i>
                                  &nbsp; First Name
                                </th>

                                <td scope="row">
                                  {{ getAgencyData.first_name }}
                                </td>
                              </tr>
                              <tr>
                                <th scope="row">
                                  <i
                                    class="bi bi-person-fill"
                                    style="
                                      font-size: 20px;
                                      color: #f9944b;
                                      background: #ffdbc2;
                                      border-radius: 50%;
                                      padding: 8px 10px;
                                      width: 20px;
                                      height: 20px;
                                    "
                                  ></i>
                                  &nbsp; Last Name
                                </th>
                                <td>
                                  {{ getAgencyData.last_name }}
                                </td>
                              </tr>
                              <tr>
                                <th scope="row">
                                  <i
                                    class="bi bi-envelope-fill"
                                    style="
                                      font-size: 20px;
                                      color: #f9944b;
                                      background: #ffdbc2;
                                      border-radius: 50%;
                                      padding: 8px 10px;
                                      width: 20px;
                                      height: 20px;
                                    "
                                  ></i>
                                  &nbsp; Email
                                </th>
                                <td>{{ getAgencyData.email }}</td>
                              </tr>
                              <tr>
                                <th scope="row">
                                  <i
                                    class="bi bi-geo-alt-fill"
                                    style="
                                      font-size: 20px;
                                      color: #f9944b;
                                      background: #ffdbc2;
                                      border-radius: 50%;
                                      padding: 8px 10px;
                                      width: 20px;
                                      height: 20px;
                                    "
                                  ></i>
                                  &nbsp; Address
                                </th>
                                <td colspan="2">{{ getAgencyData.address }}</td>
                              </tr>
                              <tr>
                                <th scope="row">
                                  <i
                                    class="bi bi-telephone-fill"
                                    style="
                                      font-size: 20px;
                                      color: #f9944b;
                                      background: #ffdbc2;
                                      border-radius: 50%;
                                      padding: 8px 10px;
                                      width: 20px;
                                      height: 20px;
                                    "
                                  ></i>
                                  &nbsp; Phone Number
                                </th>
                                <td colspan="2">
                                  {{ getAgencyData.phone_number }}
                                </td>
                              </tr>
                              <!-- <tr>
                              <th scope="row">phone number</th>
                              <td colspan="2">{{ getAgencyData.phone_number }}</td>
                            </tr> -->
                            </tbody>
                            <tbody v-else>
                              <tr>
                                <td colspan="6" class="text-center text-danger">
                                  {{ "Data Not Found!" }}
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                      <div
                        class="tab-pane fade"
                        id="profile"
                        role="tabpanel"
                        aria-labelledby="additional"
                      >
                        <p class="p-4">
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. Eaque dolore quasi architecto magni aperiam
                          totam. Quibusdam magnam eaque possimus ipsum.
                          Necessitatibus molestias rerum architecto ipsam quis
                          labore quod quo sint?
                        </p>
                      </div>
                      <div
                        class="tab-pane fade p-3 d-flex"
                        id="contact"
                        role="tabpanel"
                        aria-labelledby="RecPal"
                      >
                        <div
                          class="col-4 d-flex gap-1 justify-content-between"
                          v-for="agencyLogoList in agencyLogoList"
                          :key="agencyLogoList.id"
                        >
                          <div>
                            <loader :isLoading="isLoading"></loader>
                            <h6>
                              <span class="ps-1 fs-6 fw-bold text-capitalize">{{
                                agencyLogoList.logo_type.replace(/_/g, " ")
                              }}</span
                              >&nbsp;
                              <!-- <span class="text-muted">(dimension 32px * 32px)</span> -->
                            </h6>
                            <div class="col-4 w-100">
                              <div class="card">
                                <div class="card-body">
                                  <img
                                    v-if="!agencyLogoList.logo_url"
                                    src="./pic-image.jpg"
                                    class="img-fluid"
                                    loading="eager"
                                    width="300"
                                    style="height: 300px"
                                    height="300"
                                  />
                                  <img
                                    v-else
                                    :src="agencyLogoList.logo_url"
                                    class="img-fluid m-auto d-block"
                                    loading="eager"
                                    width="300"
                                    style="height: 300px"
                                    height="300"
                                  />
                                  <input
                                    type="file"
                                    :id="'faviconInput-' + agencyLogoList.id"
                                    style="display: none"
                                    accept="image/*"
                                    @change="
                                      previewAgencyLogo(
                                        $event,
                                        agencyLogoList.id
                                      )
                                    "
                                  />
                                  <label
                                    :for="'faviconInput-' + agencyLogoList.id"
                                    class="btn btn-primary w-100 position-absolute bottom-0 end-0 text-capitalize"
                                    style="border-radius: 0px"
                                    >Upload
                                    {{
                                      agencyLogoList.logo_type.replace(
                                        /_/g,
                                        " "
                                      )
                                    }}</label
                                  >
                                  <!-- <a
                                  href="#"
                                  class="btn btn-primary w-100"
                                  style="border-radius: 0px"
                                  >Upload Favicon</a
                                > -->
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <!-- <div
                      class="tab-pane fade"
                      id="contacts"
                      role="tabpanel"
                      aria-labelledby="customUrl"
                    >
                      <p class="p-4">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque
                        dolore quasi architecto magni aperiam totam. Quibusdam magnam
                        eaque possimus ipsum. Necessitatibus molestias rerum architecto
                        ipsam quis labore quod quo sint?
                      </p>
                    </div> -->
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- <EditAgencySetting
      :agencyId="selectedAgencyId || 0"
      @editAgency="getAgencyDataMethod"
    /> -->
    <EditAgencySetting
      :agencyId="selectedAgencyId || 0"
      @editAgency="getAgencyDataMethod"
    />
    <SuccessAlert ref="successAlert" />
    <loader :isLoading="isLoading"></loader>
  </div>
</template>
<script>
import axios from "axios";
import Navbar from "../Navbar.vue";
import Sidebar from "../Sidebar.vue";
import EditAgencySetting from "../modals/AgencySetting/EditAgencySetting.vue";
import Loader from "../Loader/Loader.vue";
import SuccessAlert from "../Alerts/SuccessAlert.vue";

import Swal from "sweetalert2";

export default {
  name: "AgencySetting",
  data() {
    return {
      getAgencyData: [],
      logoPreview: "",
      logoAgencyPreview: "",
      logoInvoicePreview: "",
      selectedAgencyId: 0,
      isLoading: false,
      agencyLogoList: [],
    };
  },
  components: {
    Navbar,
    Sidebar,
    EditAgencySetting,
    Loader,
    SuccessAlert,
  },
  computed: {
    filteredLogo() {
      return this.agencyLogoList.find((logo) => logo.id === 2);
    },
    filteredLogos() {
      return this.agencyLogoList.find(
        (logo) => logo.logo_type === "agency_logo"
      );
    },
  },
  methods: {
    toggleActionMenu(index) {
      this.selectedRow = this.selectedRow === index ? null : index;
    },
    editagencyId(agencyId) {
      this.selectedAgencyId = agencyId;
    },

    previewAgencyLogo(event, id) {
      if (!id) {
        this.isLoading = false;
        return;
      }

      const file = event.target.files[0];
      const formData = new FormData();

      if (!file) {
        Swal.fire({
          icon: "warning",
          title: "No File Selected",
          text: "Please choose an image file.",
          confirmButtonText: "OK",
        });
        return;
      }

      const image = new Image();
      image.src = URL.createObjectURL(file);
      image.onload = () => {
        formData.append("agency_logo[logo]", file);
        const token = localStorage.getItem("token");

        axios
          .put(`${VITE_API_URL}/upload_logo/${id}`, formData, {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          })
          .then((response) => {
            const message = "Successfully Updated.";
            this.$refs.successAlert.showSuccess(message);
            if (response.status === 200) {
              // window.location.reload();
              this.getAgencyLogoList();
            }
          })
          .catch((error) => {
            Swal.fire({
              icon: "error",
              title: "Upload Failed",
              text: error.response?.data?.message || "Something went wrong.",
              confirmButtonText: "OK",
            });
          });

        const reader = new FileReader();
        reader.onload = (e) => {};
        reader.readAsDataURL(file);
      };
    },

    async getAgencyDataMethod() {
      this.isLoading = true;
      const merchantId = localStorage.getItem("merchant_id");

      if (!merchantId) {
        this.isLoading = false;
        return;
      }

      try {
        const response = await axios.get(
          `${VITE_API_URL}/merchants/${merchantId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        this.getAgencyData = response.data.data;
      } catch (error) {
        if (error.response) {
          if (error.response.status === 404) {
            // console.error("Merchant not found:", error.response.data.message);
          }
        } else {
          // console.error("An unexpected error occurred:", error.message);
        }
      } finally {
        this.isLoading = false;
      }
    },
    getAgencyLogoList() {
      const token = localStorage.getItem("token");

      axios
        .get(`${VITE_API_URL}/agency_logo_list`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          this.agencyLogoList = response.data.data;

          // Add full URL for each logo
          this.agencyLogoList.forEach((logo) => {
            if (logo.logo_url) {
              logo.logo_url = `${VITE_API_URL}${logo.logo_url}`;
            }
          });

          // Find agency logo and store it globally
          const agencyLogo = this.agencyLogoList.find(
            (logo) => logo.logo_type === "agency_logo"
          );

          if (agencyLogo?.logo_url) {
            this.$store.dispatch("updateAgencyLogo", agencyLogo.logo_url);
          }
        })
        .catch((error) => {
          // Handle error
          Swal.fire({
            icon: "error",
            title: "Error Fetching Logos",
            text: error.response?.data?.message || "Something went wrong.",
            confirmButtonText: "OK",
          });
          // console.error("Error fetching agency logo list:", error);
        });
    },
    loadFromLocalStorage() {
      const storedImage = localStorage.getItem("logoPreview");
      if (storedImage) {
        this.logoPreview = storedImage;
      }
      const storedImageAgency = localStorage.getItem("logoAgencyPreview");
      if (storedImageAgency) {
        this.logoAgencyPreview = storedImageAgency;
      }
      const storedImageInvoice = localStorage.getItem("logoInvoicePreview");
      if (storedImageInvoice) {
        this.logoInvoicePreview = storedImageInvoice;
      }
    },
  },
  mounted() {
    this.getAgencyLogoList();
    this.loadFromLocalStorage();
    this.getAgencyDataMethod();
  },
};
</script>

<style scoped>
table th,
.pagetitle {
  margin-bottom: 10px;
  background-color: #fff;
  padding: 10px;
}
.pagetitle h1 {
  font-size: 24px;
  margin-bottom: 0;
  font-weight: 600;
  color: #0d6efd;
}

ul.generalsetting li a .job p {
  font-size: 12px;
}
ul.generalsetting li a .job p,
ul.generalsetting li a .job h6 {
  color: #000;
}
ul.generalsetting li a .job h6 {
  font-weight: bold;
}

a.router-link-active {
  color: #0d6efd;
}

ul.generalsetting h6 {
  font-size: 14px;
}

.heading p.gs {
  transform: translateX(18px);
}

.router-link-active,
.router-link-exact-active {
  background-color: #e6f0ff !important;
  border-radius: 8px;
  display: flex;
  align-items: center;
  padding: 10px;
}

.router-link-active h6,
.router-link-active p,
.router-link-active i,
.router-link-exact-active h6,
.router-link-exact-active p,
.router-link-exact-active i {
  color: #0d6efd !important;
}
ul.generalsetting li i.rounded-circle a.router-link-active:active {
  border-top-left-radius: 22px !important;
  border-bottom-left-radius: 22px !important;
}
.pagesetting {
  border-bottom: 1px solid rgb(196, 196, 196);
  width: 100%;
}

.settingsdetails p span {
  width: 100%;
  height: 0;
  left: 0;
  bottom: 5px;
  border-bottom: 3px solid #0d6efd;
}
.pagesetting[data-v-6f1f6d9a] {
  border-bottom: 1px solid rgb(196, 196, 196);
  width: 100%;
}

.showdata .tab-content > .active {
  border-top: none;
}

.showdata .nav-link {
  color: #000;
}
.showdata .nav-link.active {
  margin-left: 4px;
  color: #ff5722;
}
.nav-pills .nav-link.active {
  color: #ff5722;
  border-bottom: 2px solid #ff5722;
  border-radius: 0;
  background-color: transparent;
  font-weight: bold;
}
.btn-primary {
  border: none;
}
.table th,
.table td {
  text-align: left;
}
</style>
