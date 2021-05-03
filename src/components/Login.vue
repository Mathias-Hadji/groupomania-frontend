<template>
  <div class="card">
    <h1 class="card__title"> Se connecter</h1>
    <p class="card__subtitle">Vous n'avez pas encore de compte ? <span class="card__action" @click=switchToCreateAccount>Créer un compte</span></p>
    
    <div class="form-row">
      <input @change="validEmail()" v-model="email" class="form-row__input" type="email" placeholder="Adresse mail"/>
    </div>
    <div class="form-row">
      <input @change="validPassword()" v-model="password" class="form-row__input" type="password" placeholder="Mot de passe"/>
    </div>
    <div class="form-row">
      <button @click="login()" class="button" v-bind:disabled="validatedFieldsNotCompleted == false" v-bind:class="{'button--disabled' : !validatedFieldsNotCompleted}" type="submit">Se connecter</button>
    </div>

    <div id="container-error-submit-form-login"></div>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

import axios from 'axios';
export default {

  data(){
    return {
      email: '',
      password: '',

      emailRegExp: new RegExp('^[a-z0-9._-]+[@]{1}[a-z]+[.]{1}[a-z]{2,3}$','i'),
      passwordRegExp: new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$", 'i'),

    }
  },
  computed: {
    validatedFieldsNotCompleted(){
      if (this.email != "" && this.password != "") {
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
      this.$store.state.modeFromVueX = 'createAccount'
    },
    
    validEmail(){
      if(this.emailRegExp.test(this.email) == false){
        return false
      } else {
        return true
      }
    },
    validPassword(){
      if(this.passwordRegExp.test(this.password) == false){
        return false
      } else {
        return true
      }
    },   
    login(){
      if(this.validEmail() && this.validPassword()){
        axios.post('http://localhost:3000/api/user/login', {
          email: this.email.trim(),
          password: this.password
        })
        .then(response => {
          console.log(response.data)
          document.getElementById('container-error-submit-form-login').classList.remove('text-danger')
          document.getElementById('container-error-submit-form-login').classList.add('text-success')
          document.getElementById('container-error-submit-form-login').innerHTML = `<p>${response.data.message}</p>`

          this.setTokenFromLocalStorage(response.data.token)
          this.setUserIdFromLocalStorage(response.data.userId)
          window.location.href = 'news';
        })
        .catch(error => {
          console.log(error.response.data)
          document.getElementById('container-error-submit-form-login').innerHTML = `<p>${error.response.data.error}</p>`
          document.getElementById('container-error-submit-form-login').classList.add('text-danger')
        })
      } else {
        document.getElementById('container-error-submit-form-login').innerHTML = '<p>Email ou mot de passe non valide.</p>'
        document.getElementById('container-error-submit-form-login').classList.add('text-danger')
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

.v--vtt-fade {
  will-change: transform, opacity;
  transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out;
}
 
.v--vtt-fade_visible {
  opacity: 1;
  transform: translateY(0);
}
 
.v--vtt-fade_hidden {
  opacity: 0;
  transform: translateY(20px);
}

</style>