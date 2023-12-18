<template>
  <div>
    <div class="row">
      <div class="col-md-3">
        <div class="card border-success mb-3">
          <div class="card-header">RecPal Demo</div>
          <div class="card-body">
            <div class="col-12">
              <table class="table table-sm">
                <thead>
                  <tr></tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Name</td>
                    <td>:</td>
                    <td>{{ getCandidatesData.first_name }}</td>
                  </tr>
                  <tr>
                    <td>Position</td>
                    <td>:</td>
                    <td>{{ getCandidatesData.position }}</td>
                  </tr>
                  <tr>
                    <td>Staff ID</td>
                    <td>:</td>
                    <td>{{ getCandidatesData.staff_id }}</td>
                  </tr>
                  <tr>
                    <td>Expiry Date</td>
                    <td>:</td>
                    <td>{{ getCandidatesData.expiry_date }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-3">
        <div class="card border-success mb-3">
          <div class="card-header">RecPal Demo</div>
          <div class="card-body">
            <div class="col-12">
              <table class="table table-sm">
                <thead>
                  <tr></tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Name</td>
                    <td>:</td>
                    <td>{{ getCandidatesData.first_name }}</td>
                  </tr>
                  <tr>
                    <td>Position</td>
                    <td>:</td>
                    <td>{{ getCandidatesData.position }}</td>
                  </tr>
                  <tr>
                    <td>Staff ID</td>
                    <td>:</td>
                    <td>{{ getCandidatesData.staff_id }}</td>
                  </tr>
                  <tr>
                    <td>Expiry Date</td>
                    <td>:</td>
                    <td>{{ getCandidatesData.expiry_date }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-3">
        <div class="card border-success mb-3">
          <div class="card-header">RecPal Demo</div>
          <div class="card-body">
            <div class="col-12">
              <table class="table table-sm">
                <thead>
                  <tr></tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Name</td>
                    <td>:</td>
                    <td>{{ getCandidatesData.first_name }}</td>
                  </tr>
                  <tr>
                    <td>Position</td>
                    <td>:</td>
                    <td>{{ getCandidatesData.position }}</td>
                  </tr>
                  <tr>
                    <td>Staff ID</td>
                    <td>:</td>
                    <td>{{ getCandidatesData.staff_id }}</td>
                  </tr>
                  <tr>
                    <td>Expiry Date</td>
                    <td>:</td>
                    <td>{{ getCandidatesData.expiry_date }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-3">
        <div class="card border-success mb-3">
          <div class="card-header">RecPal Demo</div>
          <div class="card-body">
            <div class="col-12">
              <table class="table table-sm">
                <thead>
                  <tr></tr>
                </thead>
                <tbody>
                  <tr>
                    <td class="font-weight-bold">Name</td>
                    <td>:</td>
                    <td>{{ getCandidatesData.first_name }}</td>
                  </tr>
                  <tr>
                    <td>Position</td>
                    <td>:</td>
                    <td>{{ getCandidatesData.position }}</td>
                  </tr>
                  <tr>
                    <td>Staff ID</td>
                    <td>:</td>
                    <td>{{ getCandidatesData.staff_id }}</td>
                  </tr>
                  <tr>
                    <td>Expiry Date</td>
                    <td>:</td>
                    <td>{{ getCandidatesData.expiry_date }}</td>
                  </tr>
                </tbody>
              </table>
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
  name: "StaffId",
  data() {
    return {
      getCandidatesData: [],
    };
  },

  components: {},
  methods: {
    async getCandidateMethods() {
      try {
        const response = await axios.get(
          `https://logezy.onrender.com/candidates/${this.$route.params.id}`
        );

        this.getCandidatesData = response.data.data;
      } catch (error) {
        if (error.response) {
          if (error.response.status == 404) {
          }
        } else {
          // console.error("Error fetching candidates:", error);
        }
      }
    },
  },

  mounted() {
    this.getCandidateMethods();
  },
};
</script>

<style scoped>
table tr td {
  text-transform: capitalize;
}
</style>
