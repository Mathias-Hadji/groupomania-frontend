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

    createOnePublication(userId, message, selectedFile, publicationId, token){
        let formData = new FormData()
        formData.append('userId', userId);
        formData.append('message', message);
        formData.append('image', selectedFile);

        return axios.post(`${baseUrl}/publication/${publicationId}`,
        formData, { 
            headers: { Authorization: `Bearer ${token}`}
        });
    },
    
    deleteOnePublication(publicationId, userId, token){
        return axios.delete(`${baseUrl}/publication/${publicationId}`, { 
            data: { userId: userId },
            headers: { Authorization: `Bearer ${token}`}
        });
    },
};