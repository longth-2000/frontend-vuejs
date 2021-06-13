<template>
  <div class="chatFrame">
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
    />
    <div class="chatFrame-title">Messenger</div>
    <div
      class="chatFrame-content"
      v-for="(friend, index) in chatFriend"
      :key="index"
    >
      <div
        class="chatFrame-items"
        @click="displayFrameChat(friend.index, friend.name, friend.image)"
      >
        <div class="avatar">
          <img
            :src="
              getURL + '/images/upload/' + friend.index + '/' + friend.image
            "
          />
        </div>
        <div class="display">
          <div class="content-name">
            <p>{{ friend.name }}</p>
          </div>
          <div class="content-message">
            <md-icon
              class="fa fa-circle"
              v-bind:style="{ color: friend.state.color }"
            ></md-icon>
            <p>{{ friend.state.content }}</p>
          </div>
        </div>
        <div class="icons">
          <md-icon class="fa fa-trash"></md-icon>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { URL } from "../config/axios/constant";
import io from "socket.io-client";
import axiosConfig from "../config/axios/axiosConfig";
import { API } from "../config/axios/api";
export default {
  name: "ChatFrame",
  data() {
    return {
      chatFriend: [],
      users: [],
      socket: io(URL),
      URL: ""
    };
  },
  mounted() {
    this.socket.on("client_online", data => {
      console.log(data);
      this.users = data;
      const api = API.CHAT.displayContentByID($cookies.get("token"));
      const { endpoint, method } = api;
      axiosConfig(endpoint, method).then(response => {
        this.chatFriend = response.data;
        response.data.forEach(element => {
          if (!this.users.some(user => user.userID == element.index)) {
            element.state = {
              color: "red",
              content: "Offline"
            };
          } else {
            element.state = {
              color: "green",
              content: "Online"
            };
          }
        });
      });
    });
  },
  methods: {
    displayFrameChat(index, name, image) {
      var participants = this.$store.state.participants;
      if (
        participants.length == 0 ||
        !participants.some(participant => participant.index == index)
      )
        participants.push({
          index: index,
          name: name,
          image: image
        });
    }
  },
  computed: {
    getURL() {
      this.URL = URL;
      return this.URL;
    }
  }
};
</script>
<style>
.chatFrame {
  width: 340px;
  height: auto;
  background: white;
}
.chatFrame .chatFrame-title {
  font-family: "Segoe UI Historic", "Segoe UI", Helvetica, Arial, sans-serif;
  text-align: center;
  font-size: 1.5rem;
  font-weight: 700;
  padding-top: 20px;
  padding-bottom: 20px;
}
.chatFrame .chatFrame-title p {
 
}
.chatFrame-items {
  width: 100%;
  height: auto;
  padding: 8px;
  display: flex;
  background: white;
}
.chatFrame-content .chatFrame-items:hover {
  background: #e0e0e0;
  cursor: pointer;
}
.chatFrame-content .chatFrame-items .avatar {
  flex: 1;
}
.chatFrame-content .chatFrame-items .display {
  flex: 5;
  margin-left: 15px;
}
.chatFrame-items .display .content-message {
  display: -webkit-box;
}
.chatFrame-items .display .content-message p {
  margin-top: -8px;
}
.chatFrame-items .icons {
  flex: 2;
  margin-top: 15px;
}
.chatFrame-items .avatar img {
  width: 60px;
  height: 60px;
  border-radius: 60px;
  object-fit: cover;
}

.chatFrame-items .display .content-name {
  font-size: 15px;
}
.chatFrame-items .display .content-name p {
  margin-top: 10px;
  font-weight: 600;
}
.chatFrame-items .md-icon.fa-circle {
  font-size: 6px !important;
}
</style>
