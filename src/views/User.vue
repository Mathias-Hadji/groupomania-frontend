<template>
    <div>
        <nav class="main-navbar">
            <HeaderNav/>
        </nav>

        <div v-if="getUserIdFromVueX === 0">
            <Loading/>
        </div>

        <main v-else class="user">
            <SettingsUserCard/>
        </main>
    </div>
</template>

<script>
import { mapState } from 'vuex';

import HeaderNav from '@/components/HeaderNav.vue';
import SettingsUserCard from '@/components/SettingsUserCard.vue';
import Loading from '@/components/Loading.vue';

export default {
    name: 'User',

    components: {
        HeaderNav,
        SettingsUserCard,
        Loading,
    },

    data(){
        return{

        }
    },

    computed:{
        ...mapState({
            getUserIdFromVueX: 'userIdFromVueX',
            getUserTokenFromVueX: 'tokenUserFromVueX',
        }),
    },

    async created(){
        await this.$store.dispatch('getUserId', this.getUserTokenFromVueX)
        await this.$store.dispatch('getOneUser', { userId: this.getUserIdFromVueX, token: this.getUserTokenFromVueX })
    },
}
</script>

<style scoped>
    .user{
        display: flex;
        flex-direction: column;
        width: 100%;
        justify-content: center;
        align-items: center;
    }
</style>