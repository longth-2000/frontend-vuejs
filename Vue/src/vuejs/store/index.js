import Vuex from 'vuex'
import Vue from 'vue'
Vue.use(Vuex)
export default new Vuex.Store({
    state: {
        indexUser: "",
        listUser: [],
        listProfile: {},
        nameUser: "",
        active: true,
        user: "",
        myRoom: "",
        yourRoom: {},
        participants: []
    },
    getters: {

    },
    mutations: {
        changeUserindex(state, indexUser) {
            state.indexUser = indexUser
        },
        changeDisplayUserList(state, listUser) {
            state.listUser = listUser
        },
        changeListProfile(state, listProfile) {
            state.listProfile = listProfile
        },
        changeNameUser(state, nameUser) {
            state.nameUser = nameUser
        },
        changeActive(state, active) {
            state.active = active
        },
        changeUser(state, user) {
            state.user = user
        },
        changeMyRoom(state, myRoom) {
            state.myRoom = myRoom
        },
        changeYourRoom(state, yourRoom) {
            state.yourRoom = yourRoom
        },
        changeParticipants(state, participants) {
            state.participants = participants
        }
    },
})