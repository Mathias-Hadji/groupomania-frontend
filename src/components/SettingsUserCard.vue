<template>
    <div class="settings-user-card-container">
        <div class="card">
            <header class="username">
                <h1 class="username__title">{{ getFirstNameUserFromVueX }} {{ getLastNameUserFromVueX }}</h1>
            </header>

            <section class="row">
                <section class="section-profile-pic">
                    <h2 class="section-profile-pic__title">Photo de profil</h2>

                    <div class="container-profile-pic">
                        <img v-if="imageTempUrl == null" class="container-profile-pic__pic" :src="getProfilePicUserFromVueX" alt="image de profil">
                        <img v-else class="container-profile-pic__pic" :src="imageTempUrl" alt="image de profil"> 
                    </div>

                    <label v-if="validBtnProfilePic == false" class="section-profile-pic__label" for="profilePic">Modifier</label>
                    <input @change="previewImage" id="profilePic" class="section-profile-pic__input" type="file" name="profilePic">
                    
                    <div v-if="validBtnProfilePic == true && cancelBtnProfilePic == true" class="btn-profile-pic">
                        <button @click="modifyProfilePic" class="btn-profile-pic__btn button-primary">Valider</button>
                        <button @click="cancelModifyProfilePic" class="btn-profile-pic__btn button-danger">Annuler</button>
                    </div>
                    <p v-if="successMsgProfilePic != null" class="section-profile-pic__success-message text-success">{{ successMsgProfilePic }}</p> 
                </section>

                <section class="section-user-information">
                    <div div class="user-information">
                        <h2 class="user-information__title">Email</h2>
                        <p>{{ getEmailUserFromVueX }}</p>
                    </div> 

                    <div class="user-bio">
                        <h2 class="user-bio__title">Bio</h2>
                        <p class="user-bio__content-bio">{{ getBioUserFromVueX }}</p>
                        <textarea v-model="inputBioUser" class="user-bio__message-input" rows="5" maxlength="255" placeholder="Ajouter un texte ..."></textarea>
                        <button @click="modifyBioUser" class="button">Modifier ma bio</button>
                        <span>Nombre de carctères restants: [{{ 255 - inputBioUser.length}}]</span>
                        <p v-if="successMsgInputBioUser != null" class="user-bio__success-message text-success">{{ successMsgInputBioUser }}</p> 
                        <p v-if="errorMsgInputBioUser != null" class="user-bio__success-message text-success">{{ errorMsgInputBioUser }}</p> 
                    </div>
                </section>
            </section>
            <hr>

            <section class="row">
                <section class="section-update-password">
                    <h2 class="section-update-password__title">Modifier mon mot de passe</h2>
                    <div class="update-password">
                        <label class="update-password__label" for="current-password">Mot de passe actuel :</label>
                        <input v-model="inputUserCurrentPassword" class="update-password__input" type="password" name="current-password" required>
                    </div>
                    <div class="update-password">
                        <label class="update-password__label" for="new-password">Nouveau mot de passe :</label>
                        <input v-model="inputUserNewPassword" class="update-password__input" type="password" name="new-password" required>
                        <button @click="modifyPassword" v-bind:disabled="btnDisabled == true" v-bind:class="{'button--disabled' : btnDisabled}" class="button">Valider</button>
                        <p v-if="errorMsgCurrentPassword != null" class="update-password__error-message text-danger">{{ errorMsgCurrentPassword }}</p>
                        <p v-if="successMsgPassword != null" class="update-password__success-message text-success">{{ successMsgPassword }}</p>
                    </div>
                </section>

                <section class="section-delete-account">
                    <h2 class="section-delete-account__title">Supprimer mon compte</h2>
                    <button @click="deleteAccount" class="button">Supprimer</button>
                </section>
            </section>
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
            inputBioUser: '',
            successMsgInputBioUser: null,
            errorMsgInputBioUser: null,

            inputUserCurrentPassword: '',
            inputUserNewPassword: '',
            successMsgPassword: null,
            errorMsgCurrentPassword: null,
            errorMsgNewPassword:null,

            profilePicUser: '',
            selectedFile: null,
            imageTempUrl: null,
            validBtnProfilePic: false,
            cancelBtnProfilePic: false,
            successMsgProfilePic: null,
        }
    },

    computed:{
        ...mapState({
            getUserIdFromVueX: 'userIdFromVueX',
            getUserTokenFromVueX: 'tokenUserFromVueX',
            getFirstNameUserFromVueX: 'firstNameUserFromVueX',
            getLastNameUserFromVueX: 'lastNameUserFromVueX',
            getEmailUserFromVueX: 'emailUserFromVueX',
            getBioUserFromVueX: 'bioUserFromVueX',
            getProfilePicUserFromVueX: 'profilePicUserFromVueX',
        }),
        
        btnDisabled(){
            if(this.inputUserCurrentPassword.length > 0 && this.inputUserNewPassword.length > 0){
                return false;
            } else {
                return true;
            }
        },
    },


    methods:{

        async modifyBioUser(){
            try {
                const response = await userService.modifyBioUser(this.getUserIdFromVueX, this.getUserTokenFromVueX, this.inputBioUser.trim())

                this.$store.commit('SET_BIO_USER_FROM_VUEX', response.data.bio)
                this.inputBioUser = ''
                this.successMsgInputBioUser = response.data.successMessage;

                setTimeout(() => {
                    this.successMsgInputBioUser = '';
                }, 2000);

            } catch(err) {
                console.log(err.response.data)
            }
        },


        async modifyProfilePic(){
            try {
                let formData = new FormData();
                formData.append('userId', this.getUserIdFromVueX);
                formData.append('image', this.selectedFile);

                const response = await userService.modifyProfilePicUser(this.getUserIdFromVueX, formData, this.getUserTokenFromVueX);
                this.$store.commit('SET_PROFILE_PIC_USER_FROM_VUEX', response.data.profilePic);
                this.successMsgProfilePic =  response.data.successMessage;

                setTimeout(() => {
                    this.successMsgProfilePic = '';
                }, 2000);

                this.validBtnProfilePic = false;
                this.cancelBtnProfilePic = false;

            } catch(err){
                console.log(err.response.data)
            }
        },

        async modifyPassword(){
            try {
                const response = await userService.modifyPasswordUser(this.getUserIdFromVueX, this.getUserTokenFromVueX, this.inputUserCurrentPassword, this.inputUserNewPassword);
                
                this.errorMsgCurrentPassword = ''
                this.inputUserCurrentPassword = ''
                this.inputUserNewPassword = ''

                this.successMsgPassword =  response.data.successMessage;

                setTimeout(() => {
                    this.successMsgPassword = '';
                }, 2000);

            } catch(err) {
                this.successMsgPassword =  '';

                this.errorMsgCurrentPassword = err.response.data;
                this.errorMsgNewPassword = err.response.data;

                setTimeout(() => {
                    this.errorMsgCurrentPassword = '';
                    this.errorMsgNewPassword = '';
                }, 2000);
            }
        },

        async deleteAccount(){
            try {
                const confirmMsgDeleteAccount = confirm('Attention, cette action est irreversible. Etes-vous sûr de vouloir supprimer votre compte ?');

                if(confirmMsgDeleteAccount){
                    await sessionService.deleteUserSession(this.getUserIdFromVueX, this.getUserTokenFromVueX);
                    await userService.deleteOneUserAccount(this.getUserIdFromVueX, this.getUserTokenFromVueX);
                    window.localStorage.removeItem('groupomania_token');
                    window.localStorage.removeItem('groupomania_publicationsLiked');
                    window.location.href = '/';

                } else {
                    alert('Suppression de votre compte annulée.')
                }

            } catch(err) {
                console.log(err.response.data)
            }
        },

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

        cancelModifyProfilePic(){
            window.location.reload()
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
        width: 900px;
        background: #FFF;
        border-radius: 16px;
        padding:32px;
        margin-left: 20px;
        margin-right: 20px;
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
                        width:150px;
                        height:150px;
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
            
            .section-update-password{
                display: flex;
                flex-direction: column;
                margin-bottom: 50px;
                padding: 0 20px;

                &__title{
                    margin-bottom: 20px;
                }

                .update-password{
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

            .section-delete-account{
                padding: 0 20px;

                &__title{
                    margin-bottom: 20px;
                }
            }             
        }
    }
}



</style>