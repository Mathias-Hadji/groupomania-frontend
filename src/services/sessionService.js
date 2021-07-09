import axios from 'axios';

let baseUrl = `http://localhost:3000/api`;

export default {

    getOneUserSession(token){
        return axios.get(`${baseUrl}/session/${token}`, { 
            headers: { Authorization: `Bearer ${token}`}
        });
    },

};