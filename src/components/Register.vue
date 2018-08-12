<template>
    <div>
        <form @submit.prevent="submit">
            <input
                v-model="name"
                type="text"
                placeholder="name"
            >
            <input
                type="submit"
                value="Register"
            >
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
        submit () {
            this.register(this.name).then(() => this.$router.push('/'))
        }
    }
}
</script>
