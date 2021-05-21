<template>
    <div class="card">
        <h1 class="card__title"> S'inscrire</h1>
        <p class="card__subtitle">Vous avez déjà un compte ? <span class="card__action" @click=switchToLogin>Se connecter</span></p>
        <div class="form-row">
            <input @change="validFirstName()" v-model="inputFirstName" class="input" v-bind:class="{'error-input' : errorMsgFirstName, 'valid-input' : successMsgRegistration }" type="text" placeholder="Prénom"/>
            <input @change="validLastName()" v-model="inputLastName" class="input" v-bind:class="{'error-input' : errorMsgLastName, 'valid-input' : successMsgRegistration }" type="text" placeholder="Nom"/>
        </div>        
        <div class="form-row">
            <input @change="validEmail()" v-model="inputEmail" class="input" v-bind:class="{'error-input' : errorMsgEmail, 'valid-input' : successMsgRegistration }" type="email" placeholder="Adresse mail"/>
        </div>
        <div class="form-row">
            <input @change="validPassword()" v-model="inputPassword" class="input" v-bind:class="{'error-input' : errorMsgPassword, 'valid-input' : successMsgRegistration }" type="password" placeholder="Mot de passe"/>
        </div>
        <div class="form-row">
            <button @click="createUserAccount()" class="button" v-bind:class="{'button--disabled' : !btnDisabled}" v-bind:disabled="!btnDisabled" type=submit>Créer un compte</button>
        </div>

        <div>
            <p v-if="successMsgRegistration != null" class="text-success">{{ successMsgRegistration }}</p>

            <p v-if="errorMsgFirstName != null" class="text-danger">{{ errorMsgFirstName }}</p>
            <p v-if="errorMsgLastName != null" class="text-danger">{{ errorMsgLastName }}</p>
            <p v-if="errorMsgEmail != null" class="text-danger">{{ errorMsgEmail }}</p> 
            <p v-if="errorMsgPassword != null" class="text-danger">{{ errorMsgPassword }}</p> 
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

            inputFirstName: '',
            inputLastName: '',
            inputEmail: '',
            inputPassword: '',

            firstNameRegExp: new RegExp('^[a-zéèêëàâîïôöûü-]+$', 'i'),
            lastNameRegExp: new RegExp('^[a-zéèêëàâîïôöûü-]+$','i'),
            emailRegExp: new RegExp('^[a-z0-9._-]+[@]{1}[a-z]+[.]{1}[a-z]{2,3}$','i'),
            passwordRegExp: new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$", 'i'),

            successMsgRegistration: null,

            errorMsgFirstName: null,
            errorMsgLastName: null,
            errorMsgEmail: null,
            errorMsgPassword: null,
        }
    },

    computed: {

        btnDisabled(){

            if(this.inputFirstName.length > 0 && this.inputLastName.length > 0 && this.inputEmail.length > 0 && this.inputPassword.length > 0){
                return true;
            } else {
                return false;
            }
        },
    },

    methods: {

        uppercaseFirstLetter(string){
            return string.charAt(0).toUpperCase() + string.slice(1);
        },

        switchToLogin(){
            this.$store.state.modeFromVueX = 'login'
        },

        validFirstName(){

            if(!this.firstNameRegExp.test(this.inputFirstName)){
                this.errorMsgFirstName = '- Prénom non valide.';
            } else {
                this.errorMsgFirstName = null;   
            }
        },

        validLastName(){

            if(!this.lastNameRegExp.test(this.inputLastName)){
                this.errorMsgLastName = '- Nom non valide.';
            } else {
                this.errorMsgLastName = null;   
            }
        },

        validEmail(){

            if(!this.emailRegExp.test(this.inputEmail)){
                this.errorMsgEmail = '- Email non valide.';
            } else {
                this.errorMsgEmail = null;   
            }
        },

        validPassword(){
            
            if(!this.passwordRegExp.test(this.inputPassword)){
                this.errorMsgPassword = '- Le mot de passe doit avoir une longueur minimale de 8 caractères, 1 lettre majuscule, 1 lettre minuscule, 1 chiffre, 1 caractère spécial.';
            } else {
                this.errorMsgPassword = null;   
            }
        },

        createUserAccount(){

            if(this.firstNameRegExp.test(this.inputFirstName) && this.lastNameRegExp.test(this.inputLastName) && this.emailRegExp.test(this.inputEmail) && this.passwordRegExp.test(this.inputPassword)){

                axios.post('http://localhost:3000/api/user/registration', {
                    firstName: this.uppercaseFirstLetter(this.inputFirstName.trim().toLowerCase()),
                    lastName: this.inputLastName.trim().toUpperCase(),
                    email: this.inputEmail.toLowerCase().trim(),
                    password: this.inputPassword
                })
                .then(response => {
                    console.log(response)

                    this.errorMsgFirstName = null;
                    this.errorMsgLastName = null;
                    this.errorMsgEmail = null;
                    this.errorMsgPassword = null;

                    this.successMsgRegistration = response.data.message;
                })
                .catch(error => {
                
                    this.errorMsgFirstName = error.response.data.notValid;
                    this.errorMsgLastName = error.response.data.notValid;
                    this.errorMsgEmail = error.response.data.notValid;
                    this.errorMsgPassword = error.response.data.notValid;

                    this.inputPassword = ''
                })
            }
        },
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



        &__input::placeholder{
            color: #aaaaaa;
        }    
    }
}
</style>