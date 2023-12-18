<template>
  <div>
    <!-- Modal -->
    <div
      class="modal fade"
      id="publishVacancy"
      aria-labelledby="publishVacancy"
      tabindex="-1"
    >
      <div class="modal-dialog modal-dialog-centered modal-xl">
        <div class="modal-content">
          <div class="modal-header d-inline-flex gap-3">
            <h5 class="modal-title" id="publishVacancy">Publish Vacancy</h5>
            <ul class="list-unstyled d-flex gap-3 mb-0 publish-ul">
              <li>Code:gbf</li>
              <li>B-unit:Demo</li>
              <li>Job: driver</li>
              <li>Date: 18-07-2023</li>
              <li>Time: 20:00 - 08:00</li>
              <li>Space left: 1</li>
            </ul>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body mx-3">
            <div class="row g-3 align-items-center">
              <ul class="list-unstyled d-flex justify-content-end gap-3">
                <li>
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckDefault"
                  />
                  &nbsp;WORKED (0)
                </li>
                <li>
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckDefault"
                  />&nbsp;CONSECUTIVE (0)
                </li>
                <li>
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckDefault"
                  />&nbsp;AVAILABLE (0)
                </li>
                <li>
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckDefault"
                  />&nbsp;UNAVAILABLE (0)
                </li>
                <li>
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckDefault"
                  />&nbsp;OTHER (1)
                </li>
                <li>
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckDefault"
                  />&nbsp;O ASSIGNED (0)
                </li>
                <li>
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckDefault"
                  />&nbsp;© PUBLISHED
                </li>
                <li>
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckDefault"
                  />&nbsp;@ REJECTED BY CANDIDATE
                </li>
              </ul>
            </div>
            <div class="row">
              <div class="col-md-12">
                <div
                  class="pagetitle d-flex justify-content-between align-items-center p-2"
                >
                  <div class="d-flex justify-content-around gap-2">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      value=""
                      id="flexCheckDefault"
                    />
                    Select All
                  </div>

                  <div></div>

                  <div
                    class="d-flex align-items-center justify-content-between"
                  >
                    <div class="d-flex align-items-center gap-2">
                      <div class="searchbox position-relative">
                        <input
                          class="form-control mr-sm-2"
                          type="search"
                          placeholder="Search "
                          aria-label="Search"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-12">
                <h6>Vacancy List ...</h6>
                <!-- <table class="table candidateTable">
                  <thead>
                    <tr>
                      <th scope="col">#RefCode</th>
                      <th scope="col">Client</th>
                      <th scope="col">Business Unit</th>
                      <th scope="col">Job Title</th>
                      <th scope="col">Date</th>
                      <th scope="col">Shift</th>
                      <th scope="col">Notes</th>
                      <th scope="col">Publish</th>
                      <th scope="col">All</th>
                      <th scope="col">Applied</th>
                      <th scope="col">Assigned</th>
                      <th scope="col">Create by</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="getdata in getVacancyDetail" :key="getdata.id">
                      <td v-text="getdata.ref_code"></td>
                      <td v-text="getdata.client"></td>
                      <td v-text="getdata.business_unit"></td>
                      <td v-text="getdata.job_title"></td>
                      <td>
                        <div v-for="date in getdata.dates" :key="date.id">
                          <p>{{ date }}</p>
                        </div>
                      </td>
                     
                      <td v-text="getdata.shift"></td>

                      <td v-text="getdata.notes"></td>
                      <td>
                        <a
                          class="btn btn-success"
                          data-bs-toggle="modal"
                          data-bs-target="#publishVacancy"
                          data-bs-whatever="@mdo"
                        >
                          <td v-if="getdata.publish === false">
                            <i class="bi bi-bell-fill"></i>
                          </td>

                          <td v-else>
                            <i class="bi bi-check-circle-fill"></i>
                          </td>
                        </a>
                      </td>

                      <td v-text="getdata.publish"></td>
                      <td v-text="getdata.publish"></td>
                      <td v-text="getdata.publish"></td>
                      <td v-text="getdata.create_by_and_time"></td>
                      <td class="cursor-pointer">
                        <router-link
                          :to="{
                            name: 'VacancyEdit',
                            params: { id: getdata.id },
                          }"
                          class="btn btn-outline-success text-nowrap"
                        >
                          <i class="bi bi-pencil-square"></i>
                        </router-link>
                        &nbsp;&nbsp;
                        <button class="btn btn-outline-success text-nowrap">
                          <i
                            class="bi bi-trash"
                            v-on:click="vacancyDeleteMethod(getdata.id)"
                          ></i>
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table> -->
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <div class="row">
              <div class="col-md-12 d-flex justify-content-between">
                <div class="d-flex gap-3">
                  <div class="d-flex justify-content-around gap-2">
                    <div class="btn btn-success text-nowrap">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        value=""
                        id="flexCheckDefault"
                      />
                      Push Notification
                    </div>
                  </div>
                  <div class="d-flex justify-content-around gap-2">
                    <div class="btn btn-success text-nowrap">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        value=""
                        id="flexCheckDefault"
                      />
                      Text Notification
                    </div>
                  </div>
                  <div class="d-flex justify-content-around gap-2">
                    <div class="btn btn-success text-nowrap">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        value=""
                        id="flexCheckDefault"
                      />
                      Mail Notification
                    </div>
                  </div>
                </div>
                <div class="d-flex gap-3">
                  <button
                    class="btn btn-danger rounded-1"
                    data-bs-target="#publishVacancy"
                    data-bs-toggle="modal"
                    data-bs-dismiss="modal"
                  >
                    Cancel
                  </button>
                  <button
                    class="btn btn-success rounded-1 text-capitalize fw-medium"
                    data-bs-dismiss="modal"
                  >
                    Publish
                  </button>
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
export default {
  name: "PublishedVacancy",
  data() {
    return {};
  },

  methods: {},
  mounted() {},
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
.publish-ul li {
  background: #ff57223d;
  padding: 5px;
}
.modal-xl {
  --bs-modal-width: 1823px !important;
}
.modal-footer {
  display: block;
}

select {
  width: 100%;
  padding: 10px;
  border-radius: 4px;
  border: 0px;
}
label.form-label {
  text-transform: capitalize;
}
.modal-footer {
  border-top: 0px;
}

.btn-primary {
  border: none;
}
#head {
  width: 40px;
  height: 40px;
}

.modal {
  --bs-modal-width: 881px;
}
</style>
