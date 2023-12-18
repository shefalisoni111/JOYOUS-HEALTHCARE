<template>
  <div class="row">
    <div class="col-12">
      <div class="">
        <div class="card mt-2">
          <div class="card-header">Manage Client Jobs here</div>
          <div class="card-body">
            <h5 class="card-title"></h5>
            <div class="card-text d-flex justify-content-between gap-3">
              <div class="">
                <span class="btn btn-primary">Doctor</span>
                <span class="btn btn-primary">Nurse</span>
                <span class="btn btn-primary">HCA</span>
                <span class="btn btn-primary">Senior Doctor</span>
              </div>
            </div>
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
        </div>
      </div>
    </div>
  </div>
</template>
