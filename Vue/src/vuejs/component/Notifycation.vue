<template>
  <div class="notify-function">
    <div class="notify-content">
      <div class="information">
        <div class="image">
          <img id="image" :src="this.$store.state.image" />
          <div class="upload-image" id="change-avatar" @click="showModal">
            <p>Thay đổi avatar</p>
          </div>
          <modal
            :width="1000"
            :height="auto"
            :scrollable="true"
            name="example"
            class="example"
          >
            <div>
              <Cropper :modal="this.$modal"  />
            </div>
          </modal>
        </div>
        <div class="name">
          <h3>Chào {{ getUser }}</h3>
          <router-link
            :to="'/profile/edit/' + $cookies.get('token')"
            class="router-profile"
          >
            <div class="upload-image">
              <md-icon class="fa fa-image"></md-icon>
              <p>Cập nhật hồ sơ cá nhân</p>
            </div>
          </router-link>
        </div>
        <div class="reaction">
          <div class="reaction-content">
            <div class="tym reaction-view">
              <router-link :to="'/react/isliked/' + listUser.Index">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 50 44"
                  id="icon-heart"
                  style="width:80%; margin-top:5px; margin-left:8px; opacity:0.5"
                >
                  <path
                    d="M50 14.36C50 6.96 43.96.96 36.5.96A13.5 13.5 0 0025 7.35 13.5 13.5 0 0013.5.96C6.04.95 0 6.95 0 14.35c0 4.03 1.8 7.63 4.63 10.09l19.14 19a1.75 1.75 0 002.46 0l19.13-19A13.32 13.32 0 0050 14.35z"
                  ></path>
                </svg>
                <md-tooltip md-direction="bottom"
                  >Đã thích hồ sơ của tôi</md-tooltip
                >
              </router-link>
              <span>{{ isLikedUsers }}</span>
            </div>
            <div class="like reaction-view">
              <router-link :to="'/react/liked/' + listUser.Index"
                ><svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 100 97"
                  id="icon-star"
                  style="width:85%; margin-left:6px; opacity:0.5"
                >
                  <path
                    d="M98.77 40.08a3.62 3.62 0 00-2.13-6.34l-29.03-2.17a3.62 3.62 0 01-3.06-2.18L53.02 2.66a3.63 3.63 0 00-6.69.06L35.3 29.67a3.62 3.62 0 01-3.02 2.23l-29 2.7a3.62 3.62 0 00-2 6.38L23.5 59.8a3.63 3.63 0 011.2 3.56l-6.4 28.41a3.63 3.63 0 005.45 3.88l24.77-15.32a3.62 3.62 0 013.75-.03l25.05 14.86a3.63 3.63 0 005.36-3.98l-6.9-28.29a3.62 3.62 0 011.12-3.58l21.87-19.23z"
                  ></path>
                </svg>
                <md-tooltip md-direction="bottom"
                  >Hồ sơ đã thích</md-tooltip
                ></router-link
              >
              <span>{{ likedUsers }}</span>
            </div>
            <!-- <div class="view reaction-view">
              <router-link to="/">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 128 80"
                  id="icon-eye"
                  style="width:85%; margin-left:6px; opacity:0.5"
                >
                  <path
                    d="M64 0C36.09 0 11.89 16.25 0 40c11.89 23.75 36.09 40 64 40 27.91 0 52.11-16.25 64-40C116.11 16.25 91.91 0 64 0zm31.56 21.21A60.88 60.88 0 01114.24 40a60.88 60.88 0 01-18.68 18.79 58.59 58.59 0 01-63.12 0A60.86 60.86 0 0113.76 40a60.85 60.85 0 0120.17-19.7 32 32 0 1060.15 0l1.48.91zM64 27.25a12 12 0 11-24 0 12 12 0 0124 0z"
                  ></path>
                </svg>
                <md-tooltip md-direction="bottom">Hồ sơ đã xem</md-tooltip>
              </router-link>
              <span>2</span>
            </div> -->
            <div class="message reaction-view" @click="displayChatFrame">
              <md-icon class="fa fa-comment md-size-2x"></md-icon>
              <md-tooltip md-direction="bottom">Tin nhắn</md-tooltip>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Chart from "./Chart.vue";
import { URL } from "./config/axios/constant";
import Cropper from "./items/Cropper.vue";
export default {
  name: "Notifycation",
  components: {
    Chart,
    Cropper
  },
  data() {
    return {
      listUser: {},
      nameUser: "",
      likedUsers: null,
      isLikedUsers: null,
      image: ""
    };
  },
  computed: {
    getUser() {
      this.nameUser = this.$store.state.nameUser;
      return this.nameUser;
    }
   
  },
  methods: {
    showModal() {
      this.$modal.show("example");
    },
    hideModal() {},
    displayChatFrame() {
      var displayChatFrame = this.$store.state.displayChatFrame;
      if (displayChatFrame == false) displayChatFrame = true;
      else displayChatFrame = false;
      this.$store.commit("changeDisplayChatFrame", displayChatFrame);
    }
  },
  mounted() {
    let one = `${URL}/profile/${$cookies.get("token")}`;
    let two = `${URL}/react/liked/${$cookies.get("token")}`;
    let three = `${URL}/react/isliked/${$cookies.get("token")}`;
    const requestOne = this.axios.get(one);
    const requestTwo = this.axios.get(two);
    const requestThree = this.axios.get(three);
    this.axios.all([requestOne, requestTwo, requestThree]).then(
      this.axios.spread((...responses) => {
        this.listUser = responses[0].data[0];
        this.$store.commit("changeNameUser", this.listUser.FullName);
        this.likedUsers = responses[1].data.length;
        this.isLikedUsers = responses[2].data.length;
        this.image = `${URL}/images/upload/${this.listUser.Index}/${this.listUser.Image}`;
        this.$store.commit("changeImage",this.image)
      })
    );
  }
};
</script>
<style>
.notify-function {
  display: flex;
  align-items: center;
  justify-content: center;
}
.notify-content {
  display: flex;
  width: 80%;
  height: 130px;
}
.notify-content .information {
  flex: 3;
  display: flex;
}
.notify-content .information #image {
  display: block;
  width: 100px;
  height: 100px;
  border-radius: 100px;
  object-fit: cover;
  margin-left: 10px;
  margin-top: 10px;
  background: red;
}
.notify-content .information .name {
  font-family: Roboto, sans-serif;
  color: white;
  margin-left: 30px;
}
.notify-content .information .name h3 {
  font-weight: 400;
}
.notify-content .information .upload-image {
  width: 200px;
  height: 30px;
  background: #bbd5b0;
  border-radius: 0.25rem;
  display: flex;
  align-items: center;
  box-shadow: 0 3px 6px 0 rgb(0 0 0 / 40%);
  color: #222;
  justify-content: space-around;
  font-weight: 300;
}
.notify-content .information #change-avatar {
  width: 110px;
  height: 24px;
  margin-left: 6px;
  margin-top: 10px;
}
.notify-content .information .vm--modal {
  height: auto !important;
  top: 10px !important;
}
.notify-content .information .avatar-cropper {
}
.notify-content .information .name .upload-image .md-icon {
  margin: 0;
}
.notify-content .reaction {
  flex: 7;
}
.notify-content .reaction .reaction-content {
  width: 100%;
  height: 100%;
  display: flex;
  margin-left: 40%;
}
.notify-content .reaction .reaction-view {
  width: 102px;
  height: 102px;
  border-width: 14px;
  border-color: #4f6d45;
  border-radius: 50%;
  border-style: solid;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 7%;
  margin-top: 2%;
  position: relative;
}
.notify-content .reaction .reaction-view span {
  position: absolute;
  top: 25px;
  text-align: center;
  font-size: 20px;
  color: white;
  opacity: 0.8;
}
</style>
