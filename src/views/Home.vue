<template>
    <div>
        <nav class="main-navbar">
            <HeaderNav/>
        </nav>

        <main class="home">
            <Login v-if="getModeFromVueX == 'login'"/>
            <Registration v-else/>
        </main>
    </div>

</template>

<script>
import { mapState } from 'vuex';

import HeaderNav from '@/components/HeaderNav.vue';
import Registration from '@/components/Registration.vue'
import Login from '@/components/Login.vue'


export default {
    name: 'Home',
    
    components: {
        HeaderNav,
        Registration,
        Login,
    },
    data(){
        return {

        }
    },
    computed: {
        ...mapState({
            getModeFromVueX: 'modeFromVueX',
        }),

    },
    methods: {
    }
}
</script>


<style scoped lang="scss">

</style>