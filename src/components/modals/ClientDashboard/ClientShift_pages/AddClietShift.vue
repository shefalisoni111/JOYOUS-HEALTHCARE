<template>
  <div>
    <!-- Modal -->
    <div
      class="modal fade"
      id="addShiftClient"
      aria-labelledby="addShiftClient"
      tabindex="-1"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="addShiftClient">Add Client Shift</h5>
          </div>
          <div class="modal-body mx-3">
            <div class="row g-3 align-items-center"></div>
          </div>
          <div class="modal-footer">
            <button
              class="btn btn-secondary rounded-1"
              data-bs-target="#addShiftClient"
              data-bs-toggle="modal"
              data-bs-dismiss="modal"
            >
              Cancel
            </button>
            <button class="btn btn-primary rounded-1 text-capitalize fw-medium">
              Add Shift
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "AddClietShift",

  data() {
    return {};
  },
  components: {},
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
.form-control {
  background-color: #fff;
  padding: 0.4rem 0.75rem;
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
