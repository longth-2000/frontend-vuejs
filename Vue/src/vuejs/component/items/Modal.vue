<template>
  <div>
    <!-- <button @click="showModal">oke</button> -->
    <modal :width="1300" :height="1300" name="example" class="example"
      ><Cropper
    /></modal>
  </div>
</template>

<script>
import Cropper from "../items/Cropper.vue";
export default {
  name: "ModalComponent",
  components: {
    Cropper
  },
  mounted() {},
  methods: {
    showModal() {
       this.$modal.show("example"); 
     
    }
  }
};
</script>
<style>

</style>
