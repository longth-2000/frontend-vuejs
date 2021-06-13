import Vue from 'vue'
import App from './vuejs/App.vue'
import { router } from './vuejs/routes/routes'
import VueAxios from 'vue-axios';
import store from './vuejs/store/index'
import axios from 'axios';
import VueMaterial from 'vue-material'
import Carousel3d from 'vue-carousel-3d';
import VueCookies from 'vue-cookies'
import VueSimpleAlert from "vue-simple-alert";
import VModal from 'vue-js-modal/dist/index.nocss.js'
import 'vue-js-modal/dist/styles.css'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'
Vue.use(VueSimpleAlert);
Vue.use(VModal)
Vue.use(VueMaterial)
Vue.use(VueAxios, axios);
Vue.use(Carousel3d);
Vue.use(VueCookies)
Vue.config.productionTip = false
new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app')