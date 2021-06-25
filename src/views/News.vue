<template>
    <main class="news">

        <FormPublication
            v-on:updateListOfPublications="getAllPublications()"
        />

        <PublicationCard
            v-for="publication in getPublicationsFromVueX"
            v-bind:key="publication.id"
            v-bind:publicationId="publication.id"
            v-on:updateListOfPublications="getAllPublications()"
        />
    </main>
</template>



<script>
import axios from 'axios';

import FormPublication from '@/components/FormPublication.vue'
import PublicationCard from '@/components/PublicationCard.vue'

export default {
    name: 'News',

    components: {
        FormPublication,
        PublicationCard,
    },

    data(){
        return {

        }
    },

    mounted(){
        this.getAllPublications()
    },

    computed: {
        
        getPublicationsFromVueX(){
            return this.$store.state.listOfPublicationsFromVueX
        }
    },

    methods: {
        
        getAllPublications(){
            axios.get('http://localhost:3000/api/publication',{
                headers: { Authorization: `Bearer ${this.getTokenFromLocalStorage()}` }
            })
            .then(response => {
                this.$store.state.listOfPublicationsFromVueX = response.data;
            }) 
            .catch(error => {
                console.log(error.response);
            })
        },


        getTokenFromLocalStorage(){
            return JSON.parse(localStorage.getItem('groupomania_token'))
        },
    },
}
</script>

<style scoped lang="scss">


</style>