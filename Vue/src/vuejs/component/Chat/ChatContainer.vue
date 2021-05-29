<template>
  <div class="chat-list">
    <div v-for="(frames, index) in ChatUserList" :key="index">
      <Chat :frame="frames" :content="contentChat" />
    </div>
    <!-- <button @click="a">oke</button> -->
  </div>
</template>
<script>
import Chat from "./Chat.vue";
import { URL } from "../config/axios/constant";
import io from "socket.io-client";
export default {
  components: {
    Chat
  },
  mounted() {
    this.axios.get("http://localhost:5000/profile/getByList").then(response => {
      this.user = response.data;
      this.user.forEach(user => {
        this.socket.emit("YOUR_ROOM", $cookies.get("token") + "-" + user.Index);
      });
    });
    this.socket.on("MESSAGE_TO_CLIENT", data => {
      const participants = this.addChatFrame;
      var object = {
        index: data.from.index,
        name: data.from.name,
        image: data.from.image
      };
      console.log(object);
      participants.forEach(element => {
        if (element.index != "null") {
          this.clientList.push(element.index);
        }
      });
      if (!this.clientList.includes(object.index) && object.index != null) {
        participants.push(object);
      }
      this.contentChat = data;
    });
  },
  data() {
    return {
      ChatList: [],
      indexList: [],
      clientList: [],
      contentChat: {},
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
      console.log(index);
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
  methods: {
    a() {
      console.log(this.ChatUserList);
    }
  }
};
</script>
<style>
.chat-list {
  display: flex;
}
</style>
