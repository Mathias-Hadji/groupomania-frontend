<template>
    <div class="commentary-section">
        <h2>Commentaires</h2>

        <div :key="index" v-for="(comment, index) in commentsPublication" class="publication-list-commentary-container">
            <div class=profile-pic-section>
                <img class="profile-pic-section__author-pic" src="">
            </div>
            <div class="user-commentary-container">
                <div class="commentary-info">
                    <p class="commentary-info__author-name">{{  }} {{  }}</p>
                    <p class="commentary-info__date"></p>
                    <p class="commentary-info__delete" @click="deleteOneComment(commentaire.id)">X</p>  
                </div> 
                <div class="message-user-commentary">
                    <p>{{ comment.comment }}</p>
                </div>
            </div>
        </div>
        <div class="new-commentary-container">
            <div class=profile-pic-section>
                <img class="profile-pic-section__author-pic" src="">
            </div>
            <div class="new-commentary">
                <textarea v-model="addNewComment" class="new-commentary__input-text" name="" placeholder="Ecrivez un commentaire..."></textarea><span><button @click="publishNewComment(publication)" class="button">Publier</button></span>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';


export default {
    data(){
        return {
            commentsPublication: '',
            messages: '',

            addNewComment: '',
        }
    },

    mounted(){

        // Get publications
        axios.get('http://localhost:3000/api/comment-publication/505',{
            headers: { Authorization: `Bearer ${this.getTokenFromLocalStorage()}` }
        })
        .then(res => {
            this.commentsPublication = res.data
        }) 
        .catch(error => {
            console.log(error.response);
        })
    },



    methods:{

        deleteOneComment(commentId){

            axios.delete(`http://localhost:3000/api/publication/comment/${commentId}`, 
            { headers: { Authorization: `Bearer ${this.getTokenFromLocalStorage()}`}})
            .then(res => {
                console.log(res)
            })
            .catch(err => {
                console.log(err.response);
            })
        },

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

        getPublicationsLikedFromLocalStorage(){
            return JSON.parse(localStorage.getItem('groupomania_publicationsLiked'))
        },



        deletePublication(publicationId){
            const confirmMsgDeleteAccount = confirm('Attention, cette action est irreversible. Etes-vous sûr de vouloir supprimer votre publication ?')

            if(confirmMsgDeleteAccount == true){
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
            } else{
                alert('Suppression de la publication annulée.')               
            }
        },       
    },

}
</script>

<style scoped lang="scss">

.user-commentary-container{
    width: 100%;
    display: flex;
    flex-direction: column;
}

.publication-info, .commentary-info{
    width: 100%;
    display: flex;
    position: relative;
    align-items: center;
    margin-bottom: 10px;

    &__author-name{
        margin-right: 20px;
        font-weight: bold;
    }

    &__delete{
        font-size: 22px;
        position: absolute;
        right: 0;
        color: #474747;
        font-weight: bold;
        cursor: pointer;
        transition-duration: 0.2s;
    }

    &__delete:hover{
        font-size: 25px;
    }
}

.profile-pic-section{
    margin-right: 12px;

    &__author-pic{
        width: 50px;
        height: 50px;
        border-radius: 50%;
    }        
}

.container-publications{
    width: 80%;
    display: flex;
    flex-direction: column;

    .publication {
        width: 100%;
        background: #fff;
        border-radius: 16px;
        margin: 25px 0 25px 0;
        display: flex;
        flex-direction: column;
        

        .container-publication{
            margin: 50px;
            display: flex;
            flex-direction: column;

            .header-publication{
                display: flex;
                align-items: center;
                width: 100%;
                margin-bottom: 25px;
            }

            .content-section{
                width: 100%;
                margin-bottom: 25px;

                .publication-text{
                    margin-bottom: 25px;

                    &__message{
                        text-align: left;
                        font-size: 25px;
                    }     
                }
            }



            .publication-file{
                width: 100%;
                margin-bottom: 25px;

                .publication-file__image{
                    width: 100%;
                    border-radius: 7px;            
                }
            }

            .commitment-section{
                display: flex;
                align-items: center;
                justify-content: space-between;
                margin-bottom: 15px;

                .commitment-section-row{
                    display: flex;
                    align-items: center;
                    cursor: pointer;

                    &__icon{
                        filter: invert(18%) sepia(3%) saturate(36%) hue-rotate(328deg) brightness(91%) contrast(81%);         
                        width: 20px;
                        margin-right: 10px;
                    }
                }
            }

            .commentary-section{
                display: flex;
                flex-direction: column;
                width: 100%;
                margin-top: 25px;

                h2{
                    margin-bottom: 25px;
                }

                .publication-list-commentary-container{
                    display: flex;
                    width: 100%;
                    margin-bottom: 25px;

                }

                .new-commentary-container{
                    display: flex;
                    align-items: center;
                    width: 100%;

                    .new-commentary{
                        display: flex;
                        align-items: center;
                        width: 100%;

                        &__input-text{
                            padding-left: 10px;
                            padding-top: 10px;
                            display: flex;
                            border: none;
                            border-radius: 9px;
                            background: #f2f2f2;
                            font-weight: 500;
                            font-size: 16px;
                            flex: 1;
                            color: black;
                            font-family: Avenir, Helvetica, Arial, sans-serif;

                        }
                    }
                }
            }
        }
    }
}



</style>