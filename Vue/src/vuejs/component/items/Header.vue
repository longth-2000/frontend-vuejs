<template>
  <div class="header-website">
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
    />
    <div class="logo">
      <img src="../../assets/image/logo.png" />
    </div>
    <div class="menu">
      <md-menu md-direction="bottom-start">
        <md-button md-menu-trigger>
          <router-link
            :to="'/profile/edit/' + $cookies.get('token')"
            class="router-profile second-choice"
          >
            <md-icon class="fa fa-home"></md-icon>
            <span>Trang chủ</span>
          </router-link>
        </md-button>
      </md-menu>
      <md-menu md-direction="bottom-start">
        <md-button md-menu-trigger>
          <router-link
            :to="'/profile/' + $cookies.get('token')"
            class="router-profile second-choice"
          >
            <md-icon class="fa fa-user"></md-icon>
            <span>Tài khoản</span>
          </router-link>
        </md-button>
      </md-menu>
      <md-menu md-direction="bottom-start">
        <md-button md-menu-trigger
          ><router-link to="/" class="router-profile second-choice">
            <md-icon class="fa fa-power-off"></md-icon>
            <span>Đăng xuất</span>
          </router-link>
        </md-button>
      </md-menu>
    </div>
  </div>
</template>
<script>
export default {
  name: "Header",
  methods: {}
};
</script>
<style>
.header-website {
  display: flex;
  background-color: #bbd5b0;

}
.header-website .logo {
  flex: 4;
  margin-left: 100px;
}
.header-website .menu {
  flex: 6;
  margin-left: 550px;
}
.header-website .md-menu .md-button-content {
  display: flex;
  align-items: center;
}
.header-website .md-menu {
  margin-top: 25px;
  margin-left: 30px;
}
.header-website .md-menu .md-button-content span {
  margin-left: 10px;
}
.header-website img {
  width: 270px;
  height: 90px;
  object-fit: contain;
}
.header-website .menu .router-profile {
  text-align: center;
  text-decoration: none;
  color: black;
  margin-top: 0;
}

.second-choice {
  margin-top: 20px;
}
</style>
