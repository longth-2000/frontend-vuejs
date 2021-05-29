<template>
  <div class="search-function">
    <div class="search-basic">
      <div class="search-basic-content search-sex">
        <label class="search-basic-title">Giới tính</label>
        <md-field>
          <label>Giới tính</label>
          <md-select
            class="form-control"
            name="sexOption"
            v-model="formData.sexOption"
          >
            <md-option value="No option">No option</md-option>
            <md-option value="Nam">Nam</md-option>
            <md-option value="Nữ">Nữ</md-option>
          </md-select>
        </md-field>
      </div>
      <div class="search-basic-content search-age">
        <label class="search-basic-title">Tuổi</label>
        <div class="age-range">
          <div>
            <md-field>
              <label>Min</label>
              <md-select
                name="ageOptionMin"
                v-model="formData.ageOptionMin"
                class="form-control"
              >
                <md-option value="No option">No option</md-option>
                <md-option
                  v-for="ages of createRangeAge"
                  :value="ages"
                  :key="ages"
                >
                  {{ ages }}
                </md-option>
              </md-select>
            </md-field>
          </div>
          <div>
            <md-field>
              <label>Max</label>
              <md-select
                name="ageOptionMax"
                v-model="formData.ageOptionMax"
                class="form-control"
              >
                <md-option value="No option">No option</md-option>
                <md-option
                  v-for="ages of createRangeAge"
                  :value="ages"
                  :key="ages"
                >
                  {{ ages }}
                </md-option>
              </md-select>
            </md-field>
          </div>
        </div>
      </div>
      <div class="search-basic-content search-level">
        <label class="search-basic-title">Trình độ</label>
        <md-field>
          <label>Học vấn</label>
          <md-select
            class="form-control"
            name="levelOption"
            v-model="formData.levelOption"
          >
            <md-option value="No option">No option</md-option>
            <md-option value="THCS">THCS</md-option>
            <md-option value="THPT">THPT</md-option>
            <md-option value="Đại học">Đại học</md-option>
            <md-option value="Thạc sĩ">Thạc sĩ</md-option>
            <md-option value="Tiến sĩ">Tiến sĩ</md-option>
          </md-select>
        </md-field>
      </div>
      <div class="search-basic-content search-address">
        <label class="search-basic-title">Địa chỉ</label>
        <md-field>
          <label>Tinh</label>
          <md-select
            class="form-control"
            name="provinceOption"
            v-model="formData.provinceOption"
          >
            <md-option value="No option">No option</md-option>
            <md-option
              v-for="provinces of listProvince"
              v-bind:value="provinces.Title"
              v-bind:key="provinces.Title"
            >
              {{ provinces.Title }}
            </md-option>
          </md-select>
        </md-field>
      </div>
      <div class="search-button">
        <md-button class="md-icon-button md-raised md-accent" @click="search">
          <md-icon>search</md-icon>
        </md-button>
      </div>
    </div>
    <div class="search-advanced">
      <form
        action=""
        method="post"
        v-on:submit.prevent="advancedSearch"
        style="display:flex"
      >
        <input
          type="text"
          placeholder="Tìm kiếm nâng cao"
          name="advancedSearch"
          v-model="formSearch.advancedSearch"
          class="advanceSearch-input"
        />
        <button type="submit" class="advanceSearch-button">
          <i class="fa fa-search"></i>
        </button>
      </form>
    </div>
  </div>
</template>
<style>
.search-function {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  background: #bbd5b0;
}
.search-basic {
  display: flex;
}
.search-basic-content {
  margin-left: 30px;
  margin-top: 10px;
}
.search-sex {
  flex: 1;
}
.search-age {
  flex: 1;
}
.search-age .age-range {
  display: flex;
}
.search-level {
  flex: 1;
}
.search-address {
  flex: 1;
}
.search-button {
  flex: 6;
  padding-top: 30px;
  margin-left: 2%;
}

.search-basic-title {
  font-weight: bold;
}
.search-advanced {
  margin: 0 auto;
  margin-bottom: 10px;
  width: 90%;
  height: 80px;

  display: flex;
  justify-content: center;
  align-items: center;
}
.search-advanced form {
  background: cornflowerblue;
  width: 1000px;
}
.advanceSearch-input {
  padding: 15px;
  font-size: 17px;
  border: none;
  float: left;
  width: 100%;
  background: white;
  outline: none;
}
.advanceSearch-button {
  float: left;
  width: 20%;
  padding: 15px;
  background: #ddd;
  font-size: 17px;
  border: none;
  cursor: pointer;
}
</style>
<script>
import axiosConfig from "../component/config/axios/axiosConfig";
import { API } from "./config/axios/api";
export default {
  name: "Search",
  data() {
    return {
      formData: {},
      formSearch: {},
      listProvince: [],
      listDistrict: [],
      rangeAge: []
    };
  },
  computed: {
    createRangeAge() {
      var rangeAge = [];
      for (let i = 18; i < 60; i++) {
        rangeAge.push(i);
      }
      return rangeAge;
    }
  },
  mounted() {
    const api = API.ADDRESS.province();
    const { endpoint, method } = api;
    axiosConfig(endpoint, method).then(response => {
      this.listProvince = response.data.LtsItem;
      console.log(this.listProvince);
    });
  },
  methods: {
    search() {
      this.formData.index = $cookies.get("token");
      const api = API.SEARCH.basicSearch();
      const { endpoint, method } = api;
      axiosConfig(endpoint, method, this.formData).then(response => {
        this.$store.commit("changeDisplayUserList", response.data);
        console.log(response.data);
      });
    },
    advancedSearch() {
      const api = API.SEARCH.advanceSearch();
      const { endpoint, method } = api;
      this.formSearch.index = $cookies.get("token");
      axiosConfig(endpoint, method, this.formSearch).then(response => {
        this.$store.commit("changeDisplayUserList", response.data);
        console.log(response.data);
      });
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
