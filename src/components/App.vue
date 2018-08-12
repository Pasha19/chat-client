<template>
    <div>
        <div>
            <div
                v-if="user !== null"
                class="current-user"
            >You: {{ user.name }}</div>
            <router-link
                v-if="$route.path !== '/' && user !== null"
                to="/"
            >Home</router-link>
            <router-link
                v-if="$route.path !== '/register'"
                to="/register"
            >Register</router-link>
        </div>
        <router-view />
    </div>
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
