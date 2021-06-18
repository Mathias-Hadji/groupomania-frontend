<template>
    <div>
        <PublicationCard
            v-bind:publicationId = getIdPublicationFromUrl()
        />
    </div>

</template>




<script>

import PublicationCard from '../components/PublicationCard'

export default {

    name: 'Post',

    components: {
        PublicationCard
    },

    data(){
        return{

        }
    },

    mounted(){

    },

    methods:{
        
        getIdPublicationFromUrl(){
            const url = new URLSearchParams(window.location.search);
            return parseInt(url.get("id")); 
        }
    }
    
}
</script>




<style lang="scss" scoped>

</style>