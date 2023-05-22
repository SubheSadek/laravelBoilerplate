<template>
    <Master v-if="user"/>
    <SignIn v-else/>
</template>

<script>
import Master from '@/vue/views/main/Master.vue'
import SignIn from '@/vue/views/auth/SignIn.vue'
export default {
    name: 'App',
    components: {
        Master,
        SignIn
    },
    data() {
        return {
            user: window.authUser
        }
    }
}

</script>
