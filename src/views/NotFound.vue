<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-12">
        <div class="m-auto text-center mt-5">
          <a href="/home"
            ><h1>Go to {{ getCompanyName }} Home</h1></a
          >
        </div>
        <img src="../assets/404img.jpg" class="img-fluid" loading="eager" />
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["getCompanyName"]),
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
}
img {
  height: 82dvh;
  width: 100%;
}
</style>
