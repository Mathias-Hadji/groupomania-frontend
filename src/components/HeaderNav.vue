<template>
    <nav class="main-nav">
        <div class="container-elt-logo">
            <router-link to="/news"><img class="logo-groupomania" alt="logo du site" src="@/assets/logo.svg"></router-link>
        </div>


        <div class="container-elt-link">
            <div class="nav-link">
                <router-link to="/news"><img src="../assets/home-solid.svg"  class="nav-link__item" alt="Accueil"></router-link>
            </div>
            
            <div class="link">
                <router-link to="/user"><img :src="profilePicUser" class="nav-link__item nav-link__user-pic" alt="Paramètres du compte"></router-link>
            </div>

            <div class="link">
                <router-link @click="onClickDisconected()" to="/"><img src="../assets/power-off-solid.svg" class="nav-link__item" alt="Se deconnecter"></router-link>
            </div>
        </div>     
    </nav>

</template>

<script>
import axios from 'axios';

export default {

    data(){
        return {
            profilePicUser: '',
        }
    },

    computed: {
        // Récupère la valeur de modeFromVueX dans le store de VueX
        mode(){
            return this.$store.state.modeFromVueX
        }
    },


    mounted(){

        axios.get(`http://localhost:3000/api/user/${this.getUserIdFromLocalStorage()}`,{
            headers: { Authorization: `Bearer ${this.getTokenFromLocalStorage() }`}
        })
        .then(response => {
            this.profilePicUser = response.data.profile_pic_user
        })
        .catch(error => console.log(error))
    },

    methods:{
        onClickDisconected(){

            window.localStorage.removeItem('groupomania_token');
            window.localStorage.removeItem('groupomania_publicationsLiked');
            window.localStorage.removeItem('groupomania_userId');
            window.localStorage.removeItem('groupomania_isAdmin');
        },




        getTokenFromLocalStorage(){
            return JSON.parse(localStorage.getItem('groupomania_token'))
        },

        getUserIdFromLocalStorage(){
            return JSON.parse(localStorage.getItem('groupomania_userId'))
        },
    }
}
</script>

<style lang="scss" scoped>

.main-nav{
    position: fixed;
    z-index: 9000;
    display: flex;
    align-items: center;
    width: 100%;
    background: #fff;
    justify-content: space-between;
    box-shadow: 0 1px 5px black;
    height: 75px;

    .container-elt-logo{
        display: flex;
        margin-left: 20px;

        .logo-groupomania{
            display: flex;
            justify-content: center;
            align-items: center;
            width: 80%;
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