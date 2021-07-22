<template>
    <div class="registration-container">
        <div class="card">
            <h1 class="card__title"> S'inscrire</h1>
            <p class="card__subtitle">Vous avez déjà un compte ? <span class="card__action" @click=switchMode>Se connecter</span></p>
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
                <p v-if="errorMsgEmailAlreadyUsed != null" class="text-danger">{{ errorMsgEmailAlreadyUsed }}</p> 
            </div>
        </div>
    </div>

</template>

<script>
import { mapState } from 'vuex';
import userService from '../services/userService';

export default {

    data(){
        return {

            inputFirstName: '',
            inputLastName: '',
            inputEmail: '',
            inputPassword: '',

            successMsgRegistration: null,

            errorMsgFirstName: null,
            errorMsgLastName: null,
            errorMsgEmail: null,
            errorMsgPassword: null,
            errorMsgEmailAlreadyUsed: null,

        }
    },

    computed: {
        ...mapState({
            getFirstNameRegExpFromVueX: 'firstNameRegExp',
            getLastNameRegExpFromVueX: 'lastNameRegExp',
            getEmailRegExpFromVueX: 'emailRegExp',
            getPasswordRegExpFromVueX: 'passwordRegExp',
        }),

        btnDisabled(){

            if(this.inputFirstName.length > 0 && this.inputLastName.length > 0 && this.inputEmail.length > 0 && this.inputPassword.length > 0){
                return true;
            } else {
                return false;
            }
        },
    },

    methods: {

        switchMode(){
            this.$store.dispatch('setMode', 'login')
        },

        validFirstName(){
            if(!this.getFirstNameRegExpFromVueX.test(this.inputFirstName)){
                this.errorMsgFirstName = '- Prénom non valide.';
            } else {
                this.errorMsgFirstName = null;   
                return true;
            }
        },

        validLastName(){
            if(!this.getLastNameRegExpFromVueX.test(this.inputLastName)){
                this.errorMsgLastName = '- Nom non valide.';
            } else {
                this.errorMsgLastName = null;   
                return true;
            }
        },

        validEmail(){
            if(!this.getEmailRegExpFromVueX.test(this.inputEmail)){
                this.errorMsgEmail = '- Email non valide.';
            } else {
                this.errorMsgEmail = null; 
                return true;  
            }
        },

        validPassword(){
            if(!this.getPasswordRegExpFromVueX.test(this.inputPassword)){
                this.errorMsgPassword = '- Le mot de passe doit avoir une longueur minimale de 8 caractères, 1 lettre majuscule, 1 lettre minuscule, 1 chiffre, 1 caractère spécial.';
            } else {
                this.errorMsgPassword = null;   
                return true;
            }
        },

        async createUserAccount(){
            try {
                if(this.validFirstName() && this.validLastName() && this.validEmail() && this.validPassword()){
                    const registration = await userService.registration (
                        this.uppercaseFirstLetter(this.inputFirstName.trim().toLowerCase()),
                        this.inputLastName.trim().toUpperCase(),
                        this.inputEmail.toLowerCase().trim(),
                        this.inputPassword
                    );

                    this.successMsgRegistration = registration.data.message;
                    this.errorMsgFirstName = null;
                    this.errorMsgLastName = null;
                    this.errorMsgEmail = null;
                    this.errorMsgPassword = null;
                    this.errorMsgEmailAlreadyUsed = null;
                    this.inputFirstName = '';
                    this.inputLastName = '';
                    this.inputEmail = '';
                    this.inputPassword = '';


                }
            } catch(err){
                this.errorMsgEmailAlreadyUsed = err.response.data;
                setTimeout(() =>{
                    this.errorMsgEmailAlreadyUsed = null;
                }, 3000);
            }
        },

        uppercaseFirstLetter(string){
            return string.charAt(0).toUpperCase() + string.slice(1);
        },
    },
}
</script>




<style scoped lang="scss">

.registration-container{
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
}


</style>