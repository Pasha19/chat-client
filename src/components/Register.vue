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
export default {
    data () {
        return {
            name: ''
        }
    },
    methods: {
        submit (event) {
            this.$store.dispatch('register', this.name)
        }
    }
}
</script>
