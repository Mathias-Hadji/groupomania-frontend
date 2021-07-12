<template>
    <div>
        <h1>404 not found</h1>
        <h2>It seems you're in the wrong page</h2>
        <div v-if="getUserIdFromVueX !== 0">
            <router-link to="/news">Go to Home Page</router-link>
        </div>

        <div v-else>
            <router-link to="/">Go to Home Page</router-link>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
    name: 'NotFoundPage',

    computed:{
        ...mapState({
            getUserIdFromVueX: 'userIdFromVueX',
            getUserTokenFromVueX: 'tokenUserFromVueX',
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
}
</script>

<style>

</style>