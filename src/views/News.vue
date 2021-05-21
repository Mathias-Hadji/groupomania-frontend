<template>
    <div class="news">
        <CreateNewPublication />
        <Publication
            v-for="(publication, index) in publications"
            v-bind:key="index"
            v-bind:publicationId="publication.id"
        />
    </div>
</template>



<script>
import axios from 'axios';

import CreateNewPublication from '@/components/CreateNewPublication.vue'
import Publication from '@/components/Publication.vue'

export default {
    name: 'News',

    components: {
        CreateNewPublication,
        Publication,
    },

    data(){
        return {
            publications: [],
        }
    },


    mounted(){
        // Get publications
        axios.get('http://localhost:3000/api/publication',{
            headers: { Authorization: `Bearer ${this.getTokenFromLocalStorage()}` }
        })
        .then(response => {
            this.publications = response.data
        }) 
        .catch(error => {
            console.log(error.response);
        })
    },

    computed: {
        publicationSelectedFromVueX(){
            return this.$store.state.publicationSelectedFromVueX
        },
        getHideListPublicationFromVueX(){
            return this.$store.state.hideListPublicationFromVueX
        },
    },

    methods: {
        getTokenFromLocalStorage(){
            return JSON.parse(localStorage.getItem('groupomania_token'))
        },
    },
}
</script>

<style scoped>
.news{
    display: flex;
    flex-direction: column;
    align-items: center;
}

</style>