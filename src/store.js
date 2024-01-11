// store.js
import { createStore } from 'vuex';

export default createStore({
  state: {
    selectedAppliedItemId: null,
    selectedAssignedItemId: null,
    selectedRejectItemId:null,
    selectedAllItemId:null,
    selectedPublishItemId:null,
    candidates: [],
    vacancies:[],
    getCategory: [],
  },
  mutations: {
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
      // console.log('Updating candidate:', id, newData);
      const index = state.candidates.findIndex(candidate => candidate.id === id);
      if (index !== -1) {
        // Update the candidate in the array
        state.candidates.splice(index, 1, newData);
      }
    },
    updateVacancy(state, { id, newData }) {
      const index = state.vacancies.findIndex(v => v.id === id);
      if (index !== -1) {
        // Update the existing vacancy with newData
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
   
  
  },
  actions: {
    
  },
 
});
