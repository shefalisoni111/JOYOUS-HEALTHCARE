<template>
  <div>
    <div class="container-fluid p-0">
      <div id="main">
        <!-- <div class="pagetitle d-flex justify-content-between px-2">
          <div class="py-3">
            <ol class="breadcrumb mb-1">
              <li class="breadcrumb-item active text-uppercase fs-6">
                <router-link class="nav-link d-inline" aria-current="page" to="/home"
                  >Dashboard</router-link
                >
                / <span class="color-fonts">Vacancies</span>
              </li>
            </ol>
          </div>
        </div> -->
        <div class="pagetitle d-flex justify-content-between px-2">
          <div class="py-3">
            <ol class="breadcrumb mb-1">
              <li class="breadcrumb-item active text-uppercase fs-6">
                <router-link class="nav-link d-inline" aria-current="page" to="/home"
                  >Dashboard</router-link
                >
                / <span class="color-fonts">Vacancies</span> /

                <span class="color-fonts">{{ activeTabName }} Vacancies</span>
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
                      <li class="nav-item d-flex gap-2" role="presentation">
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
                          {{ tab.name }}
                        </button>
                      </li>
                    </div>

                    <div class="d-flex gap-2">
                      <div>
                        <form @submit.prevent="search">
                          <input
                            class="form-control mr-sm-2"
                            type="search"
                            placeholder="Search by vacancy"
                            aria-label="Search"
                            v-model="searchQuery"
                            @input="debounceSearch"
                          />
                        </form>
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
                    </div>
                  </ul>
                  <div v-if="searchResults">
                    <component :is="activeComponent"></component>
                  </div>
                  <div class="text-danger" v-else>
                    {{ notFoundVacancy }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import AllVacancyList from "../VacancyPages/AllVacancyList.vue";
import InActiveVacancyList from "../VacancyPages/InActiveVacancyList.vue";
import AllVacancyDisplay from "../VacancyPages/AllVacancyDisplay.vue";
const axiosInstance = axios.create({
  headers: {
    "Cache-Control": "no-cache",
  },
});

export default {
  data() {
    return {
      vacancyCount: 0,
      searchResults: [],
      notFoundVacancy: [],
      debounceTimeout: null,
      searchQuery: "",
      tabs: [
        { name: "All", component: "AllVacancyDisplay" },
        { name: "Active ", component: "AllVacancyList" },
        { name: "In-Active ", component: "InActiveVacancyList" },
      ],
      activeTab: 0,
      activeTabName: name,
    };
  },
  computed: {
    activeComponent() {
      return this.tabs[this.activeTab].component;
    },
  },
  components: { AllVacancyList, InActiveVacancyList, AllVacancyDisplay },

  methods: {
    selectTab(index) {
      this.activeTab = index;
      this.activeTabName = this.tabs[index].name;
      this.$router.push({ name: this.tabs[index].routeName });
    },
    debounceSearch() {
      clearTimeout(this.debounceTimeout);

      this.debounceTimeout = setTimeout(() => {
        this.search();
      }, 300);
    },
    // search api start

    async search() {
      try {
        if (!this.searchQuery.trim()) {
          return;
        }
        const response = await axios.get(
          `${VITE_API_URL}/vacancy_search/${this.searchQuery}`
        );
        this.searchResults = response.data.data;
        this.notFoundVacancy = response.data.message;
      } catch (error) {
        // console.error("Error fetching search results:", error);
      }
    },
    async createVacancy() {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get(`${VITE_API_URL}/vacancies`, {
          headers: {
            "content-type": "application/json",
            Authorization: "bearer " + token,
          },
        });
        this.vacancyCount = response.data;
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

  background-color: #fdce5e17;
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
.nav-pills .nav-link {
  background-color: transparent;
  border: 1px solid #ff5722;
  border-radius: 22px;
  color: #ff5722;
}
button.nav-link > li.nav-item {
  border-bottom: 2px solid red;
  padding-bottom: 5px;
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
