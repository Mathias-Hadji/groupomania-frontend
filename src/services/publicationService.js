import axios from 'axios';

let baseUrl = `http://localhost:3000/api`;

export default {
    getAllPublications(token){
        return axios.get(`${baseUrl}/publication`, { 
            headers: { Authorization: `Bearer ${token}`}
        });
    },

    getOnePublication(publicationId, token){
        return axios.get(`${baseUrl}/publication/${publicationId}`, { 
            headers: { Authorization: `Bearer ${token}`}
        });
    },

    getLikesOfOnePublication(publicationId, token){
        return axios.get(`${baseUrl}/publication/likes/${publicationId}`, { 
            headers: { Authorization: `Bearer ${token}`}
        });
    },

    createNewPublication(formData, token){
        return axios.post(`${baseUrl}/publication`,
            formData, 
            { headers: {'Content-Type': 'multipart/form-data', Authorization: `Bearer ${token}`}},
        );
    },
    
    deleteOnePublication(publicationId, userId, token){
        return axios.delete(`${baseUrl}/publication/${publicationId}`, { 
            data: { userId: userId },
            headers: { Authorization: `Bearer ${token}`}
        });
    },


    createNewComment(publicationId, userId, comment, token){
        return axios.post(`${baseUrl}/comment/publication`,
            { publicationId: publicationId, userId: userId, comment: comment}, 
            { headers: { Authorization: `Bearer ${token}`} }
        );
    },

    addOneLikeToggle(publicationId, userId, token){
        return axios.post(`${baseUrl}/publication/likes`,
            { publicationId: publicationId, userId: userId}, 
            { headers: { Authorization: `Bearer ${token}`} }
        );
    },
};