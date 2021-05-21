<template>
    <div class="card">
        <h1 class="card__title"> Se connecter</h1>
        <p class="card__subtitle">Vous n'avez pas encore de compte ? <span class="card__action" @click=switchToCreateAccount>Créer un compte</span></p>

        <div class="form-row">
            <input v-model="inputEmail" class="form-row__input" type="email" placeholder="Adresse mail"/>
        </div>
        <div class="form-row">
            <input v-model="inputPassword" class="form-row__input" type="password" placeholder="Mot de passe"/>
        </div>
        <div class="form-row">
            <button @click="login()" class="button" v-bind:class="{'button--disabled' : !btnDisabled}" v-bind:disabled="!btnDisabled" type="submit">Se connecter</button>
        </div>

        <div>
            <p v-if="successMsgLogin != null" class="text-success">{{ successMsgLogin }}</p> 
            <p v-if="errorMsgLogin != null" class="text-danger">{{ errorMsgLogin }}</p> 
        </div>
    </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

import axios from 'axios';
export default {

    data(){

        return {

            inputEmail: '',
            inputPassword: '',

            emailRegExp: new RegExp('^[a-z0-9._-]+[@]{1}[a-z]+[.]{1}[a-z]{2,3}$','i'),
            passwordRegExp: new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$", 'i'),

            successMsgLogin: null,
            errorMsgLogin: null,
        }
    },

    computed: {

        btnDisabled(){
            if (this.inputEmail.length > 0 && this.inputPassword.length > 0) {
                return true;
            } else {
                return false;
            }
        },
    },

    methods: {

        setTokenFromLocalStorage(token){
            localStorage.setItem('groupomania_token', JSON.stringify(token))
        },

        setUserIdFromLocalStorage(userId){
            localStorage.setItem('groupomania_userId', JSON.stringify(userId))
        },  

        switchToCreateAccount(){
            this.$store.state.modeFromVueX = 'createAccount';
        },

        login(){

            if(this.emailRegExp.test(this.inputEmail) && this.passwordRegExp.test(this.inputPassword)){

                axios.post('http://localhost:3000/api/user/login',
                { email: this.inputEmail.trim(), password: this.inputPassword })
                .then(response => {
                    console.log(response.data);

                    this.errorMsgLogin = null;
                    this.successMsgLogin = response.data.message;
                    
                    this.setTokenFromLocalStorage(response.data.token);
                    this.setUserIdFromLocalStorage(response.data.userId);
                    window.location.href = 'news';
                })
                .catch(error => {
                    console.log(error.response.data);

                    this.errorMsgLogin = error.response.data.notValid;
                    this.inputPassword = ''
                })

            } else {
                this.errorMsgLogin = 'Email ou mot de passe incorrect.';
                this.inputPassword = ''
            }
        }
    },
}
</script>




<style scoped lang="scss">

.card {
    max-width: 100%;
    width: 540px;
    background:white;
    border-radius: 16px;
    padding:32px;

    &__title {
        text-align:center;
        font-weight: 800;
    }

    &__subtitle {
        text-align: center;
        color:#666;
        font-weight: 500;
    }

    &__action {
        color:#2196F3;
        text-decoration: underline;
        cursor: pointer;
    } 

    .form-row{
        display: flex;
        margin: 16px 0px;
        gap: 16px;
        flex-wrap: wrap;

        &__input{
            padding: 8px;
            border: none;
            border-radius: 9px;
            background: #f2f2f2;
            font-weight: 500;
            font-size: 16px;
            flex: 1;
            min-width: 100px;
            color: black;
            position: relative;
        }

        &__input::placeholder{
            color: #aaaaaa;
        }    
    }
}
</style>