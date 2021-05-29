import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../component/Login.vue'
import Register from "../component/Register.vue"
import Home from "../component/Home.vue"
import CreateProfile from "../component/CreateProfile.vue"
import Profile from "../component/Profile.vue"
import LikeProfile from "../component/react/LikeProfile.vue"
import editProfile from "../component/Entity/Profile/editProfile.vue"
import ChatContainer from "../component/Chat/ChatContainer.vue"
import Trash from "../component/trash/Trash.vue"
import Trash1 from "../component/trash/Trash1.vue"

import { BootstrapVue } from 'bootstrap-vue'
Vue.use(VueRouter)
Vue.use(BootstrapVue)
export const router = new VueRouter({
    routes: [
        { path: '/', component: Login },
        { path: '/register', component: Register },
        { path: '/home', component: Home },
        { path: '/profile/create-profile', component: CreateProfile },
        { path: `/profile/:id`, component: Profile },
        { path: `/profile/edit/:id`, component: editProfile },
        { path: `/react/:action/:id`, component: LikeProfile },
        { path: '/chat', component: ChatContainer},
        { path: '/trash', component: Trash },
        { path: '/trash1', component: Trash1 }

    ]
})