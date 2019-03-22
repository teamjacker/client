<template>
  <div class="container">
    <div class="row">
      <div class="col-lg-12 col-md-12" style="height: 100vh;">
        <div class="text-center mt-3">
          <button
            data-target="#showModal"
            data-toggle="modal"
            class="btn btn-md btn-outline-dark"
          >create room</button>
        </div>
        <ListRoom class="mt-5" v-for="(room, index) in rooms" :key="index" :rooms="room"/>
        <Chat />
      </div>
    </div>

    <div class="modal fade" id="showModal" tabindex="-1" role="dialog" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Create a Room</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form>
              <div class="form-group">
                <input v-model="roomName" type="text" class="form-control" placeholder="room name">
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button
              @click.prevent="createRoom"
              type="button"
              class="btn btn-primary"
              data-dismiss="modal"
            >Create</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import db from '@/api/firebase';
import ListRoom from '@/components/ListRoom.vue';
import Chat from '@/components/Chat.vue';

export default {
  name: 'home',
  components: {
    ListRoom,
    Chat,
  },
  data() {
    return {
      playerName: '',
      rooms: [],
      roomName: '',
    };
  },
  created() {
    this.$store.dispatch('SET_ROOM');
  },
  mounted() {
    if (localStorage.getItem('user')) {
      this.playerName = localStorage.getItem('user');
    } else {
      this.$router.replace({ path: '/login' });
    }
  },
  methods: {
    createRoom() {
      db.collection('rooms')
        .add({
          roomName: this.roomName,
          roomMaster: this.playerName,
          players: [
            {
              playerName: this.playerName,
              point: 0,
            },
          ],
        })
        .then((docRef) => {
          this.$router.push({ path: `/game/${docRef.id}` });
        })
        .catch((err) => {
          console.log('Error adding document: ', err);
        });
    },
  },
  watch: {
    '$store.state.rooms': function (value) {
      // console.log(value);
      this.rooms = value;
    },
  },
};
</script>

<style>
</style>
