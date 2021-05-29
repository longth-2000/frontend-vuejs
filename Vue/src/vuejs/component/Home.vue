<template>
  <div>
    <div class="home-screen-header">
      <Header />
    </div>
    <div class="home-screen-content">
      <div class="content-notifycation">
        <Notifycation />
      </div>
      <div class="content-search">
        <Search />
      </div>
      <div class="content-list">
        <List />
      </div>
    </div>
    <div class="home-screen-footer">
      <!--  <ChatScreen
        v-if="isActive"
        v-bind:class="{ active: this.$store.state.active }"
        :room="this.$store.state.yourRoom.index"
      /> -->
      <ChatContainer style="margin-left:100px; margin-top:300px" />
    </div>
  </div>
</template>
<style>
.home-screen-header {
}

.home-screen-content {
  width: 100%;
  height: auto;
  margin: -10px auto;
}
.content-notifycation {
  width: 100%;
  height: 150px;
  background: #6f9562;
}
.content-search {
  width: 80%;
  height: auto;
  margin: 0 auto;
  border-radius: 8px;
  margin-top: -20px;
  background: white;
}
.content-list {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.active {
  display: none;
}
</style>
<script>
import Header from "./items/Header.vue";
import Search from "./Search.vue";
import List from "./List.vue";
import Notifycation from "./Notifycation.vue";
import ChatScreen from "./Chat/Chat.vue";
import ChatContainer from "./Chat/ChatContainer.vue";
import io from "socket.io-client";
import { URL } from "./config/axios/constant";
export default {
  components: {
    Header,
    Search,
    List,
    Notifycation,
    ChatScreen,
    ChatContainer
  },
  mounted() {
    /* this.axios.get("http://localhost:5000/profile/getByList").then(response => {
      this.user = response.data;
      console.log("hello");
      console.log(this.user);
      this.user.forEach(user => {
        this.socket.emit("YOUR_ROOM", $cookies.get("token") + "-" + user.Index);
        console.log($cookies.get("token") + "-" + user.Index);
      });
    }); */
  },

  data() {
    return {
      formData: {},
      user: [],
      isActive: true,
      socket:io(URL)
    };
  },
  computed: {}
};
</script>
