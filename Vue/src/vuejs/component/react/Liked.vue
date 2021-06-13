<template>
  <div class="Liked-content">
    <div class="Liked-user">
      <div
        class="Liked-user-items"
        v-for="users in listViewed"
        :key="users.Index"
      >
        <div class="image">
          <img
            :src="getURL + '/images/upload/' + users.Index + '/' + users.Image"
          />
        </div>
        <div class="information">
          <div class="name title ">
            <md-icon class="fa fa-user"></md-icon>
            <span>{{ users.FullName }}</span>
          </div>
          <div class="information-additional">
            <div class="sex title">
              <md-icon class="fa fa-mars" style="color:green"></md-icon>
              <span>{{ users.Sex }}</span>
            </div>
            <div class="level title">
              <md-icon class="fa fa-book" style="color:blue"></md-icon>
              <span>{{ users.Level }}</span>
            </div>
            <div class="address title">
              <md-icon class="fa fa-map" style="color:brown"></md-icon>
              <span>{{ users.Province }}</span>
            </div>
          </div>
          <div style="margin-top:5%">
            <router-link :to="'/profile/' + users.Index" style="color:red"
              >Xem thông tin chi tiết</router-link
            >
          </div>
        </div>
        <div class="icon">
          <div class="heart-comment">
            <div>
              <md-dialog-confirm
                :md-active.sync="active"
                md-title="Cảnh báo"
                md-content="Bạn muốn xóa profile này khỏi danh sách yêu thích "
                md-confirm-text="Oke"
                md-cancel-text="Cancel"
                @md-cancel="onCancel"
                @md-confirm="onConfirm(data)"
              />

              <div @click="setActive(users.Index)">
                <md-icon
                  class=" fa fa-heart md-size-3x"
                  style=" color: green "
                ></md-icon>
                <md-tooltip md-direction="bottom">Bỏ thích</md-tooltip>
              </div>
            </div>
            <div>
              <md-icon
                class=" fa fa-comment md-size-3x"
                style="color:#484799"
              ></md-icon>
              <md-tooltip md-direction="bottom">Nhắn tin</md-tooltip>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axiosConfig from "../config/axios/axiosConfig";
import { API } from "../config/axios/api";
import { URL } from "../config/axios/constant";
export default {
  name: "Liked",
  props: {
    linkApi: String
  },
  data() {
    return {
      listViewed: [],
      listIndex: [],
      conditionCheck: "",
      active: false,
      data: "",
      URL: ""
    };
  },
  mounted() {
    switch (this.linkApi) {
      case "liked": {
        this.conditionalCheck = "IndexHost";
        break;
      }
      case "isliked": {
        this.conditionalCheck = "IndexClient";
        break;
      }
    }
    const api = API.REACT.getLikeByID(this.linkApi, $cookies.get("token"));
    const { endpoint, method } = api;
    axiosConfig(endpoint, method)
      .then(response => {
        var Indexes = response.data.map(Element => {
          return Element[this.conditionalCheck];
        });
        return Indexes;
      })
      .then(data => {
        const api = API.PROFILE.getProfileByArray();
        const { endpoint, method } = api;
        axiosConfig(endpoint, method).then(response => {
          var profiles = response.data.filter(Element =>
            data.includes(Element.Index)
          );
          this.listViewed = profiles;
        });
      });
  },
  methods: {
    setActive(data) {
      this.active = true;
      this.data = data;
    },
    onConfirm(id) {
      const api = API.REACT.delete();
      axiosConfig(api.endpoint, api.method, {
        ID: id
      }).then(response => {
        this.listViewed.forEach((Element, index) => {
          if (Element.Index == id) {
            this.listViewed.splice(index, 1);
          }
        });
      });
    },
    onCancel() {}
  },
  computed: {
    getURL() {
      this.URL = URL;
      return this.URL;
    }
  }
};
</script>
<style>
.Liked-content {
  width: 100%;
  height: 1200px;
  display: flex;
  justify-content: center;
  margin-top: 2%;
}
.Liked-user {
  width: 80%;
  height: auto;
  background: white;
}
.Liked-user-items {
  width: 100%;
  height: 170px;
  margin-top: 2%;
  display: flex;
  background: #bbd5b0;
  border: 1px solid #a0a0a0;
  border-radius: 10px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
.Liked-user .image {
  flex: 2;
}
.Liked-user .image img {
  width: 140px;
  height: 140px;
  margin-left: 30%;
  margin-top: 8%;
  border-radius: 70px;
}
.Liked-user .information {
  flex: 4;
  margin-left: 5%;
}
.Liked-user .information div {
  margin-top: 3%;
}
.Liked-user .information .title {
  font-size: 18px;
  line-height: 28px;
  white-space: nowrap;
}
.Liked-user .information .information-additional {
  display: flex;
  margin-left: -30px;
}
.Liked-user .information .information-additional div {
  margin-left: 30px;
}
.Liked-user .information .title span {
  margin-left: 2%;
}
.Liked-user .icon {
  flex: 4;
  display: flex;
  align-items: center;
  justify-content: center;
}
.Liked-user .icon .heart-comment {
  display: flex;
}
.Liked-user .icon .heart-comment div {
  margin-left: 80px;
}
.md-dialog-actions .md-button.md-theme-default {
  background: #aaa;
  font-size: 14;
  font-weight: 500;
  color: white;
}
.md-dialog-actions .md-button.md-primary.md-theme-default {
  background: #448aff;
}
.md-dialog-title {
  color: #595959;
  font-size: 1.875em;
  font-weight: 600;
  text-align: center;
  text-transform: none;
  word-wrap: break-word;
  font-family: Dosis, sans-serif;
}
.md-dialog-content {
  color: #545454;
  font-size: 18px;
  font-weight: 400;
  line-height: normal;
  text-align: center;
  word-wrap: break-word;
}
</style>
