import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from './components/Home.vue'
import Register from './components/Register.vue'
import store from './store'

Vue.use(VueRouter)

const routes = [
    {
        path: '',
        component: Home,
        beforeEnter: (to, from, next) => {
            if (store.state.token === null) {
                next('/register')
            }
        }
    },
    { path: '/register', component: Register }
]

export default new VueRouter({
    routes
    // mode: 'history'
})
