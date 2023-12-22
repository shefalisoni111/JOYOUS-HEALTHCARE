// store.js
import { createStore } from 'vuex';

export default createStore({
  state: {
    selectedAppliedItemId: null,
    selectedAssignedItemId: null,
    selectedRejectItemId:null,
    selectedAllItemId:null,
    selectedPublishItemId:null
   
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

    
  
  },
  actions: {
   
   
  },
 
});
