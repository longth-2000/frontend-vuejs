<template>
  <div class="avatar-cropper">
    <input
      ref="input"
      type="file"
      name="image"
      accept="image/*"
      @change="setImage"
    />
    <div class="avatar-cropper-content">
      <div class="display">
        <div class="cropper">
          <section class="cropper-area">
            <div class="img-cropper">
              <vue-cropper
                ref="cropper"
                :aspect-ratio="16 / 9"
                :src="imgSrc"
                preview=".preview"
              />
            </div>
          </section>
        </div>
        <div class="previewed">
          <section class="preview-area">
            <div class="preview" />
          </section>
        </div>
      </div>
      <div class="control">
        <div class="actions">
          <a href="#" role="button" @click.prevent="zoom(0.2)">
            Zoom In
          </a>
          <a href="#" role="button" @click.prevent="zoom(-0.2)">
            Zoom Out
          </a>
          <a href="#" role="button" @click.prevent="move(-10, 0)">
            Move Left
          </a>
          <a href="#" role="button" @click.prevent="move(10, 0)">
            Move Right
          </a>
          <a href="#" role="button" @click.prevent="move(0, -10)">
            Move Up
          </a>
          <a href="#" role="button" @click.prevent="move(0, 10)">
            Move Down
          </a>
          <a ref="flipX" href="#" role="button" @click.prevent="flipX">
            Flip X
          </a>
          <a ref="flipY" href="#" role="button" @click.prevent="flipY">
            Flip Y
          </a>
          <a href="#" role="button" @click.prevent="rotate(90)">
            Rotate +90
          </a>
          <a href="#" role="button" @click.prevent="rotate(-90)">
            Rotate -90
          </a>
          <a href="#" role="button" @click.prevent="reset">
            Reset
          </a>
          <a href="#" role="button" @click.prevent="cropImage">
            Crop
          </a>
          <a href="#" role="button" @click.prevent="senData" id="update-image">
            Update
          </a>

          <a
            href="#"
            role="button"
            id="upload-image"
            @click.prevent="showFileChooser"
          >
            Upload
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VueCropper from "vue-cropperjs";
import "cropperjs/dist/cropper.css";
import axiosConfig from "../config/axios/axiosConfig";
import { API } from "../config/axios/api";
import { URL } from "../config/axios/constant";
export default {
  name: "Cropper",
  components: {
    VueCropper
  },
  props: {
    modal: Object,
  },
  data() {
    return {
      imgSrc: "https://st.quantrimang.com/photos/image/2017/04/08/anh-dai-dien-FB-200.jpg",
      cropImg: "",
      data: null,
      imageLink: {},
    };
  },
  
  methods: {
    dataURLtoFile(dataurl, filename) {
      var arr = dataurl.split(","),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new File([u8arr], filename, { type: mime });
    },
    senData() {
      this.cropImg = this.dataURLtoFile(
        this.$refs.cropper.getCroppedCanvas().toDataURL(),
        this.imageLink.name
      );
      var formData = new FormData();
      formData.append("cookie", $cookies.get("token"));
      formData.append("fileUpload", this.cropImg);
      const api = API.PROFILE.changeAvatar($cookies.get("token"));
      axiosConfig(api.endpoint, api.method, formData).then(res => {
        var image = `${URL}/images/upload/${$cookies.get("token")}/${res.data}`;
        this.$confirm("Cập nhật lại ảnh đại diện").then(() => {
          this.$store.commit("changeImage", image);
          this.modal.hide("example");
        });
      });
    },
    cropImage() {
      // get image data for post processing, e.g. upload or setting image src
      this.cropImg = this.$refs.cropper.getCroppedCanvas().toDataURL();
    },
    flipX() {
      const dom = this.$refs.flipX;
      let scale = dom.getAttribute("data-scale");
      scale = scale ? -scale : -1;
      this.$refs.cropper.scaleX(scale);
      dom.setAttribute("data-scale", scale);
    },
    flipY() {
      const dom = this.$refs.flipY;
      let scale = dom.getAttribute("data-scale");
      scale = scale ? -scale : -1;
      this.$refs.cropper.scaleY(scale);
      dom.setAttribute("data-scale", scale);
    },
    getCropBoxData() {
      this.data = JSON.stringify(this.$refs.cropper.getCropBoxData(), null, 4);
    },

    move(offsetX, offsetY) {
      this.$refs.cropper.move(offsetX, offsetY);
    },
    reset() {
      this.$refs.cropper.reset();
    },
    rotate(deg) {
      this.$refs.cropper.rotate(deg);
    },

    setCropBoxData() {
      if (!this.data) return;
      this.$refs.cropper.setCropBoxData(JSON.parse(this.data));
    },
    setImage(e) {
      const file = e.target.files[0];
      this.imageLink = file;
      if (file.type.indexOf("image/") === -1) {
        alert("Please select an image file");
        return;
      }
      if (typeof FileReader === "function") {
        const reader = new FileReader();
        reader.onload = event => {
          this.imgSrc = event.target.result;
          // rebuild cropperjs with the updated source
          this.$refs.cropper.replace(event.target.result);
        };
        reader.readAsDataURL(file);
      } else {
        alert("Sorry, FileReader API not supported");
      }
    },
    showFileChooser() {
      this.$refs.input.click();
    },
    zoom(percent) {
      this.$refs.cropper.relativeZoom(percent);
    }
  }
};
</script>

<style>
input[type="file"] {
  display: none;
}
.avatar-cropper {
  position: relative;
}
.avatar-cropper .avatar-cropper-content {
}
.avatar-cropper .display {
  flex: 7;
  display: flex;
  height: auto;
  
}
.avatar-cropper .display .cropper{
  height: auto;
}
.avatar-cropper .control {
  flex: 3;
}
.avatar-cropper .actions {
  margin-top: 1rem;
}
.avatar-cropper .actions a {
  display: inline-block;
  padding: 5px 15px;
  background: #0062cc;
  color: white !important;
  text-decoration: none;
  border-radius: 3px;
  margin-left: 1.5rem;
  margin-bottom: 1rem;
  width: 110px;
  text-align: center;
}
.avatar-cropper .actions #update-image {
  background: brown;
}
.avatar-cropper .actions #upload-image {
  background: darkgreen;
}
.avatar-cropper .actions #upload-image {
}
.avatar-cropper .previewed {
}
.avatar-cropper .cropper-area {
  width: 614px;
}
.avatar-cropper .cropper-area .img-cropper img {
  text-indent: -10000px;
}
.avatar-cropper .preview-area {
  width: 307px;
}
.avatar-cropper .preview {
  width: 100%;
  height: calc(372px * (9 / 16));
  overflow: hidden;
  margin-left: 35px;
  margin-top: 20px;
}
</style>
