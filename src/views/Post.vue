<template>
    <div>
        <nav class="main-navbar">
            <HeaderNav/>
        </nav>

        <div v-if="getUserIdFromVueX === 0">
            <Loading/>
        </div>

        <main v-else class="post">
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
import Loading from '@/components/Loading.vue';

export default {

    name: 'Post',

    components: {
        HeaderNav,
        PublicationCard,
        Loading,
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