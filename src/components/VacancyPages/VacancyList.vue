<template>
  <div>
    <div class="container-fluid p-0">
      <div id="main">
        <div class="pagetitle d-flex justify-content-between px-2">
          <div class="py-3">
            <ol class="breadcrumb mb-1">
              <li class="breadcrumb-item active text-uppercase fs-6">
                Dashboard / <span class="color-fonts">Vacancies</span>
              </li>
            </ol>
          </div>
        </div>
        <!-- <div class="container-fluid p-0 bg-define">
          <div
            class="pagetitle d-flex justify-content-between align-items-center p-2"
          >
            <div class="d-flex justify-content-around gap-2">
              <select class="form-select" aria-label="Default select example ">
                <option selected>Custom</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </select>
            </div>

            <div></div>

            <div class="d-flex align-items-center justify-content-between">
              <div class="d-flex align-items-center gap-2"></div>
            </div>
          </div>
        </div> -->

        <div class="container-fluid mt-3">
          <div class="row">
            <div class="col-12">
              <div class="">
                <div>
                  <ul
                    class="nav nav-pills mb-3 d-flex justify-content-between"
                    id="pills-tab"
                    role="tablist"
                  >
                    <div>
                      <li
                        class="nav-item d-flex gap-2"
                        role="presentation"
                        :class="{ 'nav-item': true, active: isActive }"
                      >
                        <button
                          class="nav-link"
                          :class="{ active: activeTab === index }"
                          aria-selected="true"
                          type="button"
                          role="tab"
                          v-for="(tab, index) in tabs"
                          :key="index"
                          @click="selectTab(index)"
                        >
                          {{ tab.name }}({{ index === 0 ? vacancyCount : 0 }})
                        </button>
                      </li>
                    </div>
                    <div>
                      <button
                        v-if="activeTab === 0"
                        type="button"
                        class="btn btn-outline-success text-nowrap"
                        data-bs-toggle="modal"
                        data-bs-target="#addVacancies"
                        data-bs-whatever="@mdo"
                      >
                        + Add Vacancy
                      </button>
                    </div>

                    <!-- <div class="searchbox position-relative">
                      <input
                        class="form-control mr-sm-2"
                        type="search"
                        placeholder="&nbsp;&nbsp;&nbsp;&nbsp; Search by vacancy code"
                        aria-label="Search"
                      />
                    </div> -->
                  </ul>
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
    <AddVacancy />
    <PulishedVacancy />
  </div>
</template>
<script>
import axios from "axios";
import AllVacancyList from "../VacancyPages/AllVacancyList.vue";
import InActiveVacancyList from "../VacancyPages/InActiveVacancyList.vue";
export default {
  data() {
    return {
      vacancyCount: 0,

      searchQuery: "",
      tabs: [
        { name: "All ", component: "AllVacancyList" },
        { name: "InActive ", component: "InActiveVacancyList" },
      ],
      activeTab: 0,
    };
  },
  computed: {
    activeComponent() {
      return this.tabs[this.activeTab].component;
    },
  },
  components: { AllVacancyList, InActiveVacancyList },

  methods: {
    selectTab(index) {
      this.activeTab = index;
    },
    async createVacancy() {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get(
          "https://logezy.onrender.com/vacancies",
          {
            headers: {
              "content-type": "application/json",
              Authorization: "bearer " + token,
            },
          }
        );
        this.vacancyCount = response.data.count;
      } catch (error) {
        // console.error("Error fetching vacancy count:", error);
      }
    },
  },

  mounted() {
    this.createVacancy();
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
.color-fonts {
  color: #ff5f30;
  font-weight: bold;
}
.btn-primary {
  border: none;
}
.form-check-input {
  border: 2px solid grey;
}

.rounded-circle {
  border: 1px solid #ff5f30;
  padding: 8px 11px;
  cursor: pointer;
}
.border-left {
  border-left: 1px solid #ded9d9;
  height: 100vh;
}
a[data-v-507f63b7] {
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
  border: 1px solid #0d6efd;
  border-radius: 22px;
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

.form-select {
  width: auto;
}
.searchbox {
  width: 19%;
}
.searchbox::before {
  content: "\F52A";
  font-family: "bootstrap-icons";
  position: absolute;
  top: 8px;
  left: 10px;
  color: #ff5f30;
  font-weight: bolder;
}
input::-webkit-input-placeholder {
  margin-left: 5px;
}
</style>
