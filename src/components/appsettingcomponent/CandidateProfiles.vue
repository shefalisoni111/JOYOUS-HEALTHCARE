<template>
  <div class="col-12">
    <div class="pagetitle d-flex justify-content-between">
      <div class="d-flex align-items-center">
        <ol class="breadcrumb mb-1">
          <li class="breadcrumb-item active text-uppercase fw-bold">
            genral settings / <span class="clr">candidate profile</span>
          </li>
        </ol>
      </div>
      <!-- End Page Title -->
    </div>
    <div class="row">
      <div class="col-12">
        <div class="bg-white">
          <div class="showdata">
            <div class="">
              <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
                <li class="nav-item" role="presentation">
                  <button
                    class="nav-link active text-capitalize ps-0"
                    id="active"
                    data-bs-toggle="pill"
                    data-bs-target="#pills-home"
                    type="button"
                    role="tab"
                    aria-controls="pills-home"
                    aria-selected="true"
                  >
                    Active
                  </button>
                </li>
                <li class="nav-item" role="presentation">
                  <button
                    class="nav-link text-capitalize"
                    id="inactive"
                    data-bs-toggle="pill"
                    data-bs-target="#pills-profile"
                    type="button"
                    role="tab"
                    aria-controls="pills-profile"
                    aria-selected="false"
                  >
                    Inactive
                  </button>
                </li>
              </ul>
              <div class="tab-content" id="pills-tabContent">
                <div
                  class="tab-pane fade show active"
                  id="pills-home"
                  role="tabpanel"
                  aria-labelledby="active"
                  tabindex="0"
                >
                  <div>
                    <ul class="nav nav-tabs" id="myTab" role="tablist">
                      <li class="nav-item" role="presentation">
                        <button
                          class="nav-link active ms-0"
                          id="home-tab"
                          data-bs-toggle="tab"
                          data-bs-target="#home"
                          type="button"
                          role="tab"
                          aria-controls="home"
                          aria-selected="true"
                        >
                          Profile 1
                        </button>
                      </li>
                      <li class="nav-item" role="presentation">
                        <button
                          class="nav-link"
                          id="profile-tab"
                          data-bs-toggle="tab"
                          data-bs-target="#profile"
                          type="button"
                          role="tab"
                          aria-controls="profile"
                          aria-selected="false"
                        >
                          Rudimentary
                        </button>
                      </li>
                      <li class="nav-item" role="presentation">
                        <button
                          class="nav-link"
                          id="contact-tab"
                          data-bs-toggle="tab"
                          data-bs-target="#contact"
                          type="button"
                          role="tab"
                          aria-controls="contact"
                          aria-selected="false"
                        >
                          NHS
                        </button>
                      </li>
                    </ul>
                    <div class="tab-content tabconttwo" id="myTabContent">
                      <div
                        class="tab-pane fade show active"
                        id="home"
                        role="tabpanel"
                        aria-labelledby="home-tab"
                      >
                        <div class="col-12 my-4">
                          <div class="d-flex justify-content-end">
                            <button
                              class="btn btn-primary rounded-1 text-uppercase fw-medium"
                              data-bs-toggle="modal"
                              data-bs-target="#myModal"
                              data-bs-whatever="@mdo"
                              type="button"
                            >
                              + Add field
                            </button>
                          </div>
                        </div>
                        <div class="row mt-3">
                          <div class="col-12">
                            <div>
                              <ul class="list-unstyled">
                                <li class="d-flex justify-content-between">
                                  <span>Deby</span>
                                  <span
                                    ><i class="bi bi-ban"></i
                                    ><i class="bi bi-trash"></i
                                  ></span>
                                </li>
                              </ul>
                            </div>
                          </div>
                          <div class="col-12">
                            <div>
                              <ul class="list-unstyled">
                                <li class="d-flex justify-content-between">
                                  <span>ID</span>
                                  <span
                                    ><i class="bi bi-ban"></i
                                    ><i class="bi bi-trash"></i
                                  ></span>
                                </li>
                              </ul>
                            </div>
                          </div>
                          <div class="col-12">
                            <div>
                              <ul class="list-unstyled">
                                <li class="d-flex justify-content-between">
                                  <span>Address Proof</span>
                                  <span
                                    ><i class="bi bi-ban"></i
                                    ><i class="bi bi-trash"></i
                                  ></span>
                                </li>
                              </ul>
                            </div>
                          </div>
                          <div class="col-12">
                            <div>
                              <ul class="list-unstyled">
                                <li class="d-flex justify-content-between">
                                  <span>Photo ID</span>
                                  <span
                                    ><i class="bi bi-ban"></i
                                    ><i class="bi bi-trash"></i
                                  ></span>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        class="tab-pane fade"
                        id="profile"
                        role="tabpanel"
                        aria-labelledby="profile-tab"
                      >
                        <p>
                          Lorem ipsum dolor sit, amet consectetur adipisicing
                          elit. Dolor, voluptate sequi cumque culpa quia harum
                          enim necessitatibus odit magnam adipisci optio id
                          omnis at eius beatae fugiat exercitationem rerum
                          accusantium.
                        </p>
                      </div>
                      <div
                        class="tab-pane fade"
                        id="contact"
                        role="tabpanel"
                        aria-labelledby="contact-tab"
                      >
                        <p>
                          Lorem, ipsum dolor sit amet consectetur adipisicing
                          elit. Placeat autem debitis quaerat error at doloribus
                          quisquam tenetur, quos excepturi sit id aut laborum
                          dolores modi. Nemo veritatis distinctio consectetur
                          accusamus!
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  class="tab-pane fade"
                  id="pills-profile"
                  role="tabpanel"
                  aria-labelledby="inactive"
                  tabindex="0"
                >
                  <p>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Quasi veniam cum, optio similique esse soluta! Fuga dicta,
                    eius aut ipsum ipsam ducimus vero deleniti odit debitis
                    corporis, nemo vel possimus.
                  </p>
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
import { onMounted } from "vue";

export default {
  name: "CandidateDetailSectionField",
  components: {},
  // onMounted() {
  //   const myModal = new bootstrap.Modal(
  //     document.getElementById("myModal"),
  //     options
  //   );
  // },
  // methods: {
  //   showPopup() {
  //     myModal.show();
  //   },
  // },
};
</script>

<style scoped>
ul.list-unstyled li {
  border: 1px solid #dad2d2;
  padding: 10px;
  border-radius: 4px;
}

ul.list-unstyled {
  margin-bottom: 0px;
}
.bi-ban,
.bi-trash {
  color: red;
  border: 1px solid red;
  margin: 5px;
  padding: 3px;
  font-weight: 600;
}

.tabconttwo {
  border: 1px solid #dfd6d6;
  border-radius: 3px;
  padding-bottom: 15px;
  border-top: 1px solid transparent;
}
td i.bi-trash {
  border: 1px solid #9e9e9e;
  padding: 3px 15px;
  border-radius: 4px;
}

.pagesetting p span::after {
  content: "";
}
table th {
  font-weight: 100;
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
.nav-pills {
  border-bottom: 1px solid #ddd6d6;
}
table thead th {
  background-color: #f9944b !important;
}
.btn-primary {

  border: none;
}
</style>
