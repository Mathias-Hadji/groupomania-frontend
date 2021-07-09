<template>
    <nav class="main-nav">
        <div class="container-elt-logo" v-if="getUserIdFromVueX !== 0">
            <router-link to="/news"><img class="logo-groupomania" alt="logo du site" src="@/assets/logo.svg"></router-link>
        </div>
        <div class="container-elt-logo" v-else>
            <img class="logo-groupomania" alt="logo du site" src="@/assets/logo.svg">
        </div>

        <div class="container-elt-link" v-if="getUserIdFromVueX !== 0">
            <div class="nav-link">
                <router-link to="/news"><img src="../assets/home-solid.svg"  class="nav-link__item" alt="Accueil"></router-link>
            </div>
            
            <div class="link">
                <router-link to="/user"><img :src="getProfilePicUserFromVueX" class="nav-link__item nav-link__user-pic" alt="Paramètres du compte"></router-link>
            </div>

            <div class="link">
                <router-link @click="onClickDisconected()" to="/"><img src="../assets/power-off-solid.svg" class="nav-link__item" alt="Se deconnecter"></router-link>
            </div>
        </div>  
    </nav>

</template>

<script>
import axios from 'axios';

import { mapState } from 'vuex';

export default {

    data(){
        return {

        }
    },

    computed:{
        ...mapState({
            getUserTokenFromVueX: 'tokenUserFromVueX',
            getUserIdFromVueX: 'userIdFromVueX',
            getProfilePicUserFromVueX: 'profilePicUserFromVueX',
        }),

    },

    methods:{

        onClickDisconected(){
            axios.delete(`http://localhost:3000/api/session`, {
                headers: { Authorization: `Bearer ${this.getUserTokenFromVueX}`}
            })
            .then(() => {
                window.localStorage.removeItem('groupomania_token');
                window.localStorage.removeItem('groupomania_publicationsLiked');
                
                window.location.href = 'http://localhost:8080';
            })
            .catch(error => console.log(error.response))
        },
    }
}
</script>

<style lang="scss" scoped>

.main-nav{
    display: flex;
    align-items: center;
    width: 100%;
    background: #fff;
    justify-content: space-between;
    box-shadow: 0 1px 5px black;
    height: 75px;

    .container-elt-logo{
        width: 300px;
        display: flex;
        margin-left: 20px;

        .logo-groupomania{
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
        }
    }

    .container-elt-link{
        width: 100%;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        margin-right: 20px;

        .nav-link{
            width: auto;

            &__item{
                display: flex;
                width: 25px;
                margin-left: 20px;
                text-decoration: none;
                color: #2c3e50;
            }

            &__user-pic{
                width: 25px;
                height: 25px;
                border-radius: 50%;
            }
        }
    }

}

</style>