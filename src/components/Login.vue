<template>
    <div class="login-container">
        <div class="card">
            <h1 class="card__title"> Se connecter</h1>
            <p class="card__subtitle">Vous n'avez pas encore de compte ? <span class="card__action" @click=switchMode>Créer un compte</span></p>

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
    </div>

</template>

<script>
import { mapState } from 'vuex';

import userService from '../services/userService';
import sessionService from '../services/sessionService';

export default {

    data(){

        return {
            inputEmail: '',
            inputPassword: '',

            successMsgLogin: null,
            errorMsgLogin: null,
        }
    },

    computed: {

        ...mapState({
            getEmailRegExpFromVueX: 'emailRegExp',
            getPasswordRegExpFromVueX: 'passwordRegExp',

        }),

        btnDisabled(){
            if (this.inputEmail.length > 0 && this.inputPassword.length > 0) {
                return true;
            } else {
                return false;
            }
        },

    },

    methods: {

        switchMode(){
            this.$store.dispatch('setMode', 'createAccount')
        },


        async login(){
            try {
                if(!this.getEmailRegExpFromVueX.test(this.inputEmail)){
                    let e = new Error("L'adresse email et le mot de passe que vous avez entrés ne correspondent pas à ceux présents dans nos fichiers. Veuillez vérifier et réessayer.");
                    e.name = 'RegexpErrorEmail';
                    throw e;
                }

                if(!this.getPasswordRegExpFromVueX.test(this.inputPassword)){
                    let e = new Error("L'adresse email et le mot de passe que vous avez entrés ne correspondent pas à ceux présents dans nos fichiers. Veuillez vérifier et réessayer.");
                    e.name = 'RegexpErrorPassword';
                    throw e;
                }

                const response = await userService.login(this.inputEmail.trim(), this.inputPassword)
                localStorage.setItem('groupomania_token', JSON.stringify(response.data.token));
                await sessionService.setUserSession(response.data.userId, response.data.token);
            
                this.errorMsgLogin = '';
                this.successMsgLogin = response.data.message;

                window.location.href = 'http://localhost:8080/news';

            } catch(err){
                if(err.name === 'RegexpErrorEmail' || err.name === 'RegexpErrorPassword'){
                    this.errorMsgLogin = err.message;
                    this.inputPassword = ''

                } else {
                    this.errorMsgLogin = err.response.data;
                    this.inputPassword = ''
                }
            }
        },
    },
}
</script>


<style scoped lang="scss">

.login-container{
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    .card {
        width: 540px;
        height: 100%;
        background:white;
        border-radius: 16px;
        padding:32px;
        margin: 75px 20px;

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
            color:#004279;
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
}





</style>