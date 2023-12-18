<template>
  <div>
    <!-- Modal -->
    <div
      class="modal fade"
      id="editPopup"
      aria-labelledby="editPopup"
      tabindex="-1"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="myModal">Add Jobs</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body mx-3">
            <div class="row align-items-center">
              <form>
                <div class="mb-3 d-flex">
                  <div class="col-2">
                    <label class="form-label">NAME</label>
                  </div>
                  <div class="col-10 mt-1">
                    <input type="text" class="form-control" />
                  </div>
                </div>
                <div class="mb-3 d-flex justify-content-between">
                  <div class="col-2">
                    <label for="exampleFormControlTextarea1" class="form-label"
                      >COLOR</label
                    >
                  </div>
                  <div class="col-10 mt-1">
                    <input type="color" id="head" name="head" />
                    <!-- <i class="bi bi-square-fill"></i> -->
                  </div>
                </div>
                <div class="mb-3 d-flex justify-content-between">
                  <div class="col-2">
                    <label for="exampleFormControlTextarea1" class="form-label"
                      >DESC</label
                    >
                  </div>
                  <div class="col-10 mt-1">
                    <textarea
                      type="text"
                      class="form-control"
                      id="exampleFormControlTextarea1"
                      rows="3"
                    ></textarea>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div class="modal-footer">
            <button
              class="btn btn-secondary rounded-1"
              data-bs-target="#editPopup"
              data-bs-toggle="modal"
              data-bs-dismiss="modal"
            >
              Cancel
            </button>
            <button
              class="btn btn-primary rounded-1 text-capitalize fw-medium"
              data-bs-dismiss="modal"
            >
              Add Job
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
