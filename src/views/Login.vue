<template>
  <div class="container">
    <div class="row w-100">
      <div
        class="col-lg-12 col-md-12 d-flex justify-content-center align-items-center"
        style="height: 80vh"
      >
        <div class="card login">
          <div class="card-body">
            <h2 class="card-title text-center">Login</h2>
            <form @submit.prevent="login" class="text-center">
              <div class="form-group">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Please enter your name ..."
                  name="name"
                  v-model="name"
                >
                <p v-if="err" class="text-danger">{{ err }}</p>
              </div>
              <button class="btn btn-primary">Enter The Game</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'login',
  data() {
    return {
      name: '',
      err: '',
    };
  },
  methods: {
    login() {
      if (this.name) {
        this.$router.replace({ path: '/home' });
        this.$store.commit('GET_NAME', this.name);
        localStorage.setItem('user', this.name);
      } else {
        this.err = 'Please enter your name!';
      }
    },
  },
};
</script>


<style scoped>
.login {
  max-width: 450px;
  margin-top: 50px;
  display: block;
  margin-left: auto;
  margin-right: auto;
}
</style>
