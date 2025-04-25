<template>
  <div>
    <div id="main" class="main d-flex">
      <Navbar />

      <!-- <CandidateAdd /> -->

      <router-view />
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
#main {
  transition: all 0.3s;

  background-color: #f9f9f9;
}
</style>
