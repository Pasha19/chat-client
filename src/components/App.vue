<template lang="pug">
    div
        b-navbar(type="dark" variant="info" toggleable="sm")
            b-navbar-toggle(target="nav-collapse")
            b-navbar-brand(:to="{ name: 'chat' }" exact) SSE Chat
            b-collapse#nav-collapse(is-nav)
                b-navbar-nav
                    b-nav-item(v-show="user !== null" :to="{ name: 'chat' }" exact) Chat
                    b-nav-item(:to="{ name: 'sign-in' }" exact) Sign In
            b-nav-text(v-if="user !== null") You: {{ user.name }}
        router-view.mt-5
</template>

<script>
import { mapState } from 'vuex'
import bNavBar from 'bootstrap-vue/src/components/navbar/navbar'
import bNavBarToggle from 'bootstrap-vue/src/components/navbar/navbar-toggle'
import bNavBarBrand from 'bootstrap-vue/src/components/navbar/navbar-brand'
import bCollapse from 'bootstrap-vue/src/components/collapse/collapse'
import bNavbarNav from 'bootstrap-vue/src/components/navbar/navbar-nav'
import bNavItem from 'bootstrap-vue/src/components/nav/nav-item'
import bNavText from 'bootstrap-vue/src/components/nav/nav-text'
import '../bootstrap.scss'

export default {
    components: {
        'b-navbar': bNavBar,
        'b-navbar-toggle': bNavBarToggle,
        'b-navbar-brand': bNavBarBrand,
        'b-collapse': bCollapse,
        'b-navbar-nav': bNavbarNav,
        'b-nav-item': bNavItem,
        'b-nav-text': bNavText
    },
    computed: mapState(['user'])
}
</script>

<style module>
    body {
        background-color: #f5f5f5;
    }
</style>
