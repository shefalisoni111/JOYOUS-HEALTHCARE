<template>
  <div>
    <!-- <Navbar /> -->
    <!-- <RouterView /> -->
    <!-- <div id="main">
      <h6>TimeSheet Page in Progress.....</h6>
    </div> -->
    <router-view />
  </div>
</template>
<script>
// import Navbar from "../components/Navbar.vue";
// import Custom from "../components/TimeSheetPages/CustomTimeSheet.vue";
// import Signed from "../components/TimeSheetPages/SignedTimeSheet.vue";
// import Weekly from "../components/TimeSheetPages/WeeklyTimeSheet.vue";

export default {
  components: {
    // Custom,
    // Signed,
    // Weekly,
    // Navbar,
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
  padding: 20px 20px;
  transition: all 0.3s;
  height: 100dvh;

  background-color: #fdce5e17;
}
</style>
