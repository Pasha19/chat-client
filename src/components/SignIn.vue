<template lang="pug">
    .text-center.mx-auto(:class="$style['sign-in']")
        h1.h3.mb-3.font-weight-normal Sign in
        b-form(@submit.prevent="submit")
            b-form-input.mb-3(v-model="name" type="text" placeholder="Name" required)
            b-button(type="submit" variant="primary" block=true) Sign in
</template>

<script>
import { mapActions } from 'vuex'
import bForm from 'bootstrap-vue/src/components/form/form'
import bFormInput from 'bootstrap-vue/src/components/form-input/form-input'
import bButton from 'bootstrap-vue/src/components/button/button'

export default {
    components: {
        'b-form': bForm,
        'b-form-input': bFormInput,
        'b-button': bButton
    },
    data () {
        return {
            name: ''
        }
    },
    methods: {
        ...mapActions(['register']),
        submit () {
            this.register(this.name).then(() => this.$router.push({ name: 'chat' }))
        }
    }
}
</script>

<style module>
    .sign-in {
        max-width: 330px;
    }
</style>
