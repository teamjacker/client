<template>
  <div class="game">
    <div class="count-section"></div>
    <h1 class="title">JACKquery</h1>
    <div class="main-buttons">
      <button @click="shuffleDeck" class="button is-primary">Play Again</button>
    </div>
    <div>
      <transition-group :name="shuffleSpeed" tag="div" class="deck">
        <a
          role="button"
          @click.prevent="showScore([card.value, index])"
          v-for="(card, index) in cards"
          :key="card.id"
          class="card"
          :class="suitColor[card.suit]"
          :style="{'pointer-events': card.isDisabled, 'background': card.color}"
        >
          <div v-show="card.show">
            <span class="card__suit card__suit--top">{{ card.suit }}</span>
            <span class="card__number">{{ card.rank }}</span>
            <span class="card__suit card__suit--bottom">{{ card.suit }}</span>
          </div>
        </a>
      </transition-group>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue';
import { mapState, mapMutations } from 'vuex';

export default {
  name: 'game',
  components: {
    // HelloWorld,
  },
  data() {
    return {};
  },
  computed: {
    ...mapState([
      'ranks',
      'suits',
      'cards',
      'suitColor',
      'shuffleSpeed',
      'shuffleTypes',
      'isDeckShuffled',
      'counting',
      'isDisabled',
      'playerA',
      'playerB',
      'playerC',
      'playerD',
      'temp',
    ]),
  },
  created() {
    this.displayInitialDeck();
    this.shuffleDeck();
  },
  methods: {
    ...mapMutations(['showScore', 'displayInitialDeck', 'shuffleDeck']),
  },
};
</script>
