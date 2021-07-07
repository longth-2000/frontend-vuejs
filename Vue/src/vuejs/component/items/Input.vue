<template>
  <div class="input-form">
    <form action="" method="post" enctype="multipart/form-data">
      <md-table>
        <md-table-row>
          <md-table-cell class="profile-items-title">Họ và tên </md-table-cell>
          <md-table-cell
            ><div class="name-user">
              <md-field>
                <label>Nhập họ và tên</label>
                <md-input name="fullname" v-model="type"></md-input>
              </md-field>
              <span class="error">{{ showError("Fullname") }}</span>
            </div></md-table-cell
          >
        </md-table-row>
        <md-table-row id="age-row">
          <md-table-cell class="profile-items-title">Tuổi</md-table-cell>
          <md-table-cell
            ><div class="age-user">
              <div>
                <vue-numeric-input
                  v-model="value"
                  :min="18"
                  :max="60"
                  :step="1"
                ></vue-numeric-input>
              </div></div
          ></md-table-cell>
        </md-table-row>
        <md-table-row>
          <md-table-cell class="profile-items-title">Địa chỉ</md-table-cell>
          <md-table-cell>
            <div class="address-user">
              <div class="md-layout-item">
                <md-field>
                  <label for="province">Tỉnh</label>
                  <md-select
                    class="form-control"
                    id="province"
                    name="province"
                    v-model="province"
                    @md-selected="getDistrictInformation($event, 'province')"
                  >
                    <md-option
                      class="province-items"
                      v-for="provinces of listProvince"
                      v-bind:value="provinces.name"
                      v-bind:key="provinces.name"
                      >{{ provinces.name }}</md-option
                    >
                  </md-select>
                </md-field>
                <span class="error">{{ showError("Province") }}</span>
              </div>
              <div class="md-layout-item">
                <md-field id="district">
                  <label for="district">Quận/Huyện</label>
                  <md-select
                    v-model="district"
                    name="district"
                    @md-selected="getDistrictInformation($event, 'district')"
                  >
                    <md-option
                      v-for="districts of listDistrict"
                      v-bind:value="districts.name"
                      v-bind:key="districts.name"
                      >{{ districts.name }}</md-option
                    >
                  </md-select>
                </md-field>
                <span class="error">{{ showError("Districts") }}</span>
              </div>
            </div>
          </md-table-cell>
        </md-table-row>
        <md-table-row>
          <md-table-cell class="profile-items-title">Giới tính</md-table-cell>
          <md-table-cell
            ><div class="sex-user">
              <md-radio v-model="radio" value="Nam">Nam</md-radio>
              <md-radio v-model="radio" value="Nữ">Nữ</md-radio>
            </div>
            <span class="error">{{ showError("Sex") }}</span>
          </md-table-cell>
        </md-table-row>
        <md-table-row>
          <md-table-cell class="profile-items-title"
            >Trình độ học vấn</md-table-cell
          >
          <md-table-cell
            ><div class="level-user">
              <md-field>
                <label>Bằng cấp</label>
                <md-select name="level" v-model="level">
                  <md-option value="THCS">THCS</md-option>
                  <md-option value="THPT">THPT</md-option>
                  <md-option value="Đại học">Đại học</md-option>
                  <md-option value="Thạc sĩ">Thạc sĩ</md-option>
                  <md-option value="Tiến sĩ">Tiến sĩ</md-option>
                </md-select>
              </md-field>
              <span class="error">{{ showError("Level") }}</span>
            </div></md-table-cell
          >
        </md-table-row>
      </md-table>
    </form>
    <div class="input-button">
      <div>
        <md-dialog-alert
          :md-active.sync="active"
          md-content="Hồ sơ của bạn đã được cập nhật thành công"
          md-confirm-text="Đồng ý"
        />

        <md-button class="md-raised md-primary" @click="handleAction">{{
          getNameButton
        }}</md-button>
      </div>
    </div>
  </div>
</template>
<script>
import VueNumericInput from "vue-numeric-input";
import axiosConfig from "../config/axios/axiosConfig";
import { API } from "../config/axios/api";
export default {
  name: "Input",
  props: {
    data: Object,
    image: File,
    action: String,
    facebook:Object
  },
  components: {
    VueNumericInput
  },
  data() {
    return {
      errors: [
        {
          message: "",
          key: ""
        }
      ],
      state: "",
      province: "",
      districtItems: "",
      district: "",
      level: "",
      listProvince: [],
      listDistrict: [],
      message: "",
      type: "",
      listDistrict: [],
      idProvince: "",
      value: 18,
      radio: "",
      listProfile: {},
      nameButton: "",
      active: false
    };
  },
  created() {
    const api = API.ADDRESS.province();
    const { endpoint, method } = api;
    axiosConfig(endpoint, method).then(response => {
      this.listProvince = response.data.results;
    });
  },
  computed: {
    getNameButton() {
      this.nameButton =
        this.action == "create-profile" ? "Tạo hồ sơ" : "Cập nhật hồ sơ";
      return this.nameButton;
    }
  },
  watch: {
    data() {
      this.type = this.data.FullName;
      this.province = this.data.Province;
      this.district = this.data.District;
      this.radio = this.data.Sex;
      this.level = this.data.Level;
      this.value = this.data.Age;
    }
  },
  methods: {
    showError(errorType) {
      var object = {};
      this.errors.forEach(error => {
        if (error.key == errorType) {
          object = error;
        }
      });
      return object.message;
    },
    getDistrictInformation(event, state) {
      this.listProvince.forEach(items => {
        if (items.name == event) this.idProvince = items.code;
      });
      const api = API.ADDRESS.district(this.idProvince);
      const { endpoint, method } = api;
      axiosConfig(endpoint, method).then(response => {
        this.listDistrict = response.data.results;
        if (state == "district") {
          this.districtItems = event;
        }
      });
    },
    handleAction() {
      if (this.action == "create-profile") this.createProfile();
      else this.updateProfile();
    },
    updateProfile() {
      if (
        this.districtItems != "" &&
        !this.listDistrict.some(
          district => district.name === this.districtItems
        )
      ) {
        this.$alert(
          "Tỉnh và huyện không không khớp",
          "Cảnh báo",
          "error"
        ).then(() => console.log("Closed"));
      } else {
        const api = API.PROFILE.editProfile($cookies.get("token"));
        const { endpoint, method } = api;
        var formData = new FormData();
        formData.append("Age", this.value);
        formData.append("Province", this.province);
        formData.append("District", this.district);
        formData.append("Level", this.level);
        formData.append("Sex", this.radio);
        formData.append("FullName", this.type);
        axiosConfig(endpoint, method, formData).then(response => {
          this.$store.state.listProfile = {
            FullName: this.type,
            Sex: this.radio,
            Province: this.province,
            District: this.district,
            Level: this.level,
            Age: this.value
          };
          this.$store.state.nameUser = this.type;
        });
        this.active = true;
      } 
    },
    createProfile() {
      const api = API.PROFILE.createProfile();
      const { endpoint, method } = api;
      var formData = new FormData();
      formData.append("Age", this.value);
      formData.append("Province", this.province);
      formData.append("District", this.district);
      formData.append("Level", this.level);
      formData.append("Sex", this.radio);
      formData.append("FullName", this.type);
      formData.append("cookie", $cookies.get("token"));
      formData.append("fileUpload", this.image);
      axiosConfig(endpoint, method, formData).then(response => {
        console.log(response.data);
        if (response.data.state == true) {
          this.message = response.data.message;
          this.$fire({
            title: "Success",
            text: this.message,
            type: "success"
          }).then(r => {
            this.$router.push("/home");
          });
        } else {
          const errorProfile = response.data.details;
          errorProfile.forEach(element => {
            this.errors.push({
              message: element.message,
              key: element.context.key
            });
          });
        }
      }); 
    }
  },
  onConfirm() {
    this.value = "Agreed";
  },
  onCancel() {
    this.value = "Disagreed";
  }
};
</script>
<style>
.input-form {
  width: 100%;
  background: white;
}
.input-form .error {
  color: red;
  padding: 0px;
}
.input-form .md-table .md-table-row {
  height: 100px;
}
.input-form .profile-items-title {
  width: 200px;
  font-size: 15px;
}
.input-form .input-button {
}
.input-form .input-button div {
  width: 140px;
  margin: 0px auto;
}
</style>
