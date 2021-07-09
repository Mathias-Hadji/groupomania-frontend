import { createStore } from 'vuex';

import userService from '../services/userService';
import sessionService from '../services/sessionService';

export default createStore({
    
    state: {
        modeFromVueX: 'login',
        
        userIdFromVueX: 0,
        tokenUserFromVueX: JSON.parse(localStorage.getItem('groupomania_token')) || '',

        // User Data
        firstNameUserFromVueX: '',
        lastNameUserFromVueX: '',
        emailUserFromVueX: '',

        // Profile Pic
        profilePicUserFromVueX: '',
        successMsgProfilePicUserFromVueX: '',
        errorMsgProfilePicUserFromVueX: '',

        // Bio
        bioUserFromVueX: '',
        successMsgBioUserFromVueX: '',
        errorMsgBioUserFromVueX: '',

        // Password
        successMsgPasswordUserFromVueX: '',
        errorMsgPasswordUserFromVueX: '',


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

    },

    actions: {
        setMode(context, payload){
            context.commit('SET_MODE_FROM_VUEX', payload);
        },

        getUserId(context, token){
            sessionService.getOneUserSession(token)
            .then(res => {

                context.commit('SET_USER_ID_FROM_VUEX', res.data.user_id_session)
            })
            .catch(err => console.log(err.message));
        },

        getOneUser(context, payload){
            userService.getOneUser(payload.userId, payload.token)
            .then(res => {
                context.commit('SET_FIRST_NAME_USER_FROM_VUEX', res.data.first_name_user)
                context.commit('SET_LAST_NAME_USER_FROM_VUEX', res.data.last_name_user)
                context.commit('SET_EMAIL_USER_FROM_VUEX', res.data.email_user)
                context.commit('SET_PROFILE_PIC_USER_FROM_VUEX', res.data.profile_pic_user)
                context.commit('SET_BIO_USER_FROM_VUEX', res.data.bio_user)
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
    },

    modules: {

    }
})
