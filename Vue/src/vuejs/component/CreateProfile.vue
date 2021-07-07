<template>
  <div class="create-profile-app">
    <div class="create-profile-header"></div>
    <div class="create-profile">
      <div class="create-profile-content">
        <form action="" method="post" enctype="multipart/form-data">
          <md-table id="image-upload">
            <md-table-row>
              <md-table-cell class="profile-items-title">>Ảnh </md-table-cell>
              <md-table-cell
                ><div class="image-user">
                  <md-field>
                    <label>Only images</label>
                    <md-file
                      accept="image/*"
                      name="fileUpload"
                      id="image"
                      @change="updateProfile"
                    />
                  </md-field></div
              ></md-table-cell>
            </md-table-row>
          </md-table>
          <Input action="create-profile" :image="dataImage" :facebook="this.facebookUser" />
        </form>
      </div>
    </div>
  </div>
</template>
<style>
.create-profile-app {
}
.create-profile-header {
}
.create-profile {
  margin-top: -10px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80%;
}
.create-profile .create-profile-content {
  width: 80%;
}
.create-profile .create-profile-content #image-upload {
  background: chartreuse;
  width: 80%;
}
.profile-items-title {
  width: 20%;
}
</style>
<script>
import VueNumericInput from "vue-numeric-input";
import Header from "./items/Header.vue";
import axiosConfig from "../component/config/axios/axiosConfig";
import { API } from "./config/axios/api";
import Input from "./items/Input.vue";
export default {
  name: "CreateProfile",

  data() {
    return {
      dataImage: {},
      facebookUser: {}
    };
  },
  
  components: {
    VueNumericInput,
    Header,
    Input
  },
  computed: {
    getDataImage() {
      var imageFile = document.querySelector("#image");
      this.dataImage = imageFile.files[0];
      return this.dataImage;
    }
  },
  methods: {
    updateProfile() {
      var imageFile = document.querySelector("#image");
      this.dataImage = imageFile.files[0];
    }
  }
};
</script>
