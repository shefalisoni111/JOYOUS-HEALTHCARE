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
     adminData: {},
     noteCount: 0,
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

      const index = state.candidates.findIndex(candidate => candidate.id === id);
      if (index !== -1) {
        // Update the candidate in the array
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
  
  },
  actions: {
    async updateNoteCount({ commit }) {
      try {
        const response = await fetch(`${VITE_API_URL}/get_note_count`);
        
        if (!response.ok) {
          if (response.status === 404) {
            console.warn('Note count resource not found. Check the API endpoint.');
          } else {
            throw new Error(`Failed to fetch note count (HTTP ${response.status})`);
          }
        } else {
          const data = await response.json();
          commit('SET_NOTE_COUNT', data.count);
        }
      } catch (error) {
        console.error('Error updating note count:', error.message);
      }
    },
  },
  
 
});
