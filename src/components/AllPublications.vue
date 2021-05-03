<template>
    <div>
        <div :key="index" v-for="(publication, index) in publications" class="publication">       
            <div class=profile-pic-section>
                <img class="profile-pic-section__author-pic" :src="publication.profile_pic_user">
            </div>
            <div class="content-section">
                <div class="publication-header">
                    <p class="publication-header__author-name">{{ publication.first_name_user }} {{ publication.last_name_user }}</p>
                    <p class="publication-header__date">{{ publication.date_publication_fr }} </p>
                    <p class="publication-header__delete" @click="deletePublication(publication.id)">Supprimer</p>     
                </div>
                <div class="publication-content">
                    <p class="publication-content__message">{{ replaceSymbol(publication.message_publication) }}</p>
                    <img class="publication-content__image" :src="publication.image_publication">
                </div>

                <div class="publication-commitment">
                    <div class="commitment-row">
                        <img class="commitment-row__icon" src="../assets/heart-regular.svg"><span>8 (Default)</span>
                    </div>
                    <div class="commitment-row">
                        <img class="commitment-row__icon" src="../assets/comment-solid.svg"><span>3 (Default)</span>
                    </div>
                    <div class="commitment-row">
                        <img class="commitment-row__icon" src="../assets/share-solid.svg"><span>PARTAGER</span>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
import axios from 'axios';


export default {
    data(){
        return {
            publications: null,
            userId: null,
        }
    },

    mounted(){
        axios.get('http://localhost:3000/api/publication',{
            headers: { Authorization: `Bearer ${this.getTokenFromLocalStorage()}` }
        })
        .then(response => {
            console.log(response);

            this.publications = response.data.reverse();

        })
        .catch(error => {
            console.log(error.response);
        })
    },

    methods:{
        replaceSymbol(message){
            return message.split('&apos;').join("'")
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

        deletePublication(publicationId){
            axios.delete(`http://localhost:3000/api/publication/${publicationId}`, {
                headers: { Authorization: `Bearer ${this.getTokenFromLocalStorage()}` }
            })
            .then(response => {
                console.log(response);
                this.reloadPage()
            })
            .catch(error => {
                console.log(error.response);
            })
        }
    },

}
</script>

<style scoped lang="scss">

.publication {
    max-width: 100%;
    width: 900px;
    background:white;
    border-radius: 16px;
    padding:30px 10px;
    margin-top: 25px;
    margin-bottom: 25px;
    display: flex;


    .profile-pic-section{
        width: 10%;
        margin-left: 12px;
        margin-right: 12px;

        .profile-pic-section__author-pic{
            width: 50px;
        }        
    }

    .content-section{
        width: 80%;
    }

    .publication-header{
        display: flex;
        position: relative;
        align-items: center;
        margin-bottom: 10px;

        &__author-name{
            margin-right: 20px;
            font-weight: bold;
        }

        &__delete{
            font-size: 14px;
            position: absolute;
            right: 0;
            color: #2196F3;
            border: 1px solid #2196F3;
            border-radius: 5px;
            padding: 3px;
            cursor: pointer;
            transition-duration: 0.2s;
        }

        &__delete:hover{
            background: #1977D2;
            color: #FFF;
        }
    }

    .publication-content{
        display: flex;
        flex-direction: column;

        .publication-content__message{
            text-align: left;
            margin-bottom: 10px;
        }

        .publication-content__image{
            width: 100%;
            margin-bottom: 10px;
            border-radius: 7px;
        }       
    }

    .publication-commitment{
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: 20px;

        .commitment-row{
            display: flex;
            align-items: center;

            &__icon{
                filter: invert(18%) sepia(3%) saturate(36%) hue-rotate(328deg) brightness(91%) contrast(81%);         
                width: 20px;
                margin-right: 10px;
            }
        }
    }
}

</style>