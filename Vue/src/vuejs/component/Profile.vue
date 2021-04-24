<template>
  <div>
    <div>
      <label> Fullname : </label>{{ listProfile.FirstName }} {{ listProfile.LastName }}
      </br>
    </div>
    <div>
      <label>Age:</label>{{listProfile.Age}}
    </div>
     <div>
      <label>Level:</label>{{listProfile.Level}}
    </div>
     <div>
      <label>Địa chỉ</label>
      <div>
          <label>Tỉnh:</label> {{listProfile.Province}}  
      </div>
      <div>
          <label>Huyện:</label> {{listProfile.District}}  
      </div>
    </div>
    <div>
      <img v-bind:src="imageLink" />
    </div>
  </div>
</template>
<style>
img{
  width: 200px;
  height: 200px;
}
</style>
<script>
export default {
  data() {
    return {
      listProfile: {},
      imageLink: "",
    };
  },
  mounted() {
     this.axios.get(`http://localhost:5000/profile/${this.$route.params.id}` )
    .then(response => {
     this.listProfile = response.data[0] 
     this.imageLink = `http://localhost:5000/images/upload/${this.$route.params.id}/` + response.data[0].Image;
     console.log( this.listProfile.Address.Province)
    }) 
    
  } 
  
};
</script>
