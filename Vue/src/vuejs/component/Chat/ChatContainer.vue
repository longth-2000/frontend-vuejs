<template>
  <div class="chat-list">
    <div v-for="(frames, index) in ChatUserList" :key="index">
      <Chat
        :frame="frames"
        :content="contentChat"
        :contentDatabase="contentDatabase"
        class="chatItems"
      />
    </div>
  </div>
</template>
<script>
import Chat from "./Chat.vue";
import { URL } from "../config/axios/constant";
import io from "socket.io-client";
import axiosConfig from "../config/axios/axiosConfig";
import { API } from "../config/axios/api";
export default {
  components: {
    Chat
  },
  mounted() {
    
    const apiFirst = API.PROFILE.getProfileByArray();
    axiosConfig(apiFirst.endpoint, apiFirst.method).then(response => {
      this.user = response.data;
      this.user.forEach(user => {
        this.socket.emit("YOUR_ROOM", $cookies.get("token") + "-" + user.Index);
      });
    });
    const apiSecond = API.CHAT.displayContent();
    axiosConfig(apiSecond.endpoint, apiSecond.method).then(response => {
      this.contentDatabase = response.data;
      console.log(this.contentDatabase);
    });
    this.socket.on("MESSAGE_TO_CLIENT", data => {
      const participants = this.$store.state.participants;
      if (
        participants.length == 0 ||
        !participants.some(participant => participant.index == data.from.index)
      ) {
        participants.push({
          index: data.from.index,
          name: data.from.name,
          image: data.from.image
        });
      }
      this.contentChat = data;
    });

   
  },
  data() {
    return {
      contentChat: {},
      contentDatabase: [],
      state: 0,
      UserList: [],
      socket: io(URL)
    };
  },
  computed: {
    ChatUserList() {
      this.UserList = this.$store.state.participants;
      return this.UserList;
    },
    setState() {
      this.state = this.$store.state.yourRoom.state;
      return this.state;
    },
    addChatFrame() {}
  },
  watch: {
    setState() {
      const { index, name, image, state } = this.$store.state.yourRoom;
      const participants = this.$store.state.participants;
      if (
        participants.length == 0 ||
        !participants.some(participant => participant.index == index)
      ) {
        participants.push({
          index: index,
          name: name,
          image: image
        });
      }
      this.$store.commit("changeParticipants", participants);
    }
  },
  methods: {}
};
</script>
<style>
.chat-list {
  display: flex;
}
.chatItems {
  margin-left: 20px;
}
</style>
