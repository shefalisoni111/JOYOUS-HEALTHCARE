<template>
  <div>
    <div class="container-fluid p-0">
      <div id="main">
        <div class="pagetitle d-flex justify-content-between px-2">
          <div class="py-3">
            <ol class="breadcrumb my-2">
              <li class="breadcrumb-item active text-uppercase fs-6">
                <router-link class="nav-link d-inline" aria-current="page" to="/home"
                  >Dashboard</router-link
                >
                /

                <span class="color-fonts">{{ activeTabName }}</span>
              </li>
            </ol>
          </div>
        </div>
      </div>
    </div>
    <div class="container-fluid p-0">
      <div class="row">
        <div class="">
          <div class="d-flex gap-2 justify-content-between bg-define">
            <ul class="nav nav-pills my-3 p-2" role="tablist">
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
</template>

<script>
// import PayrollReport from "../components/ReportPages/PayrollReport.vue";
import StaffReport from "../components/ReportPages/StaffReport.vue";
import ClientReport from "../components/ReportPages/ClientReport.vue";
import BusinessUnitReport from "../components/ReportPages/BusinessUnitReport.vue";
import InvoiceReport from "../components/ReportPages/InvoiceReport.vue";
import DocumentReport from "../components/ReportPages/DocumentReport.vue";
import RateCardReport from "../components/ReportPages/RateCardReport.vue";
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
        { name: "Staff Report ", component: "StaffReport", routeName: "StaffReport" },
        {
          name: "Client Report ",
          component: "ClientReport",
          routeName: "ClientReport",
        },
        {
          name: "Site Report",
          component: "BusinessUnitReport",
          routeName: "BusinessUnitReport",
        },
        {
          name: "Invoice Report",
          component: "InvoiceReport",
          routeName: "InvoiceReport",
        },
        {
          name: "Document Report",
          component: "DocumentReport",
          routeName: "DocumentReport",
        },
        {
          name: "RateCard",
          component: "RateCardReport",
          routeName: "RateCardReport",
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
      const matchingTabIndex = vm.tabs.findIndex((tab) => tab.routeName === to.name);

      if (matchingTabIndex !== -1) {
        vm.activeTab = matchingTabIndex;
        vm.activeTabName = vm.tabs[matchingTabIndex].name;
      }
    });
  },
  beforeRouteUpdate(to, from, next) {
    const matchingTabIndex = this.tabs.findIndex((tab) => tab.routeName === to.name);

    if (matchingTabIndex !== -1) {
      this.activeTab = matchingTabIndex;
      this.activeTabName = this.tabs[matchingTabIndex].name;
    }

    next();
  },
};
</script>

<style scoped>
#main {
  transition: all 0.3s;
  padding-top: 60px;
  background-color: #fdce5e17;
}
.main-content {
  transition: all 0.3s;
}
.bg-define {
  background-color: #fdce5e17;
  border-bottom: 1px solid #ded9d9;
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
a {
  color: black;
}

.nav-pills .nav-link.active,
.nav-pills .show > .nav-link {
  background-color: transparent;
  border: 2px solid green;
  border-radius: 22px;
  color: green;
}

.nav-pills .nav-link {
  background-color: transparent;
  border: 1px solid #0d6efd;
  border-radius: 22px;
}
.form-check-input {
  border: 2px solid grey;
}
.border-left {
  border-left: 1px solid #ded9d9;
  height: 100vh;
}

.candidateTable tr:nth-child(odd) td {
  background: #fdce5e17 !important;
}

.btn-primary {
  border-radius: 4px;
}
table th {
  background-color: #ff5f30;
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
  border: 1px solid #ff5722;
  border-radius: 22px;
  color: #ff5722;
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
  font-family: Verdana, sans-serif;
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
