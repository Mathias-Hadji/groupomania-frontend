<template>
    <div>
        <nav class="main-navbar">
            <HeaderNav/>
        </nav>

        <main class="post">
            <PublicationCard
                v-bind:publicationId = getIdPublicationFromUrl()
            />
        </main>
    </div>
</template>




<script>
import { mapState } from 'vuex';

import HeaderNav from '@/components/HeaderNav.vue';
import PublicationCard from '../components/PublicationCard'

export default {

    name: 'Post',

    components: {
        HeaderNav,
        PublicationCard
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
        await this.$store.dispatch('getUserId', this.getUserTokenFromVueX);
        await this.$store.dispatch('getOneUser', { userId: this.getUserIdFromVueX, token: this.getUserTokenFromVueX });
    },

    methods:{
        getIdPublicationFromUrl(){
            const url = new URLSearchParams(window.location.search);
            return parseInt(url.get("id")); 
        },
    }
}
</script>


<style lang="scss" scoped>

</style>