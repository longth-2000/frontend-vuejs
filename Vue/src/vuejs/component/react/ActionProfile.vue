<template>
  <div class="menu">
    <md-steppers>
      <md-step id="first" :md-label="setTitle[0].title">
        <div class="liked react-frame">
          <Liked :linkApi="setTitle[0].action" />
        </div>
      </md-step>
      <md-step id="second" :md-label="setTitle[1].title">
        <div class="isLiked react-frame">
          <Liked :linkApi="setTitle[1].action" />
        </div>
      </md-step>
      <md-step id="third" md-label="Error">
        <div class="viewed react-frame"></div>
      </md-step>
    </md-steppers>
  </div>
</template>
<script>
import Liked from "./Liked.vue";
export default {
  name: "ActionProfile",
  data() {
    return {
      request: [
        {
          title: "",
          action: ""
        }
      ]
    };
  },
  components: {
    Liked
  },
  props: {
    action: String
  },
  methods: {},
  computed: {
    setTitle() {
      switch (this.action) {
        case "liked":
          this.request = [
            { title: "Hồ sơ đã thích", action: "liked" },
            { title: "Đã thích hồ sơ của tôi", action: "isliked" }
          ];
          break;
        case "isliked":
          this.request = [
            { title: "Đã thích hồ sơ của tôi", action: "isliked" },
            { title: "Hồ sơ đã thích", action: "liked" }
          ];
          break;
        case "isviewed":
          
      }
      return this.request;
    }
  }
};
</script>
<style></style>
