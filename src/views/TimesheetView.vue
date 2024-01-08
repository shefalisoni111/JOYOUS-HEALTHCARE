<template>
  <div>
    <Navbar />
    <!-- <RouterView /> -->
    <div id="main">
      <h6>Work in progress</h6>
    </div>
  </div>
</template>
<script>
import Navbar from "../components/Navbar.vue";
// import Custom from "../components/TimeSheetPages/CustomTimeSheet.vue";
// import Signed from "../components/TimeSheetPages/SignedTimeSheet.vue";
// import Weekly from "../components/TimeSheetPages/WeeklyTimeSheet.vue";

export default {
  components: {
    // Custom,
    // Signed,
    // Weekly,
    Navbar,
  },
};
</script>
<style scoped>
#main {
  padding: 20px 20px;
  transition: all 0.3s;
  height: 100dvh;
  background-color: #fdce5e17;
}
</style>
