import axios from 'axios';
import UserToken from './../UserToken';


export default {

    /**
     * Get users data
     */
    async usersData(pageID, search = '') {
        
        const api_token = UserToken.getRememberToken();

        return axios({
                method: 'GET',
                url: '/api/core/users?page=' + pageID + '&search=' + search,
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
     * Get users data
     */
    async groupsData() {
        
        const api_token = UserToken.getRememberToken();

        return axios({
                method: 'GET',
                url: '/api/core/users/groups',
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
     * Get roles data
     */
    async rolesData() {
        
        const api_token = UserToken.getRememberToken();

        return axios({
                method: 'GET',
                url: '/api/core/users/roles',
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
     * Create new user
     * @param {*} data 
     */
    async createNewUser(data) {

        const api_token = UserToken.getRememberToken();

        return axios({
            method: 'POST',
            url: '/api/core/users',
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
     * Get user data
     */
    async userData(id) {
        
        const api_token = UserToken.getRememberToken();

        return axios({
                method: 'GET',
                url: '/api/core/users/' + id,
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
     * update user data by id
     */
    async updateUser(id, data) {

        const api_token = UserToken.getRememberToken();

        return axios({
                method: 'PUT',
                url: '/api/core/users/' + id,
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
     * destroy user by id
     */
    async destroyUser(id) {

        const api_token = UserToken.getRememberToken();

        return axios({
                method: 'DELETE',
                url: '/api/core/users/' + id,
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

    /**
     * from group from user by id
     */
    async removeGroupFromUser(id, groupID) {

        const api_token = UserToken.getRememberToken();

        return axios({
                method: 'DELETE',
                url: '/api/core/users/remove-group/' + id + '/' + groupID,
                params: {id: id, group_id: groupID},
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