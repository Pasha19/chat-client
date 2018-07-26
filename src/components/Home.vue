<template>
    <div>
        <ul>
            <li
                v-for="(message, i) in messages"
                :key="i">{{ message.user.name }}: {{ message.message }} ({{ message.time }})</li>
        </ul>
        <form @submit="submit">
            <input
                v-model="newMessage"
                type="text"
                placeholder="Message">
            <input type="submit">
        </form>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
    data () {
        return {
            newMessage: ''
        }
    },
    computed: mapState(['messages']),
    created () {
        this.$store.dispatch('listen')
    },
    methods: {
        ...mapActions(['post']),
        submit () {
            this.post(this.newMessage)
        }
    }
}
</script>
