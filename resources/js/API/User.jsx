import axios from 'axios';
import UserToken from './UserToken';


export default {

    /**
     * user login
     * @param {*} credentials
     */
    async userLogin(credentials) {

        return axios({
                method: 'POST',
                url: '/api/user/auth/login',
                params: credentials,
            })
            .then(response => {
                return response;
            })
            .catch(errors => {
                return errors;
            });
    },

    /**
     * user register
     * @param {*} credentials
     */
    async userRegister(credentials) {

        return axios({
                method: 'POST',
                url: '/api/user/auth/register',
                params: credentials,
            })
            .then(response => {
                return response;
            })
            .catch(errors => {
                return errors;
            });
    },

    /**
     * user logout
     */
    async logout() {
        
        const api_token = UserToken.getRememberToken();

        return axios({
                method: 'GET',
                url: '/api/user/auth/logout',
                headers: {'Authorization': 'Bearer ' + api_token},
            })
            .then(response => {
                return response;
            })
            .catch(errors => {
                return errors;
            });

    },


    /**
     * Get user data
     */
    async userData() {
        
        const api_token = UserToken.getRememberToken();

        return axios({
                method: 'GET',
                url: '/api/user/my-account',
                headers: {'Authorization': 'Bearer ' + api_token},
            })
            .then(response => {
                return response;
            })
            .catch(errors => {
                UserToken.destroyRememberToken();
                return errors;
            });

    },

    /**
     * Update user data
     * @param {*} data 
     */
    async updateUserAccount(data) {

        const api_token = UserToken.getRememberToken();

        return axios({
                method: 'PUT',
                url: '/api/user/my-account',
                params: data,
                headers: {'Authorization': 'Bearer ' + api_token},
            })
            .then(response => {
                return response;
            })
            .catch(errors => {
                return errors;
            });

    },

    /**
     * Logout user
     * @param {*} data 
     */
    async userLogout() {
        const api_token = UserToken.getRememberToken();

        return axios({
                method: 'POST',
                url: '/api/user/auth/logout',
                headers: {'Authorization': 'Bearer ' + api_token},
            })
            .then(response => {
                UserToken.destroyRememberToken();
                return response;
            })
            .catch(errors => {
                return errors;
            });

    },
};