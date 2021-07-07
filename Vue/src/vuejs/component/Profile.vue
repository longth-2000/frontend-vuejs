<template>
  <div class="profile-app">
    <div class="app-header">
      <Header />
    </div>
    <div class="app-navbar">
      <div class="menu">
        <md-steppers>
          <md-step id="first" md-label="Hồ sơ">
            <div class="profile-frame">
              <Information />
            </div>
          </md-step>

          <md-step id="second" md-label="Người phù hợp">
            <div class="profile-frame"></div>
          </md-step>

          <md-step id="third" md-label="Cập nhập hồ sơ">
            <div class="profile-frame"></div>
          </md-step>
        </md-steppers>
      </div>
    </div>
  </div>
</template>
<style>
.profile-app {
}
.profile-app .md-stepper {
  display: flex;
  justify-content: center;
  align-items: center;
}
.md-steppers-navigation {
  padding-left: 10%;
}
.profile-app .profile-frame {
  width: 800px;
  height: auto;
  border-radius: 10px;
  background-color: white;
  margin-left: 20px;
  margin-top: 50px;
  display: flex;
}
</style>
<script>
import EditProfile from "./Entity/Profile/editProfile.vue";
import Information from "./Entity/Profile/informationProfile.vue";
import Header from "./items/Header.vue";
export default {
  data() {
    return {
      listProfile: {},
      imageLink: ""
    };
  },
  components: {
    Information,
    EditProfile,
    Header
  },
  
  methods: {}
};
</script>
