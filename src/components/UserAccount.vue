<template>
    <div class="card">
        <div class="name-user">
            <h1 class="name-user__title">{{ firstNameUser }} {{ lastNameUser }}</h1>
        </div>
        <div class="row">
            <div class="div-profile-pic">
                <h2 class="div-profile-pic__title">Photo de profil</h2>
                <img v-if="imageTempUrl == null" class="div-profile-pic__pic" :src="profilePicUser" alt="">
                <img v-else :src="imageTempUrl" class="div-profile-pic__pic" width="150"> 
                <label v-if="validBtnProfilePic == false" class="div-profile-pic__label" for="profilePic">Modifier</label>
                <input @change="previewImage" id="profilePic" class="div-profile-pic__input" type="file" name="profilePic">
                <div class="group-btn">
                    <button v-if="validBtnProfilePic == true" @click="modifyProfilePic" class="group-btn__btn button-primary">Valider</button>
                    <button v-if="cancelBtnProfilePic == true" @click="cancelModifyProfilePic" class="group-btn__btn button-danger">Annuler</button>
                </div>
                <p v-if="successMsgProfilePic != null" class="div-profile-pic__success-message text-success">{{ successMsgProfilePic }}</p> 
                <p v-if="errorMsgProfilePic != null" class="div-profile-pic__error-message text-danger">{{ errorMsgProfilePic }}</p>
            </div>

            <div class="div-user-information">
                <div div class="under-div-user-information">
                    <h2 class="under-div-user-information__title">Email</h2>
                    <p>{{ userEmail }}</p>
                </div> 
                <div class="under-div-user-description">
                    <h2 class="under-div-user-description__title">Description</h2>
                    <p class="under-div-user-description__description">{{ userDescription }}</p>
                    <textarea v-model="inputUserDescription" class="under-div-user-description__message-input" rows="5" maxlength="255" placeholder="Ajouter un texte ..."></textarea>
                    <button @click="modifyUserDescription" class="button">Modifier ma description</button>
                    <p v-if="successMsgDescription != null" class="under-div-user-description__success-message text-success">{{ successMsgDescription }}</p> 
                    <p v-if="errorMsgDescription != null" class="under-div-user-description__error-message text-danger">{{ errorMsgDescription }}</p>   
                </div>
            </div>
        </div>

        <hr>

        <div class="row">
            <div class="div-update-password">
                <h2 class="div-update-password__title">Modifier mon mot de passe</h2>
                <div class="div-password">
                    <label class="div-password__label" for="current-password">Mot de passe actuel :</label>
                    <input v-model="inputUserCurrentPassword" class="div-password__input" type="password" name="current-password" required>
                    <p v-if="errorMsgCurrentPassword != null" class="div-password__error-message text-danger">{{ errorMsgCurrentPassword }}</p>
                </div>
                <div class="div-password">
                    <label class="div-password__label" for="new-password">Nouveau mot de passe :</label>
                    <input v-model="inputUserNewPassword" class="div-password__input" type="password" name="new-password" required>
                    <p v-if="errorMsgNewPassword != null" class="div-password__error-message text-danger">{{ errorMsgNewPassword }}</p>
                    
                    <button @click="modifyPassword" v-bind:disabled="btnDisabled == true" v-bind:class="{'button--disabled' : btnDisabled}" class="button">Valider</button>
                    <p v-if="successMsgPassword != null" class="div-password__success-message text-success">{{ successMsgPassword }}</p>
                </div>
            </div>
            <div class="div-delete-account">
                <h2 class="div-delete-account__title">Supprimer mon compte</h2>
                <button @click="deleteAccount" class="button">Supprimer</button>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data(){
        return{

            userData:'',

            firstNameUser: '',
            lastNameUser: '',

            userEmail: '',

            inputUserDescription: '',
            userDescription:'',

            inputUserCurrentPassword: '',
            inputUserNewPassword: '',

            profilePicUser: '',
            selectedFile: null,
            imageTempUrl: null,
            validBtnProfilePic: false,
            cancelBtnProfilePic: false,

            passwordRegExp: new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$", 'i'),
            
            successMsgPassword: null,
            errorMsgCurrentPassword: null,
            errorMsgNewPassword:null,

            successMsgDescription: null,
            errorMsgDescription: null,

            successMsgProfilePic: null,
            errorMsgProfilePic: null,
        }
    },
    

    mounted(){
        axios.get(`http://localhost:3000/api/user/${this.getUserIdFromLocalStorage()}`,{
            headers: { Authorization: `Bearer ${this.getTokenFromLocalStorage() }`}
        })
        .then(res => {

            this.userData = res.data.result[0]

            this.profilePicUser = this.userData.profile_pic_user

            this.firstNameUser = this.userData.first_name_user
            this.lastNameUser = this.userData.last_name_user

            this.userEmail = this.userData.email_user
            this.userDescription = this.userData.description_user
        })
        .catch(error => console.log(error.response))
    },

    computed:{
        
        btnDisabled(){
            if(this.inputUserCurrentPassword.length > 0 && this.inputUserNewPassword.length > 0){
                return false;
            } else {
                return true;
            }
        },
    },

    methods:{
        previewImage(event) {
            this.validBtnProfilePic = true;
            this.cancelBtnProfilePic = true;
            this.selectedFile = event.target.files[0]
            // Reference to the DOM input element
            let input = event.target;
            // Ensure that you have a file before attempting to read it
            if (input.files && input.files[0]) {
                // create a new FileReader to read this image and convert to base64 format
                let reader = new FileReader();
                // Define a callback function to run, when FileReader finishes its job
                reader.onload = (e) => {
                    // Note: arrow function used here, so that "this.imageTempUrl" refers to the imageTempUrl of Vue component
                    // Read image as base64 and set to imageTempUrl
                    this.imageTempUrl = e.target.result;
                }
                // Start the reader job - read file as a data url (base64 format)
                reader.readAsDataURL(input.files[0]);
            }
        },


        modifyProfilePic(){
            let formData = new FormData()
            formData.append('userId', this.getUserIdFromLocalStorage());
            formData.append('image', this.selectedFile);

            axios.put(`http://localhost:3000/api/user/profile-pic/${this.getUserIdFromLocalStorage()}`, 
            formData, 
            { headers: {
                    Authorization: `Bearer ${this.getTokenFromLocalStorage()}`,
                    'Content-Type': 'multipart/form-data',
                }
            })
            .then(response => {

                this.errorMsgProfilePic = null;
                this.successMsgProfilePic = response.data.message;

                axios.get(`http://localhost:3000/api/user/${this.getUserIdFromLocalStorage()}`,{
                    headers: { Authorization: `Bearer ${this.getTokenFromLocalStorage() }`}
                })
                .then(response => {

                    this.profilePicUser = response.data.result[0].profile_pic_user
                })
                .catch(error => console.log(error.response))

            })
            .catch(error => {
                console.log(error)
                this.errorMsgProfilePic = error.response.data.notValid;
            });
        },


        cancelModifyProfilePic(){
            this.reloadPage()
        },

        modifyUserDescription(){
            axios.put(`http://localhost:3000/api/user/description/${this.getUserIdFromLocalStorage()}`, 
            { inputUserDescription: this.inputUserDescription },
            {
                headers: { Authorization: `Bearer ${this.getTokenFromLocalStorage() }`}            
            })
            .then(res => {
                this.errorMsgDescription = null;
                this.successMsgDescription = res.data.message;

                axios.get(`http://localhost:3000/api/user/${this.getUserIdFromLocalStorage()}`,{
                    headers: { Authorization: `Bearer ${this.getTokenFromLocalStorage() }`}
                })
                .then(res => {

                    this.userDescription = res.data.result[0].description_user
                })
                .catch(error => console.log(error.response))

            })
            .catch(err => {
                console.log(err)
                this.errorMsgDescription = err.response.data.notValid;
            })
        },

        modifyPassword(){

            axios.put(`http://localhost:3000/api/user/password/${this.getUserIdFromLocalStorage()}`, 
            { inputUserCurrentPassword: this.inputUserCurrentPassword, inputUserNewPassword: this.inputUserNewPassword},
            { headers: { 
                Authorization: `Bearer ${this.getTokenFromLocalStorage() }`}})
            .then(res => {
                this.errorMsgCurrentPassword = null;
                this.errorMsgNewPassword = null;
                this.successMsgPassword = res.data.message;
                this.inputUserCurrentPassword = ''
                this.inputUserNewPassword = ''
            })
            .catch(err => {
                console.log(err.response);
                this.errorMsgCurrentPassword = err.response.data.notValid;
                this.errorMsgNewPassword = err.response.data.notValid;
                this.inputUserCurrentPassword = ''
                this.inputUserNewPassword = ''
            })

        },

        deleteAccount(){
            const confirmMsgDeleteAccount = confirm('Attention, cette action est irreversible. Etes-vous sûr de vouloir supprimer votre compte ?')

            if(confirmMsgDeleteAccount == true){
                axios.delete(`http://localhost:3000/api/user/${this.getUserIdFromLocalStorage()}`, {
                    headers: { Authorization: `Bearer ${this.getTokenFromLocalStorage() }`}
                })
                .then(res => {
                    console.log(res)
                    window.location.href = '/';
                })
                .catch(err => console.log(err))
            } else {
                alert('Suppression de votre compte annulée.')
            }
        },

        reloadPage(){
            window.location.reload()
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

<style scoped lang="scss">


.card{
    display: flex;
    flex-direction: column;
    max-width: 100%;
    width: 80%;
    background: #FFF;
    border-radius: 16px;
    padding:32px;
    margin-top: 50px;
    margin-bottom: 50px;

    .name-user{
        display: flex;
        width: 100%;
        justify-content: center;
        align-items: center;
    }


    .row{
        display: flex;
        justify-content: space-around;
        width: 100%;
        margin: 50px 0 50px 0;


        .div-profile-pic{
            display: flex;
            align-items: center;
            flex-direction: column;
            width: 50%;
            text-align: left;
            padding: 0 40px 0 40px;

            &__title{
                margin-bottom: 20px;                
            }

            &__pic{
                margin-bottom: 20px;
                border-radius:50%;
                width:200px;
                height:200px;
                box-shadow: 3px 3px 5px 0px rgba(0,0,0,0.75);
                -webkit-box-shadow: 3px 3px 5px 0px rgba(0,0,0,0.75);
                -moz-box-shadow: 3px 3px 5px 0px rgba(0,0,0,0.75);
            }

            &__input{
                display: none;
            }
            &__label {
                padding: 6px 12px;
                cursor: pointer;
                border-radius: 5px;
                color: #FFF;
                background: #2196F3;
                transition: .4s background-color;
                font-weight: 800;
                font-size: 14px;
                border: none;
            }

            &__label:hover{
                background: #1976D2;
                color: #FFF;
                transition-duration: .2s;
                border: none;
            }

            .group-btn{
                width: 100%;
                display: flex;
                justify-content: center;

                &__btn{
                    padding: 6px 12px;
                    cursor: pointer;
                    border-radius: 5px;
                    color: #FFF;
                    transition: .4s background-color;
                    font-size: 14px; 
                    border: none; 
                    margin: 0 5px 0 5px; 
                }
                
            }
        }  

        .div-user-information{
            width: 50%;
            text-align: left;
            padding: 0 40px 0 40px;

            .under-div-user-information, .under-div-user-description{
                display: flex;
                flex-direction: column;
                margin-bottom: 20px;

                &__title{
                    margin-bottom: 10px;
                }

                &__description{
                    margin-bottom: 20px;
                }
                
                &__message-input{
                    width: 100%;
                    padding: 18px;
                    border: none;
                    border-radius: 9px;
                    background: #f2f2f2;
                    font-weight: 500;
                    font-size: 16px;
                    flex: 1;
                    min-width: 100px;
                    color: black;
                    font-family: Avenir, Helvetica, Arial, sans-serif;
                }

                &__success-message, &__error-message{
                    margin-top: 10px;
                    margin-bottom: 10px;
                    text-align: center;
                }


            }


        }
        
        .div-update-password{
            display: flex;
            flex-direction: column;
            width: 50%;
            padding: 0 40px 0 40px;

            &__title{
                margin-bottom: 20px;
            }

            .div-password{
                display: flex;
                flex-direction: column;
                text-align: left;

                &__label{
                    margin-bottom: 10px;
                }

                &__input{
                    width: 100%;
                    padding: 10px;
                    border: none;
                    border-radius: 9px;
                    background: #f2f2f2;
                    font-weight: 500;
                    font-size: 16px;
                    flex: 1;
                    min-width: 100px;
                    color: black;
                    font-family: Avenir, Helvetica, Arial, sans-serif;
                    margin-bottom: 20px;
                }
                &__error-message{
                    margin-bottom: 20px;
                }
                &__success-message{
                    margin-top: 20px;
                    text-align: center;
                }                
            }
        }

        .div-delete-account{
            width: 50%;
            padding: 0 40px 0 40px;

            &__title{
                margin-bottom: 20px;
            }
        }             
    }




}

</style>