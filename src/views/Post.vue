<template>
    <div>
        <nav class="main-navbar" v-if="dataLoaded">
            <HeaderNav/>
        </nav>

        <main class="post" v-if="dataLoaded">
            <PublicationCard
                v-bind:publicationId = getIdPublicationFromUrl()
            />
        </main>
    </div>
</template>




<script>
import axios from 'axios';

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
            dataLoaded: false
        }
    },

    mounted(){
        this.getUserId()
        this.setUserTokenInVueX()
    },

    computed: {

    },

    methods:{

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

        getIdPublicationFromUrl(){
            const url = new URLSearchParams(window.location.search);
            return parseInt(url.get("id")); 
        },

        getTokenFromLocalStorage(){
            return JSON.parse(localStorage.getItem('groupomania_token'))
        },

        setUserTokenInVueX(){
            this.$store.commit('SET_TOKEN_USER_FROM_VUEX', this.getTokenFromLocalStorage())
        },
    }
    
}
</script>




<style lang="scss" scoped>

</style>