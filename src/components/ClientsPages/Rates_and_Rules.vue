<template>
  <div>
    <Navbar />
    <div id="main">
      <div class="pagetitle d-flex justify-content-between px-2">
        <div class="py-3">
          <ol class="breadcrumb mb-1">
            <li class="breadcrumb-item active text-uppercase fs-6">
              <router-link class="nav-link d-inline" aria-current="page" to="/home"
                >Dashboard</router-link
              >
              / <span class="color-fonts">RATES AND RULES</span>
            </li>
          </ol>
        </div>
      </div>

      <div class="container-fluid pt-3">
        <div class="row">
          <div class="col-12">
            <div class="">
              <div>
                <div class="p-2">
                  <div class="d-flex justify-content-between">
                    <div class="d-flex">
                      <div class="d-flex align-items-center">
                        <div class="card p-2">Rate and Rules</div>
                      </div>

                      &nbsp;&nbsp;
                      <div class="d-flex align-items-center"></div>
                    </div>

                    <div class="d-flex gap-3 align-items-center">
                      <button
                        type="button"
                        class="btn btn-outline-success text-nowrap"
                        data-bs-toggle="modal"
                        data-bs-target="#"
                        data-bs-whatever="@mdo"
                      >
                        + Add Rate
                      </button>
                      <button type="button" class="btn btn-outline-success text-nowrap">
                        <i class="bi bi-funnel"></i>
                        Show Filters
                      </button>
                    </div>
                  </div>
                </div>
                <!-- <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
                   
                  </ul> -->

                <div class="d-flex gap-2">
                  <div></div>
                </div>
                <div class="tab-content" id="pills-tabContent">
                  <div
                    class="tab-pane fade show active"
                    id="pills-home"
                    role="tabpanel"
                    aria-labelledby="pills-home-tab"
                  >
                    <table class="table candidateTable">
                      <thead>
                        <tr>
                          <th>
                            <div class="form-check">
                              <input class="form-check-input" type="checkbox" value="" />
                            </div>
                          </th>
                          <th scope="col">Client</th>

                          <th scope="col">Site</th>
                          <th scope="col">Position</th>
                          <th scope="col">Day</th>
                          <th scope="col">Shit End</th>
                          <th scope="col">1 Time</th>
                          <th scope="col">Client Rate</th>
                          <th scope="col">Primate Limited</th>
                          <th scope="col">Self Employes</th>
                          <th scope="col">Umbrella</th>
                          <th scope="col">PAYE</th>
                          <th scope="col">Created By and Time</th>
                          <th scope="col">Last Updatec</th>

                          <!-- <th scope="col">Action</th> -->
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>
                            <div class="form-check">
                              <input class="form-check-input" type="checkbox" value="" />
                            </div>
                          </td>
                          <td scope="col">f5643r</td>
                          <td scope="col">Aniket</td>
                          <td scope="col">Site</td>
                          <td scope="col">Manager</td>
                          <td scope="col">25/01/2024</td>
                          <td scope="col">22:00</td>
                          <td scope="col">10:00</td>

                          <td scope="col">10 hours</td>
                          <td scope="col">60%</td>
                          <td scope="col">£235</td>
                          <td scope="col">testing</td>
                          <td scope="col">£235</td>
                          <td scope="col">testing</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div
                    class="tab-pane fade"
                    id="pills-profile"
                    role="tabpanel"
                    aria-labelledby="pills-profile-tab"
                  >
                    ...
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
import Navbar from "../Navbar.vue";
export default {
  data() {
    return {};
  },
  components: { Navbar },
  computed: {},
  methods: {},

  mounted() {},
};
</script>

<style scoped>
#main {
  transition: all 0.3s;

  background-color: #fdce5e17;
}
.main-content {
  transition: all 0.3s;
}
.bg-define {
  background-color: #fdce5e17;
}
.color-fonts {
  color: #ff5f30;
  font-weight: bold;
}
.btn-primary {
  border: none;
}
.form-check-input {
  border: 2px solid grey;
}
select {
  padding: 10px;
  border-radius: 4px;
  border: 0px;
  border: 1px solid rgb(202, 198, 198);
}
.rounded-circle {
  border: 1px solid #ff5f30;
  padding: 8px 11px;
  cursor: pointer;
}
.border-left {
  border-left: 1px solid #ded9d9;
  height: 100vh;
}
a[data-v-507f63b7] {
  text-decoration: none;
}
.candidateTable tr:nth-child(odd) td {
  background: #fdce5e17 !important;
}
.btn-primary {
  border-radius: 4px;
}

.nav-pills .nav-link.active,
.nav-pills .show > .nav-link {
  background-color: transparent;
  border: 1px solid green;
  border-radius: 22px;
  color: green;
}

.nav-pills .nav-link {
  background-color: transparent;
  border: 1px solid #0d6efd;
  border-radius: 22px;
}
ul.nav-pills {
  height: 53px;
  border-bottom: 1px solid #b8b1b1;
}
table th {
  background-color: #ff5f30;
}

button.nav-link > li.nav-item {
  border-bottom: 2px solid red;
  padding-bottom: 5px;
}

.form-select {
  width: auto;
}

input::-webkit-input-placeholder {
  margin-left: 5px;
}
</style>
