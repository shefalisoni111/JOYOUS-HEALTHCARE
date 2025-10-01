<template>
  <div>
    <div id="main" class="main d-flex">
      <div
        style="
          background: #fff;

          border-radius: 20px;
        "
      >
        <Navbar />
      </div>

      <!-- <CandidateAdd /> -->
      <div class="container-fluid col-10 content-area">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "../components/Navbar.vue";

// import CandidateAdd from "../components/modals/CandidatePage/CandidateAdd.vue";

export default {
  name: "CandidatesView",
  components: {
    Navbar,
    // CandidateAdd,
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
#main {
  transition: all 0.3s;

  background-color: #f9f9f9;
}
</style>
