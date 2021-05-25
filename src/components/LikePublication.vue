<template>
    <div v-if="getPublicationsLikedFromLocalStorage() && getPublicationsLikedFromLocalStorage().includes(publicationId)" class="commitment-section-row">
        <img @click="onLikePublication()" class="commitment-section-row__icon" src="../assets/heart-solid.svg"><span>{{ likes.length }}</span> 
    </div>
    <div v-else class="commitment-section-row">
        <img @click="onLikePublication()" class="commitment-section-row__icon" src="../assets/heart-regular.svg"><span>{{ likes.length }}</span> 
    </div>
</template>

<script>
import axios from 'axios';


export default {

    props: {
        publicationId: Number,
    },

    data(){
        return {
            likes: [],
            arrayPublicationLikedByUser: [],
        }
    },

    mounted(){

        this.getLikesOfOnePublication()
        this.getPublicationsLikedByOneUser()
    },



    methods:{

        getLikesOfOnePublication(){

            // Get likes of one publication
            axios.get(`http://localhost:3000/api/like-publication/${this.publicationId}`,{
                headers: { Authorization: `Bearer ${this.getTokenFromLocalStorage()}` }
            })
            .then(res => {
                this.likes = res.data
            }) 
            .catch(error => {
                console.log(error.res);
            })
        },

        getPublicationsLikedByOneUser(){

            // Get Publications Liked by one user
            axios.get(`http://localhost:3000/api/like-publication/user/${this.publicationId}`,{
                headers: { Authorization: `Bearer ${this.getTokenFromLocalStorage()}` }
            })
            .then(res => {
                for(let i = 0; i < res.data.length; i++){
                    this.arrayPublicationLikedByUser.push(res.data[i].publication_id)
                }
                localStorage.setItem('groupomania_publicationsLiked', JSON.stringify(this.arrayPublicationLikedByUser))
            }) 
            .catch(error => {
                console.log(error.res);
            })
        },


        onLikePublication(){

            if(!this.getPublicationsLikedFromLocalStorage()){

                localStorage.setItem('groupomania_publicationsLiked', JSON.stringify([this.publicationId])) 

                axios.post(`http://localhost:3000/api/like-publication/${this.publicationId}`, 
                { like: 1 },
                { headers: { Authorization: `Bearer ${this.getTokenFromLocalStorage() }`}})
                .then(res => {
                    console.log(res)

                    // Get likes of one publication
                    axios.get(`http://localhost:3000/api/like-publication/${this.publicationId}`,{
                        headers: { Authorization: `Bearer ${this.getTokenFromLocalStorage()}` }
                    })
                    .then(res => {
                        this.likes = res.data
                    }) 
                    .catch(error => {
                        console.log(error.res);
                    })
                })
                .catch(err => {
                    console.log(err.response);
                })
                
            } else {

                if(this.getPublicationsLikedFromLocalStorage().includes(this.publicationId)){

                    const arrPublicationsLiked = this.getPublicationsLikedFromLocalStorage()
                    const newArrPublicationsLiked = arrPublicationsLiked.filter(id => id !== this.publicationId)
                    localStorage.setItem('groupomania_publicationsLiked', JSON.stringify(newArrPublicationsLiked)) 

                    axios.post(`http://localhost:3000/api/like-publication/${this.publicationId}`, 
                    { like: 0 },
                    { headers: { Authorization: `Bearer ${this.getTokenFromLocalStorage() }`}})
                    .then(res => {

                        console.log(res)

                        // Get likes of one publication
                        axios.get(`http://localhost:3000/api/like-publication/${this.publicationId}`,{
                            headers: { Authorization: `Bearer ${this.getTokenFromLocalStorage()}` }
                        })
                        .then(res => {
                            this.likes = res.data

                        }) 
                        .catch(error => {
                            console.log(error.res);
                        })
                    })
                    .catch(err => {
                        console.log(err.response);
                    })

                } else {

                    const arrPublicationsLiked = this.getPublicationsLikedFromLocalStorage()
                    arrPublicationsLiked.push(this.publicationId)
                    localStorage.setItem('groupomania_publicationsLiked', JSON.stringify(arrPublicationsLiked))

                    axios.post(`http://localhost:3000/api/like-publication/${this.publicationId}`, 
                    { like: 1 },
                    { headers: { Authorization: `Bearer ${this.getTokenFromLocalStorage() }`}})
                    .then(res => {

                        console.log(res)

                        // Get likes of one publication
                        axios.get(`http://localhost:3000/api/like-publication/${this.publicationId}`,{
                            headers: { Authorization: `Bearer ${this.getTokenFromLocalStorage()}` }
                        })
                        .then(res => {
                            this.likes = res.data

                        }) 
                        .catch(error => {
                            console.log(error.res);
                        })
                    })
                    .catch(err => {
                        console.log(err.response);
                    })
                }
            }

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

        getPublicationsLikedFromLocalStorage(){
            return JSON.parse(localStorage.getItem('groupomania_publicationsLiked'))
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