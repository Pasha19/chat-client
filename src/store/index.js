import Vue from 'vue'
import Vuex from 'vuex'
import * as mutations from './mutations'
import * as actions from './actions'

Vue.use(Vuex)

const state = {
    token: localStorage.getItem('auth_token'),
    messages: []
}

const store = new Vuex.Store({
    state,
    mutations,
    actions,
    strict: process.env.NODE_ENV !== 'production'
})

if (module.hot) {
    module.hot.accept([
        './actions',
        './mutations'
    ], () => {
        store.hotUpdate({
            actions: require('./actions'),
            mutations: require('./mutations')
        })
    })
}

export default store
