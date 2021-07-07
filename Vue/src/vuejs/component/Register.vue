<template>
  <div class="app-register">
    <div class="app-register-frame">
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
          <!-- <div class="role">
            <div
              class="admin frame"
              v-bind:class="{ active_role: role.admin }"
              @click="chooseRole($event)"
            >
              <md-icon class="fa fa-user-plus icon"></md-icon>
              <p class="title">admin</p>
            </div>
            <div
              class="user frame"
              v-bind:class="{ active_role: role.user }"
              @click="chooseRole($event)"
            >
              <md-icon
                class="fa fa-user icon"
                style="font-size: 40px"
              ></md-icon>
              <p class="title">user</p>
            </div>
          </div> -->
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
.app-register {
  background-image: url("../assets/image/background-image.png");
  background-size: cover;
  height: 1000px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.app-register-frame {
  width: 900px;
  height: 600px;
  background-color: white;
  border-radius: 10px;
  display: flex;
}
.background-login {
  width: 50%;
  height: 100%;
  object-fit: cover;
}
.app-register .form {
  margin-left: 50px;
  margin-top: 50px;
}
.app-register .form .logo {
  display: block;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: -20px;
}
.app-register .form .error {
  color: red;
  padding: 0;
}
.app-register .button {
  margin: 20px auto;
  display: flex;
  justify-content: center;
  align-items: center;
}
.app-register .button button {
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
.app-register .register .router {
  color: crimson;
  font-weight: bold;
}
.app-register .role {
  margin-top: 20px;
  display: flex;
  justify-content: space-evenly;
}
.app-register .role .frame {
  width: 120px;
  height: 50px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  font-size: 18px;

  border: 1px solid #c0c0c0;
}
.app-register .role .frame :hover {
  cursor: pointer;
}
.app-register .role .frame .icon {
  flex: 3;
  margin-left: 20px;
}
.app-register .role .frame .title {
  flex: 5;
}
.active_role {
  background: #ff9933;
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
      messageAlert: "",
      role:{
        admin:false,
        user:false
      }
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
    chooseRole(event) {
        var classArray = event.currentTarget.getAttribute('class').split(' ')
        if(classArray.includes("user")) {
          this.role.user = true
          this.role.admin = false
          this.formdata.role = "user"
        } 
        else {
          this.role.user = false
          this.role.admin = true
          this.formdata.role = "admin"
        }   
    }
  }
};
</script>
