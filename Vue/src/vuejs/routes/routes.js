import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../component/Login.vue'
import Register from "../component/Register.vue"
import Home from "../component/Home.vue"
import CreateProfile from "../component/CreateProfile.vue"
import Profile from "../component/Profile.vue"
import Trash from "../component/Trash.vue"
import { BootstrapVue } from 'bootstrap-vue'
Vue.use(VueRouter)
Vue.use(BootstrapVue)
export const router = new VueRouter({
    routes: [
        {path: '/', component: Login},
        {path: '/register', component:Register },
        {path:'/home', component:Home},
        {path: '/profile/create-profile', component:CreateProfile},
       {path: `/profile`, component:Profile}, 
        {path: '/trash', component:Trash}
    ]
})