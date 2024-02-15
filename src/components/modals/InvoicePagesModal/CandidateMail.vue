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
            <h5 class="modal-title" id="candidateMail">Mail to Candidate</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body mx-3">
            <div class="row g-3 align-items-center">
              <form>
                <div>
                  <div class="row align-items-center">
                    <div class="mt-3 d-flex">
                      <div class="col-1">
                        <label for="formFile" class="col-form-label">INVOICE:</label>
                      </div>
                      <div class="col-11">
                        <input class="form-control" type="file" id="formFile" />
                      </div>
                    </div>
                  </div>

                  <div class="row align-items-center mt-3">
                    <div class="col-1">
                      <label for="mailto" class="col-form-label">MAIL TO:</label>
                    </div>
                    <div class="col-11">
                      <input type="text" id="mailto" class="form-control" />
                    </div>
                  </div>
                  <div class="row align-items-center mt-3 ms-3">
                    <div class="col-1">
                      <label for="mailto" class="col-form-label"></label>
                    </div>
                    <div class="col-11 ms-5 p-0">
                      <TextFormator />
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div class="modal-footer">
            <button
              class="btn btn-secondary rounded-1"
              data-bs-target="#candidateMail"
              data-bs-toggle="modal"
              data-bs-dismiss="modal"
            >
              Cancel
            </button>
            <button class="btn btn-primary rounded-1 text-capitalize fw-medium">
              <i class="bi bi-send"></i>
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TextFormator from "../../textformator/TextFormator.vue";
export default {
  name: "Mail-Invoice",
  data() {
    return {};
  },
  components: {
    TextFormator,
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
