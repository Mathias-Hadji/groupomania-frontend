<template>
    <article class="publication-card-container">
        <div class="card">
            <div class="main-container">

                <section class="section-author-pic">
                    <div class="author-publication">
                        <img class="author-publication__profile-pic" :src="authorPublicationData.profile_pic_user" alt="image de profil">
                    </div>
                </section>

                <section class="section-content">
                    <div class="container-content">
                        <header class="section-header-publication">
                            <div class="info-publication">
                                <p class="info-publication__author-name"> {{ authorPublicationData.first_name_user }} {{ authorPublicationData.last_name_user }}</p>
                                <p class="info-publication__date">{{ publicationData.createdAt }}</p>
                            </div>        
                            <div class="delete-publication">
                                <img class="delete-publication__icon" width="15" src="../assets/times-solid.svg" v-if="getUserIdFromLocalStorage() == publicationData.user_id_publication || getIsAdminFromLocalStorage() == 1" @click="deletePublication()" alt="bouton supprimer">
                            </div>  
                        </header> 
                        <section class="content-publication">
                            <div class="message-publication">
                                <p class="message-publication__text"> {{ publicationData.message_publication }}</p>
                            </div>
                            <div v-if="publicationData.image_publication !== null" class="file-publication">
                                <img class="file-publication__img" :src="publicationData.image_publication" alt="image de publication">
                            </div>
                        </section>
                    </div>
                    <section class="section-commitment-publication">
                        <div class="like-and-comment-publication">
                            <div class="like-publication">
                                <img v-if="arrayPublicationLikedByUser && arrayPublicationLikedByUser.includes(publicationId)" @click="onLikePublication()" class="like-publication__icon" src="../assets/heart-solid.svg" alt="bouton like">
                                <img v-else @click="onLikePublication()" class="like-publication__icon" src="../assets/heart-regular.svg" alt="bouton like">
                                <p class="like-publication__counter">{{ likesPublication.length }}</p>
                            </div>

                            <div class="counter-comment-publication">
                                <img class="counter-comment-publication__icon" src="../assets/comment-solid.svg" alt="icone commentaire"><span>{{ comments.length }}</span>
                            </div>
                        </div>

                        <div class="share-publication">
                            <div v-if="showUrlPublication == true" class="url-publication">
                                <div v-if="shareLinkIsClicked == false" class="url-publication-hidden">
                                    <img @click="copyText()" class="url-publication-hidden__icon" src="../assets/copy-regular.svg" alt="icone copie">
                                    <p @click="copyText()" class="url-publication-hidden__text">Copier le lien</p>
                                </div>
                                <div v-else class="url-publication-show">
                                    <img class="url-publication-show__icon" src="../assets/check-solid.svg" alt="icone valider">
                                    <p class="url-publication-show__msg-success-copy">Copié !</p>
                                </div>
                            </div>
                            <div @click="onSharePublication()" class="share-link-publication">
                                <img class="share-link-publication__icon" src="../assets/share-solid.svg" alt="icone partager">
                            </div>
                        </div>
                    </section>
                <hr>
                </section>
            </div>

            <section class="section-comment-publication">
                <div class="new-comment">
                    <div class="profile-pic-user">
                        <img class="profile-pic-user__img" :src="profilePicUser" alt="image de profil">
                    </div>
                    <div class="add-new-comment">
                        <textarea v-model="addNewComment" class="add-new-comment__input" placeholder="Ecrivez un commentaire..."></textarea>
                        <span>
                            <button @click="publishNewComment(publicationId)" class="button">Publier</button>
                        </span>
                    </div>
                </div>

                <div class="comment" :key="index" v-for="(comment, index) in comments">

                    <div class="author-comment">
                        <div class="profile-pic-author">
                            <img class="profile-pic-author__img" :src="comment.User.profile_pic_user" alt="auteur de la publication">
                        </div>

                        <div class="info-comment">
                            <div class="info-author-comment">
                                <p class="info-author-comment__name">{{ comment.User.first_name_user }} {{ comment.User.last_name_user }}</p>
                                <p class="info-author-comment__message">{{ comment.comment }}</p>
                            </div>

                            <div class="info-date-comment">
                                <p class="info-date-comment__created-at">{{ comment.createdAt }}</p>
                            </div>
                        </div>

                        <div class="delete-comment">
                            <img class="delete-comment__icon" src="../assets/times-solid.svg" alt="icone supprimer" v-if="getUserIdFromLocalStorage() == comment.user_id_comment || getIsAdminFromLocalStorage() == 1" @click="deleteOneComment(comment.id)">
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </article>
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

    computed: {
        urlPublication(){
            return 'http://localhost:8080/post/?id=' + this.publicationData.id
        }
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

            showUrlPublication: false,
            shareLinkIsClicked: false,
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

        onSharePublication(){
            this.showUrlPublication = !this.showUrlPublication
            this.shareLinkIsClicked = false
        },

        copyText() {
            navigator.clipboard.writeText(this.urlPublication)
            this.shareLinkIsClicked = !this.shareLinkIsClicked
        },


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
            { comment : this.addNewComment },
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


        getTokenFromLocalStorage(){
            return JSON.parse(localStorage.getItem('groupomania_token'))
        },

        getUserIdFromLocalStorage(){
            return JSON.parse(localStorage.getItem('groupomania_userId'))
        },    

        getIsAdminFromLocalStorage(){
            return JSON.parse(localStorage.getItem('groupomania_isAdmin'))
        },    
    },
}
</script>

<style scoped lang="scss">

.publication-card-container{
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    .card{
        display: flex;
        flex-direction: column;
        width: 900px;
        background:white;
        border-radius: 16px;
        padding:20px;
        margin: 15px 20px;

        .main-container{
            width: 100%;
            display: flex;

            .section-author-pic{
                width: auto;
                display: flex;

                .author-publication{
                    display: flex;
                    margin-right: 10px;

                    &__profile-pic{
                        width: 50px;
                        height: 50px;
                        border-radius: 50%;
                    }
                }
            }

            .section-content{
                width: 100%;
                display: flex;
                flex-direction: column;

                .container-content{
                    display: flex;
                    flex-direction: column;
                    width: 100%;

                    .section-header-publication{
                        width: 100%;
                        display: flex;


                        .info-publication{
                            display: flex;
                            flex-direction: column;
                            flex: 1;

                            &__author-name{
                                font-weight: bold;
                            }

                            &__date{
                                font-size: 14px;
                            }
                        }

                        .delete-publication{
                            display: flex;
                            justify-content: center;
                            align-items: center;

                            &__icon{
                                filter: invert(35%) sepia(0%) saturate(1691%) hue-rotate(269deg) brightness(95%) contrast(76%);
                                cursor: pointer;
                            }
                        }
                    }

                    .content-publication{
                        display: flex;
                        flex-direction: column;
                        width: 100%;

                        .message-publication{
                            width: 100%;
                            margin: 15px 0;

                            &__text{
                                font-size: 20px;
                            }
                        }

                        .file-publication{
                            width: 100%;
                            margin: 15px 0;

                            &__img{
                                width: 100%;
                                border-radius: 10px;
                            }
                        }
                    }
                }

                .section-commitment-publication{
                    width: 100%;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin: 10px 0;


                    .like-and-comment-publication{
                        display: flex;
                        width: 100%;

                        .like-publication{
                            display: flex;
                            align-items: center;
                            margin-right: 25px;

                            &__icon{
                                width: 20px;
                                margin-right: 10px;
                                filter: invert(18%) sepia(3%) saturate(36%) hue-rotate(328deg) brightness(91%) contrast(81%);   
                                cursor: pointer; 
                            }
                        }

                        .counter-comment-publication{
                            display: flex;
                            align-items: center;

                            &__icon{
                                width: 20px;
                                margin-right: 10px;
                                filter: invert(18%) sepia(3%) saturate(36%) hue-rotate(328deg) brightness(91%) contrast(81%);    
                            }
                        }
                    }

                    .share-publication{
                        display: flex;
                        justify-content: flex-end;
                        position: relative;
                        

                        .url-publication{
                            width: 120px;
                            position:absolute;
                            top: -25px;
                            cursor: pointer;

                            .url-publication-hidden{
                                width: 100%;
                                display: flex;
                                justify-content: flex-end;
                                border: 1px solid rgb(117, 117, 117);
                                padding: 2px 3px;
                                border-radius: 5px;

                                &__icon{
                                    width: 15px;
                                    margin-right: 10px;
                                }

                                &__text{
                                    font-size: 14px;
                                }
                            }

                            .url-publication-show{
                                width: 100%;
                                display: flex;
                                justify-content: flex-end;

                                &__icon{
                                    filter: invert(61%) sepia(67%) saturate(329%) hue-rotate(46deg) brightness(101%) contrast(92%);       
                                    width: 15px;
                                    margin-right: 10px;
                                }

                                &____msg-success-copy{
                                    font-size: 14px;
                                }
                            }
                        }

                        .share-link-publication{
                            width: 100%;
                            display: flex;
                            justify-content: center;
                            cursor: pointer;

                            &__icon{
                                width: 20px;
                                margin-right: 10px;
                                filter: invert(18%) sepia(3%) saturate(36%) hue-rotate(328deg) brightness(91%) contrast(81%);   

                            }
                        }
                    }
                }
            }
        }

        .section-comment-publication{
            width: 100%;

            .new-comment{
                width: 100%;
                display: flex;
                align-items: center;
                margin-top: 20px;

                .profile-pic-user{
                    width: 50px;
                    margin-right: 5px;

                    &__img{
                        width: 50px;
                        height: 50px;
                        border-radius: 50%;
                    }
                }

                .add-new-comment{
                    width: 100%;
                    display: flex;
                    align-items: center;

                    &__input{
                        width: 100%;
                        height: 50px;
                        padding: 15px 0;
                        padding-left: 10px;
                        font-size: 15px;
                        border: none;
                        border-radius: 9px;
                        background: #f2f2f2;
                        font-weight: 500;
                        color: black;
                        font-family: Avenir, Helvetica, Arial, sans-serif;
                    }
                }
            }

            .comment{
                width: 100%;
                display: flex;
                flex-direction: column;
                margin: 20px 0;

                .author-comment{
                    display: flex;
                    position: relative;


                    .profile-pic-author{
                        width: 50px;
                        margin-right: 5px;

                        &__img{
                            width: 50px;
                            height: 50px;
                            border-radius: 50%;
                        }
                    }

                    .info-comment{
                        width: 100%;
                        display: flex;
                        flex-direction: column;


                        .info-author-comment{
                            width: 100%;
                            background: rgb(236, 236, 236);
                            border-radius: 15px;
                            padding: 8px;

                            &__name{
                                font-weight: bold;
                                margin-right: 10px;
                            }
                        }

                        .info-date-comment{

                            &__created-at{
                                font-size: 12px;
                            }
                        }

                        &__date{
                            font-size: 12px;
                        }
                    }

                    .delete-comment{
                        position: absolute;
                        right: -4px;
                        top: -9px;
                        width: 15px;
                        margin-left: 10px;
                        cursor: pointer;


                        &__icon{
                            width: 100%;
                            filter: invert(35%) sepia(0%) saturate(1691%) hue-rotate(269deg) brightness(95%) contrast(76%);
                        }
                    }
                }
            }
        }
    }
}



</style>