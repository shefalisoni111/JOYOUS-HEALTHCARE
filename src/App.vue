<script>
import "./assets/main.css";

import { mapActions, mapGetters } from "vuex";
import "bootstrap/dist/js/bootstrap.bundle.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import Navbar from "./components/Navbar.vue";
import "@fontsource/inter";
import "@fontsource/inter/400.css";
import "@fontsource/inter/700.css";

export default {
  name: "App",
  data() {},
  components: { Navbar },
  computed: {
    ...mapGetters(["getCompanyName", "getFavicon"]),
  },
  methods: { ...mapActions(["fetchAgencyLogo"]) },
  mounted() {
    this.fetchAgencyLogo();

    document.title = this.getCompanyName;
  },
  watch: {
    getCompanyName(newVal) {
      if (newVal) {
        document.title = newVal;
      }
    },
    getFavicon(newVal) {
      if (newVal) {
        const faviconElement = document.getElementById("dynamic-favicon");
        if (faviconElement) {
          faviconElement.setAttribute("href", newVal);
        }
      }
    },
  },
};
</script>

<template>
  <div>
    <div>
      <RouterView />
    </div>
  </div>
</template>

<style scoped></style>
