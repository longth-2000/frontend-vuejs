<template>
  <div>
    <div class="row">
      <form action="" method="post" v-on:submit.prevent="createProfile" enctype="multipart/form-data">
      <input type="file" name="fileUpload" id="image" accept="image/jpeg, image/png"/>
        <div class="form-group">
          <label>Firstname</label>
          <input
            type="text"
            v-model="formdata.firstname"
            class="form-control"
            name="firstname"
            id="firstname"
          />
          <div class="profileAlert">{{showAlert("Firstname")}}</div>
        </div>
        <div class="form-group">
          <label>Lastname</label>
          <input
            type="text"
            v-model="formdata.lastname"
            name="lastname"
            class="form-control"
            id="lastname"
          />
           <div class="profileAlert">{{showAlert("Lastname")}}</div>
        </div>
        <div class="form-group">
          <label>Age</label>
          <input
            type="text"
            v-model="formdata.age"
            name="age"
            class="form-control"
            id="age"
          />
           <div class="profileAlert">{{showAlert("Age")}}</div>
        </div>
        <div class="form-group">
          <label>Level</label>
          </br>
          <template v-for="items of levelArray">
            <input
              class="form-check-input"
              type="radio"
              v-bind:value="items"
              name="level"
              v-model="formdata.level"
            />
            <label class="form-check-label">
              {{ items }}
            </label>
            </br>
          </template> 
        </div>
        <div class="form-group" id="button">
          <button class="btn btn-primary" type="submit">
            Create
          </button>
          <p style="color:red">{{message}}</p>
           <router-link to="/profile"
            >Go to my profile</router-link
          >
        </div>
      </form>
    </div>
  </div>
</template>
<style>
 .profileAlert{
   color: red;
}
</style>
<script>
export default {
  data() {
    return {
      formdata: {},
      message: "",
      levelArray: ["THCS", "THPT", "Đại học", "Thạc sĩ", "Tiến sĩ", "Giáo sư"],
       errors: [
        {
          message: "",
          key: ""
        }
      ],
    };
  },
  methods: {
    createProfile() {
      var formData = new FormData()
      var imageFile = document.querySelector('#image')
      formData.append("fileUpload", imageFile.files[0])
      formData.append("firstname",this.formdata.firstname)
      formData.append("lastname",this.formdata.lastname)
      formData.append("age",this.formdata.age)
      formData.append("level",this.formdata.level)
      this.axios
        .post("http://localhost:5000/profile/create-profile" , formData )
        .then(response => {
            /* this.message = response.data.message */
            console.log(response.data)
        });
    },
    showAlert(errorType){
      var object = {};
      this.errors.forEach((error) => {
        if (error.key == errorType) {
          object = error;
        }
      });
      return object.message;
    }
  }
};
</script>
