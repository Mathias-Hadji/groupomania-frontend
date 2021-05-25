import { createStore } from 'vuex'

export default createStore({
    
    state: {
        modeFromVueX:'login',
        hideListPublicationFromVueX: false,
        allPublications: [],
        publicationData: [],
        commentsOfPublication: [],

        publications: [],


    },
    getters: {

    },
    mutations: {


        setPublicationsFromVueX(state, new_value){
            state.publications = new_value;
        },

        setPublicationId(state, new_value){
            state.publicationId = new_value;
        },

        setAllPublicationsFromVueX(state, new_value){
            state.allPublications = new_value;
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
