<template>
  <div>
    <Navbar />

    <CandidateAdd />

    <router-view />
  </div>
</template>

<script>
import Navbar from "../components/Navbar.vue";

import CandidateAdd from "../components/modals/CandidatePage/CandidateAdd.vue";

export default {
  name: "CandidatesView",
  components: {
    Navbar,

    CandidateAdd,
  },
};
</script>
