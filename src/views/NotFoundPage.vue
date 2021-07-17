<template>
    <div>
        <HeaderNav/>
        <div class="not-found-page">

            <h1>Erreur 404</h1>
            <h2>Cette page n'existe pas.</h2>
            <div class="bloc-link-homepage" v-if="getUserIdFromVueX !== 0">
                <router-link to="/news" class="bloc-link-homepage__link">Page d'accueil</router-link>
            </div>

            <div v-else class="bloc-link-homepage">
                <router-link to="/" class="bloc-link-homepage__link">Page d'accueil</router-link>
            </div>
        </div>
    </div>

</template>

<script>
import { mapState } from 'vuex';

import HeaderNav from '@/components/HeaderNav.vue';

export default {
    name: 'NotFoundPage',

    components:{
        HeaderNav
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

}
</script>

<style scoped lang="scss">
    .not-found-page{
        width: 100%;
        height: 500px;
        display: flex;
        flex-direction: column;
        color: #FFF;
        justify-content: center;
        align-items: center;
        text-align: center;
        padding: 20px;

        h1{
            font-size: 50px;
        }

        h2{
            font-size: 25px;
        }

        .bloc-link-homepage{
            margin-top: 20px;

            &__link{
                font-size: 18px;
                color: rgb(255, 255, 255);
                font-weight: bold;
            }

            &__link:hover{
                color: rgb(211, 211, 211);
            }
        }


    }

</style>