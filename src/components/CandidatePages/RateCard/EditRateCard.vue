<template>
  <div>
    <!-- Modal -->
    <div>
      <div class="main-box">
        <div class="model-box">
          <div class="text-center">
            <h5 class="">Edit Candidate</h5>
          </div>
          <div class="mx-3">
            <div class="row">
              <form>
                <div class="mb-3">
                  <div class="d-flex">
                    <div class="col-12">
                      <label class="form-label">Name</label>
                    </div>
                    <div class="col-12 mt-1">
                      <input
                        type="text"
                        class="form-control"
                        v-model="fetchCandidate.first_name"
                      />
                    </div>
                  </div>
                </div>

                <div class="mb-3 d-flex justify-content-between">
                  <div class="col-12">
                    <label class="form-label">Email</label>
                  </div>
                  <div class="col-12 mt-1">
                    <input
                      type="email"
                      class="form-control"
                      v-model="fetchCandidate.email"
                    />
                  </div>
                </div>
                <div class="mb-3 d-flex justify-content-between">
                  <div class="col-12">
                    <label class="form-label">Phone Number</label>
                  </div>
                  <div class="col-12 mt-1">
                    <input
                      type="number"
                      class="form-control"
                      v-model="fetchCandidate.phone_number"
                    />
                  </div>
                </div>
                <div class="mb-3 d-flex justify-content-between">
                  <div class="col-12">
                    <label class="form-label">Status</label>
                  </div>
                  <div class="col-12 mt-1">
                    <input
                      type="text"
                      class="form-control"
                      v-model="fetchCandidate.activated"
                    />
                  </div>
                </div>
                <div class="d-flex justify-content-center">
                  <button
                    class="btn btn-primary rounded-1 text-capitalize fw-medium"
                    data-bs-dismiss="modal"
                    @click.prevent="updateCandidateMethod()"
                  >
                    Save
                  </button>
                </div>
              </form>
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
  name: "CandidateAdd",
  data() {
    return {
      fetchCandidate: {
        id: "",
        first_name: "",
        last_name: "",
        password: "",
        confirm_password: "",
        address: "",
        jobs_id: 1,
        phone_number: "",
        email: "",
        activated: "",
        employment_type_id: "",
      },
    };
  },

  methods: {
    async fetchCandidateMethod(id) {
      try {
        const response = await axios.get(
          `https://logezy.onrender.com/rate_cards/${id}`
        );

        this.fetchCandidate = { ...this.fetchCandidate, ...response.data.data };
      } catch (error) {
        // console.error("Error fetching todo:", error);
      }
    },
    async updateCandidateMethod() {
      try {
        await axios.put(
          `https://logezy.onrender.com/rate_cards/${this.fetchCandidate.id}`,
          {}
        );

        alert("Candidate updated successfully");
      } catch (error) {
        // console.error("Error updating candidate:", error);
      }
    },
  },

  mounted() {
    this.fetchCandidateMethod(this.$route.params.id);
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
.main-box {
  background: #00000008;

  padding: 100px 20px;
  height: 100vh;
  overflow: hidden;
}

.model-box {
  background: #f3f3f3;
  margin: 20px 443px;
  padding: 10px;
  border-radius: 4px;
  box-shadow: 3px 1px 12px 14px #c3bdbd;
}
.btn-primary {
  background-color: #ff5f30 !important;
  font-weight: bold;
  border: none;
  border-radius: 4px;
  outline: none;
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
