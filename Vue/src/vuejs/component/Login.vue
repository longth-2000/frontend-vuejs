<template>
  <div class="app-login">
    <div class="app-login-frame">
      <img class="background-login" src="../assets/image/date.png" />
      <div class="form ">
        <img class="logo" src="../assets/image/logo-1.png" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
        />
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
          <md-button class="md-raised md-primary" @click="Login"
            >Login</md-button
          >
        </div>
        
        <div class="register">
          Don't have account?
          <router-link to="/register">Register</router-link>
        </div>
        <div class="or">
          <h2>Or</h2>
        </div>
        <div class="Oauth_login">
          <div>
            <a href="http://localhost:5000/auth/google">
              <div class="google frame">
                <md-icon class="fa fa-google-plus icon" style="color:white" />
                <p class="title">Đăng nhập bằng google</p>
              </div>
            </a>
          </div>
          <br />
          <div>
            <a href="https://4333cb45c0dc.ngrok.io/auth/facebook">
              <div class="facebook frame">
                <md-icon class="fa fa-facebook-square icon"
                  style="color:white"
                ></md-icon>
                 <p class="title">Đăng nhập bằng facebook</p>
              </div>
            </a>
          </div>
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
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.app-login-frame {
  width: 900px;
  height: 650px;
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
  margin-top: 10px;
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
.app-login .Oauth_login {
  width: 100%;
  margin-top: 30px;
}
.app-login .Oauth_login a {
  text-decoration: none;
}
.app-login .Oauth_login .frame {
  height: 36px;
  display: flex;
  align-items: center;
  border-radius: 4px;
  
}
.app-login .Oauth_login .frame .icon{
  margin-left: 30px;
  flex: 1;
}
.app-login .Oauth_login .frame .title{
  margin-left: 30px;
   flex: 5;
}
.app-login .Oauth_login .facebook {
  background: #3b5998;
  color: white;
}
.app-login .Oauth_login .google {
  background: #DB4437;
  color: white;
  font-family: Helvetica, Arial, sans-serif;
}
.app-login .or{
  width: 10px;
  height: 10px;
  margin: 0 auto;
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
        if (response.data.status == true) {
          var accessToken = response.data.accessToken;
          var refreshToken = response.data.refreshToken;
          var token = VueJwtDecode.decode(accessToken);
          this.$cookies.set("AUTHORIZATION-TOKEN", accessToken, 60 * 10);
          this.$cookies.set("REFRESH-TOKEN", refreshToken, 60 * 60 * 24);
          this.$cookies.set("token", token.index, 60 * 10);
          this.$fire({
            title: "Success",
            text: "Login sucessfully",
            type: "success"
          }).then(r => {
            this.$router.push("home");
          });
        } else {
          this.$fire({
            title: "Failed",
            text: "Incrorrect password or email",
            type: "error"
          }).then(r => {
            console.log("failed");
          }); 
        }
      });
    },
    onConfirm() {
      this.$alert("Hello Vue Simple Alert.");
    },
    onCancel() {},
    setPassword(value) {
      this.password = value;
      this.$v.password.$touch();
    }
  }
};
</script>
