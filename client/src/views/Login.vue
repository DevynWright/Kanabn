<template>
  <div class="login d-flex justify-content-center align-items-center">
    <div id="bg" :style="{ 'background-image': 'url(https://scottcoyneunderdev.files.wordpress.com/2015/02/dark-wood-high-quality-wallpaper-hd-resolution3.jpg)' }">
      <img id="login-logo" src="https://cdn5.vectorstock.com/i/1000x1000/94/39/black-drop-oil-stone-logo-icon-vector-24399439.jpg" alt="">
    <form v-if="loginForm" @submit.prevent="loginUser">
      <input type="email" v-model="creds.email" placeholder="email" />
      <input type="password" v-model="creds.password" placeholder="password" />
      <button class="btn btn-success" type="submit">Login</button>
    </form>
    <form v-else @submit.prevent="register">
      <input type="text" v-model="newUser.name" placeholder="name" />
      <input type="email" v-model="newUser.email" placeholder="email" />
      <input type="password" v-model="newUser.password" placeholder="password" />
      <button class="btn btn-warning" type="submit">Create Account</button>
    </form>
    <div class="action" @click="loginForm = !loginForm">
      <p class="logintext" v-if="loginForm">No account? Click here to Register</p>
      <p class="logintext" v-else>Already have an account? Click here to Login</p>
    </div>
  </div>
  </div>
</template>

<script>
import router from "@/router/index.js";
export default {
  name: "login",
  data() {
    return {
      loginForm: true,
      creds: {
        email: "",
        password: ""
      },
      newUser: {
        email: "",
        password: "",
        name: ""
      },
      image:""
    };
  },
  beforeCreate() {
    if (this.$store.state.user._id) {
      this.$router.push({ name: "boards" });
    }
  },
  methods: {
    register() {
      this.$store.dispatch("register", this.newUser);
    },
    loginUser() {
      this.$store.dispatch("login", this.creds);
    }
  }
};
</script>

<style>
.logintext{
  color: white;
}
#login-logo{
  height: 40vh;
  border-radius: 50%;
}
#bg{
  height: 100vh;
  width: 100vw;
  background-size: cover;
}
.action {
  cursor: pointer;
}
</style>