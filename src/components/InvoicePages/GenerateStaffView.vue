<template>
  <div>
    <div id="main">
      <div class="pagetitle d-flex justify-content-between px-2">
        <div class="py-3">
          <ol class="breadcrumb mb-1">
            <li class="breadcrumb-item active text-uppercase fs-6">
              <router-link
                class="nav-link d-inline"
                aria-current="page"
                to="/home"
                >Dashboard</router-link
              >/
              <router-link
                class="nav-link d-inline color-fonts"
                aria-current="page"
                to="/invoice/staff-payroll"
                >Staff Invoice</router-link
              >
              / <span class="color-fonts">Generate Staff View</span>
            </li>
          </ol>
        </div>
      </div>
      <div class="table-wrapper mt-3">
        <table class="table clientTable">
          <thead>
            <tr>
              <th scope="col">Ref Code</th>
              <th scope="col">Client Name</th>
              <th scope="col">Site</th>
              <th scope="col">Staff</th>
              <th scope="col">Position</th>
              <th scope="col">Start Date</th>
              <th scope="col">End Date</th>
              <th scope="col">Total Cost</th>
              <th scope="col">Action</th>
            </tr>
          </thead>

          <tbody v-if="getInvoiceStaffData?.length > 0">
            <template v-for="(data, index) in getInvoiceStaffData" :key="index">
              <tr>
                <td v-text="getRefCode(data.site_details)"></td>
                <td v-text="getSiteId(data.site_details)"></td>
                <td v-text="getSiteId(data.site_details)"></td>
                <!-- <td v-text="data.site_name"></td> -->
                <td v-text="data.candidate_name"></td>
                <td v-text="data.job_position"></td>
                <td v-text="data.start_date"></td>
                <td v-text="data.end_date"></td>
                <td v-text="'£' + data.total_amount"></td>
                <td>
                  <router-link
                    :to="{
                      name: 'GenerateSingleStaffView',
                      params: { id: index },
                    }"
                    class="text-success"
                  >
                    <i class="bi bi-eye"></i>
                  </router-link>
                </td>
              </tr>
            </template>
            <!-- <tr v-for="(data, index) in getInvoiceData" :key="index">
                <td v-text="data.reference_code"></td>
                <td v-text="data.client_name"></td>
                <td v-text="data.site_name"></td>
                <td v-text="data.candidate_details[0]?.candidate_id || 'N/A'"></td>
                <td v-text="data.candidate_details[0]?.job_position || 'N/A'"></td>
                <td v-text="data.start_date"></td>
                <td v-text="data.end_date"></td>
  
                <td v-text="data.total_amount"></td>
                <td>
                  <router-link
                    :to="{ name: 'GenerateInvoiceView', params: { id: index } }"
                    class="text-success"
                    ><i class="bi bi-eye"></i
                  ></router-link>
                </td>
              </tr> -->
          </tbody>
          <tbody v-else>
            <tr>
              <td colspan="9" class="text-danger text-center">
                {{ "Data Not Found !" }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters(["getInvoiceStaffData"]),
  },
  methods: {
    toggleActionMenu(index) {
      this.selectedRow = this.selectedRow === index ? null : index;
    },
    getSiteId(site_details) {
      const validCandidate = site_details.find(
        (candidate) => candidate.site_name && candidate.site_name.trim() !== ""
      );
      return validCandidate ? validCandidate.site_name : "";
    },
    getClientID(site_details) {
      const validCandidate = site_details.find(
        (candidate) =>
          candidate.client_name && candidate.client_name.trim() !== ""
      );
      return validCandidate ? validCandidate.client_name : "";
    },
    getRefCode(site_details) {
      const validCandidate = site_details.find(
        (candidate) => candidate.ref_code && candidate.ref_code.trim() !== ""
      );
      return validCandidate ? validCandidate.ref_code : "";
    },
  },
  mounted() {
    // console.log(this.getInvoiceData);
  },
};
</script>

<style scoped>
#main {
  transition: all 0.3s;

  padding-top: 65px;
  background-color: #fdce5e17;
}
.main-content {
  transition: all 0.3s;
}
.text-success {
  color: green;
}
.text-danger {
  color: red;
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
