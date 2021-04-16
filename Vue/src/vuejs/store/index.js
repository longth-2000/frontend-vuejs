import Vuex from 'vuex'
import Vue from 'vue'
Vue.use(Vuex)
export default new Vuex.Store({
    state:{
        indexUser : "",
        emailUser:""

    },
    getters:{

    },
    mutations:{
         changeUserindex(state, indexUser){
             state.indexUser = indexUser
         },
         changeEmailUser(state, emailUser){
             state.emailUser = emailUser
         }
    }, 
})