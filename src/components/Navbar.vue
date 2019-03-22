<template>
  <!-- Just an image -->
  <nav class="navbar navbar-light bg-light">
    <div class="navbar-brand">
      <img src="../assets/logo.png" width="50" height="50" alt>
    </div>
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
    localStorage.getItem('user') ? this.isLogin = true : this.isLogin = false;
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
