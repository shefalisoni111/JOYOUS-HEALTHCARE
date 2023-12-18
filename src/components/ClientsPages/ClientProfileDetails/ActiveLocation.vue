<template>
  <div>
    <div class="row">
      <div class="col-12">
        <div class="d-flex justify-content-between">
          <h5 class="mb-2 d-flex align-items-center">Business Unit</h5>
          <button
            type="button"
            class="btn btn-outline-success text-nowrap"
            data-bs-toggle="modal"
            data-bs-target="#addVacancies"
            data-bs-whatever="@mdo"
          >
            + Add Business Unit
          </button>
        </div>

        <div class="card mt-2">
          <div class="card-header">Hospital 1</div>
          <div class="card-body">
            <h5 class="card-title"></h5>
            <div class="card-text d-flex">
              <div class="col-2 mt-3">
                <span class="rounded-circle">HP1</span>
              </div>
              <div class="col-10">
                <span>hospital@gmail.com</span><br />
                <span>+91 9867895645</span><br />
                <span>United Kingdom</span><br />
              </div>
            </div>
            <a class="btn btn-primary mt-3">Edit</a>
          </div>
        </div>
        <div class="card mt-2">
          <div class="card-header">Hospital 2</div>
          <div class="card-body">
            <h5 class="card-title"></h5>
            <div class="card-text d-flex">
              <div class="col-2 mt-3">
                <span class="rounded-circle">HP2</span>
              </div>
              <div class="col-10">
                <span>hospital@gmail.com</span><br />
                <span>+91 9867895645</span><br />
                <span>United Kingdom</span><br />
              </div>
            </div>
            <a class="btn btn-primary mt-3">Edit</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card .rounded-circle {
  border: 1px solid #000;
  padding: 19px 12px;
}
.btn-primary {
  border: none;
}
</style>
