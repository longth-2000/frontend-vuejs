<template>
  <div class="profile-information-content">
    <div class="profile-image">
      <div class="profile-image-frame">
        <div><img :src="imageLink"  /></div>
        <div class="profile-image-title">
          <label>{{ listProfile.FullName }} </label>
        </div>
      </div>
    </div>
    <div class="profile-information">
      <div>
        <md-table>
          <md-table-row class="profile-differ">
            <md-table-cell>Họ Và Tên</md-table-cell>
            <md-table-cell>{{ listProfiles.FullName }}</md-table-cell>
          </md-table-row>
          <md-table-row>
            <md-table-cell>Tuổi</md-table-cell>
            <md-table-cell>{{ listProfiles.Age }}</md-table-cell>
          </md-table-row>
          <md-table-row class="profile-differ">
            <md-table-cell>Giới tính</md-table-cell>
            <md-table-cell>{{ listProfiles.Sex }}</md-table-cell>
          </md-table-row>
          <md-table-row>
            <md-table-cell>Trình độ học vấn</md-table-cell>
            <md-table-cell>{{ listProfiles.Level }}</md-table-cell>
          </md-table-row>
          <md-table-row class="profile-differ">
            <md-table-cell>Tỉnh</md-table-cell>
            <md-table-cell>{{ listProfiles.Province }}</md-table-cell>
          </md-table-row>
          <md-table-row>
            <md-table-cell>Quận/Huyện</md-table-cell>
            <md-table-cell>{{ listProfiles.District }}</md-table-cell>
          </md-table-row>
        </md-table>

      </div>
    </div>
  </div>
</template>
<script>
import axiosConfig from "../../config/axios/axiosConfig";
import { API } from "../../config/axios/api";
import {URL} from "../../config/axios/constant"
export default {
  name: "Information",
  data() {
    return {
      listProfile: {},
      initialProfile: {},
      imageLink: ""
    };
  },
  mounted() {
    const api = API.PROFILE.getProfileById(this.$route.params.id);
    const { endpoint, method } = api;
    axiosConfig(endpoint, method).then(response => {
      this.$store.commit("changeListProfile", response.data[0]);
      this.imageLink =
        `${URL}/images/upload/${this.$route.params.id}/` +
        response.data[0].Image;
    });
  },
  computed: {
    listProfiles() {
      var storeProfile = this.$store.state.listProfile;
      this.listProfile = storeProfile;
      return this.listProfile;
    }
  },
  methods: {
    a() {
      console.log(this.$store.state.nameUser);
    }
  }
};
</script>
<style>
.profile-information-content {
  width: 800px;
  height: auto;
  border-radius: 10px;
  background-color: white;
  margin-left: 20px;
  margin-top: 0px;
  display: flex;
}
.profile-image {
  flex: 4;
  display: flex;
  justify-content: center;
  align-items: center;
}
.profile-image-frame {
  width: 70%;
  height: 65%;
  background-color: white;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  border-radius: 5px;
}
.profile-image .profile-image-title {
  margin: 20px;
  text-align: center;
  font-size: 18px;
}
.profile-image .profile-image-frame img {
  width: 150px;
  height: 150px ;
  display: block;
  margin-left: auto;
  margin-right: auto;
  margin-top: 10%;
  border-radius: 100px;
  object-fit: cover;
}
.profile-information {
  flex: 6;
  margin-top: 60px;
}
.profile-information .md-table {
  width: 450px;
}
.md-table-row {
  border-radius: 5px;
}
.profile-information .profile-differ {
  background-color: #e0e0e0;
}
.ss {
  height: 200px;
}
</style>
