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

        firstNameRegExp: new RegExp('^[a-zéèêëàâîïôöûü-]+$', 'i'),
        lastNameRegExp: new RegExp('^[a-zéèêëàâîïôöûü-]+$','i'),
        emailRegExp: new RegExp('^[a-z0-9._-]+[@]{1}[a-z]+[.]{1}[a-z]{2,3}$','i'),
        passwordRegExp: new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$", 'i'),

        // User Publication
        listOfPublicationsFromVueX: null,

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

        // SHOW LOGIN OR REGISTRATION COMPONENT
        setMode(context, payload){
            context.commit('SET_MODE_FROM_VUEX', payload);
        },

        // USER
        async getOneUser(context, payload){
            try {
                const response = await userService.getOneUser(payload.userId, payload.token);
                context.commit('SET_FIRST_NAME_USER_FROM_VUEX', response.data.first_name_user);
                context.commit('SET_LAST_NAME_USER_FROM_VUEX', response.data.last_name_user);
                context.commit('SET_EMAIL_USER_FROM_VUEX', response.data.email_user);
                context.commit('SET_PROFILE_PIC_USER_FROM_VUEX', response.data.profile_pic_user);
                context.commit('SET_BIO_USER_FROM_VUEX', response.data.bio_user);
                context.commit('SET_IS_ADMIN_USER_FROM_VUEX', response.data.is_admin);

            } catch(err) {
                console.log(err.message);
            }
        },


        // SESSION
        async getUserId(context, token){
            try {
                const response = await sessionService.getOneUserSession(token)
                context.commit('SET_USER_ID_FROM_VUEX', response.data.user_id_session)
            } catch(err){
                window.location.href = 'http://localhost:8080';
            }   
        },


        // PUBLICATION
        async getAllPublications(context, payload){
            try {
                const response = await publicationService.getAllPublications(payload.token);
                context.commit('SET_LIST_OF_PUBLICATIONS_FROM_VUEX', response.data);

            } catch(err){
                console.log(err.message);
            }
        },

        async createNewPublication(context, payload){
            try {
                await publicationService.createNewPublication(payload.formData, payload.token);
                const response = await publicationService.getAllPublications(payload.token);
                context.commit('SET_LIST_OF_PUBLICATIONS_FROM_VUEX', response.data);

            } catch(err) {
                console.log(err.message);
            }
        },

        async deleteOnePublication(context, payload){
            try {
                await publicationService.deleteOnePublication(payload.publicationId, payload.userId, payload.token);
                const response = await publicationService.getAllPublications(payload.token);
                context.commit('SET_LIST_OF_PUBLICATIONS_FROM_VUEX', response.data);

            } catch(err){
                console.log(err.message);
            }
        },
    },

    modules: {

    }
})
