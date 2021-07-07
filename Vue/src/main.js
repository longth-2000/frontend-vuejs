import Vue from 'vue'
import App from './vuejs/App.vue'
import { router } from './vuejs/routes/routes'
import VueAxios from 'vue-axios'
import store from './vuejs/store/index'
import axios from 'axios'
import VueMaterial from 'vue-material'
import Carousel3d from 'vue-carousel-3d'
import VueCookies from 'vue-cookies'
import VueSimpleAlert from "vue-simple-alert"
import VModal from 'vue-js-modal/dist/index.nocss.js'
import 'vue-js-modal/dist/styles.css'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'
Vue.use(VueSimpleAlert)
Vue.use(VModal)
Vue.use(VueMaterial)
Vue.use(VueAxios, axios)
Vue.use(Carousel3d)
Vue.use(VueCookies)
Vue.config.productionTip = false
new Vue({
    router,
    store,
    mounted() {
        axios.interceptors.request.use((request) => {
            return request
        }, (error) => { Promise.reject(error) })
        axios.interceptors.response.use((response) => {
            if (response.data == "Expired Token") {
                this.axios.post("http://localhost:5000/refresh-token", {
                    refreshToken: $cookies.get("refresh-token")
                }, {
                    headers: {
                        authorization: $cookies.get("access-token")
                    }
                }).then(res => {
                    this.$cookies.set("access-token", res.data)
                    const config = response.config// return config of current request
                    config.headers['authorization'] = res.data // attach headers to new request
                    return axios(config)// send new request after having new access token 
                }).then(res => this.$store.commit("changeDisplayUserList", res.data))
            }
            return response
        }, (error) => { Promise.reject(error) })
    },
    render: h => h(App),
}).$mount('#app')