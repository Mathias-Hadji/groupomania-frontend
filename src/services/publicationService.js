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
};