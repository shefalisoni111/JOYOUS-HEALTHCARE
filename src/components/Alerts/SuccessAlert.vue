<template>
  <div>
    <div class="container">
      <div v-if="progressiveSuccess" class="success-alert">
        <div class="progress" style="height: 5px">
          <div
            class="progress-bar bg-success"
            role="progressbar"
            :style="{ width: progress + '%' }"
            :aria-valuenow="progress"
            aria-valuemin="0"
            aria-valuemax="100"
          ></div>
        </div>
        <p class="px-3 pt-2 text-capitalize fw-bold">
          SUCCESS <br />{{ message }} &nbsp;<i
            class="bi bi-check-circle-fill text-white"
          ></i>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: "",
      progressiveSuccess: false,
      progress: 0,
      intervalId: null,
      duration: 3000,
      intervalDuration: 100,
    };
  },
  methods: {
    startProgressBar() {
      this.progress = 0;
      this.intervalId = setInterval(() => {
        if (this.progress < 100) {
          this.progress += (this.intervalDuration / this.duration) * 100;
        } else {
          this.stopProgressBar();
          this.progressiveSuccess = false;
        }
      }, this.intervalDuration);
    },

    stopProgressBar() {
      clearInterval(this.intervalId);
    },

    showSuccess(message) {
      this.message = message;
      this.progressiveSuccess = true;
      this.startProgressBar();
    },
  },
};
</script>

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
.success-alert {
  position: fixed;
  top: 15%;
  right: 0;
  transform: translateX(-50%);

  background-color: #62c766;
  color: white;
  border-radius: 5px;
  z-index: 9999;
  border: 1px solid green;
  border-top: none;
}
.progress-bar {
  background-color: #2f9533 !important;
}
</style>
