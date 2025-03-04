// store.js
import { createStore } from 'vuex';
import axios from "axios";
export default createStore({
  state: {
    channelSid: null,
    selectedAppliedItemId: null,
    selectedCandidateItemId: null,
    selectedAssignedItemId: null,
    selectedRejectItemId:null,
    selectedAllItemId:null,
    selectedPublishItemId:null,
    selectedJobItemId:null,
    candidates: [],
    vacancies:[],
    getCategory: [],
     adminData: {},
     noteCount: 0,
     vacancy_id: null,
     selectedSignedTimesheetId: null,
     selectedCustomTimesheetId: null,
     selectedTemplate: localStorage.getItem('selectedTemplate') || 'TemplateOne',
     getCandidatesData:[],
     invoiceData: [],
     invoiceStaffData: [],
     role: null,
    //  client_id: null,
  },
  mutations: {
    setUser(state, payload) {
      // state.token = payload.token;
      state.role = payload.role;
      // state.client_id = payload.client_id;
      // state.expiration = payload.expiration;
    },
    clearUser(state) {
      // state.token = null;
      state.role = null;
      // state.client_id = null;
      // state.expiration = null;
    },
    SET_INVOICE_DATA(state, data) {
      state.invoiceData = data;
    },
    SET_INVOICE_STAFF_DATA(state, data) {
      state.invoiceStaffData = data;
    },
    setNavData(state, data) {
      state.getCandidatesData = data;
    },
    setChannelSid(state, channelSid) {
      state.channelSid = channelSid; 
    },
    setSelectedTemplateClient(state, template) {
      state.selectedTemplateClient = template;
    },
    setSelectedTemplateStaff(state, template) {
      state.selectedTemplateStaff = template;
    },
    setSelectedTemplate(state, template) {
      state.selectedTemplate = template;
      localStorage.setItem('selectedTemplate', template);
    },
    setSelectedSignedTimesheetId(state, itemId) {
      state.selectedSignedTimesheetId = itemId;
    },
    setSelectedCustomTimesheetId(state, itemData) {
      state.selectedCustomTimesheetId = itemData;
    },
    setSelectedAppliedItemId(state, itemId) {
      state.selectedAppliedItemId = itemId;
    },
    setSelectedAssignedItemId(state, itemId) {
      state.selectedAssignedItemId = itemId;
    },
    setSelectedRejectItemId(state, itemId) {
      state.selectedRejectItemId = itemId;
    },
    setSelectedAllItemId(state, itemId) {
      state.selectedAllItemId = itemId;
    },
    setSelectedPublishedItemId(state, itemId) {
      state.selectedPublishItemId = itemId;
    },

    updateCandidate(state, { id, newData }) {

      const index = state.candidates.findIndex(candidate => candidate.id === id);
      if (index !== -1) {

        state.candidates.splice(index, 1, newData);
      }
    },
    updateVacancy(state, { id, newData }) {
      const index = state.vacancies.findIndex(v => v.id === id);
      if (index !== -1) {

        state.vacancies[index] = newData;
      }
    },
    updateCategory(state, payload) {
      const { id, newData } = payload;
      const categoryIndex = state.getCategory.findIndex((cat) => cat.id === id);
      if (categoryIndex !== -1) {
        state.getCategory[categoryIndex] = { ...state.getCategory[categoryIndex], ...newData };
      }
    },
    SET_NOTE_COUNT(state, count) {
      state.noteCount = count;
    },
    setSelectedCandidateId(state, itemId) {
      state.selectedCandidateItemId = itemId;
    },
    setSelectedJobId(state, jobId) {
      state.selectedJobItemId = jobId;
    },
    setVacancyId(state, vacancyId) {
      state.vacancy_id = vacancyId;
    },
  
  },
  actions: {
    setUser({ commit }, userData) {
      commit("setUser", userData);
    },
    logout({ commit }) {
      commit("clearUser");
    },
    setInvoiceData({ commit }, data) {
      commit("SET_INVOICE_DATA", data);
    },
    setInvoiceStaffData({ commit }, data) {
      commit("SET_INVOICE_STAFF_DATA", data);
    },
    async getCandidateMethods({ commit }) {
      const response = await axios.get(`${VITE_API_URL}/candidates`);
      commit("setNavData", response.data.data);
    },
    updateChannelSid({ commit }, channelSid) {
      commit('setChannelSid', channelSid);
     
    },
    updateSelectedTemplate({ commit }, template) {
      commit('setSelectedTemplate', template);
    },
    async fetchSignedTimesheetData({ commit, state }) {
      if(!state.selectedSignedTimesheetId){
        return
      }
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${VITE_API_URL}/sign_timesheets/${state.selectedSignedTimesheetId}`, {
          headers: {
            'content-type': 'application/json',
            Authorization: 'bearer ' + token,
          },
        });
        commit('setSelectedSignedTimesheetData', response.data.sign_timesheets);
      } catch (error) {
        // console.error('Error fetching signed timesheet data:', error);
      }
    },
    async updateNoteCount({ commit }) {
      try {
        const response = await fetch(`${VITE_API_URL}/get_note_count`);
        
        if (!response.ok) {
          if (response.status === 404) {
           
          } else {
            throw new Error(`Failed to fetch note count (HTTP ${response.status})`);
          }
        } else {
          const data = await response.json();
          commit('SET_NOTE_COUNT', data.count);
        }
      } catch (error) {
        // console.error('Error updating note count:', error.message);
      }
    },
    
  },
   getters: {
    // isAuthenticated: (state) => !!state.token,
    userRole: (state) => state.role,
    // clientId: (state) => state.client_id,
    getInvoiceData: (state) => state.invoiceData,
    getInvoiceStaffData: (state) => state.invoiceStaffData,
    getSelectedTemplate: (state) => state.selectedTemplate,
    getChannelSid: (state) => state.channelSid,
  },
 
});