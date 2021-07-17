<template>
    <main class="news">
        <nav class="main-navbar">
            <HeaderNav/>
        </nav>
        <PublicationCreate/>

        <PublicationCard
            v-for="publication in getListOfPublicationsFromVueX"
            v-bind:key="publication.id"
            v-bind:publicationId="publication.id"
        />
    </main>
</template>



<script>
import { mapState } from 'vuex';

import HeaderNav from '@/components/HeaderNav.vue';
import PublicationCreate from '@/components/PublicationCreate.vue';
import PublicationCard from '@/components/PublicationCard.vue';

export default {
    name: 'News',
    components: {
        HeaderNav,
        PublicationCreate,
        PublicationCard,
    },
    data(){
        return {

        }
    },
    computed:{
        ...mapState({
            getUserIdFromVueX: 'userIdFromVueX',
            getUserTokenFromVueX: 'tokenUserFromVueX',
            getListOfPublicationsFromVueX: 'listOfPublicationsFromVueX',
        }),
    },

    async created(){
        await this.$store.dispatch('getUserId', this.getUserTokenFromVueX);
        await this.$store.dispatch('getOneUser', { userId: this.getUserIdFromVueX, token: this.getUserTokenFromVueX });
        await this.$store.dispatch('getAllPublications', { token: this.getUserTokenFromVueX });  
    },

    methods: {  

    },
}
</script>

<style scoped lang="scss">
</style>