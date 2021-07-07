<template>
  <div>
    <div>
      <h3>{{user.name}}</h3>
      <button @click="searchSuitablePerson(user)">oke</button>
       <div>
        <ul>
          <li v-for="(friend, index) in friends" :key="index">
            <span>{{friend.name}}</span>
            <span>{{friend.ratingIndex}}</span>
          </li>
        </ul>
      </div> 
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      user: {},
      allFriends: [],
      consideredFriends: [],
      friends: []
    };
  },
  created() {
    let first = `https://f77a9ab4defb.ngrok.io/api/facebook/me/${this.$route.params.id}`;
    let second = "https://f77a9ab4defb.ngrok.io/api/facebook/all";
    const firstRequest = this.axios.get(first);
    const secondRequest = this.axios.get(second);
    this.axios.all([firstRequest, secondRequest]).then(
      this.axios.spread((...response) => {
        console.log(response[0].data);
        this.user = response[0].data;
        this.allFriends = response[1].data;
      })
    );
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
      const suitableGender = 1;
      const suitableAge = 3;
      const suitableAddress = 5;
      root.age = this.calculateAge(root.birthday);
      var considering = [];
      var considered = [];
      var array = [];
      var node;
      considering.push(root);
      while (considering.length > 0) {
        node = considering[0];
        node.ratingIndex = 0;
        considering.shift();
        node.age = this.calculateAge(node.birthday);
        if (node.gender !== root.gender) node.ratingIndex += suitableGender;
        if (node.age >= root.age - 3 && node.age <= root.age + 3) node.ratingIndex += suitableAge;
        if (node.location == root.location) node.ratingIndex += suitableAddress;
        considered.push(node);
        this.allFriends.forEach(element => {
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
      this.friends = considered;
      console.log(this.friends)
    }
  }
};
</script>
