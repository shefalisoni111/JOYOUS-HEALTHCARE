<template>
  <div>
    <!-- <Navbar /> -->
    <RouterView />
    <!-- <div id="main">
      <h6>Invoice Page in Progress.....</h6>
    </div> -->
  </div>
</template>
<script>
// import Navbar from "../components/Navbar.vue";
import ClientInvoice from "../components/InvoicePages/ClientInvoice.vue";
import CandidateInvoice from "../components/InvoicePages/CandidateInvoice.vue";

export default {
  components: {
    // Navbar,
    ClientInvoice,
    CandidateInvoice,
  },
};
</script>
<style>
#main {
}
ul.generalsetting h6 {
  font-size: 14px;
  font-weight: bold;
}
.view-toggle {
  display: inline-flex;
  border-radius: 12px;
  overflow: hidden;
  background-color: #f6f6f6;
  line-height: 37px;
  gap: 5px;
}
.action-wrapper position-relative {
  position: relative;
  display: inline-block;
}

.dot-icon {
  font-size: 18px;
  cursor: pointer;
  color: #888;
}

.shadow-soft {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  border-radius: 12px;
  background-color: white;
}
.toggle-btn {
  padding: 6px 16px;
  border: none;
  background: #fff;
  color: #5a5560;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.3s, color 0.3s;
}

.toggle-btn.active {
  background-color: #f9944b;
  color: white;
}
</style>
