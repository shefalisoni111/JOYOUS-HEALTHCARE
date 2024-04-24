<template>
  <div>
    <Navbar />

    <div id="main" class="main">
      <div class="row">
        <div class="col-md-1"><Sidebar /></div>
        <div class="col-md-3 p-3 bg-white borderight">
          <div class="leftside">
            <div class="heading mb-3 position-relative">
              <p class="bforeline"></p>
              <p class="mb-0 text-uppercase fw-bold genSetting">agency Settings</p>
              <p class="afterline"></p>
            </div>
            <div>
              <ul class="list-unstyled text-capitalize generalsetting px-3">
                <li class="list-items d-flex">
                  <i class="bi bi-person rounded-circle"></i>
                  <router-link
                    to="/appsetting/agencysetting"
                    class="text-decoration-none"
                  >
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
        <div class="col-md-8 p-0">
          <div class="settingsdetails">
            <div class="pagetitle d-flex justify-content-between">
              <div class="d-flex align-items-center">
                <ol class="breadcrumb mb-1 p-3">
                  <li class="breadcrumb-item active text-uppercase fw-bold">
                    agency setting / <span class="clr">profile</span>
                  </li>
                </ol>
              </div>
              <!-- End Page Title -->
              <div class="p-3">
                <button
                  type="button"
                  class="btn btn-outline-success text-nowrap text-nowrap"
                  data-bs-toggle="modal"
                  data-bs-target="#editSite"
                  data-bs-whatever="@mdo"
                >
                  <i class="bi bi-pencil"></i> Edit
                </button>
              </div>
            </div>
          </div>
          <div class="col-12 bg-white"></div>
          <div class="row">
            <div class="col-12">
              <div class="bg-white">
                <div class="col-5">
                  <div class="d-flex justify-content-between align-items-center px-4">
                    <img
                      src="./logo.png"
                      class=""
                      alt="RecPal"
                      width="180"
                      height="51"
                      loading="eager"
                    />
                    <div class="d-flex flex-column text-capitalize">
                      <h5 class="mb-0">RecPal</h5>
                      <p class="mb-0">recruitment</p>
                      <span>Description</span>
                    </div>
                  </div>
                </div>
                <div class="showdata p-4">
                  <ul class="nav nav-tabs" id="myTab" role="tablist">
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
                        Favicon & Logo
                      </button>
                    </li>
                    <li class="nav-item" role="presentation">
                      <button
                        class="nav-link"
                        id="changepass"
                        data-bs-toggle="tab"
                        data-bs-target="#contact"
                        type="button"
                        role="tab"
                        aria-controls="contact"
                        aria-selected="false"
                      >
                        Custom Url
                      </button>
                    </li>
                  </ul>
                  <div class="tab-content" id="myTabContent">
                    <div
                      class="tab-pane fade show active"
                      id="home"
                      role="tabpanel"
                      aria-labelledby="about"
                    >
                      <div class="p-4 table-wrapper">
                        <table
                          class="table table-borderless"
                          v-for="data in getAgencyData"
                          :key="data.id"
                        >
                          <thead>
                            <tr>
                              <th scope="col">Agency name</th>
                              <th scope="col">{{ data.agency_name }}</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <th scope="row">authorized person</th>
                              <td>
                                {{
                                  data.authorized_person ? data.authorized_person : "null"
                                }}
                              </td>
                            </tr>
                            <tr>
                              <th scope="row">email</th>
                              <td>{{ data.email }}</td>
                            </tr>
                            <tr>
                              <th scope="row">address</th>
                              <td colspan="2">{{ data.address }}</td>
                            </tr>
                            <tr>
                              <th scope="row">mobile number</th>
                              <td colspan="2">{{ data.mobile_number }}</td>
                            </tr>
                            <tr>
                              <th scope="row">phone number</th>
                              <td colspan="2">{{ data.phone_number }}</td>
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
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque
                        dolore quasi architecto magni aperiam totam. Quibusdam magnam
                        eaque possimus ipsum. Necessitatibus molestias rerum architecto
                        ipsam quis labore quod quo sint?
                      </p>
                    </div>
                    <div
                      class="tab-pane fade p-3"
                      id="contact"
                      role="tabpanel"
                      aria-labelledby="logoimg"
                    >
                      <div class="col-12 d-flex gap-2">
                        <div>
                          <h6>
                            <span class="ps-1 fs-6 fw-bold">Favicon</span>&nbsp;
                            <span class="text-muted">(dimension 32px * 32px)</span>
                          </h6>
                          <div class="col-4">
                            <div class="card" style="width: 400px">
                              <div class="card-body">
                                <img :src="logoPreview" class="img-fluid" />
                                <input
                                  type="file"
                                  id="logoInput"
                                  style="display: none"
                                  accept="image/*"
                                  @change="previewLogo"
                                />
                                <label
                                  for="logoInput"
                                  class="btn btn-primary w-100"
                                  style="border-radius: 0px"
                                  >Upload Favicon</label
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
                        <div>
                          <h6>
                            <span class="ps-1 fs-6 fw-bold">Agency logo</span> &nbsp;
                            <span class="text-muted">(dimension 220px * 50px)</span>
                          </h6>
                          <div class="col-4">
                            <div class="card" style="width: 400px">
                              <div class="card-body">
                                <img src="./pic-image.jpg" class="img-fluid" />
                                <a
                                  href="#"
                                  class="btn btn-primary w-100"
                                  style="border-radius: 0px"
                                  >Upload Logo</a
                                >
                              </div>
                            </div>
                          </div>
                        </div>
                        <div>
                          <h6>
                            <span class="ps-1 fs-6 fw-bold">Invoice Logo</span>&nbsp;
                            <span class="text-muted">(dimension 150px * 75px)</span>
                          </h6>
                          <div class="col-4">
                            <div class="card" style="width: 400px">
                              <div class="card-body">
                                <img src="./pic-image.jpg" class="img-fluid" />
                                <a
                                  href="#"
                                  class="btn btn-primary w-100"
                                  style="border-radius: 0px"
                                  >Upload Logo</a
                                >
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      class="tab-pane fade"
                      id="contact"
                      role="tabpanel"
                      aria-labelledby=" changepass"
                    >
                      <p class="p-4">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque
                        dolore quasi architecto magni aperiam totam. Quibusdam magnam
                        eaque possimus ipsum. Necessitatibus molestias rerum architecto
                        ipsam quis labore quod quo sint?
                      </p>
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
</template>
<script>
import axios from "axios";
import Navbar from "../Navbar.vue";
import Sidebar from "../Sidebar.vue";

export default {
  name: "AgencySetting",
  data() {
    return {
      getAgencyData: [],
      logoPreview: "./pic-image.jpg",
    };
  },
  components: {
    Navbar,
    Sidebar,
  },
  methods: {
    previewLogo(event) {
      const file = event.target.files[0];
      const formData = new FormData();
      formData.append("agency_setting[agency_logo]", file);
      const token = localStorage.getItem("token");

      fetch(`${VITE_API_URL}/agency_settings`, {
        method: "POST",
        headers: {
          Authorization: "bearer " + token,
        },
        body: formData,
      })
        .then((response) => {
          if (!response.ok) {
          }
          return response.json();
        })
        .then((data) => {
          console.log("Logo uploaded successfully:", data);
        })
        .catch((error) => {
          // console.error("Error uploading logo:", error);
        });

      const reader = new FileReader();
      reader.onload = (e) => {
        this.localStorageImage = e.target.result;
        localStorage.setItem("logoPreview", e.target.result);
      };
      reader.readAsDataURL(file);
    },
    async getAgencyDataMethod() {
      await axios
        .get(`${VITE_API_URL}/agency_settings`)
        .then((response) => {
          this.getAgencyData = response.data;
        })
        .catch((error) => {
          if (error.response) {
            if (error.response.status == 404) {
              // alert(error.response.data.message);
            }
          }
        });
    },
    loadFromLocalStorage() {
      const storedImage = localStorage.getItem("logoPreview");
      if (storedImage) {
        this.logoPreview = storedImage;
      }
    },
  },
  mounted() {
    this.getAgencyDataMethod();
    this.loadFromLocalStorage();
  },
};
</script>

<style scoped>
/*--------------------------------------------------------------
  # Page Title
  --------------------------------------------------------------*/
#main {
  padding-top: 65px;
}
table th,
table tr td {
  text-transform: capitalize;
}
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

ul.generalsetting li i.rounded-circle {
  background: #fff4de;
  width: 48px;
  height: 40px;
  text-align: center;
  line-height: 40px;
  color: #ff5722;
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
ul.generalsetting li a {
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 3px;
}
a.router-link-active {
  color: #0d6efd;
}
.clr {
  color: #ff5722;
}
a.router-link-active::after {
  content: "\F285";
  font-family: "bootstrap-icons";
  display: flex;
  align-items: center;
  color: #ff5722;
}
ul.generalsetting h6 {
  font-size: 14px;
}

.heading p.gs {
  transform: translateX(18px);
}
a.router-link-active {
  background-color: #fff4de;
}
ul.generalsetting li i.rounded-circle a.router-link-active:active {
  border-top-left-radius: 22px !important;
  border-bottom-left-radius: 22px !important;
}
.pagesetting {
  border-bottom: 1px solid rgb(196, 196, 196);
  width: 100%;
}
.genSetting {
  color: #ff5722;
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
  border: 1px solid #e5e0e0;
  border-top: none;
}

.showdata .nav-link {
  color: #000;
}
.showdata .nav-link.active {
  background: #e8e3e3;
  margin-left: 4px;
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

/*--------------------------------------------------------------
  # Main
  --------------------------------------------------------------*/
</style>
