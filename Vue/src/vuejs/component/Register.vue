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
        <form action="" method="post" v-on:submit.prevent="register">
          <md-field>
            <label>Email</label>
            <md-input
              type="email"
              name="email"
              v-model="formdata.email"
            ></md-input>
            <md-icon class="fa fa-envelope-square"></md-icon>
          </md-field>
          <span class="error">{{ showError("Email") }}</span>
          <md-field>
            <label>Username</label>
            <md-input
              type="text"
              name="username"
              v-model="formdata.username"
            ></md-input>
            <md-icon class="fa fa-user"></md-icon>
          </md-field>
          <span class="error">{{ showError("Username") }}</span>
          <md-field>
            <label>Password</label>
            <md-input
              type="password"
              name="password"
              v-model="formdata.password"
            ></md-input>
          </md-field>
          <span class="error">{{ showError("Password") }}</span>
          <div class="button">
            <md-button type="submit" class="md-raised md-primary"
              >Register</md-button
            >
          </div>
        </form>
        <br />
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
  margin-top: 10px;
}
.app-login .form .logo {
  display: block;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: -20px;
}
.app-login .form .error {
  color: red;
  padding: 0;
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
  margin-bottom: 25px;
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
import axiosConfig from "../component/config/axios/axiosConfig";
import { API } from "./config/axios/api";
export default {
  data() {
    return {
      formdata: {},
      message: false,
      errors: [
        {
          message: "",
          key: ""
        }
      ],
      isActive: false,
      messageAlert: ""
    };
  },
  methods: {
    register() {
      const api = API.USER.register();
      const { endpoint, method } = api;
      axiosConfig(endpoint, method, this.formdata).then(response => {
        if (
          response.data.state !== "successful" &&
          response.data.state !== "existed"
        ) {
          const errorRegister = response.data.details;
          errorRegister.forEach(element => {
            this.errors.push({
              message: element.message,
              key: element.context.key
            });
          });
        } else {
          if (response.data.state == "existed") {
            this.$fire({
              title: "Failed",
              text: "Account existed",
              type: "error"
            }).then(r => {
              console.log("failed");
            });
          } else {
            this.$cookies.set("token", response.data.id);
            this.$fire({
              title: "Success",
              text: "Register sucessfully",
              type: "success"
            }).then(r => {
              this.$router.push("profile/create-profile");
            });
          }
        }
        console.log(response.data);
      });
    },
    showError(errorType) {
      var object = {};
      this.errors.forEach(error => {
        if (error.key == errorType) {
          object = error;
        }
      });
      return object.message;
    },
    alert() {
      console.log(this.messageAlert);
    }
  }
};
</script>
