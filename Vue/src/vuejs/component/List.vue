<template>
  <div class="List-content">
    <div
      class="List-content-items"
      v-for="(users, index) in getlistUsers"
      :key="users.Index"
    >
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
      />

      <div class="avatar">
        <router-link :to="'/profile/' + users.Index">
          <img
            :src="getURL + '/images/upload/' + users.Index + '/' + users.Image"
          />
        </router-link>
      </div>
      <div class="information">
        <div class="infor-name infor-line">
          <md-icon class="fa fa-user"></md-icon>
          <span>{{ users.FullName }}</span>
        </div>
        <div class="infor-sex infor-line">
          <md-icon class="fa fa-mars"></md-icon>
          <span>{{ users.Sex }}</span>
        </div>
        <div class="infor-level infor-line">
          <md-icon class="fa fa-book"></md-icon>
          <span>{{ users.Level }}</span>
        </div>
        <div class="infor-address infor-line">
          <md-icon class="fa fa-map"></md-icon>
          <span>{{ users.Province }}</span>
        </div>
      </div>
      <div class="react">
        <div @click="passHeart(users.Index, $event)">
          <md-icon
            class="fa fa-heart"
            :style="{ color: createList[index].color }"
            :name="users.Index"
          >
            <md-tooltip md-direction="bottom">Thả tym</md-tooltip>
          </md-icon>
        </div>

        
        <div
          @click="displayChat(users.Index, users.FullName, users.Image, 0)"
          style="margin-left:20px"
        >
          <md-icon class="fa fa-comment">
            <md-tooltip md-direction="bottom">Nhắn tin</md-tooltip>
          </md-icon>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axiosConfig from "../component/config/axios/axiosConfig";
import { API } from "./config/axios/api";
import { URL } from "./config/axios/constant";
export default {
  name: "List",
  data() {
    return {
      formData: {},
      listUser: [],
      chatList: [],
      colorHeart: "red",
      reactList: [],
      state: 0,
      URL: ""
    };
  },

  methods: {
    passHeart(indexUser, event) {
      const api = API.REACT.react();
      const { endpoint, method } = api;
      this.createList.forEach(element => {
        if (event.target.getAttribute("name") == element.index)
          element.color = "green";
      });
      console.log(this.createList);

      this.formData.indexHost = indexUser; //user is liked
      this.formData.indexClient = $cookies.get("token"); //user liked
      axiosConfig(endpoint, method, this.formData).then(response => {
        console.log(response.data);
      });
    },
    displayChat(index, name, image, state) {
      this.state++;
      this.$store.commit("changeYourRoom", {
        index: index,
        name: name,
        image: image,
        state: this.state
      });
    }
  },
  computed: {
    getURL() {
      this.URL = URL;
      return this.URL;
    },
    getlistUsers() {
      var list = this.$store.state.listUser;
      var listUser = list.length == 0 ? null : list;
      return listUser;
    },
    createList() {
      this.getlistUsers.forEach(element => {
        this.reactList.push({
          //phải dùng reactList ở data
          index: element.Index,
          color: "red"
        });
      });
      return this.reactList;
    }
  }
};
</script>
<style>
.List-content {
  width: 1203px;
  height: 100px;
  display: flex;
}
.List-content-items {
  height: 366px;
  width: 210px;
  background: white;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  margin-left: 15px;
}
.List-content-items .information {
  margin-top: 10px;
}
.List-content-items .avatar img {
  width: 100%;
  height: 150px;
  object-fit: contain;
}
.List-content-items .react {
  margin-top: 30px;
  margin-left: 70px;
  display: flex;
}
.List-content-items .information .infor-line {
  margin-top: 10px;
  margin-left: 15px;
}
.List-content-items .information .infor-line span {
  margin-left: 8px;
}
</style>
