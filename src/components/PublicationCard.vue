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
                                <img class="delete-publication__icon" width="15" src="../assets/times-solid.svg" v-if="getUserIdFromVueX == publicationData.user_id_publication || getIsAdminUserFromVueX == 1" @click="deletePublication()" alt="bouton supprimer">
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
                                <img v-else @click="onLikePublication()" class="like-publication__icon-liked" src="../assets/heart-regular.svg" alt="bouton like">
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
                        <img class="profile-pic-user__img" :src="getProfilePicUserFromVueX" alt="image de profil">
                    </div>
                    <div class="add-new-comment">
                        <textarea v-model="addNewComment" class="add-new-comment__input" placeholder="Ecrivez un commentaire..."></textarea>
                        <span>
                            <button v-bind:class="{'button--disabled' : !btnDisabled}" v-bind:disabled="!btnDisabled" @click="publishNewComment(publicationId)" class="button">Publier</button>
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
                            <img class="delete-comment__icon" src="../assets/times-solid.svg" alt="icone supprimer" v-if="getUserIdFromVueX == comment.user_id_comment || getIsAdminUserFromVueX == 1" @click="deleteOneComment(comment.id)">
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </article>
</template>

<script>
import publicationService from '../services/publicationService';
import commentService from '../services/commentService';
import userService from '../services/userService';

import { mapState } from 'vuex';

export default {
    name: 'Publication',

    data(){
        return {

            userIsAdmin: 0,

            publicationData: [],
            authorPublicationData: [],

            likesPublication: [],
            arrayPublicationLikedByUser: [],

            comments: [],
            profilePicUser: null,
            addNewComment: null,

            showUrlPublication: false,
            shareLinkIsClicked: false,
        }
    },

    props: {
        publicationId: {
            type: Number,
            required: true
        }
    },

    computed: {
        ...mapState({
            getUserIdFromVueX: 'userIdFromVueX',
            getUserTokenFromVueX: 'tokenUserFromVueX',
            getPublicationFromVueX: 'publicationFromVueX',

            getFirstNameUserFromVueX: 'firstNameUserFromVueX',
            getLastNameUserFromVueX: 'lastNameUserFromVueX',
            getProfilePicUserFromVueX: 'profilePicUserFromVueX',
            getIsAdminUserFromVueX: 'isAdminUserFromVueX',
        }),

        btnDisabled(){
            if (this.addNewComment) {
                return true;
            } else {
                return false;
            }
        },

        urlPublication(){
            return 'http://localhost:8080/post/?id=' + this.publicationData.id
        },
    },

    created(){
        this.getOnePublication();
        this.getLikesOfOnePublication();
        this.getPublicationsLikedByOneUser();
        this.getCommentsOfOnePublication();
    },

    methods:{

        async getOnePublication(){
            try {
                const response = await publicationService.getOnePublication(this.publicationId ,this.getUserTokenFromVueX)
                this.publicationData = response.data;
                this.authorPublicationData = response.data.User;
            } catch(err) {
                console.log(err.response.statusText)
            }
        },

        deletePublication(){
            const confirmMsgDeletePublication = confirm('Etes-vous sûr de vouloir supprimer votre publication ? Attention, cette action est irreversible.')
            if(confirmMsgDeletePublication == true){
                this.$store.dispatch('deleteOnePublication', { publicationId: this.publicationId, userId: this.getUserIdFromVueX, token: this.getUserTokenFromVueX })
            } else {
                alert('Suppression annulée.');              
            }
        },

        async getLikesOfOnePublication(){
            try {
                const response = await publicationService.getLikesOfOnePublication(this.publicationId, this.getUserTokenFromVueX);
                this.likesPublication = response.data;
            } catch(err) {
                console.log(err.response.data)
            }
        },

        async getPublicationsLikedByOneUser(){
            try {
                const response = await userService.getAllLikesOfOneUser(this.getUserIdFromVueX, this.getUserTokenFromVueX);
                this.arrayPublicationLikedByUser = [];

                for(let i = 0; i < response.data.length; i++){
                    this.arrayPublicationLikedByUser.push(response.data[i].publication_id);
                }
                localStorage.setItem('groupomania_publicationsLiked', JSON.stringify(this.arrayPublicationLikedByUser));
            } catch(err) {
                console.log(err.response.data)
            }
        },

        async onLikePublication(){
            try {
                await publicationService.addOneLikeToggle(this.publicationId, this.getUserIdFromVueX, this.getUserTokenFromVueX);
                await this.getLikesOfOnePublication();
                await this.getPublicationsLikedByOneUser();
            } catch(err){
                console.log(err.response.data)
            }
        },

        async getCommentsOfOnePublication(){
            try {
                const response = await commentService.getCommentsOfOnePublication(this.publicationId, this.getUserTokenFromVueX)
                this.comments = response.data;
            } catch(err) {
                console.log(err.response.data)
            }
        },

        async publishNewComment(){
            try {
                await commentService.createNewComment(this.publicationId, this.getUserIdFromVueX, this.addNewComment, this.getUserTokenFromVueX)
                await this.getCommentsOfOnePublication()
                this.addNewComment = ''
            } catch(err) {
                console.log(err.response.data)
            }
        },

        async deleteOneComment(commentId){
            try {
                const confirmMsgDeletePublication = confirm('Etes-vous sûr de vouloir supprimer votre commentaire ? Attention, cette action est irreversible.')

                if(confirmMsgDeletePublication){
                    await commentService.deleteOneComment(commentId, this.getUserIdFromVueX, this.getUserTokenFromVueX)
                    await this.getCommentsOfOnePublication()
                } else {
                    alert('Suppression annulée.');
                }
            } catch(err) {
                console.log(err.response.data)
            }

        },

        onSharePublication(){
            this.showUrlPublication = !this.showUrlPublication;
            this.shareLinkIsClicked = false;
        },

        copyText() {
            navigator.clipboard.writeText(this.urlPublication);
            this.shareLinkIsClicked = !this.shareLinkIsClicked;
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
                                filter: invert(15%) sepia(55%) saturate(6166%) hue-rotate(326deg) brightness(96%) contrast(90%);
  
                                cursor: pointer; 
                            }

                            &__icon-liked{
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
                            border-radius: 4px;

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