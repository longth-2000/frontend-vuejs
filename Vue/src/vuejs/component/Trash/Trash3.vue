/* <template>
  <div class="choose-criteria">
    <md-table>
      <md-table-row>
        <md-table-cell class="criteria-title">Tuổi</md-table-cell>
        <md-table-cell>
          <vue-range-slider
            v-model="age"
            :min="min"
            :max="max"
            :enable-cross="enableCross"
          ></vue-range-slider>
        </md-table-cell>
      </md-table-row>
      <md-table-row>
        <md-table-cell class="criteria-title">Giới tính</md-table-cell>
        <md-table-cell>
          <div>
            <md-radio v-model="radio" value="Nam">Nam</md-radio>
            <md-radio v-model="radio" value="Nữ">Nữ</md-radio>
          </div>
        </md-table-cell>
      </md-table-row>
      <md-table-row>
        <md-table-cell class="criteria-title">Trình độ học vấn</md-table-cell>
        <md-table-cell
          ><div class="level-user">
            <md-field>
              <label>Bằng cấp</label>
              <md-select>
                <md-option value="THCS">THCS</md-option>
                <md-option value="THPT">THPT</md-option>
                <md-option value="Đại học">Đại học</md-option>
                <md-option value="Thạc sĩ">Thạc sĩ</md-option>
                <md-option value="Tiến sĩ">Tiến sĩ</md-option>
              </md-select>
            </md-field>
          </div></md-table-cell
        >
      </md-table-row>
      <md-table-row class="profile-differ">
        <md-table-cell class="criteria-title">Khoảng cách</md-table-cell>
        <md-table-cell
          ><vue-range-slider
            v-model="address"
            :min="min"
            :max="max"
            :enable-cross="enableCross"
          ></vue-range-slider
        ></md-table-cell>
      </md-table-row>
    </md-table>
    <div class="criteria-button">
      <md-button class="md-raised md-primary">
        Gửi
      </md-button>
    </div>
  </div>
</template>
<script>
import "vue-range-component/dist/vue-range-slider.css";
import VueRangeSlider from "vue-range-component";
export default {
  name: "Criteria",
  data() {
    return {
      age: [0, 100],
      address: [0, 100],
      radio: "",
      level: ""
    };
  },
  created() {
    this.min = 0;
    this.max = 250;
    this.enableCross = false;
  },
  components: {
    VueRangeSlider
  },
  methods: {}
};
</script>
<style>
.choose-criteria {
}
.choose-criteria .md-table-cell {
  height: 100px;
}
.choose-criteria .criteria-title {
  width: 200px;
}
.choose-criteria .criteria-button {
    width:100px ;
    margin: 0px auto;
}
</style> */