<template>
  <div>
    <Navbar />
    <RouterView />
    <!-- <div id="main">
      <h6>Invoice Page in Progress.....</h6>
    </div> -->
  </div>
</template>
<script>
import Navbar from "../components/Navbar.vue";
import ClientInvoice from "../components/InvoicePages/ClientInvoice.vue";
import CandidateInvoice from "../components/InvoicePages/CandidateInvoice.vue";

export default {
  components: {
    Navbar,
    ClientInvoice,
    CandidateInvoice,
  },
};
</script>
<style scoped>
#main {
  padding: 20px 20px;
  transition: all 0.3s;
  height: 100dvh;
  margin-top: 72px;
  background-color: #fdce5e17;
}
ul.generalsetting h6 {
  font-size: 14px;
  font-weight: bold;
}
</style>
