<template>
  <div>
    <div>
      <label> Fullname : {{ listProfile.FirstName }} </label>
      </br>
      <label> Lastname: {{ listProfile.LastName }} </label>
    </div>
    <div>
      <label>Age:{{listProfile.Age}}</label>
    </div>
    <div>
      <img v-bind:src="imageLink" />
    </div>
  </div>
</template>
<style></style>
<script>
export default {
  data() {
    return {
      listProfile: {},
      imageLink: "",
    };
  },
  mounted() {
    this.axios.get(`https://sfbserver.herokuapp.com/profile/${this.$appName}`)
    .then(response => {
     this.listProfile = response.data[0] 
     this.imageLink = "https://sfbserver.herokuapp.com/images/" + response.data[0].Image;
     console.log(this.listProfile)
    })
  }
};
</script>
