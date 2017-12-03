import Vue from 'vue'
import Vuex from 'vuex';
Vue.use(Vuex);
import { userSignIn } from "./api/user";
import storage from './lib/storage';


export default new Vuex.Store({
    state: {
        user: {},
        isSigIn: false
    },
    mutations: {
        ['USER_SIGN_IN'] (state, user) {
            state.isSigin = true;
            state.user = user;
        },
        ['USER_SIGN_OUT'] (state) {
            state.isSigin = false;
            state.user = {};
        }
    },
    actions: {
        async signIn ({ commit }, user) {
            let res = await userSignIn(user);
            if (res.ok) {
                commit('USER_SIGN_IN', res.data);
                (new storage).set('user', res.data);
            }
            return res;
        },
        signOut ({ commit }) {
            commit('USER_SIGN_OUT');
            (new storage).remove('user');
        }
    }
})