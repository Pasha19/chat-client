<template>
    <div>
        <ul>
            <li
                v-for="(message, i) in messages"
                :key="i">{{ message.user.name }}: {{ message.message }} ({{ message.time }})</li>
        </ul>
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    computed: mapState(['messages']),
    created () {
        this.$store.dispatch('listen')
    }
}
</script>
