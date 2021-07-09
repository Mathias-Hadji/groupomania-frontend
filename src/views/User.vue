<template>
    <div>
        <nav class="main-navbar">
            <HeaderNav/>
        </nav>
        <main class="user">
            <SettingsUserCard/>
        </main>
    </div>
</template>

<script>
import { mapState } from 'vuex';

import HeaderNav from '@/components/HeaderNav.vue';
import SettingsUserCard from '@/components/SettingsUserCard.vue';

export default {
    name: 'User',

    components: {
        HeaderNav,
        SettingsUserCard,
    },

    data(){
        return{

        }
    },
    computed:{

        ...mapState({
            getUserTokenFromVueX: 'tokenUserFromVueX',
            getUserIdFromVueX: 'userIdFromVueX',
            getUserDataFromVueX: 'userDataFromVueX',
        }),
        

    },

    created(){
        this.$store.dispatch('getUserId', this.getUserTokenFromVueX)
    },
    
    watch: {
        getUserIdFromVueX: function(){
            this.$store.dispatch('getOneUser', { userId: this.getUserIdFromVueX, token: this.getUserTokenFromVueX })
        }
    },


    methods:{

    }
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