import Vue from 'vue';
import Vuex from 'vuex';
import db from '@/api/firebase';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    rooms: [],
    // BUAT GAME
    ranks: ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"],
    suits: ["♥", "♦", "♠", "♣"],
    cards: [],
    suitColor: {
      "♠": "black",
      "♣": "black",
      "♦": "red",
      "♥": "red"
    },
    players: [
      {
        name: "player_1",
        score: 0,
        color: "#81ecec"
      }
    ],
    counting: 0,
    shuffleSpeed: "shuffleMedium",
    shuffleTypes: ["Slow", "Medium", "Fast"],
    isDeckShuffled: false
  },
  mutations: {
    GET_ROOM(state, payload) {
      state.rooms = payload;
    },
    //  BUAT GAME
    score(state, payload) {
      let rank = payload[0], selectedID = payload[1];
      console.log('rank, selectedID', payload.join(', '));
      // DOM
      state.cards[selectedID].hidden = true;
      state.cards[selectedID].selected = "none";
      state.counting++; // 3 kesempatan
      console.log('Counting (kesempatan klik = 3kali)', state.counting);

      if (state.counting === 3) {
        state.cards.forEach(e => (e.selected = "none"));
      }
      state.cards[selectedID].color = state.players[0].color; // Color of Card

      // SET Player
      state.players[0].score += rank;

      // setTimeout(() => {
      //   this.shuffleDeck();
      // }, 3000);
    },
    displayInitialDeck(state) {
      console.log("=== Masuk displayInitialDeck");
      let id = 1;
      state.cards = [];

      for (let s = 0; s < state.suits.length; s++) {
        for (let r = 0; r < state.ranks.length; r++) {
          const card = {
            id,
            rank: state.ranks[r],
            suit: state.suits[s],
            score: r + 1,
            hidden: false,
            selected: "",
            color: "white"
          };
          state.cards.push(card);
          id++;
        }
      }

      state.isDeckShuffled = false;
      state.shuffleCount = 0;
    },
    shuffleDeck(state) {
      console.log("=== Masuk shuffleDeck");
      for (let i = state.cards.length - 1; i > 0; i--) {
        const randomIndex = Math.floor(Math.random() * i);

        const temp = state.cards[i];
        Vue.set(state.cards, i, state.cards[randomIndex]);
        Vue.set(state.cards, randomIndex, temp);
      }
      state.cards.forEach(e => {
        e.hidden = false;
        e.selected = "";
        e.color = "white";
      });
      state.counting = 0;

      state.isDeckShuffled = true;
    }
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