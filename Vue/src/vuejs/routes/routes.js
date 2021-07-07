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
import Trash from "../component/Trash/Trash.vue"
import Friend from "../component/Facebook/Friend.vue"
import Authentication from "../component/Authentication.vue"
import Authorization from "../component/Authorization.vue"
import VueJwtDecode from "vue-jwt-decode";
Vue.use(VueRouter)
Vue.use(VueJwtDecode)
export const router = new VueRouter({
    routes: [
        { path: '/', component: Login },
        { path: '/register', component: Register },
        {
            path: '/home', component: Home, meta: {
                requiresAuth: true
            }
        },
        {
            path: '/home/:id', component: Home
        },
        {
            path: '/profile/create-profile', component: CreateProfile, meta: {
                requiresAuth: true
            }
        },
        {
            path: `/profile/:id`, component: Profile, meta: {
                requiresAuth: true
            }
        },
        {
            path: `/profile/edit/:id`, component: editProfile, meta: {
                requiresAuth: true
            }
        },
        {
            path: `/react/:action/:id`, component: LikeProfile, meta: {
                requiresAuth: true
            }
        },
        {
            path: '/trash',
            component: Trash,
            meta: {
                requiresAuth: true
            },
            beforeEnter: (to, from, next) => {
                var role = VueJwtDecode.decode($cookies.get('access-token')).role;
                if (to.matched.some(record => record.meta.requiresAuth)) {
                    let authenticated = $cookies.get('access-token')
                    if (role !== "admin") {
                        return next("/authorization");
                    }
                    next()
                }
                else next()
            }
        },
        {
            path: '/api/facebook/:id', component: Friend
        },
        {
            path: '/authentication', component: Authentication
        },
        {
            path: '/authorization', component: Authorization, meta: {
                requiresAuth: true
            },
        }
    ]
})
router.beforeEach((to, from, next) => {
    let authentication = $cookies.get('AUTHENTICATION-TOKEN')
    let authorization = $cookies.get('AUTHORIZATION-TOKEN')
    if (to.matched.some(record => record.meta.requiresAuth)) {
        console.log(authentication)
        console.log(authorization)
        if (!authentication) {
            return next("/authentication");
        }
        next()
    }
    else next()
})  