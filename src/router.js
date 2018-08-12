import Vue from 'vue'
import VueRouter from 'vue-router'
import Chat from './components/Chat.vue'
import SignIn from './components/SignIn.vue'
import store from './store'

Vue.use(VueRouter)

const routes = [
    {
        path: '',
        name: 'chat',
        component: Chat,
        beforeEnter (to, from, next) {
            if (store.state.token === null) {
                next({ name: 'sign-in' })

                return
            }
            next()
        },
        beforeRouteLeave (to, from, next) {
            store.dispatch('close')
            next()
        }
    },
    {
        path: '/sign-in',
        name: 'sign-in',
        component: SignIn
    }
]

export default new VueRouter({
    routes
})
