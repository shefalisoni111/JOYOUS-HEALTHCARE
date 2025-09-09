<script>
import "./assets/main.css";
import { mapGetters } from "vuex";
import "bootstrap/dist/js/bootstrap.bundle.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import Navbar from "./components/Navbar.vue";
import "@fontsource/inter";
import "@fontsource/inter/400.css";
import "@fontsource/inter/700.css";

export default {
  name: "App",
  data() {
    return {};
  },
  components: { Navbar },

  methods: {},
  computed: {
    ...mapGetters(["getFavicon"]),
  },
  watch: {
    getFavicon(newVal) {
      if (newVal) {
        const link = document.getElementById("dynamic-favicon");
        if (link) {
          link.href = newVal;
        }
      }
    },
  },
  mounted() {
    // this.$store.dispatch("fetchAgencyLogo");
  },
};
</script>

<template>
  <div>
    <!-- <Navbar v-if="$route.path !== '/'" :disableApiCall="true" /> -->
    <div>
      <RouterView />
    </div>
  </div>
</template>

<style scoped></style>
