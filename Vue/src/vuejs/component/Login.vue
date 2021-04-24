<template>
  <div>
    <div class="row">
      <div class="col-md-6">
        <h1>Đăng nhập</h1>
        <div class="form-group">
          <label>Email</label>
          <input
            type="email"
            v-model="formdata.email"
            class="form-control"
            name="email"
            id="email"
          />
        </div>
        <div class="form-group">
          <label>Password</label>
          <input
            type="password"
            v-model="formdata.password"
            name="password"
            class="form-control"
            id="password"
          />
        </div>
        <div class="form-group" id="button">
          <button class="btn btn-primary" v-on:click="Login">
            Đăng nhập
          </button>
          <router-link to="/register">
            Create an account
          </router-link>
        </div>
        <div class="notification">
          <h5 class="error-notification">
            <span>{{ message }}</span>
          </h5>
        </div>
        <router-link to="/home">Home</router-link>
      </div>
    </div>
  </div>
</template>
<style>
.router {
  display: none;
}
.error-notification {
  color: red;
}
.green-notification {
  color: green;
  display: inline;
}
</style>

<script>
import Vue from "vue";
export default {
  data() {
    return {
      formdata: {},
      message: "",
      isActive: false
    };
  },
  computed: {
    username() {
      return this.$store.state.name;
    }
  },
  methods: {
    Login() {
      this.axios.post("http://localhost:5000", this.formdata).then(response => {
        this.$store.commit("changeUserindex", response.data._id);//id của user khi đăng nhập
        /*this.message = response.data.message; */
        console.log(response.data);
      });
    },
  }
};
</script>
