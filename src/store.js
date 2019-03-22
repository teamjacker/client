import Vue from 'vue';
import Vuex from 'vuex';
import db from '@/api/firebase';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    rooms: [],
    ranks: ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'],
    suits: ['♥', '♦', '♠', '♣'],
    cards: [],
    suitColor: {
      '♠': 'black',
      '♣': 'black',
      '♦': 'red',
      '♥': 'red',
    },
    shuffleSpeed: 'shuffleMedium',
    counting: 12,
    isDisabled: {
      'pointer-events': true,
    },
    player: [
      {
        name: 'PlayerA',
        score: 0,
      },
      {
        name: 'PlayerB',
        score: 0,
      },
      {
        name: 'PlayerC',
        score: 0,
      },
      {
        name: 'PlayerD',
        score: 0,
      },
    ],
    playerwin: '',
    scorewin: 0,
    temp: [],
  },
  mutations: {
    GET_ROOM(state, payload) {
      state.rooms = payload;
    },
    showScore(state, payload) {
      const point = payload[0];
      const index = payload[1];
      state.temp.push(index);
      state.cards[index].isDisabled = 'none';
      if (state.counting % 4 === 0) {
        state.cards[index].color = 'lime';
        state.player[0].score += point;
      } else if (state.counting % 4 === 3) {
        state.cards[index].color = 'orange';
        state.player[1].score += point;
      } else if (state.counting % 4 === 2) {
        state.cards[index].color = 'aqua';
        state.player[2].score += point;
      } else if (state.counting % 4 === 1) {
        state.cards[index].color = 'magenta';
        state.player[3].score += point;
      }
      state.counting--;
      if (state.counting === 0) {
        state.temp.forEach((e) => {
          state.cards[e].show = true;
        });
        state.cards.forEach((e) => {
          e.isDisabled = 'none';
        });
        state.player.forEach((e) => {
          if (e.score > state.scorewin) {
            state.playerwin = e.name;
            state.scorewin = e.score;
          }
        });
        Swal.fire(
          `${state.playerwin} win`,
          `${state.player[0].name}: ${state.player[0].score} | ${state.player[1].name}: ${state.player[1].score} | ${state.player[2].name}: ${state.player[2].score} | ${state.player[3].name}: ${state.player[3].score}`,
        );
      }
      console.log('playerA:', state.player[0].score);
      console.log('playerB:', state.player[1].score);
      console.log('playerC:', state.player[2].score);
      console.log('playerD:', state.player[3].score);
      console.log('');
    },
    displayInitialDeck(state) {
      let id = 1;
      state.cards = [];

      for (let s = 0; s < state.suits.length; s++) {
        for (let r = 0; r < state.ranks.length; r++) {
          const card = {
            id,
            rank: state.ranks[r],
            suit: state.suits[s],
            value: r + 1,
            show: false,
            isDisabled: false,
            color: 'white',
          };
          state.cards.push(card);
          id++;
        }
      }
    },
    shuffleDeck(state) {
      for (let i = state.cards.length - 1; i > 0; i--) {
        const randomIndex = Math.floor(Math.random() * i);
        const temp = state.cards[i];
        Vue.set(state.cards, i, state.cards[randomIndex]);
        Vue.set(state.cards, randomIndex, temp);
      }

      state.cards.forEach((e) => {
        e.color = 'white';
        e.isDisabled = '';
        e.show = false;
      });
      state.player.forEach((e) => {
        e.score = 0;
      });
      state.playerwin = '';
      state.scorewin = 0;
      state.counting = 12;
      state.temp = [];
      const audio = new Audio('http://soundbible.com/mp3/Elevator Ding-SoundBible.com-685385892.mp3');
      audio.play();
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
