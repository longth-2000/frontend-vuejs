<template>
  <div>
    <router-link to="/profile/create-profile">Create my profile</router-link>
    <form></form>
    <div>
      <label>Tìm kiếm </label>
      <br />
      <div class="form-group">
        <label>Trình độ văn hóa</label>
        <select
          class="form-control"
          id="sel1"
          name="levelOption"
          v-model="formData.levelOption"
        >
          <option>THCS</option>
          <option>THPT</option>
          <option>Đại học</option>
          <option>Thạc sĩ</option>
        </select>
      </div>
      <div class="form-group">
        <label>Giới tính</label>
        <select
          class="form-control"
          id="sel1"
          name="sexOption"
          v-model="formData.sexOption"
        >
          <option>Nam</option>
          <option>Nữ</option>
        </select>
      </div>
      <div class="age">
        <label>Tuổi</label>
        <div id="age-form-control">
          <select
            class="form-control"
            id="sel1"
            name="ageOptionMin"
            v-model="formData.ageOptionMin"
          >
            <option>19</option>
            <option>20</option>
            <option>21</option>
            <option>22</option>
          </select>
          <select
            class="form-control"
            id="sel2"
            name="ageOptionMax"
            v-model="formData.ageOptionMax"
          >
            <option>19</option>
            <option>20</option>
            <option>21</option>
            <option>22</option>
          </select>
        </div>
      </div>
      <div>
        <label>Tỉnh</label>
        <select
          class="form-control"
          id="province"
          name="provinceOption"
          v-model="formData.provinceOption"
          @change="getDistrictInformation($event)"
        >
          <option
            class="province-items"
            v-for="provinces of listProvince"
            v-bind:value="provinces.Title"
          >
            {{ provinces.Title }}
          </option>
        </select>
      </div>
    </div>
    <div class="form-group">
      <button @click="search">search</button>
    </div>
    <div class="form-group" style="display:flex">
      <form action="" method="post" v-on:submit.prevent="advancedSearch" style="display:flex">
        <input
          type="text"
          placeholder="Tìm kiếm nâng cao"
          class="form-control"
          name="advancedSearch"
          v-model="formSearch.advancedSearch"
        />
        <button >search</button>
      </form>
    </div>
    <div class="information-user">
      <template v-for="user in listUser">
        <div>
          <label> Họ: </label>
          <span>{{ user.LastName }}</span>
          <br />
          <label> Tên: </label>
          <span>{{ user.FirstName }}</span>
          <br />
          <label> Tuổi: </label>
          <span>{{ user.Age }}</span>
          <br />
          <label> Giới tính : </label>
          <span>{{ user.Sex }}</span>
          <br />
          <label> Trình độ học vấn : </label>
          <span>{{ user.Level }}</span>
          <br />
          <img v-bind:src="image" />
          <br />
          <router-link v-bind:to="'/profile/' + user.Index">
            Xem thông tin chi tiết
          </router-link>
        </div>
      </template>
    </div>
  </div>
</template>
<style>
#age-form-control {
  display: flex;
}
img {
  width: 100px;
  height: 100px;
}
</style>
<script>
export default {
  data() {
    return {
      formData: {},
      formSearch:{},
      listUser: [],
      image: {},
      listProvince: [],
      listDistrict: []
    };
  },
  mounted() {
    this.axios.get("http://localhost:5000/address/province").then(response => {
      this.listProvince = response.data.LtsItem;
      console.log(this.listProvince);
    });
  },
  methods: {
    search() {
      this.axios
        .post("http://localhost:5000/search", this.formData)
        .then(response => {
          this.listUser = response.data;
          this.image = `http://localhost:5000/images/upload/${response.data[0].Index}/${response.data[0].Image}`;
          console.log(this.image);
          console.log(response.data);
        });
    },
    advancedSearch() {
      this.axios
          .post("http://localhost:5000/search/advanced", this.formSearch)
          .then(response => {
            console.log(response.data)
          })
    },
    getDistrictInformation(event) {
      this.listProvince.forEach(items => {
        if (items.Title == event.target.value) this.idProvince = items.ID;
      });
      this.axios
        .get(
          `http://localhost:5000/address/province/${this.idProvince}/district`
        )
        .then(response => {
          this.listDistrict = response.data;
        });
    }
  }
};
</script>
