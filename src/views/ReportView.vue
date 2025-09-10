<template>
  <div>
    <!-- <Navbar /> -->

    <div id="main" class="main d-flex">
      <div
        class=""
        style="
          background: #fff;

          border-radius: 20px;
        "
      >
        <Navbar />
      </div>
      <div class="container-fluid ps-5 pt-3">
        <div class="row pagetitle d-flex justify-content-between px-2">
          <div class="py-3">
            <ol class="breadcrumb my-2">
              <li class="breadcrumb-item active fs-6">
                <a
                  class="nav-link d-inline fs-4 fw-bolder"
                  style="color: #000000"
                  >Report</a
                >

                <!-- <span class="color-fonts">{{ activeTabName }}</span> -->
              </li>
            </ol>
          </div>
        </div>

        <div class="row">
          <div class="col-11 col-xxl-12 col-xl-12">
            <div
              class="d-flex gap-2 justify-content-between bg-define position-relative"
            >
              <ul class="nav nav-pills py-0 px-0" role="tablist">
                <li
                  class="nav-item d-sm-contents d-lg-inline-flex d-md-inline-flex gap-2"
                  role="presentation"
                >
                  <button
                    class="nav-link text-nowrap"
                    :class="{ active: activeTab === index }"
                    :to="`/${tab.routeName}`"
                    aria-selected="true"
                    type="button"
                    role="tab"
                    data-bs-toggle="pill"
                    v-for="(tab, index) in tabs"
                    :key="index"
                    @click="selectTab(index)"
                  >
                    <img
                      v-if="tab.icon"
                      :src="tab.icon"
                      alt="icon"
                      style="width: 18px; height: 18px; margin-right: 5px"
                    />
                    {{ tab.name }}
                  </button>
                </li>
              </ul>
              <div class="d-flex align-items-center p-2">
                <div class="d-flex justify-content-between gap-2">
                  <div
                    class="form-inline my-2 my-lg-0 d-flex align-items-center justify-content-between gap-2"
                  ></div>

                  <div class="d-flex justify-content-between gap-2"></div>
                </div>
              </div>
            </div>
            <div>
              <component :is="activeComponent"></component>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import PayrollReport from "../components/ReportPages/PayrollReport.vue";
import StaffReport from "../components/ReportPages/StaffReport.vue";
import ClientReport from "../components/ReportPages/ClientReport.vue";
import BusinessUnitReport from "../components/ReportPages/BusinessUnitReport.vue";
import InvoiceReport from "../components/ReportPages/InvoiceReport.vue";
import DocumentReport from "../components/ReportPages/DocumentReport.vue";
import RateCardReport from "../components/ReportPages/RateCardReport.vue";
import Navbar from "../components/Navbar.vue";
// import staffIcon from "@/assets/staff_report.png";
// import clientIcon from "@/assets/client_report.png";
// import siteICon from "@/assets/site_report.png";
// import invoiceIcon from "@/assets/invoice_report.png";
// import rateCardIcon from "@/assets/ratecard_report.png";
// import EmailReport from "../components/ReportPages/EmailReport.vue";

export default {
  name: "ReportView",
  data() {
    return {
      tabs: [
        // {
        //   name: "Payroll Report ",
        //   component: "PayrollReport",
        //   routeName: "PayrollReport",
        // },
        {
          name: "Staff Report ",
          component: "StaffReport",
          routeName: "StaffReport",
          // icon: staffIcon,
        },
        {
          name: "Client Report ",
          component: "ClientReport",
          routeName: "ClientReport",
          // icon: clientIcon,
        },
        {
          name: "Site Report",
          component: "BusinessUnitReport",
          routeName: "BusinessUnitReport",
          // icon: siteICon,
        },
        {
          name: "Invoice Report",
          component: "InvoiceReport",
          routeName: "InvoiceReport",
          // icon: invoiceIcon,
        },
        {
          name: "Document Report",
          component: "DocumentReport",
          routeName: "DocumentReport",
          // icon: invoiceIcon,
        },
        {
          name: "RateCard",
          component: "RateCardReport",
          routeName: "RateCardReport",
          // icon: rateCardIcon,
        },
        // {
        //   name: "EmailReport",
        //   component: "EmailReport",
        //   routeName: "EmailReport",
        // },
      ],
      activeTab: 0,
      activeTabName: "",
    };
  },
  computed: {
    activeComponent() {
      return this.tabs[this.activeTab].component;
    },
  },
  components: {
    Navbar,
    // PayrollReport,
    StaffReport,
    ClientReport,
    BusinessUnitReport,
    InvoiceReport,
    DocumentReport,
    RateCardReport,
    // EmailReport,
  },

  methods: {
    toggleActionMenu(index) {
      this.selectedRow = this.selectedRow === index ? null : index;
    },
    setActiveTabFromRoute() {
      const currentRouteName = this.$route.name;
      const matchingTabIndex = this.tabs.findIndex(
        (tab) => tab.routeName === currentRouteName
      );

      if (matchingTabIndex !== -1) {
        this.selectTab(matchingTabIndex);
      }
    },

    setActiveTabNameOnLoad() {
      this.activeTabName = this.tabs[this.activeTab].name;
    },
    selectTab(index) {
      this.activeTab = index;
      this.activeTabName = this.tabs[index].name;
      this.$router.push({ name: this.tabs[index].routeName });
    },
  },

  async mounted() {
    await this.setActiveTabFromRoute();
    await this.setActiveTabNameOnLoad();
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      const matchingTabIndex = vm.tabs.findIndex(
        (tab) => tab.routeName === to.name
      );

      if (matchingTabIndex !== -1) {
        vm.activeTab = matchingTabIndex;
        vm.activeTabName = vm.tabs[matchingTabIndex].name;
      }
    });
  },
  beforeRouteUpdate(to, from, next) {
    const matchingTabIndex = this.tabs.findIndex(
      (tab) => tab.routeName === to.name
    );

    if (matchingTabIndex !== -1) {
      this.activeTab = matchingTabIndex;
      this.activeTabName = this.tabs[matchingTabIndex].name;
    }

    next();
  },
};
</script>

<style>
#main {
  transition: all 0.3s;

  background-color: #f9f9f9;
}
.main-content {
  transition: all 0.3s;
}
select {
  background: #f9944b14;
}
.view-toggle {
  display: inline-flex;
  border-radius: 12px;
  overflow: hidden;
  background-color: #f6f6f6;
  line-height: 37px;
  gap: 5px;
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
.color-fonts {
  color: #ff5f30;
  font-weight: bold;
}
.nav-pills .nav-link {
  border: 2px solid #444444;
  color: #6e7681;
}
.btn-primary {
  border: none;
  font-size: 13px;
  font-weight: 700;
}
.custom-select-wrapper {
  position: relative;
  display: inline-block;
  width: 220px;
}

.custom-select-wrapper select {
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  padding-right: 2rem;
  width: 100%;
  border: 1px solid transparent;
  border-radius: 6px;
  height: 50px;
  padding: 6px 12px;
}

.custom-select-wrapper::after {
  content: "▼";
  position: absolute;
  top: 50%;
  right: 12px;
  transform: translateY(-50%);
  pointer-events: none;
  font-size: 12px;
  color: #999;
}
a {
  color: black;
}

.nav-pills .nav-link.active,
.nav-pills .show > .nav-link {
  background-color: transparent;
  border-bottom: 2px solid #f9944b;
  padding: 0;
  color: #f9944b;

  border-radius: 0px;
}

.nav-pills .nav-link {
  background-color: transparent;
  border: transparent;
}
.form-check-input {
  border: 2px solid grey;
}
.border-left {
  border-left: 1px solid #ded9d9;
  height: 100vh;
}

.btn-primary {
  border-radius: 4px;
}

.badge {
  background: #ff572247;

  padding: 6px 10px;
}
a:link {
  color: black;
  text-decoration: none;
}
.nav-pills .nav-link {
  background-color: transparent;

  color: #000;
}
.switch {
  width: 50px;
  height: 17px;
  position: relative;
  display: inline-block;
}

.switch input {
  display: none;
}

.switch .slider {
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  cursor: pointer;
  background-color: #e7ecf1;
  border-radius: 30px !important;
  border: 0;
  padding: 0;
  display: block;
  margin: 12px 10px;
  min-height: 11px;
}

.switch .slider:before {
  position: absolute;
  background-color: #aaa;
  height: 15px;
  width: 15px;
  content: "";
  left: 0px;
  bottom: -2px;
  border-radius: 50%;
  transition: ease-in-out 0.5s;
}

.switch .slider:after {
  content: "";
  color: white;
  display: block;
  position: absolute;
  transform: translate(-50%, -50%);
  top: 50%;
  left: 70%;
  transition: all 0.5s;
  font-size: 10px;
  font-family: "Inter", sans-serif;
}

.switch input:checked + .slider:after {
  transition: all 0.5s;
  left: 30%;
  content: "";
}

.switch input:checked + .slider {
  background-color: #d3d6d9;
}

.switch input:checked + .slider:before {
  transform: translateX(15px);
  background-color: #ff9800;
}

@media (max-width: 768px) {
  .d-sm-contents {
    display: contents;
  }
}
</style>
