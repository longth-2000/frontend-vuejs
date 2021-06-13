<template>
  <div>
    <div style="height:3000px">
      <div class="home-screen-header">
        <Header />
      </div>
      <div class="home-screen-content">
        <div class="content-notifycation">
          <Notifycation id="notifycation" />
          <ChatFrame
            id="chatframe"
            v-bind:class="{ isActive: this.$store.state.displayChatFrame }"
          />
        </div>
        <div class="content-search">
          <Search id="search" />
        </div>
        <div class="content-list">
          <List />
        </div>
        <div class="content-chat">
          <ChatContainer style="margin-left:100px" />
        </div>
      </div>
    </div>
  </div>
</template>
<style>
.home-screen-header {
}

.home-screen-content {
  width: 100%;
  margin: -10px auto;
  position: relative;
}
.content-notifycation {
  width: 100%;
  height: 160px;
  background: #6f9562;
}
.content-notifycation #chatframe {
  margin-left: 1200px;
  position: relative;
  z-index: 1;
  top: 30px;
}

.content-search {
  position: relative;
  width: 80%;
  height: auto;
  margin: 0 auto;
  border-radius: 8px;
  margin-top: 0px;
  background: white;
}
.content-search #search {
  position: relative;
  z-index: 0;
}
.content-list {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.isActive {
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
import ChatFrame from "./Chat/ChatList.vue";
import io from "socket.io-client";
import { URL } from "./config/axios/constant";
export default {
  components: {
    Header,
    Search,
    List,
    Notifycation,
    ChatScreen,
    ChatContainer,
    ChatFrame
  },
  mounted() {
    this.socket.emit("online", {
      userID: $cookies.get("token")
    });
  },
  data() {
    return {
      formData: {},
      isActive: true,
      socket: io(URL)
    };
  },
  computed: {}
};
</script>
