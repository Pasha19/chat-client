import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './components/App.vue'
import Home from './components/Home.vue'
import Bar from './components/Bar.vue'
import Foo from './components/Foo.vue'

Vue.use(VueRouter)

const routes = [
    { path: '', component: Home },
    { path: '/foo', component: Foo },
    { path: '/bar', component: Bar }
]
const router = new VueRouter({
    routes,
    mode: 'history'
})

const div = document.createElement('div')
document.body.appendChild(div)

/* eslint-disable-next-line no-new */
new Vue({
    el: div,
    router,
    render: h => h(App)
})
