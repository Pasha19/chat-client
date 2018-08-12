import Vue from 'vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import store from './store'
import router from './router'
import App from './components/App.vue'

/* eslint-disable-next-line no-new */
new Vue({
    el: '#app',
    store,
    router,
    render: h => h(App)
})
