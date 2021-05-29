<template>
  <div>
    <button @click="join('hello')">oke</button>
  </div>
</template>
<script>
import io from "socket.io-client";

export default {
  data() {
    return {
      socket: io("http://localhost:5000")
    };
  },
  methods: {
    join(content) {
      this.socket.emit("private_message", {
        content,
        to: "1211111"
      });
    }
  }
};
</script>
