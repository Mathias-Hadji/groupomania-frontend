<template>
    <main class="news">
        <nav class="main-navbar">
            <HeaderNav/>
        </nav>

        <PublicationCreate/>

        <PublicationCard
            v-for="publication in getListOfPublications"
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
            getListOfPublications: 'listOfPublicationsFromVueX',

        }),
    },

    created(){
        this.$store.dispatch('getUserId', this.getUserTokenFromVueX)
        this.getAllPublications()
    },

    watch: {
        getUserIdFromVueX: function(){
            this.$store.dispatch('getOneUser', { userId: this.getUserIdFromVueX, token: this.getUserTokenFromVueX })
        }
    },

    methods: {  
        getAllPublications(){
            this.$store.dispatch('getAllPublications', { token: this.getUserTokenFromVueX })
        },
    },
}
</script>

<style scoped lang="scss">


</style>