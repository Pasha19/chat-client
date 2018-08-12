<template lang="pug">
    div
        div
            .current-user(v-if="user !== null") You: {{ user.name }}
            router-link(v-if="$route.path !== '/' && user !== null", to="/") Home
            router-link(v-if="$route.path !== '/register'", to="/register") Register
        router-view
</template>

<script>
import { mapState } from 'vuex'

export default {
    computed: mapState(['user'])
}
</script>

<style>
    .current-user {
        text-decoration: underline;
    }
</style>
