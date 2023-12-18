<template>
  <div>
    <div class="container-fluid p-0">
      <div id="main">
        <div class="pagetitle d-flex justify-content-between px-2">
          <div class="py-3">
            <ol class="breadcrumb mb-1">
              <li class="breadcrumb-item active text-uppercase fs-6">
                Dashboard / <span class="color-fonts">Clients </span>
              </li>
            </ol>
          </div>
        </div>
        <div class="container-fluid p-0 bg-define"></div>

        <div class="container-fluid mt-3">
          <div class="row">
            <div class="col-12">
              <div class="">
                <div>
                  <div class="d-flex justify-content-between">
                    <ul
                      class="nav nav-pills mb-3 d-flex justify-content-between"
                      id="pills-tab"
                      role="tablist"
                    >
                      <div class="d-flex">
                        <li
                          class="nav-item d-flex align-items-center gap-2"
                          role="presentation"
                          :class="{ 'nav-item': true, active: isActive }"
                        >
                          <button
                            a
                            class="nav-link"
                            :class="{ active: activeTab === index }"
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
                      </div>
                    </ul>
                    <div
                      class="pagetitle d-flex justify-content-end align-items-center"
                    >
                      <div
                        class="d-flex align-items-center gap-2 justify-content-between"
                      >
                        <!-- <div class="searchbox position-relative">
                          <input
                            class="form-control mr-sm-2"
                            type="search"
                            placeholder="Search Client"
                            aria-label="Search"
                          />
                        </div> -->
                        <button
                          v-if="activeTab === 0"
                          type="button"
                          class="btn btn-outline-success text-nowrap"
                          data-bs-toggle="modal"
                          data-bs-target="#addClients"
                          data-bs-whatever="@mdo"
                        >
                          + Add Client
                        </button>
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
      </div>
    </div>
    <AddClients />
  </div>
</template>
<script>
import AllClient from "../ClientsPages/AllClient.vue";
import InActiveClient from "../ClientsPages/InActiveClient.vue";

export default {
  data() {
    return {
      getClientDetail: [],

      isActive: true,
      searchQuery: "",
      tabs: [
        { name: "All ", component: "AllClient" },
        { name: "InActive ", component: "InActiveClient" },
      ],
      activeTab: 0,
    };
  },
  computed: {
    activeComponent() {
      return this.tabs[this.activeTab].component;
    },
  },
  components: { AllClient, InActiveClient },

  methods: {
    selectTab(index) {
      this.activeTab = index;
    },
  },
};
</script>

<style scoped>
#main {
  transition: all 0.3s;
  height: 100dvh;
}
.main-content {
  transition: all 0.3s;
}
.bg-define {
  background-color: #fdce5e17;
}
.btn-primary {
  border: none;
}
ul.nav-pills {
  border-bottom: none !important;
  height: auto !important;
  margin-bottom: 0px !important;
}
.form-check-input {
  border: 2px solid grey;
}
.border-left {
  border-left: 1px solid #ded9d9;
  height: 100vh;
}
.table-wrapper {
  overflow-x: auto;
}
.color-fonts {
  color: #ff5f30;
  font-weight: bold;
}
.badge {
  background: #ffc107;
  border-radius: 50%;
  padding: 7px 10px;
}
.bg-detail {
  background-color: #f5841d;
  border-radius: 4px;
  padding: 10px;
  color: #fff;
  letter-spacing: 1px;
  font-weight: bold;
}
a:link {
  color: black;
  text-decoration: none;
}
.candidateTable tr:nth-child(odd) td {
  background: #fdce5e17 !important;
}
.btn-primary {
  border-radius: 4px;
}

.nav-pills .nav-link.active,
.nav-pills .show > .nav-link {
  background-color: transparent;
  border: 1px solid green;
  border-radius: 22px;
  color: green;
}

.nav-pills .nav-link {
  background-color: transparent;
  border: 1px solid #9e9e9e;
  border-radius: 22px;
  color: #607d8b;
}
ul.nav-pills {
  height: 53px;
  border-bottom: 1px solid #b8b1b1;
}
table th {
  background-color: #ff5f30;
}

button.nav-link > li.nav-item {
  border-bottom: 2px solid red; /* Replace with your desired border color */
  padding-bottom: 5px; /* Optional: Add padding for spacing */
}

button.nav-link.active > li.nav-item {
  /* Additional styles for the active state if needed */
}

.searchbox {
  width: 100%;
}

.switch {
  width: 50px;
  height: 17px;
  position: relative;
  display: inline-block;
}
a {
  color: black;
  text-decoration: none;
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
</style>
