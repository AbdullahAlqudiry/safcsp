import axios from 'axios';
import UserToken from './../UserToken';


export default {

    /**
     * Get groups data
     */
    async groupsData(pageID, search = '') {
        
        const api_token = UserToken.getRememberToken();

        return axios({
                method: 'GET',
                url: '/api/core/groups?page=' + pageID + '&search=' + search,
                headers: {'Authorization': 'Bearer ' + api_token},
            })
            .then(response => {
                return response;
            })
            .catch(errors => {
                return errors;
            });

    },

    async createNewGroup(data) {

        const api_token = UserToken.getRememberToken();

        return axios({
                method: 'POST',
                url: '/api/core/groups',
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
     * Get group data
     */
    async groupData(id) {
        
        const api_token = UserToken.getRememberToken();

        return axios({
                method: 'GET',
                url: '/api/core/groups/' + id,
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
     * update group data by id
     */
    async updateGroup(id, data) {

        const api_token = UserToken.getRememberToken();

        return axios({
                method: 'PUT',
                url: '/api/core/groups/' + id,
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
     * destroy group by id
     */
    async destroyGroup(id) {

        const api_token = UserToken.getRememberToken();

        return axios({
                method: 'DELETE',
                url: '/api/core/groups/' + id,
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
     * from user from group by id
     */
    async removeUserFromGroup(id, userID) {

        const api_token = UserToken.getRememberToken();

        return axios({
                method: 'DELETE',
                url: '/api/core/groups/remove-user/' + id + '/' + userID,
                params: {id: id, user_id: userID},
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