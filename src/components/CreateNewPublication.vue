<template>
    <div class="card">
    <h2 class="card__title">Exprimez-vous :</h2>
    <form class="form-publication" @submit.prevent="createNewPublication" enctype="multipart/form-data">
        <div v-if="imageTempUrl != null " @click="cancelPrevImage" class="div-image-preview">
            <img :src="imageTempUrl" class="div-image-preview__image-preview" alt="Médias">       
        </div>            
        <div class="form-group">
            <textarea v-model="message" class="form-group__message-input" rows="5" maxlength="255" placeholder="Ajouter un texte ..."></textarea>
        </div>
        <div class="form-group">
            <label for="inputUploadImg"><img class="form-group__icon icon" src="../assets/file-image-regular.svg"></label>
            <input @change="previewImage" id="inputUploadImg" class="form-group__file-upload" type="file" name="file" ref="fileInput">  
        </div>
        <div class="row-btn">
            <button class="button">Publier</button>
        </div>
    </form>
  </div>

</template>

<script>
import axios from 'axios';

export default {

    data(){
        return {
            message: "",
            file: "",

            imageTempUrl: null,
            selectedFile: null,
        }
    },
    methods:{

        createNewPublication(){
            let formData = new FormData()
            formData.append('userId', this.getUserIdFromLocalStorage());
            formData.append('message', this.replaceSymbol(this.message));
            formData.append('image', this.selectedFile);

            axios.post('http://localhost:3000/api/publication', formData, {
                headers: {
                    Authorization: `Bearer ${this.getTokenFromLocalStorage()}`,
                    'Content-Type': 'multipart/form-data',
                }
            })
            .then(response => {
                console.log(response)
                this.message = ''

                // Get publications
                axios.get('http://localhost:3000/api/publication',{
                    headers: { Authorization: `Bearer ${this.getTokenFromLocalStorage()}` }
                })
                .then(response => {
                    console.log(response)
                    this.$emit('event-update-publications', { publications: response.data})
                }) 
                .catch(error => {
                    console.log(error.response);
                })
            })
            .catch(error => console.log(error));
        },

        previewImage(event) {
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

        cancelPrevImage(){
            document.getElementById('inputUploadImg').value = ""
            this.imageTempUrl = null          
        },


        replaceSymbol(message){ 
            return message.split("'").join('&apos;')
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

.card {
    max-width: 100%;
    width: 900px;
    background:white;
    border-radius: 16px;
    padding:30px 20px;
    margin-top: 25px;
    margin-bottom: 25px;
    display: flex;
    flex-direction: column;

    &__title {
        text-align: left;
        font-weight: 800;
        margin-bottom: 20px;
    }

    .form-publication{

        .div-image-preview{
            margin-top: 20px; 
            margin-bottom: 20px; 
            width: 25%;
            position: relative;
            display: flex;

            &__image-preview{
                width: 100%;
                border-radius: 15px;
                z-index: 1;
            }            
        }

        .div-image-preview::before{
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10;
            content:'X';
            color: white;
            background: rgba(0, 0, 0, 0.788);
            border-radius: 50%;
            padding: 3px;
            width: 25px;
            height: 25px;
            font-weight: bold;
            position: absolute;
            left: 5px;
            top: 5px;
            cursor: pointer;
        }

        .form-group{
            display: flex;
            margin: 20px 0 20px 0;

            &__file-upload{
                display: none;
            }       
                 
            &__icon{
                width: 20px;
                filter: invert(18%) sepia(3%) saturate(36%) hue-rotate(328deg) brightness(91%) contrast(81%);
                cursor:pointer;     
            }

            &__icon:hover{
                filter: invert(35%) sepia(100%) saturate(841%) hue-rotate(182deg) brightness(93%) contrast(99%);
            }

            &__message-input{
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
        }

        .row-btn{
            margin-top: 20px;
        }
    }
}


</style>