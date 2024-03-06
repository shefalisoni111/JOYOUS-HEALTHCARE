<template>
  <!-- <h6>Client Notes Page is Processing....</h6> -->
  <div>
    <div class="row">
      <div class="col-12">
        <div class="d-flex justify-content-between">
          <div>
            <h5 class="mb-2 d-flex align-items-center">Notes</h5>
          </div>
          <div>
            <button
              type="button"
              class="btn btn-outline-success text-nowrap"
              data-bs-toggle="modal"
              data-bs-target="#addVacancies"
              data-bs-whatever="@mdo"
            >
              View More
            </button>
          </div>
        </div>
        <hr />
        <div class="d-flex justify-content-between align-items-center">
          <div class="d-flex gap-2">
            <div>
              <i class="bi bi-journal-album fs-1"></i>
            </div>

            <div class="mt-2">
              <h6 class="mb-0">ABC</h6>
              <p>2 August 2022 04:19 PM by Geetu</p>
            </div>
          </div>
          <div><span>read more</span></div>
        </div>
        <div class="d-flex w-25 mt-3">
          <input class="form-control" type="text" placeholder="Add Note" />
          <button class="btn btn-primary">Add</button>
        </div>
      </div>
    </div>
  </div>
</template>
