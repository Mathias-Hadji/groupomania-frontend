<template>
    <main class="news">
        <nav class="main-navbar" v-if="dataLoaded">
            <HeaderNav/>
        </nav>

        <PublicationCreate
            v-on:updateListOfPublications="getAllPublications()"
        />

        <PublicationCard
            v-for="publication in listOfPublications"
            v-bind:key="publication.id"
            v-bind:publicationId="publication.id"
            v-on:updateListOfPublications="getAllPublications()"
        />
    </main>
</template>



<script>
import axios from 'axios';

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
            dataLoaded: false,
            listOfPublications: []
        }
    },

    mounted(){
        this.getUserId()
        this.setUserTokenInVueX()
        this.getAllPublications()
    },

    computed: {
        
    },

    methods: {

        getUserId(){
            axios.get(`http://localhost:3000/api/session/${this.getTokenFromLocalStorage()}`,{
                headers: { Authorization: `Bearer ${this.getTokenFromLocalStorage()}`}
            })
            .then(response => {
                this.$store.commit('SET_USER_ID_FROM_VUEX', response.data.user_id_session)

                this.dataLoaded = true;
            })
            .catch(error => { 
                if(error.response.status === 401){
                    window.location.href = 'http://localhost:8080';
                }
                console.log(error.response)
            })
        },
        
        getAllPublications(){
            
            axios.get('http://localhost:3000/api/publication',{
                headers: { Authorization: `Bearer ${this.getTokenFromLocalStorage()}` }
            })
            .then(response => {
                this.listOfPublications = response.data;
            }) 
            .catch(error => {
                if(error.response.status === 401){
                    window.location.href = 'http://localhost:8080';
                }
                console.log(error.response)
            })
        },

        getTokenFromLocalStorage(){
            return JSON.parse(localStorage.getItem('groupomania_token'))
        },

        setUserTokenInVueX(){
            this.$store.commit('SET_TOKEN_USER_FROM_VUEX', this.getTokenFromLocalStorage())
        },
    },
}
</script>

<style scoped lang="scss">


</style>