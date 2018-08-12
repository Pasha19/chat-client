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

export default {
    computed: mapState(['user'])
}
</script>

<style module>
    body {
        background-color: #f5f5f5;
    }
</style>
