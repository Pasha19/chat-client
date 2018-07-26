import Vue from 'vue'
import store from './store'
import router from './router'
import App from './components/App.vue'

const div = document.createElement('div')
document.body.appendChild(div)

/* eslint-disable-next-line no-new */
new Vue({
    el: div,
    store,
    router,
    render: h => h(App)
})
