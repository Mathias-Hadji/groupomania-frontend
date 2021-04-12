<template>
    <div class="home">
      <div class="card">
        <h1 class="card__title" v-if="mode == 'login'"> Se connecter</h1>
        <h1 class="card__title" v-else> S'inscrire</h1>
        <p class="card__subtitle" v-if="mode == 'login'">Vous n'avez pas encore de compte ? <span class="card__action" @click=switchToCreateAccount>Créer un compte</span></p>
        <p class="card__subtitle" v-else>Vous avez déjà un compte ? <span class="card__action" @click=switchToLogin()>Se connecter</span></p>
        <div class="form-row" v-if="mode =='createAccount'">
          <input @change="validFirstName()" v-model="firstName" id="input-first-name" class="form-row__input" type="text" placeholder="Prénom"/>
          <input @change="validLastName()" v-model="lastName" id="input-last-name" class="form-row__input" type="text" placeholder="Nom"/>
        </div>        
        <div class="form-row">
          <input @change="validEmail()" v-model="email" id="input-email" class="form-row__input" type="email" placeholder="Adresse mail"/>
        </div>
        <div class="form-row">
          <input @change="validPassword()" v-model="password" id="input-password" class="form-row__input" type="password" placeholder="Mot de passe"/>
        </div>
        <div class="form-row">
          <button @click="login()" class="button button--disabled" v-if="mode =='login'">Se connecter</button>
          <button @click="createUserAccount()" class="button button--disabled" v-else>Créer un compte</button>
        </div>
        <div v-if="mode == 'createAccount'" id="info-invalid-input">
          <li v-if="invalidInputFirstName == true" id="info-message-first-name" class="text-danger">Prénom non valide</li>
          <li v-if="invalidInputLastName == true" id="info-message-last-name" class="text-danger">Nom non valide</li>
          <li v-if="invalidInputEmail == true" id="info-message-email" class="text-danger">Email non valide</li>
          <li v-if="invalidInputPassword == true" id="info-message-password" class="text-danger">Mot de passe : requiert au minimum 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial.</li>          
        </div>
        <div id="container-error-submit-form"></div>
      </div>
  </div>
</template>
<script>

// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

import axios from 'axios';
export default {
  name: 'Home',
  components: {
    // FormCreateAccount
    // HelloWorld
  },
  data(){
    return {
      mode:'login',
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      invalidInputFirstName: false,
      invalidInputLastName: false,
      invalidInputEmail: false,
      invalidInputPassword: false,     
    }
  },
  methods: {

    validFirstName(){
      const firstNameRegExp = new RegExp('^[a-z éèêëàâîïôöûü-]+$', 'i')

      if(firstNameRegExp.test(this.firstName) == false){
        this.invalidInputFirstName = true
        document.getElementById('input-first-name').classList.remove('validInput')
        document.getElementById('input-first-name').classList.add('errorInput')
      } else {
        document.getElementById('input-first-name').classList.remove('errorInput')
        document.getElementById('input-first-name').classList.add('validInput')
        this.invalidInputFirstName = false
      }

      return firstNameRegExp.test(this.firstName)    
    },
    validLastName(){
      const lastNameRegExp = new RegExp('^[a-z éèêëàâîïôöûü-]+$','i')

      if(lastNameRegExp.test(this.lastName) == false){
        document.getElementById('input-last-name').classList.remove('validInput')
        document.getElementById('input-last-name').classList.add('errorInput')
        this.invalidInputLastName = true
      } else {
        document.getElementById('input-last-name').classList.remove('errorInput')
        document.getElementById('input-last-name').classList.add('validInput')
        this.invalidInputLastName = false
      }
      return lastNameRegExp.test(this.lastName)
    },    
    validEmail(){
      const emailRegExp = new RegExp('^[a-z0-9._-]+[@]{1}[a-z]+[.]{1}[a-z]{2,3}$','i')

      if(this.mode != 'login'){
        if(emailRegExp.test(this.email) == false){
          document.getElementById('input-email').classList.remove('validInput')
          document.getElementById('input-email').classList.add('errorInput')
          this.invalidInputEmail = true
        } else {
          document.getElementById('input-email').classList.remove('errorInput')
          document.getElementById('input-email').classList.add('validInput')
          this.invalidInputEmail = false
        }        
      }
      return emailRegExp.test(this.email)
    },
    validPassword(){
      const passwordRegExp = new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$", 'i')

      if(this.mode != 'login'){
        if(passwordRegExp.test(this.password) == false){
          document.getElementById('input-password').classList.remove('validInput')
          document.getElementById('input-password').classList.add('errorInput')
          this.invalidInputPassword = true
        } else {
          document.getElementById('input-password').classList.remove('errorInput')
          document.getElementById('input-password').classList.add('validInput')
          this.invalidInputPassword = false
        }
      }
      return passwordRegExp.test(this.password)
    },     
    switchToCreateAccount(){

      // Reset des messages de mauvaise saisie des informations du formulaire de login lorsque l'on passe sur le formulaire de création de compte
      this.invalidInputFirstName = false
      this.invalidInputLastName = false
      this.invalidInputEmail = false
      this.invalidInputPassword = false

      // Reset des classes qui indiquent si les champs sont bien remplis ou non

      document.getElementById('input-email').classList.remove('errorInput')
      document.getElementById('input-email').classList.remove('validInput')
      
      document.getElementById('input-password').classList.remove('errorInput')
      document.getElementById('input-password').classList.remove('validInput')


      document.getElementById('container-error-submit-form').innerHTML = ''

      // Reset du texte présent dans les champs du formulaire d'inscription  
      this.firstName = '';
      this.lastName = '';
      this.email = '';
      this.password = '';

      // Switch en mode d'affichage inscription
      this.mode = 'createAccount';
    },
    switchToLogin(){
      document.getElementById('input-email').classList.remove('errorInput')
      document.getElementById('input-email').classList.remove('validInput')

      document.getElementById('input-password').classList.remove('errorInput')
      document.getElementById('input-password').classList.remove('validInput')

      document.getElementById('container-error-submit-form').innerHTML = ''

      this.firstName = '';
      this.lastName = '';
      this.email = '';
      this.password = '';

      this.mode = 'login';
    },
    createUserAccount(){
      if(this.validFirstName() && this.validLastName() && this.validEmail() && this.validPassword()){
        axios.post('http://localhost:3000/api/auth/registration', {
          firstName: this.firstName.trim(),
          lastName: this.lastName.trim(),
          email: this.email.trim(),
          password: this.password.trim()
        })
        .then(response => {console.log(response), document.getElementById('container-error-submit-form').innerHTML = `<p id="success-submit-form">${response.data.message}`})
        .catch(error => {console.log(error.response.data.error), document.getElementById('container-error-submit-form').innerHTML = `<p id="error-submit-form">${error.response.data.error}</p>`})
      }
    },
    login(){
      if(this.validEmail() && this.validPassword()){
        axios.post('http://localhost:3000/api/auth/login', {
          email: this.email.trim(),
          password: this.password.trim()
        })
        .then(response => {console.log(response), document.getElementById('container-error-submit-form').innerHTML = `<p id="success-submit-form">${response.data.message}`})
        .catch(error => {console.log(error.response.data.error), document.getElementById('container-error-submit-form').innerHTML = `<p id="error-submit-form">${error.response.data.error}</p>`})
      }
    }
  },
}
</script>




<style scoped>

  .home{
    display: flex;
    justify-content: center;
    align-items: center;
    background-image: linear-gradient(62deg, #7e91fb 0%, #6876f7 100%);
    min-height: 100vh;
  }

  .card{
    width: 500px;
    background: rgb(255, 255, 255);
    border-radius: 9px;
    padding: 20px;
  }

  .form-row{
    display: flex;
    margin: 16px 0px;
    gap: 16px;
    flex-wrap: wrap;
  }

  .form-row__input{
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

  .form-row__input::placeholder{
    color: #aaaaaa;
  }

  .card__action{
    color: #2196F3;
    cursor:pointer;
  }

  .button{
    background: #2196F3;
    color: white;
    border-radius: 8px;
    font-weight: 800;
    font-size: 15px;
    border: none;
    width: 100%;
    padding: 16px;
    cursor: pointer;
  }

  .errorInput{
    border: 1px solid red;
  }

  .validInput{
    border: 1px solid green;
  }

  .text-danger{
    color: red;
  }

  :focus {
    outline:none;border:1px solid #2196F3
  }

</style>