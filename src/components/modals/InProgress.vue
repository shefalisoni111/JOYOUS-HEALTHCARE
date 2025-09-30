<template>
  <div>
    <!-- Modal -->
    <div class="modal fade" id="inprogress" aria-labelledby="inprogress">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header"></div>
          <div class="modal-body mx-3">
            <img
              src="./progress.gif"
              width="70%"
              title="work in progress"
              loading="eager"
            />
          </div>
          <!-- <div class="modal-footer">
            <button
               class="btn btn-dark btn-cancel"
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

<style scoped>
.content-area {
  margin-left: 250px;
  transition: margin-left 0.3s ease;
}
@media (max-width: 1120px) {
  .content-area {
    margin-left: 0;
  }
}
.modal-body img {
  display: block;
  margin: auto;
}
</style>
