<template>
  <div class="edit-profile">
    <div class="app-header">
      <Header />
    </div>
    <div class="content-notifycation">
      <Notifycation />
    </div>
    <div class="edit-profile-content">
      <div class="edit-profile-frame">
        <Input action="edit-profile" :data="listProfile" />
      </div>
    </div>
  </div>
</template>
<script>
import Header from "../../items/Header.vue";
import Input from "../../items/Input.vue";
import Notifycation from "../../Notifycation.vue";
import axiosConfig from "../../config/axios/axiosConfig";
import { API } from "../../config/axios/api";
export default {
  name: "EditProfile",
  components: {
    Input,
    Header,
    Notifycation
  },
  data() {
    return {
      listProfile: {}
    };
  },
  mounted() {
    const api = API.PROFILE.getProfileById(this.$route.params.id);
    const { endpoint, method } = api;
    axiosConfig(endpoint, method).then(response => {
      this.listProfile = response.data[0];
    });
  },
  methods: {}
};
</script>
<style>
.edit-profile {
  width: 100%;
}
.edit-profile .edit-profile-content {
  display: flex;
  align-items: center;
  justify-content: center;
  background: #bbd5b0
}
.edit-profile .edit-profile-frame {
  width: 60%;
  margin-top:5rem ;
}
.edit-profile .content-notifycation {
  width: 100%;
  height: 150px;
  background: #6f9562;
}
</style>
