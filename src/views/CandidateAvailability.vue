<template>
  <div>
    <div id="main">
      <h6>Availability Page in Progress.....</h6>
    </div>
  </div>
</template>
<script setup></script>
<style scoped>
#main {
  padding: 20px 20px;
  transition: all 0.3s;
  height: 100dvh;
  background-color: #fdce5e17;
}
ul.generalsetting h6 {
  font-size: 14px;
  font-weight: bold;
}
</style>

<!-- <template>
  <div>
    <div id="main">
      <div class="pagetitle px-2">
        <div class="py-3">
          <ol class="breadcrumb mb-1">
            <li class="breadcrumb-item active text-uppercase fs-6">
              Dashboard / <span class="color-fonts">Availability</span>
            </li>
          </ol>
        </div>
      </div>
      <div class="row px-2">
        <div class="col-12">
          <ul
            class="nav nav-pills mb-3 d-flex justify-content-end"
            id="pills-tab"
            role="tablist"
          >
            <div class="d-flex">
              <div class="">
                <select
                  class="form-select"
                  aria-label="Default select example "
                >
                  <option selected>Publish</option>
                  <option value="1">Mail</option>
                  <option value="2">Text</option>
                </select>
              </div>
            </div>
          </ul>
        </div>
      </div>
      <div class="schedule-vue-sample d-flex px-2">
        <div class="col-3 border-box">
          <div>
            <h5>Vacancy</h5>
            <ul v-for="data in getVacancyDetail" :key="data.id">
              <li>{{ data.client }}</li>
            </ul>
          </div>
          <ul v-for="data in allVacancyData" :key="data.id">
            <li>{{ data.first_name }}</li>
          </ul>
        </div>
        <div class="col-9 control-section ps-2">
          <div class="content-wrapper">
            <ejs-schedule
              id="schedule"
              ref="ScheduleObj"
              height="800px"
              :ownerCollections="ownerCollection"
              :selectedDate="selectedDate"
              :eventSettings="eventSettings"
              :showTimeIndicator="false"
              :currentView="'Month'"
            >
          
            </ejs-schedule>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

import {
  Predicate,
  Query,
} from "C:/Users/krati/logezy/vue-project/node_modules/@syncfusion/ej2-data";
import { CheckBoxComponent } from "C:/Users/krati/logezy/vue-project/node_modules/@syncfusion/ej2-vue-buttons";
import { extend } from "C:/Users/krati/logezy/vue-project/node_modules/@syncfusion/ej2-base";

import {
  ScheduleComponent,
  ResourceDirective,
  ResourcesDirective,
  Month,
} from "C:/Users/krati/logezy/vue-project/node_modules/@syncfusion/ej2-vue-schedule";

var ownerCollections = [
  { OwnerText: "Margaret", OwnerId: 1, Color: "#ea7a57" },
  { OwnerText: "Robert", OwnerId: 2, Color: "#df5286" },
  { OwnerText: "Laura", OwnerId: 3, Color: "#865fcf" },
];
export default {
  name: "CandidateAvailability",
  data() {
    return { getVacancyDetail: [], allVacancyData: [] };
  },
  components: {
    "ejs-schedule": ScheduleComponent,

    "ejs-checkbox": CheckBoxComponent,
  },
  data: function () {
    return {
      selectedDate: new Date(2023, 11, 12),
     
    };
  },
  provide: {
    schedule: [Month],
  },
  methods: {
   
    async getAppliedVacancyMethod() {
      const token = localStorage.getItem("token");

      const customIndex = 0;

      if (this.allVacancyData.length > customIndex) {
        const vacancyId = this.allVacancyData[customIndex].id;

        try {
          const response = await axios.get(
            `https://logezy.onrender.com/applied_candidate_list?vacancy_id=${vacancyId}`,
            {
              headers: {
                "content-type": "application/json",
                Authorization: "bearer " + token,
              },
            }
          );
          this.getVacancyDetail = response.data;
        } catch (error) {
          if (error.response) {
            if (error.response.status == 404) {
              alert(error.response.data.message);
            }
          }
        }
      } else {
        console.error(
          "Vacancy data is empty or does not have the item at the determined index."
        );
      }
    },
    async getVacancyDataMethod() {
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
        this.allVacancyData = response.data;
        this.getAppliedVacancyMethod();
      } catch (error) {
        console.error("Error fetching vacancies:", error);
      }
    },
  },
  mounted() {
    this.getVacancyDataMethod();
  },
};
</script>

<style>
.schedule-vue-sample
  .property-panel-content
  .e-checkbox-wrapper.margaret
  .e-frame {
  background-color: #ea7a57;
  border-color: transparent;
}

.schedule-vue-sample
  .property-panel-content
  .e-checkbox-wrapper.robert
  .e-frame {
  background-color: #df5286;
  border-color: transparent;
}
.e-toolbar .e-toolbar-items {
  background-color: #f3771e !important;
}
.e-toolbar .e-toolbar-item .e-tbar-btn:hover {
  background-color: #f3771e !important;
}
.e-toolbar .e-toolbar-item .e-tbar-btn {
  background-color: transparent;
}
.e-toolbar .e-toolbar-item .e-tbar-btn .e-tbar-btn-text {
  color: rgba(0, 0, 0, 0.87);
  font-weight: bold;
  background-color: transparent;
}
.e-schedule .e-schedule-toolbar .e-active-view .e-tbar-btn-text,
.e-schedule .e-schedule-toolbar .e-active-view .e-icons {
  color: #fff;
  font-weight: bold;
  background-color: transparent;
}
.schedule-vue-sample
  .property-panel-content
  .e-checkbox-wrapper.laura
  .e-frame {
  background-color: #865fcf;
  border-color: transparent;
}
.color-fonts {
  color: #ff5f30;
  font-weight: bold;
}
.border-box {
  border: 1px solid rgb(233 228 228);
  padding: 10px;
}
</style> -->
