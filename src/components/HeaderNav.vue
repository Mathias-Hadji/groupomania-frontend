<template>
    <nav class="nav">
        <div class="container-elt-logo">
            <router-link to="/news"><img id="logo" alt="logo" src="@/assets/logo.svg" width="250"></router-link>
        </div>
        <div class="container-elt-link">
            <div class="link">
                <router-link class="nav-item" to="/news"><img src="../assets/home-solid.svg" width="25"></router-link>
            </div>
            
            <div class="link">
                <router-link class="nav-item profile-pic-user" to="/profile"><img :src="profilePicUser" width="25"></router-link>
            </div>
            <div class="link">
                <router-link @click="onClickDisconected()" class="nav-item" to="/"><img src="../assets/power-off-solid.svg" width="25"></router-link>
            </div>



        </div>     
    </nav>

</template>

<script>
import axios from 'axios';

export default {

    data(){
        return {
            profilePicUser: 'http://localhost:3000/images/profile-pic-user-default/profile-user.svg',
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

<style lang="scss">

.nav{
    display: flex;
    align-items: center;
    width: 100%;
    background: #fff;
    justify-content: space-between;
    box-shadow: 0 1px 5px black;
    height: 75px;

    .container-elt-logo{
        margin-left: 20px;
    }

    .container-elt-link{
        width: 100%;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        margin-right: 20px;

        a{
            margin-left: 20px;
            text-decoration: none;
            color: #2c3e50;
        }
    }

}

</style>