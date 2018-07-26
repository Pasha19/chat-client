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
            name: 'test'
        }
    },
    methods: {
        submit (event) {
            console.log(this.name)
        }
    }
}
</script>
