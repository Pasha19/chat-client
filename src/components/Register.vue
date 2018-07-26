<template>
    <div>
        <form @submit="submit">
            <input
                v-model="name"
                type="text"
                placeholder="name">
            <input
                type="submit">
        </form>
    </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
    data () {
        return {
            name: ''
        }
    },
    methods: {
        ...mapActions(['register']),
        submit (event) {
            this.register(this.name)
        }
    }
}
</script>
