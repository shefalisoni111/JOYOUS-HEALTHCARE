<template>
  <div>
    <Navbar />
    <AddVacancy />
    <PublishedVacancy />
    <AppliedVacancyList />
    <AssignedVacancyList />
    <AllVacancyCandidateList />
    <RejectedVacancyList />

    <router-view />
  </div>
</template>
<script>
import Navbar from "../components/Navbar.vue";

import AddVacancy from "../components/modals/Vacancy/AddVacancy.vue";
import PublishedVacancy from "../components/modals/Vacancy/PublishedVacancy.vue";
import AppliedVacancyList from "../components/modals/Vacancy/AppliedVacancyList.vue";
import AssignedVacancyList from "../components/modals/Vacancy/AssignedVacancyList.vue";
import RejectedVacancyList from "../components/modals/Vacancy/RejectedVacancyList.vue";
import AllVacancyCandidateList from "../components/modals/Vacancy/AllVacancyCandidateList.vue";

export default {
  data() {
    return {
      getVacancyDetail: [],
      isActive: true,
      searchQuery: "",
    };
  },
  components: {
    Navbar,
    AddVacancy,
    PublishedVacancy,
    AppliedVacancyList,
    AssignedVacancyList,
    AllVacancyCandidateList,
    RejectedVacancyList,
  },

  methods: {},
};
</script>

<style scoped>
#main {
  padding: 20px 20px;
  transition: all 0.3s;
  height: 100dvh;
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
