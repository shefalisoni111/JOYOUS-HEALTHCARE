<template>
  <div>
    <!-- Modal -->
    <div
      class="modal fade"
      id="inprogress"
      aria-labelledby="inprogress"
      tabindex="-1"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body mx-3">
            <img src="./progress.gif" width="100%" title="work in progress" />
          </div>
          <!-- <div class="modal-footer">
            <button
              class="btn btn-secondary rounded-1"
              data-bs-target="#inprogress"
              data-bs-toggle="modal"
              data-bs-dismiss="modal"
            >
              Cancel
            </button>
          </div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script></script>

<style scoped></style>
