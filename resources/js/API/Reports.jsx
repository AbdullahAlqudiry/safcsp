import axios from 'axios';
import UserToken from './UserToken';


export default {

    /**
     * Get reports data
     */
    async reportsData(pageID, search = '') {
        
        const api_token = UserToken.getRememberToken();

        return axios({
                method: 'GET',
                url: '/api/reports?page=' + pageID + '&search=' + search,
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
     * Get groups data
     */
    async groupsData() {
        
        const api_token = UserToken.getRememberToken();

        return axios({
                method: 'GET',
                url: '/api/reports/groups',
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
     * Create new report
     * @param {*} data 
     */
    async createNewReport(data) {

        const api_token = UserToken.getRememberToken();

        return axios({
            method: 'POST',
            url: '/api/reports',
            data: data,
            headers: {'Content-Type': 'multipart/form-data', 'Authorization': 'Bearer ' + api_token},
        })
        .then(response => {
            return response;
        })
        .catch(errors => {
            return errors;
        });

    },

    /**
     * get report data by id
     * @param {*} id 
     */
    async reportData(id) {
        
        const api_token = UserToken.getRememberToken();

        return axios({
                method: 'GET',
                url: '/api/reports/' + id,
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
     * update report data by id
     */
    async updateReport(id, data) {

        const api_token = UserToken.getRememberToken();

        return axios({
                method: 'PUT',
                url: '/api/reports/' + id,
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
     * destroy report by id
     */
    async destroyReport(id) {

        const api_token = UserToken.getRememberToken();

        return axios({
                method: 'DELETE',
                url: '/api/reports/' + id,
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