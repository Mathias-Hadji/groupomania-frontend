<template>
    <div class="card">
      <h1 class="card__title"> S'inscrire</h1>
      <p class="card__subtitle">Vous avez déjà un compte ? <span class="card__action" @click=switchToLogin>Se connecter</span></p>
      <div class="form-row">
        <input @change="validFirstName()" v-model="firstName" v-bind:class="{ 'form-row__error-input' : invalidInputFirstName }" class="form-row__input" type="text" placeholder="Prénom"/>
        <input @change="validLastName()" v-model="lastName" v-bind:class="{ 'form-row__error-input' : invalidInputLastName }" class="form-row__input" type="text" placeholder="Nom"/>
      </div>        
      <div class="form-row">
        <input @change="validEmail()" v-model="email" v-bind:class="{ 'form-row__error-input' : invalidInputEmail }" class="form-row__input" type="email" placeholder="Adresse mail"/>
      </div>
      <div class="form-row">
        <input @change="validPassword()" v-model="password" v-bind:class="{ 'form-row__error-input' : invalidInputPassword }" class="form-row__input" type="password" placeholder="Mot de passe"/>
      </div>
      <div class="form-row">
        <button @click="createUserAccount()" class="button" v-bind:disabled="validatedFieldsNotCompleted == false" v-bind:class="{'button--disabled' : !validatedFieldsNotCompleted}" type=submit>Créer un compte</button>
      </div>
      <div id="info-invalid-input">
        <li v-if="invalidInputFirstName == true" class="text-danger">Prénom non valide</li>
        <li v-if="invalidInputLastName == true" class="text-danger">Nom non valide</li>
        <li v-if="invalidInputEmail == true" class="text-danger">Email non valide</li>
        <li v-if="invalidInputPassword == true" class="text-danger">Mot de passe : requiert au minimum 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial.</li>          
      </div>
      <div id="container-error-submit-form-registration" ></div>
    </div>
</template>
<script>

// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

import axios from 'axios';
export default {

  data(){
    return {    
      firstName: '',
      lastName: '',
      email: '',
      password: '',

      invalidInputFirstName: false,
      invalidInputLastName: false,
      invalidInputEmail: false,
      invalidInputPassword: false,

      firstNameRegExp: new RegExp('^[a-zéèêëàâîïôöûü-]+$', 'i'),
      lastNameRegExp: new RegExp('^[a-zéèêëàâîïôöûü-]+$','i'),
      emailRegExp: new RegExp('^[a-z0-9._-]+[@]{1}[a-z]+[.]{1}[a-z]{2,3}$','i'),
      passwordRegExp: new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$", 'i'),
    }
  },
  computed: {
    validatedFieldsNotCompleted(){
      if(this.firstName != "" && this.lastName != "" && this.email != "" && this.password != ""){
        return true;
      } else {
        return false;
      }
    }, 
  },
  methods: {
    uppercaseFirstLetter(string) 
    {
      return string.charAt(0).toUpperCase() + string.slice(1);
    },

    switchToLogin(){
      this.$store.state.modeFromVueX = 'login'
    },

    isValid(regexp, wordToVerify){
      if(regexp.test(wordToVerify) == false){
        return false
      } else {
        return true
      }
    },

    validFirstName(){
      if(this.firstNameRegExp.test(this.firstName) == false){
        this.invalidInputFirstName = true
      } else {
        this.invalidInputFirstName = false
      }
    },
    validLastName(){
      if(this.lastNameRegExp.test(this.lastName) == false){
        this.invalidInputLastName = true
      } else {
        this.invalidInputLastName = false
      }
    },    
    validEmail(){
      if(this.emailRegExp.test(this.email) == false){
        this.invalidInputEmail = true
      } else {
        this.invalidInputEmail = false
      }
    },
    validPassword(){
      if(this.passwordRegExp.test(this.password) == false){
        this.invalidInputPassword = true
      } else {
        this.invalidInputPassword = false
      }
    },

    createUserAccount(){
      if(this.isValid(this.firstNameRegExp, this.firstName) && this.isValid(this.lastNameRegExp, this.lastName) && this.isValid(this.emailRegExp, this.email) && this.isValid(this.passwordRegExp, this.password)){
        axios.post('http://localhost:3000/api/user/registration', {
          firstName: this.uppercaseFirstLetter(this.firstName.trim().toLowerCase()),
          lastName: this.lastName.trim().toUpperCase(),
          email: this.email.toLowerCase().trim(),
          password: this.password
        })
        .then(response => {
          console.log(response),
          document.getElementById('container-error-submit-form-registration').classList.remove('text-danger')
          document.getElementById('container-error-submit-form-registration').classList.add('text-success')
          document.getElementById('container-error-submit-form-registration').innerHTML = `<p id="success-submit-form">${response.data.message}</p>`
        })
        .catch(error => {
          document.getElementById('container-error-submit-form-registration').innerHTML = `<p id="error-submit-form">${error.response.data.error}</p>`
          document.getElementById('container-error-submit-form-registration').classList.add('text-danger')
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

    &__error-input{
      border: 1px solid red;
    }

    &__input::placeholder{
      color: #aaaaaa;
    }    
  }
}
</style>