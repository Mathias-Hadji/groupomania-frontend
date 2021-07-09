import axios from 'axios';

let baseUrl = `http://localhost:3000/api`;

export default {

    getOneUser(userId, token){
        return axios.get(`${baseUrl}/user/${userId}`, { 
            headers: { Authorization: `Bearer ${token}`}
        });
    },

    modifyBioUser(userId, token, bioUser){
        return axios.put(`${baseUrl}/user/bio/${userId}`,  
            { userId: userId, bioUser: bioUser },
            { headers: { Authorization: `Bearer ${token}`} }
        );
    },

    modifyProfilePicUser(userId, formData, token){
        return axios.put(`${baseUrl}/user/profile-pic/${userId}`, 
            formData, 
            { headers: {'Content-Type': 'multipart/form-data', Authorization: `Bearer ${token}`}},
        );
    },

    modifyPasswordUser(userId, token, currentPassword, newPassword){
        return axios.put(`${baseUrl}/user/password/${userId}`, 
            { userId: userId, inputUserCurrentPassword: currentPassword, inputUserNewPassword: newPassword }, 
            { headers: { Authorization: `Bearer ${token}`} }
        );
    },
};