<template>
  <div class="ViewedProfile-function">
    <div class="app-header">
      <Header />
    </div>
    <div class="app-navbar">
     <ActionProfile :action="this.$route.params.action"/>
    </div>
  
  </div>
</template>
<script>
import ActionProfile from "./ActionProfile.vue"
import Header from "../items/Header.vue";
import Liked from "./Liked.vue";
export default {
  components: {
    Header,
    Liked,
    ActionProfile
  },
  data() {
    return {};
  },
  methods:{
    getParams(){
      console.log(this.$route.params.action)
    }
  }
 
};
</script>
<style>
.ViewedProfile-navbar {
  display: flex;
  justify-content: center;
  align-items: center;
}
.ViewedProfile-navbar .menu {
  width: 100%;
}
.ViewedProfile-navbar .menu .react-frame {
  width: 100%;
  height: 1000px;
}
.md-steppers-navigation {
  padding-left: 10%;
}
</style>
