import axios from 'axios';

let baseUrl = `http://localhost:3000/api`;

export default {

    getAllLikesOfOneUser(userId, token){
        return axios.get(`${baseUrl}/like/user/${userId}`, { 
            headers: { Authorization: `Bearer ${token}`}
        });
    },

    getLikesOfOnePublication(publicationId, token){
        return axios.get(`${baseUrl}/like/publication/${publicationId}`, { 
            headers: { Authorization: `Bearer ${token}`}
        });
    },

    addOneLikeToggle(publicationId, userId, token){
        return axios.post(`${baseUrl}/like`,
            { publicationId: publicationId, userId: userId}, 
            { headers: { Authorization: `Bearer ${token}`} }
        );
    },
};