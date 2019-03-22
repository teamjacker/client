<template>
  <div class="col-md-4" style="width: 18rem;">
    <div class="card-body">
      <h5 class="card-title">{{ rooms.roomName }}</h5>
      <hr>
      <p class="card-text text-center">Total Player: {{ rooms.players.length }} / 4</p>
      <div v-if="rooms.players.length <= 4" class="footer d-flex justify-content-end">
        <a @click.prevent="joinRoom(rooms)" href class="card-link">Join</a>
      </div>
    </div>
  </div>
</template>

<script>
import db from '@/api/firebase';
import firebase from 'firebase';

export default {
  name: 'listRoom',
  props: ['rooms'],
  methods: {
    joinRoom(rooms) {
      
      const roomId = rooms.id;
      const currentPlayer = localStorage.getItem('user');
      const newPlayer = {
        playerName: currentPlayer,
        point: 0,
      };
      console.log(rooms.players);

      const isTrue = rooms.players.some(e => e.playerName === currentPlayer);

      if (isTrue) {
        this.$router.push({ path: `/game/${roomId}` });
      } else {
        db.collection('rooms')
          .doc(roomId)
          .update({
            players: firebase.firestore.FieldValue.arrayUnion(newPlayer),
          })
          .then(() => {
            this.$router.push({ path: `/game/${roomId}` });
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
  },
};
</script>

<style>
.card-text {
  font-size: 12px;
}
</style>
