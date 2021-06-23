<template>
    <div class="settings-user-card-container">
        <div class="card">
            <div class="username">
                <h1 class="username__title">{{ firstNameUser }} {{ lastNameUser }}</h1>
            </div>

            <div class="row">
                <div class="section-profile-pic">
                    <h2 class="section-profile-pic__title">Photo de profil</h2>

                    <div class="container-profile-pic">
                        <img v-if="imageTempUrl == null" class="container-profile-pic__pic" :src="profilePicUser" alt="">
                        <img v-else class="container-profile-pic__pic" :src="imageTempUrl"> 
                    </div>



                    <label v-if="validBtnProfilePic == false" class="section-profile-pic__label" for="profilePic">Modifier</label>
                    <input @change="previewImage" id="profilePic" class="section-profile-pic__input" type="file" name="profilePic">
                    
                    <div v-if="validBtnProfilePic == true && cancelBtnProfilePic == true" class="btn-profile-pic">
                        <button @click="modifyProfilePic" class="btn-profile-pic__btn button-primary">Valider</button>
                        <button @click="cancelModifyProfilePic" class="btn-profile-pic__btn button-danger">Annuler</button>
                    </div>
                    <p v-if="successMsgProfilePic != null" class="section-profile-pic__success-message text-success">{{ successMsgProfilePic }}</p> 
                    <p v-if="errorMsgProfilePic != null" class="section-profile-pic__error-message text-danger">{{ errorMsgProfilePic }}</p>
                </div>

                <div class="section-user-information">
                    <div div class="user-information">
                        <h2 class="user-information__title">Email</h2>
                        <p>{{ userEmail }}</p>
                    </div> 
                    <div class="user-bio">
                        <h2 class="user-bio__title">Bio</h2>
                        <p class="user-bio__content-bio">{{ bioUser }}</p>
                        <textarea v-model="inputBioUser" class="user-bio__message-input" rows="5" maxlength="255" placeholder="Ajouter un texte ..."></textarea>
                        <button @click="modifyBioUser" class="button">Modifier ma bio</button>
                        <p v-if="successMsgBio != null" class="user-bio__success-message text-success">{{ successMsgBio }}</p> 
                        <p v-if="errorMsgBio != null" class="user-bio__error-message text-danger">{{ errorMsgBio }}</p>   
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
                    </div>
                    <div class="div-password">
                        <label class="div-password__label" for="new-password">Nouveau mot de passe :</label>
                        <input v-model="inputUserNewPassword" class="div-password__input" type="password" name="new-password" required>
                        <button @click="modifyPassword" v-bind:disabled="btnDisabled == true" v-bind:class="{'button--disabled' : btnDisabled}" class="button">Valider</button>
                        <p v-if="errorMsgCurrentPassword != null" class="div-password__error-message text-danger">{{ errorMsgCurrentPassword }}</p>
                        <p v-if="successMsgPassword != null" class="div-password__success-message text-success">{{ successMsgPassword }}</p>
                    </div>
                </div>
                <div class="div-delete-account">
                    <h2 class="div-delete-account__title">Supprimer mon compte</h2>
                    <button @click="deleteAccount" class="button">Supprimer</button>
                </div>
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

            inputBioUser: '',
            bioUser:'',

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

            successMsgBio: null,
            errorMsgBio: null,

            successMsgProfilePic: null,
            errorMsgProfilePic: null,
        }
    },
    

    mounted(){
        axios.get(`http://localhost:3000/api/user/${this.getUserIdFromLocalStorage()}`,{
            headers: { Authorization: `Bearer ${this.getTokenFromLocalStorage() }`}
        })
        .then(res => {

            this.userData = res.data

            this.profilePicUser = this.userData.profile_pic_user

            this.firstNameUser = this.userData.first_name_user
            this.lastNameUser = this.userData.last_name_user

            this.userEmail = this.userData.email_user
            this.bioUser = this.userData.bio_user
        })
        .catch(error => console.log(error))
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
            formData.append('image', this.selectedFile);

            axios.put(`http://localhost:3000/api/user/profile-pic`, formData, { 
                headers: {
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
                    this.validBtnProfilePic = false;
                    this.profilePicUser = response.data.profile_pic_user
                })
                .catch(error => { 
                    console.log(error.response)
                })

            })
            .catch(error => {
                this.successMsgProfilePic = null;
                console.log(error.response)
            });
        },


        cancelModifyProfilePic(){
            this.reloadPage()
        },

        modifyBioUser(){
            axios.put(`http://localhost:3000/api/user/bio`, 
            { bioUser: this.inputBioUser },
            {
                headers: { Authorization: `Bearer ${this.getTokenFromLocalStorage() }`}            
            })
            .then(res => {
                this.errorMsgBio = null;
                this.successMsgBio = res.data.message;


                axios.get(`http://localhost:3000/api/user/${this.getUserIdFromLocalStorage()}`,{
                    headers: { Authorization: `Bearer ${this.getTokenFromLocalStorage() }`}
                })
                .then(res => {
                    this.bioUser = res.data.bio_user
                    this.inputBioUser = ''
                })
                .catch(error => {
                    console.log(error.response)
                })

            })
            .catch(err => {
                this.successMsgBio = null
                console.log(err.response)
                this.errorMsgBio = err.response.data.message;
            })
        },

        modifyPassword(){

            axios.put(`http://localhost:3000/api/user/password`, 
            { 
                inputUserCurrentPassword: this.inputUserCurrentPassword, 
                inputUserNewPassword: this.inputUserNewPassword
            },
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
                this.successMsgPassword = null;
                this.errorMsgCurrentPassword = err.response.data.notValid;
                this.errorMsgNewPassword = err.response.data.notValid;
                this.inputUserCurrentPassword = ''
                this.inputUserNewPassword = ''
            })

        },

        deleteAccount(){
            const confirmMsgDeleteAccount = confirm('Attention, cette action est irreversible. Etes-vous sûr de vouloir supprimer votre compte ?')

            if(confirmMsgDeleteAccount == true){
                axios.delete(`http://localhost:3000/api/user/delete-account`, {
                    headers: { Authorization: `Bearer ${this.getTokenFromLocalStorage() }`}
                })
                .then(() => {

                    window.localStorage.removeItem('groupomania_token');
                    window.localStorage.removeItem('groupomania_publicationsLiked');
                    window.localStorage.removeItem('groupomania_userId');

                    window.location.href = '/';

                })
                .catch(error => console.log(error.response))
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

.settings-user-card-container{
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    .card{
        display: flex;
        flex-direction: column;
        width: 80%;
        background: #FFF;
        border-radius: 16px;
        padding:32px;
        margin-top: 50px;
        margin-bottom: 50px;

        .username{
            display: flex;
            width: 100%;
            justify-content: center;
            align-items: center;
        }

        .row{
            display: flex;
            flex-wrap: wrap;
            justify-content: space-around;
            width: 100%;
            margin: 50px 0 50px 0;


            .section-profile-pic{
                display: flex;
                flex: auto;
                align-items: center;
                flex-direction: column;
                text-align: left;
                margin-bottom: 50px;
                padding: 0 20px;
                

                .container-profile-pic{
                    display: flex;

                    &__pic{
                        margin-bottom: 20px;
                        border-radius:50%;
                        width:20vw;
                        height:20vw;
                        box-shadow: 3px 3px 5px 0px rgba(0,0,0,0.75);
                        -webkit-box-shadow: 3px 3px 5px 0px rgba(0,0,0,0.75);
                        -moz-box-shadow: 3px 3px 5px 0px rgba(0,0,0,0.75);
                    }
                }
                
                &__title{
                    display: flex;
                    justify-content: center;
                    width: 100%;
                    margin-bottom: 20px; 
                    white-space: nowrap;           
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

                .btn-profile-pic{
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

            .section-user-information{
                display: flex;
                flex: auto;
                flex-direction: column;
                text-align: left;
                padding: 0 20px;
                
                .user-information, .user-bio{
                    width: 100%;
                    display: flex;
                    flex-direction: column;
                    margin-bottom: 20px;

                    &__title{
                        margin-bottom: 10px;
                    }

                    &__content-bio{
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
                margin-bottom: 50px;
                padding: 0 20px;

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

                    &__error-message, &__success-message{
                        margin-top: 20px;
                        margin-bottom: 20px;
                        text-align: center;
                    }              
                }
            }

            .div-delete-account{
                padding: 0 20px;

                &__title{
                    margin-bottom: 20px;
                }
            }             
        }
    }
}



</style>