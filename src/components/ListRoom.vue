<template>
  <div class="card col-md-4" style="width: 18rem;">
    <div class="card-body">
      <h5 class="card-title">{{ rooms.roomName }}</h5>
      <hr>
      <p class="card-text text-center">
        Total Player: {{ rooms.players.length }} / 4
      </p>
      <div class="footer d-flex justify-content-end">
        <a href="#" class="card-link">Join</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'listRoom',
  props: ['rooms'],
};
</script>

<style>
  .card-text {
    font-size: 12px;
  }
</style>
