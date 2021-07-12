import axios from 'axios';

let baseUrl = `http://localhost:3000/api`;

export default {
    getCommentsOfOnePublication(publicationId, token){
        return axios.get(`${baseUrl}/comment/publication/${publicationId}`, { 
            headers: { Authorization: `Bearer ${token}`}
        });
    },

    createNewComment(publicationId, userId, comment, token){
        return axios.post(`${baseUrl}/comment/publication`,
            { publicationId: publicationId, userId: userId, comment: comment}, 
            { headers: { Authorization: `Bearer ${token}`} }
        );
    },

    
    deleteOneComment(commentId, userId, token){
        return axios.delete(`${baseUrl}/comment/${commentId}`, { 
            data: { userId: userId },
            headers: { Authorization: `Bearer ${token}`}
        });
    },
};