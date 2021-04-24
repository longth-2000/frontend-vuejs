<template>
  <div>
    <div class="row">
      <form action="" method="post" v-on:submit.prevent="createProfile" enctype="multipart/form-data">
      <input type="file" name="fileUpload" id="image" accept="image/jpeg, image/png"/>
        <div class="form-group">
          <label>Họ</label>
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
          <label>Tên</label>
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
          <label>Tuổi</label>
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
          <label>Giới tính</label>
          <input class="form-check-input" type="radio" value="Nam" name="sex" v-model="formdata.sex"/>
          <label class="form-check-label">Nam</label>
          <input class="form-check-input" type="radio" value="Nữ" name="sex" v-model="formdata.sex"/>
          <label class="form-check-label">Nữ</label>
        </div>
        <div>
          <label>Tỉnh</label>
          <select 
             class="form-control" 
             id="province" 
             name= "provinceOption"
             v-model="formdata.provinceOption"
             @change="getDistrictInformation($event)"
          >
            <option 
            class= "province-items"   
            v-for="provinces of listProvince" 
            v-bind:value="provinces.Title"
            >
            {{provinces.Title}}
            </option>
          </select>
          <label>Quận/Huyện</label>
          <select 
          class="form-control" 
          id="district"
          name="districtOption"
          v-model="formdata.districtOption"
          >
          <option 
          id= "ditrict-items" 
          v-for="districts of listDistrict"
          v-bind:value="districts.Title"
          >{{districts.Title}}
          </option>
          </select>
        </div>
        <br/>
    
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
           <router-link v-bind:to="'/profile/'+this.$store.state.indexUser"
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
      listProvince:[],
      listDistrict:[],
      idProvince:"",
      levelArray: ["THCS", "THPT", "Đại học", "Thạc sĩ", "Tiến sĩ", "Giáo sư"],
       errors: [
        {
          message: "",
          key: ""
        }
      ],
    };
  },
  mounted(){
    this.axios.get("http://localhost:5000/address/province").then(response => {
      this.listProvince = response.data.LtsItem 
        console.log(response.data.LtsItem)
    })
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
      formData.append("sex", this.formdata.sex)
      formData.append("provinceOption", this.formdata.provinceOption)
      formData.append("districtOption", this.formdata.districtOption)
      this.axios
        .post("http://localhost:5000/profile/create-profile" , formData )
        .then(response => {
            this.message = response.data.message 
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
    },
    getDistrictInformation(event){
     this.listProvince.forEach((items =>  {
            if(items.Title == event.target.value) this.idProvince = items.ID
       } ))   
     this.axios.get(`http://localhost:5000/address/province/${this.idProvince}/district`).then(response => {
          this.listDistrict = response.data
       })
      }
    },
  
 
};
</script>
