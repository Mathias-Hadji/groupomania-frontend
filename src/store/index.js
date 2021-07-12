import { createStore } from 'vuex';

import userService from '../services/userService';
import sessionService from '../services/sessionService';
import publicationService from '../services/publicationService';


export default createStore({
    
    state: {
        modeFromVueX: 'login',
        
        userIdFromVueX: 0,
        tokenUserFromVueX: JSON.parse(localStorage.getItem('groupomania_token')) || '',

        // User Data General
        firstNameUserFromVueX: '',
        lastNameUserFromVueX: '',
        emailUserFromVueX: '',
        isAdminUserFromVueX: 0,

        // User Profile Pic
        profilePicUserFromVueX: '',
        successMsgProfilePicUserFromVueX: '',
        errorMsgProfilePicUserFromVueX: '',

        // User Bio
        bioUserFromVueX: '',
        successMsgBioUserFromVueX: '',
        errorMsgBioUserFromVueX: '',

        // User Password
        successMsgPasswordUserFromVueX: '',
        errorMsgPasswordUserFromVueX: '',

        // User Publication
        listOfPublicationsFromVueX: [],
    },
    getters: {

    },
    mutations: {
        SET_MODE_FROM_VUEX(state, payload){
            state.modeFromVueX = String(payload);
        },

        SET_USER_ID_FROM_VUEX(state, payload){
            state.userIdFromVueX =  Number(payload);
        },

        SET_TOKEN_USER_FROM_VUEX(state, payload){
            state.tokenUserFromVueX = String(payload);
        },

        SET_FIRST_NAME_USER_FROM_VUEX(state, payload){
            state.firstNameUserFromVueX = String(payload);
        },

        SET_LAST_NAME_USER_FROM_VUEX(state, payload){
            state.lastNameUserFromVueX = String(payload);
        },

        SET_EMAIL_USER_FROM_VUEX(state, payload){
            state.emailUserFromVueX = String(payload);
        },

        SET_IS_ADMIN_USER_FROM_VUEX(state, payload){
            state.isAdminUserFromVueX = String(payload);
        },


        SET_PROFILE_PIC_USER_FROM_VUEX(state, payload){
            state.profilePicUserFromVueX = payload;
        },

        SET_SUCCESS_MSG_PROFILE_PIC_USER_FROM_VUEX(state, payload){
            state.successMsgProfilePicUserFromVueX = payload;
        },

        SET_ERROR_MSG_PROFILE_PIC_USER_FROM_VUEX(state, payload){
            state.errorMsgProfilePicUserFromVueX = payload;
        },




        SET_BIO_USER_FROM_VUEX(state, payload){
            state.bioUserFromVueX = String(payload);
        },

        SET_SUCCESS_MSG_BIO_FROM_VUEX(state, payload){
            state.successMsgBioUserFromVueX = payload;
        },

        SET_ERROR_MSG_BIO_FROM_VUEX(state, payload){
            state.errorMsgBioUserFromVueX = payload;
        },



        SET_SUCCESS_MSG_PASSWORD_USER_FROM_VUEX(state, payload){
            state.successMsgPasswordUserFromVueX = payload;
        },

        SET_ERROR_MSG_PASSWORD_USER_FROM_VUEX(state, payload){
            state.errorMsgPasswordUserFromVueX = payload;
        },

        SET_LIST_OF_PUBLICATIONS_FROM_VUEX(state, payload){
            state.listOfPublicationsFromVueX = payload;
        },
    },

    actions: {

        // LOGIN & REGISTRATION
        
        setMode(context, payload){
            context.commit('SET_MODE_FROM_VUEX', payload);
        },

        // USER

        getOneUser(context, payload){
            userService.getOneUser(payload.userId, payload.token)
            .then(res => {
                context.commit('SET_FIRST_NAME_USER_FROM_VUEX', res.data.first_name_user)
                context.commit('SET_LAST_NAME_USER_FROM_VUEX', res.data.last_name_user)
                context.commit('SET_EMAIL_USER_FROM_VUEX', res.data.email_user)
                context.commit('SET_PROFILE_PIC_USER_FROM_VUEX', res.data.profile_pic_user)
                context.commit('SET_BIO_USER_FROM_VUEX', res.data.bio_user)
                context.commit('SET_IS_ADMIN_USER_FROM_VUEX', res.data.is_admin)
            })
            .catch(err => console.log(err.message));
        },


        modifyProfilePicUser(context, payload){
            userService.modifyProfilePicUser(payload.userId, payload.formData, payload.token)
            .then(res => {
                context.commit('SET_PROFILE_PIC_USER_FROM_VUEX', res.data.profilePic)
                context.commit('SET_SUCCESS_MSG_PROFILE_PIC_USER_FROM_VUEX', res.data.successMessage)
                context.commit('SET_ERROR_MSG_PROFILE_PIC_USER_FROM_VUEX', '')
            })
            .catch(err => {
                context.commit('SET_ERROR_MSG_PROFILE_PIC_USER_FROM_VUEX', err.response.data.errorMessage)
                context.commit('SET_SUCCESS_MSG_PROFILE_PIC_USER_FROM_VUEX', '')
            });
        },
        

        modifyBioUser(context, payload){
            userService.modifyBioUser(payload.userId, payload.token, payload.bioUser)
            .then(res => {
                context.commit('SET_BIO_USER_FROM_VUEX', res.data.bio)
                context.commit('SET_SUCCESS_MSG_BIO_FROM_VUEX', res.data.successMessage)
                context.commit('SET_ERROR_MSG_BIO_FROM_VUEX', '')
            })
            .catch(err => {
                context.commit('SET_ERROR_MSG_BIO_FROM_VUEX', err.response.data.errorMessage)
                context.commit('SET_SUCCESS_MSG_BIO_FROM_VUEX', '')
            });
        },

        modifyPasswordUser(context, payload){
            userService.modifyPasswordUser(payload.userId, payload.token, payload.currentPassword, payload.newPassword)
            .then(res => {
                context.commit('SET_SUCCESS_MSG_PASSWORD_USER_FROM_VUEX', res.data.successMessage)
                context.commit('SET_ERROR_MSG_PASSWORD_USER_FROM_VUEX', '')
            })
            .catch(err => {
                context.commit('SET_ERROR_MSG_PASSWORD_USER_FROM_VUEX', err.response.data.errorMessage)
                context.commit('SET_SUCCESS_MSG_PASSWORD_USER_FROM_VUEX', '')
            });
        },

        deleteOneUserAccount(context, payload){
            userService.deleteOneUserAccount(payload.userId, payload.token)
            .then(res => {
                console.log(res.data.successMessage)
            })
            .catch(err => {
                console.log(err.response.data.errorMessage)
            });
        },


        // SESSION

        getUserId(context, token){
            sessionService.getOneUserSession(token)
            .then(res => {
                context.commit('SET_USER_ID_FROM_VUEX', res.data.user_id_session)
            })
            .catch(err => console.log(err.message));
        },

        deleteUserSession(context, payload){
            sessionService.deleteUserSession(payload.userId, payload.token)
            .then(res => {
                console.log(res.data.successMessage)
            })
            .catch(err => {
                console.log(err.response.data.errorMessage)
            });
        },


        // PUBLICATION

        getAllPublications(context, payload){
            publicationService.getAllPublications(payload.token)
            .then(res => {
                context.commit('SET_LIST_OF_PUBLICATIONS_FROM_VUEX', res.data)
            })
            .catch(err => console.log(err.message));
        },

        createNewPublication(context, payload){
            publicationService.createNewPublication(payload.formData, payload.token)
            .then(() => {

                publicationService.getAllPublications(payload.token)
                .then(res => {
                    context.commit('SET_LIST_OF_PUBLICATIONS_FROM_VUEX', res.data)
                })
                .catch(err => console.log(err.message));
            })
            .catch(err => {
                console.log(err)
            });
        },

        deleteOnePublication(context, payload){
            publicationService.deleteOnePublication(payload.publicationId, payload.userId, payload.token)
            .then(() => {

                publicationService.getAllPublications(payload.token)
                .then(res => {
                    context.commit('SET_LIST_OF_PUBLICATIONS_FROM_VUEX', res.data)
                })
                .catch(err => console.log(err.message));
            })
            .catch(err => {
                console.log(err)
            });
        },
    },

    modules: {

    }
})
