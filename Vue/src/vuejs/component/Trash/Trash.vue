<template>
  <div>
    <md-table>
      <md-table-row>
        <md-table-head md-numeric>ID</md-table-head>
        <md-table-head>Tiêu chí</md-table-head>
        <md-table-head>Điều kiện xét</md-table-head>
        <md-table-head>Điểm cộng</md-table-head>
      </md-table-row>

      <md-table-row>
        <md-table-cell md-numeric>1</md-table-cell>
        <md-table-cell>Giới tính</md-table-cell>
        <md-table-cell>Khác giới tính </md-table-cell>
        <md-table-cell>
          <input v-model="formData.sex" />
        </md-table-cell>
      </md-table-row>

      <md-table-row>
        <md-table-cell md-numeric>2</md-table-cell>
        <md-table-cell>Địa chỉ</md-table-cell>
        <md-table-cell>Cùng địa chỉ</md-table-cell>
        <md-table-cell><input v-model="formData.address"/></md-table-cell>
      </md-table-row>

      <md-table-row>
        <md-table-cell md-numeric>3</md-table-cell>
        <md-table-cell>Tuổi</md-table-cell>
        <md-table-cell>Cùng tuổi</md-table-cell>
        <md-table-cell><input v-model="formData.age"/></md-table-cell>
      </md-table-row>
      <md-table-row>
        <md-table-cell md-numeric>4</md-table-cell>
        <md-table-cell>Điểm ghép cặp</md-table-cell>
        <md-table-cell><input v-model="formData.point"/></md-table-cell>
      </md-table-row>
    </md-table>
    <div>
      <md-button class="md-raised" @click="displayPair()">Generate</md-button>
    </div>
    <div v-bind:class="{ active: isActive }">
      <md-table>
        <md-table-row>
          <md-table-head md-numeric>ID</md-table-head>
          <md-table-head>Người tìm cặp</md-table-head>
          <md-table-head>Người được ghép cặp</md-table-head>
          <md-table-head>Điểm ghép cặp</md-table-head>
        </md-table-row>
        <md-table-row v-for="(pair, index) in getMatchedPair" :key="index">
          <md-table-head md-numeric>{{ index + 1 }}</md-table-head>
          <md-table-head>{{ pair.host }}</md-table-head>
          <md-table-head>{{ pair.client }}</md-table-head>
          <md-table-head>{{ pair.point }}</md-table-head>
        </md-table-row>
      </md-table>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      formData: {},
      matchedpair: [],
      user: [],
      isActive: true
    };
  },
  created() {
    this.axios
      .get("https://4e705cc2e27f.ngrok.io/api/facebook/all")
      .then(res => {
        this.user = res.data;
        console.log(this.user);
      });
  },
  computed: {
    getMatchedPair() {
      this.matchedpair = this.matching();
      return this.matchedpair;
    }
  },
  methods: {
    calculateAge(birthday) {
      var date = birthday.split("/");
      var day = parseInt(date[0]);
      var month = parseInt(date[1]);
      var year = parseInt(date[2]);
      var today = new Date();
      var age = today.getFullYear() - year;
      if (
        month < today.getMonth() + 1 ||
        (month == today.getMonth() + 1 && day < today.getDate())
      ) {
        age--;
      }
      return age;
    },
    searchSuitablePerson(root) {
      const suitableGender = parseInt(this.formData.sex);
      const suitableAge = parseInt(this.formData.age);
      const suitableAddress = parseInt(this.formData.address);
      root.age = this.calculateAge(root.birthday);
      var considering = [];
      var considered = [];
      var array = [];
      var node;
      var acceptedPerson = [];
      considering.push(root);
      while (considering.length > 0) {
        node = considering[0];
        node.ratingIndex = 0;
        considering.shift();
        node.age = this.calculateAge(node.birthday);
        if (node.gender !== root.gender) node.ratingIndex += suitableGender;
        if (node.age >= root.age - 3 && node.age <= root.age + 3)
          node.ratingIndex += suitableAge;
        if (node.location == root.location) node.ratingIndex += suitableAddress;
        considered.push(node);
        this.user.forEach(element => {
          if (element.id == node.id) {
            array = element.friends;
          }
        });
        array.forEach(element => {
          if (
            !considering.some(items => items.name === element.name) &&
            !considered.some(items => items.name === element.name)
          ) {
            considering.push(element);
          }
        });
      }
      considered.shift();
      considered.forEach(element => {
        if (element.ratingIndex >= this.formData.point) {
          acceptedPerson.push({
            name: element.name,
            point: element.ratingIndex
          });
        }
      });
      return acceptedPerson;
    },
    matching() {
      var match = [];
      var array = [];
      this.user.forEach(element => {
        var pair = this.searchSuitablePerson(element);
        pair.forEach(items => {
          match.push({
            host: element.name,
            client: items.name,
            point: items.point
          });
        });
      });
      for (let i = 0; i < match.length; i++) {
        for (let j = i + 1; j < match.length; j++) {
          if (
            match[i].host == match[j].client &&
            match[i].client == match[j].host
          ) {
            array.push(match[j]);
          }
        }
      }
      return array;
    },
    displayPair() {
      this.isActive = false;
    }
  }
};
</script>
<style>
.active {
  display: none;
}
</style>
