<template>
  <div id="app">
    <div class="content">
      <div class="chat-container">
        <Chat
          v-if="visible"
          :participants="participants"
          :myself="myself"
          :messages="messages"
          :chat-title="chatTitle"
          :placeholder="placeholder"
          :colors="colors"
          :border-style="borderStyle"
          :hide-close-button="hideCloseButton"
          :close-button-icon-size="closeButtonIconSize"
          :submit-icon-size="submitIconSize"
          :submit-image-icon-size="submitImageIconSize"
          :load-more-messages="toLoad.length > 0 ? loadMoreMessages : null"
          :async-mode="asyncMode"
          :scroll-bottom="scrollBottom"
          :display-header="true"
          :send-images="true"
          :profile-picture-config="profilePictureConfig"
          :timestamp-config="timestampConfig"
          :link-options="linkOptions"
          :accept-image-types="'.png, .jpeg'"
          @onImageClicked="onImageClicked"
          @onImageSelected="onImageSelected"
          @onMessageSubmit="onMessageSubmit"
          @onType="onType"
          @onClose="onClose('param value')"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { Chat } from "vue-quick-chat";
import "vue-quick-chat/dist/vue-quick-chat.css";
import io from "socket.io-client";
import axiosConfig from "../config/axios/axiosConfig";
import { API } from "../config/axios/api";
import { URL } from "../config/axios/constant";
export default {
  name: "ChatScreen",
  components: {
    Chat
  },
  props: {
    frame: Object,
    content: Object
  },

  mounted() {
    this.participants[0].name = this.frame.name;
    const api = API.PROFILE.getProfileById($cookies.get("token"));
    const { endpoint, method } = api;
    axiosConfig(endpoint, method).then(response => {
      this.myself.name = response.data[0].FullName;
      this.myself.profilePicture =
        `${URL}/images/upload/${$cookies.get("token")}/` +
        response.data[0].Image;
    });
    if (this.content.content != null) {
      this.participants[0].profilePicture = this.content.from.image;
      this.messages.push({
        content: this.content.content,
        myself: false,
        participantId: 2,
        timestamp: {
          year: 2019,
          month: 3,
          day: 5,
          hour: 20,
          minute: 10,
          second: 3,
          millisecond: 123
        },
        type: "text"
      });
    }
    this.socket.on("MESSAGE_TO_HOST", data => {
      this.messages.push({
        content: data,
        myself: true,
        participantId: 1,
        timestamp: {
          year: 2019,
          month: 3,
          day: 5,
          hour: 20,
          minute: 10,
          second: 3,
          millisecond: 123
        },
        type: "text"
      });
    });
  },
  data() {
    return {
      user: [],
      name: "",
      from: "",
      to: {},
      visible: true,
      socket: io(URL),
      formData: "",
      participants: [
        {
          name: "",
          id: 2,
          profilePicture: ""
        }
      ],
      myself: {
        name: "",
        id: 1,
        profilePicture:
          "https://lh3.googleusercontent.com/-G1d4-a7d_TY/AAAAAAAAAAI/AAAAAAAAAAA/AAKWJJPez_wX5UCJztzEUeCxOd7HBK7-jA.CMID/s83-c/photo.jpg"
      },
      messages: [],
      chatTitle: "Khung chat",
      placeholder: "send your message",
      colors: {
        header: {
          bg: "#6f9562",
          text: "#fff"
        },
        message: {
          myself: {
            bg: "#fff",
            text: "#525252"
          },
          others: {
            bg: "#fb4141",
            text: "#fff"
          },
          messagesDisplay: {
            bg: "#f7f3f3"
          }
        },
        submitIcon: "#b91010",
        submitImageIcon: "#b91010"
      },
      borderStyle: {
        topLeft: "10px",
        topRight: "10px",
        bottomLeft: "10px",
        bottomRight: "10px"
      },
      hideCloseButton: false,
      submitIconSize: 24,
      submitImageIconSize: 24,
      closeButtonIconSize: "20px",
      asyncMode: true,
      toLoad: [],
      scrollBottom: {
        messageSent: true,
        messageReceived: false
      },
      profilePictureConfig: {
        others: true,
        myself: true,
        styles: {
          width: "30px",
          height: "30px",
          borderRadius: "50%"
        }
      },
      timestampConfig: {
        format: "HH:mm",
        relative: false
      },

      linkOptions: {
        myself: {
          className: "myLinkClass",
          format: function(value, type) {
            if (type === "url" && value.length > 50) {
              value = value.slice(0, 50) + "…";
            }
            return value;
          }
        },
        others: {
          className: "othersLinkClass",
          format: function(value, type) {
            if (type === "url" && value.length > 50) {
              value = value.slice(0, 50) + "…";
            }
            return value;
          }
        }
      }
    };
  },
  computed: {},
  watch: {
    frame() {
      this.participants[0].name = this.frame.name;
    },
    content() {
      if (this.frame.index == this.content.from.index) {
        this.participants[0].profilePicture = this.content.from.image;
        this.messages.push({
          content: this.content.content,
          myself: false,
          participantId: 2,
          timestamp: {
            year: 2019,
            month: 3,
            day: 5,
            hour: 20,
            minute: 10,
            second: 3,
            millisecond: 123
          },
          type: "text"
        });
      }
    }
  },
  methods: {
    onType: function(e) {},
    loadMoreMessages(resolve) {
      setTimeout(() => {
        resolve(this.toLoad);
        //Make sure the loaded messages are also added to our local messages copy or they will be lost
        this.messages.unshift(...this.toLoad);
        this.toLoad = [];
      }, 1000);
    },
    onMessageSubmit(message) {
      var properties_content = Object.keys(this.content);
      if (properties_content.length != 0) {
        var content = {
          index: this.content.from.index,
          name: this.content.from.name,
          image: this.content.from.image
        };
      }
      var properties = Object.keys(this.$store.state.yourRoom);
      this.to = properties.length === 0 ? content : this.frame;
      this.socket.emit("SEND_MESSAGE_TO_FRIEND", {
        from: {
          index: $cookies.get("token"),
          name: this.myself.name,
          image: this.myself.profilePicture
        },
        to: {
          index: this.to.index,
          name: this.to.name,
          image: this.to.image
        },
        room: $cookies.get("token") + "-" + this.to.index,
        content: message.content
      });
      this.socket.emit("SEND_MESSAGE_TO_HOST", message.content);
    },
    onClose() {
      var array = this.$store.state.participants;
      array = array.filter(items => items.index != this.frame.index);
      this.$store.commit("changeParticipants", array);
    },
    onImageSelected({ file, message }) {
      let src =
        "https://pbs.twimg.com/profile_images/875996174305472512/upM71pVR.jpg";
      this.messages.push(message);
      /**
       * This timeout simulates a requisition that uploads the image file to the server.
       * It's up to you implement the request and deal with the response in order to
       * update the message status and the message URL
       */
      setTimeout(
        res => {
          message.uploaded = true;
          message.src = res.src;
        },
        3000,
        { src }
      );
    },
    onImageClicked(message) {
      /**
       * This is the callback function that is going to be executed when some image is clicked.
       * You can add your code here to do whatever you need with the image clicked. A common situation is to display the image clicked in full screen.
       */
      console.log("Image clicked", message.src);
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.content {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  flex-wrap: wrap;
}

.chat-container {
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgb(247, 243, 243);
  padding: 10px 0 10px 0;
  height: 500px;
  width: 350px;
}

.external-controller {
  background: #2c3e50;
  height: 300px;
  width: 600px;
  display: flex;
  color: #eee;
}

.controller-btn-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding-left: 20px;
  padding-right: 20px;
  flex-wrap: wrap;
}

.btn-message {
  cursor: pointer;
  background: #eee;
  border: none;
  height: 40px;
  color: #2c3e50;
  border-radius: 5px;
  outline: none;
  transition: 0.3s;
}

.btn-participant {
  cursor: pointer;
  background: #eee;
  border: none;
  height: 40px;
  color: #2c3e50;
  border-radius: 5px;
  outline: none;
  transition: 0.3s;
}

.btn-message:hover {
  background: rgb(255, 255, 255);
}
</style>
