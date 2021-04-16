<template>
  <div>
    <div>{{ username }}</div>
    <button @click="changeUsername">oke</button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      usernameInput: ""
    };
  },
  computed: {
    username() {
      return this.$store.state.emailUser;
    }
  },
  methods: {
    changeUsername() {
      this.$store.commit("changeEmailUser", "loiiiol");
    }
  }
};
</script>
<style></style>
