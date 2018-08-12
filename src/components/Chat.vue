<template lang="pug">
    b-container
        b-list-group.mb-4
            b-list-group-item(v-for="(message, i) in messages" :key="i").
                {{ message.user.uid === user.uid ? 'me' : message.user.name }}:
                {{ message.message }} ({{ message.time }})
        b-form(@submit.prevent="submit" :class="htmlClass.form")
            b-form-input.align-self-stretch(v-model="newMessage" type="text" placeholder="Message" required)
            b-button.ml-md-2.mt-2.mt-md-0(type="submit" variant="primary") Send
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
    data () {
        return {
            newMessage: '',
            htmlClass: {
                form: ['d-flex', 'flex-column', 'flex-md-row', 'justify-content-between']
            }
        }
    },
    computed: mapState(['messages', 'user']),
    created () {
        this.listen()
    },
    methods: {
        ...mapActions(['post', 'listen']),
        submit () {
            this.post(this.newMessage)
        }
    }
}
</script>

<style module>
    .full-width {
        width: 100%;
    }
</style>
