<template>
  <div class="app-login">
    <div class="app-login-frame">
      <img class="background-login" src="../assets/image/date.png" />
      <div class="form">
        <img class="logo" src="../assets/image/logo-1.png" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
        />
        <form action="" method="post" v-on:submit.prevent="Login">
          <div>
            <md-field>
              <label>Email</label>
              <md-input
                type="email"
                name="email"
                v-model="formdata.email"
              ></md-input>
              <md-icon class="fa fa-envelope-square"></md-icon>
            </md-field>
          </div>
          <div>
            <md-field>
              <label>Password</label>
              <md-input
                type="password"
                name="password"
                v-model="formdata.password"
              ></md-input>
            </md-field>
          </div>
          <router-link to="/">Forgot your password</router-link>
          <div class="button">
            <!--  <md-dialog-confirm
              v-if="isAlert"
              :md-active.sync="active"
              :md-content="
                isContinued ? 'Đăng nhập thành công' : 'Tài khoản không tồn tại'
              "
              :md-confirm-text="isContinued ? 'Continue' : ''"
              :md-cancel-text="isContinued ? '' : 'Cancel'"
              @md-cancel="onCancel"
              @md-confirm="onConfirm"
            /> -->
            <md-button class="md-raised md-primary" type="submit"
              >Login</md-button
            >
          </div>
        </form>
        <br />
        <div class="register">
          Don't have account?
          <router-link to="/register">Register</router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.app-login {
  background-image: url("../assets/image/background-image.png");
  background-size: cover;
  height: 1000px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.app-login-frame {
  width: 900px;
  height: 506px;
  background-color: white;
  border-radius: 10px;
  display: flex;
}
.background-login {
  width: 50%;
  height: 100%;
  object-fit: cover;
}
.app-login .form {
  margin-left: 50px;
  margin-top: 20px;
}
.app-login .form .logo {
  display: block;
  margin-left: auto;
  margin-right: auto;
  object-fit: contain;
}
.app-login .button {
  margin: 20px auto;
  display: flex;
  justify-content: center;
  align-items: center;
}
.app-login .button button {
  width: 100%;
  border-radius: 20px;
}
.md-field {
  height: 0px;
  width: 350px;
}
.md-button {
  margin: auto;
  width: 20px;
}
.app-login .register {
  margin: 0 auto;
  text-align: center;
}
.app-login .register .router {
  color: crimson;
  font-weight: bold;
}
</style>

<script>
import VueJwtDecode from "vue-jwt-decode";
import { URL } from "./config/axios/constant";
import axiosConfig from "../component/config/axios/axiosConfig";
import { API } from "./config/axios/api";
export default {
  components: {
    VueJwtDecode
  },

  data() {
    return {
      formdata: {},
      message: "",
      isActive: false,
      active: false,
      isContinued: true,
      isAlert: false,
      password: ""
    };
  },

  computed: {
    username() {
      return this.$store.state.name;
    }
  },
  methods: {
    Login() {
      const api = API.USER.login();
      const { endpoint, method } = api;
      axiosConfig(endpoint, method, this.formdata).then(response => {
        var token = VueJwtDecode.decode(response.data.index);
        this.$cookies.set("token", token.index);
/*         this.$store.commit("changeMyRoom", token.index);
 */        console.log(response.data);
        alert("Đăng nhập thành công");
        this.$router.push("home");
      });
    },
    onConfirm() {
      this.$router.push("home");
    },
    onCancel() {},
    setPassword(value) {
      this.password = value;
      this.$v.password.$touch();
    }
  }
};
</script>
