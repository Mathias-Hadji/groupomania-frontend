import axios from 'axios';

let baseUrl = `http://localhost:3000/api`;

export default {

    getOneUserSession(token){
        return axios.get(`${baseUrl}/session/${token}`, { 
            headers: { Authorization: `Bearer ${token}`}
        });
    },

    setUserSession(userId, token){
        return axios.post(`${baseUrl}/session`, 
            {userId: userId, token: token }, 
            { headers: { Authorization: `Bearer ${token}`} }
        );
    },

    deleteUserSession(userId, token){
        return axios.delete(`${baseUrl}/session/${userId}`, { 
            data: { userId: userId },
            headers: { Authorization: `Bearer ${token}`}
        });
    },
};