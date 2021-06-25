<template>
    <main class="home">
        <Login v-if="mode == 'login'"/>
        <Registration v-else/>
    </main>
</template>
<script>


import Registration from '@/components/Registration.vue'
import Login from '@/components/Login.vue'


export default {
    name: 'Home',
    components: {
        Registration,
        Login,
    },
    data(){
        return {

        }
    },
    computed: {
        // Récupère la valeur de modeFromVueX dans le store de VueX
        mode(){
            return this.$store.state.modeFromVueX
        }
    },
    methods: {
    }
}
</script>


<style scoped lang="scss">

</style>