import Vue from 'vue'
import Vuex from 'vuex'
import * as mutations from './mutations'
import actions from './actions'
import Api from '../api'

Vue.use(Vuex)

const token = localStorage.getItem('auth_token')
const state = {
    token,
    messages: []
}
const api = new Api(process.env.API)
api.setAuth(token)

const store = new Vuex.Store({
    state,
    mutations,
    actions: actions(api),
    strict: process.env.NODE_ENV !== 'production'
})

if (module.hot) {
    module.hot.accept([
        './actions',
        './mutations'
    ], () => {
        store.hotUpdate({
            actions: require('./actions')(api),
            mutations: require('./mutations')
        })
    })
}

export default store
