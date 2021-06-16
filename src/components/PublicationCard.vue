<template>

    <div class="container-publications">

        <div class="publication">
            <div class="container-publication">
            
                <div class="header-publication">
                    <div class=profile-pic-section>
                        <img class="profile-pic-section__author-pic" :src="authorPublicationData.profile_pic_user">
                    </div>
                    <div class="publication-info">
                        <p class="publication-info__author-name"> {{ authorPublicationData.first_name_user }} {{ authorPublicationData.last_name_user }}</p>
                        <p class="publication-info__date">{{ publicationData.createdAt }}</p>
                        <p v-if="getUserIdFromLocalStorage() == publicationData.user_id_publication" class="publication-info__delete" @click="deletePublication()">X</p>
                    </div>          
                </div> 

                <div class="content-section">
                    <div class="publication-text">
                        <p class="publication-text__message">{{ publicationData.message_publication }}</p>
                    </div>

                    <div class="publication-file">
                        <img v-if="publicationData.image_publication != ''" class="publication-file__image" :src="publicationData.image_publication">
                    </div>
                </div>

                <div class="commitment-section">
                    <div  v-if="arrayPublicationLikedByUser && arrayPublicationLikedByUser.includes(publicationId)" class="commitment-section-row">
                        <img @click="onLikePublication()" class="commitment-section-row__icon commitment-section-row__liked-color" src="../assets/heart-solid.svg"><span class="commitment-section-row__liked-color">{{ likesPublication.length }}</span> 
                    </div>
                    <div v-else class="commitment-section-row">
                        <img @click="onLikePublication()" class="commitment-section-row__icon" src="../assets/heart-regular.svg"><span>{{ likesPublication.length }}</span> 
                    </div>


                    <div v-if="comments.length < 2" class="commitment-section-row">
                        <img class="commitment-section-row__icon" src="../assets/comment-solid.svg"><span>{{ comments.length }}</span>
                    </div>
                    <div v-else class="commitment-section-row">
                        <img class="commitment-section-row__icon" src="../assets/comment-solid.svg"><span>{{ comments.length }}</span>
                    </div>

                    <!--<div class="commitment-section-row">
                        <img class="commitment-section-row__icon" src="../assets/share-solid.svg"><span>PARTAGER</span>
                    </div>-->
                </div>
                <hr>
                <div class="commentary-section">

                    <h2>Commentaires</h2>

                    <div :key="index" v-for="(comment, index) in comments" class="publication-list-commentary-container">
                        <div class=profile-pic-section>
                            <img class="profile-pic-section__author-pic" :src="comment.User.profile_pic_user">
                        </div>
                        <div class="user-commentary-container">
                            <div class="commentary-info">
                                <p class="commentary-info__author-name">{{ comment.User.first_name_user }} {{ comment.User.last_name_user }}</p>
                                <p class="commentary-info__date">{{ comment.createdAt }}</p>
                                <p v-if="getUserIdFromLocalStorage() == comment.user_id_comment" class="commentary-info__delete" @click="deleteOneComment(comment.id)">X</p>
                            </div> 
                            <div class="message-user-commentary">
                                <p>{{ comment.comment }}</p>
                            </div>
                        </div>
                    </div>
                    <div class="new-commentary-container">
                        <div class=profile-pic-section>
                            <img class="profile-pic-section__author-pic" :src="profilePicUser">
                        </div>
                        <div class="new-commentary">
                            <textarea v-model="addNewComment" class="new-commentary__input-text" name="" placeholder="Ecrivez un commentaire..."></textarea><span><button @click="publishNewComment(publicationId)" class="button">Publier</button></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {

    name: 'Publication',

    components: {

    },

    props: {
        publicationId: Number,
    },

    data(){
        return {
            publicationData: [],
            authorPublicationData: [],

            likesPublication: [],
            arrayPublicationLikedByUser: [],

            comments: [],
            profilePicUser: '',
            addNewComment: '',
        }
    },

    mounted(){
        this.getOnePublication()
        this.getLikesOfOnePublication()
        this.getPublicationsLikedByOneUser()
        this.getCommentsOfOnePublication()
        this.getUserLoggedInformations()
    },



    methods:{


        getOnePublication(){

            axios.get(`http://localhost:3000/api/publication/${this.publicationId}`,{
                headers: { Authorization: `Bearer ${this.getTokenFromLocalStorage()}` }
            })
            .then(res => {
                this.publicationData = res.data
                this.authorPublicationData = res.data.User
            }) 
            .catch(error => {
                console.log(error.response);
            })
        },
        

        deletePublication(){
            const confirmMsgDeletePublication = confirm('Etes-vous sûr de vouloir supprimer votre publication ? Attention, cette action est irreversible.')

            if(confirmMsgDeletePublication == true){
                axios.delete(`http://localhost:3000/api/publication/${this.publicationId}`, {
                    headers: { Authorization: `Bearer ${this.getTokenFromLocalStorage()}` }
                })
                .then(() => {
                    this.$emit('updateListOfPublications')
                })
                .catch(error => {
                    console.log(error.response);
                })
            } else {
                alert('Suppression annulée.')               
            }
        }, 




        getLikesOfOnePublication(){

            // Get likes of one publication
            axios.get(`http://localhost:3000/api/like-publication/publication/${this.publicationId}`,{
                headers: { Authorization: `Bearer ${this.getTokenFromLocalStorage()}` }
            })
            .then(res => {
                this.likesPublication = res.data
            }) 
            .catch(error => {
                console.log(error.response);
            })
        },


        getPublicationsLikedByOneUser(){
            // Get Publications Liked by one user
            axios.get(`http://localhost:3000/api/like-publication/user/${this.getUserIdFromLocalStorage()}`,{
                headers: { Authorization: `Bearer ${this.getTokenFromLocalStorage()}` }
            })
            .then(res => {

                this.arrayPublicationLikedByUser = []

                for(let i = 0; i < res.data.length; i++){
                    this.arrayPublicationLikedByUser.push(res.data[i].publication_id)
                }
                localStorage.setItem('groupomania_publicationsLiked', JSON.stringify(this.arrayPublicationLikedByUser))
            }) 
            .catch(error => {
                console.log(error.response);
            })
        },


        onLikePublication(){

            axios.post(`http://localhost:3000/api/like-publication/publication/${this.publicationId}`,{},{
                headers: { Authorization: `Bearer ${this.getTokenFromLocalStorage() }`}
            })
            .then(() => {
                this.getLikesOfOnePublication()
                this.getPublicationsLikedByOneUser()
            })
            .catch(err => {
                console.log(err.response);
            })
        },



        getCommentsOfOnePublication(){

            axios.get(`http://localhost:3000/api/comment/publication/${this.publicationId}`,{
                headers: { Authorization: `Bearer ${this.getTokenFromLocalStorage()}` }
            })
            .then(res => {
                this.comments = res.data
            }) 
            .catch(error => {
                console.log(error.response);
            })
        },

        publishNewComment(){

            axios.post(`http://localhost:3000/api/comment/publication/${this.publicationId}`, 
            { comment : this.addNewComment},
            { headers: { Authorization: `Bearer ${this.getTokenFromLocalStorage() }`}})
            .then(res => {
                console.log(res)
                this.addNewComment = ''

                axios.get(`http://localhost:3000/api/comment/publication/${this.publicationId}`,{
                    headers: { Authorization: `Bearer ${this.getTokenFromLocalStorage()}` }
                })
                .then(res => {
                    this.comments = res.data
                }) 
                .catch(error => {
                    console.log(error.response);
                })
            })
            .catch(err => {
                console.log(err.response);
            })
        },


        deleteOneComment(commentId){

            const confirmMsgDeletePublication = confirm('Etes-vous sûr de vouloir supprimer votre commentaire ? Attention, cette action est irreversible.')

            if(confirmMsgDeletePublication == true){

                axios.delete(`http://localhost:3000/api/comment/${commentId}`, 
                { headers: { Authorization: `Bearer ${this.getTokenFromLocalStorage()}`}})
                .then(() => {

                    axios.get(`http://localhost:3000/api/comment/publication/${this.publicationId}`,{
                        headers: { Authorization: `Bearer ${this.getTokenFromLocalStorage()}` }
                    })
                    .then(res => {
                        this.comments = res.data
                    }) 
                    .catch(error => {
                        console.log(error.resonse);
                    })
                })
                .catch(err => {
                    console.log(err.response);
                })
            } else {
                alert('Suppression annulée.') 
            }
        },

        getUserLoggedInformations(){

            axios.get(`http://localhost:3000/api/user/${this.getUserIdFromLocalStorage()}`,{
                headers: { Authorization: `Bearer ${this.getTokenFromLocalStorage() }`}
            })
            .then(response => {
                this.profilePicUser = response.data.profile_pic_user
            })
            .catch(error => console.log(error.response))
        },



        replaceSymbol(message){
            return message.split('&apos;').join("'")
        },


        getTokenFromLocalStorage(){
            return JSON.parse(localStorage.getItem('groupomania_token'))
        },

        getUserIdFromLocalStorage(){
            return JSON.parse(localStorage.getItem('groupomania_userId'))
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

                margin-bottom: 15px;

                .commitment-section-row{
                    display: flex;
                    align-items: center;
                    cursor: pointer;
                    margin-right: 50px;

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