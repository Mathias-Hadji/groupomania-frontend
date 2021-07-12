import { createStore } from 'vuex';

import userService from '../services/userService';
import sessionService from '../services/sessionService';
import publicationService from '../services/publicationService';


export default createStore({
    
    state: {

        // Mode login & registration
        modeFromVueX: 'login',

        // User Data
        userIdFromVueX: 0,
        tokenUserFromVueX: JSON.parse(localStorage.getItem('groupomania_token')) || '',
        firstNameUserFromVueX: '',
        lastNameUserFromVueX: '',
        emailUserFromVueX: '',
        isAdminUserFromVueX: 0,
        profilePicUserFromVueX: '',
        bioUserFromVueX: '',

        // User Publication
        listOfPublicationsFromVueX: [],
    },
    getters: {

    },
    mutations: {
        SET_MODE_FROM_VUEX(state, payload){
            state.modeFromVueX = payload;
        },

        SET_USER_ID_FROM_VUEX(state, payload){
            state.userIdFromVueX = payload;
        },

        SET_TOKEN_USER_FROM_VUEX(state, payload){
            state.tokenUserFromVueX = payload;
        },

        SET_FIRST_NAME_USER_FROM_VUEX(state, payload){
            state.firstNameUserFromVueX = payload;
        },

        SET_LAST_NAME_USER_FROM_VUEX(state, payload){
            state.lastNameUserFromVueX = payload;
        },

        SET_EMAIL_USER_FROM_VUEX(state, payload){
            state.emailUserFromVueX = payload;
        },

        SET_IS_ADMIN_USER_FROM_VUEX(state, payload){
            state.isAdminUserFromVueX = payload;
        },

        SET_PROFILE_PIC_USER_FROM_VUEX(state, payload){
            state.profilePicUserFromVueX = payload;
        },

        SET_BIO_USER_FROM_VUEX(state, payload){
            state.bioUserFromVueX = payload;
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

        // SESSION

        getUserId(context, token){
            sessionService.getOneUserSession(token)
            .then(res => {
                context.commit('SET_USER_ID_FROM_VUEX', res.data.user_id_session)
            })
            .catch(err => {
                if(err.response.status === 404 || err.response.status === 401){
                    window.location.href = 'http://localhost:8080';
                }
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
