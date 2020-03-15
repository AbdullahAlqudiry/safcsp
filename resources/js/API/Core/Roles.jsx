import axios from 'axios';
import UserToken from './../UserToken';


export default {

    /**
     * Get roles
     */
    async rolesData(search) {
        
        const api_token = UserToken.getRememberToken();

        return axios({
                method: 'GET',
                url: '/api/core/roles?search=' + search,
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
     * Get permissions
     */
    async permissionsData() {
        
        const api_token = UserToken.getRememberToken();

        return axios({
                method: 'GET',
                url: '/api/core/roles/create',
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
     * Create new role
     * @param {*} data 
     */
    async createNewRole(data) {
        const api_token = UserToken.getRememberToken();

        return axios({
                method: 'POST',
                url: '/api/core/roles',
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
     * Get Role data
     */
    async roleData(id) {
        
        const api_token = UserToken.getRememberToken();

        return axios({
                method: 'GET',
                url: '/api/core/roles/' + id,
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
     * update Role data by id
     */
    async updateRole(id, data) {

        const api_token = UserToken.getRememberToken();

        return axios({
                method: 'PUT',
                url: '/api/core/roles/' + id,
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
     * destroy Role by id
     */
    async destroyRole(id) {

        const api_token = UserToken.getRememberToken();

        return axios({
                method: 'DELETE',
                url: '/api/core/roles/' + id,
                params: {id: id},
                headers: {'Authorization': 'Bearer ' + api_token},
            })
            .then(response => {
                return response;
            })
            .catch(errors => {
                return errors;
            });

    },

};