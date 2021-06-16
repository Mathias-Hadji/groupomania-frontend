import { createStore } from 'vuex'

export default createStore({
    
    state: {
        modeFromVueX:'login',
        listOfPublicationsFromVueX: null,


        hideListPublicationFromVueX: false,

        publicationData: [],
        commentsOfPublication: [],


    },
    getters: {

    },
    mutations: {


        setPublicationListFromVueX(state, new_value){
            state.publicationListFromVueX = new_value;
        },

        setPublicationId(state, new_value){
            state.publicationId = new_value;
        },

        setHideListPublicationFromVueX(state, new_value){
            state.hideListPublicationFromVueX = new_value;
        },

        setPublicationData(state, new_value){
            state.publicationData = new_value;
        },

        setCommentsOfPublication(state, new_value){
            state.commentsOfPublication = new_value;
        }
    },
    actions: {

    },
    modules: {
        
    }
})
