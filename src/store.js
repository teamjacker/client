import Vue from 'vue';
import Vuex from 'vuex';
import db from '@/api/firebase';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    rooms: [],
  },
  mutations: {
    GET_ROOM(state, payload) {
      state.rooms = payload;
    },
  },
  actions: {
    async SET_ROOM({ commit }) {
      await db.collection('rooms').onSnapshot((docs) => {
        const roomRes = [];
        docs.forEach((doc) => {
          roomRes.push({ id: doc.id, ...doc.data() });
        });
        commit('GET_ROOM', roomRes);
      });
    },
  },
});
