<template>
  <!-- Just an image -->
  <nav class="navbar navbar-light bg-light">
    <!-- <div class="navbar-brand"> -->
      <!-- <img src="../assets/logo.png" width="50px" height="50px" alt> -->
    <!-- </div> -->
    <div
      v-if="isLogin"
      class="btn btn-md btn-outline-dark"
      @click.prevent="logout"
      >
      Logout
    </div>
  </nav>
</template>

<script>
export default {
  name: 'navbar',
  created() {
    if (localStorage.getItem('user')) {
      this.isLogin = true;
    } else {
      this.isLogin = false;
    }
  },
  data() {
    return {
      isLogin: false,
    };
  },
  methods: {
    logout() {
      localStorage.removeItem('user');
    },
  },
};
</script>

<style>
</style>
