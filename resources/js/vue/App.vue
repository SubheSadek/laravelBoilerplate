<template>
    <!-- <Master v-if="$store.state.authUser"></Master> -->
    <SignIn/>
</template>

<script>
// import Master from '@/views/Main/Master.vue'
import SignIn from '@/vue/views/auth/SignIn.vue'
export default {
    name: 'App',
    components: {
        // Master,
        SignIn
    }
}

</script>
