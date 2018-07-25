import Vue from 'vue'
import App from './App.vue'

const div = document.createElement('div')
document.body.appendChild(div);

new Vue({
    el: div,
    render: h => h(App),
})
