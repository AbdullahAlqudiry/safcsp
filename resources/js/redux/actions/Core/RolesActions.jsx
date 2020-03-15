import api from './../../../API/Core/Roles';
import {APP_SHOW_LOADING_SPINNER, CORE_ROLES_DATA} from './../../ActionTypes';


export const rolesData = (search) => {

    return async (dispatch) => {

        dispatch({type: APP_SHOW_LOADING_SPINNER, payload: true});

        let apiResponse = await api.rolesData(search);
        if (apiResponse) {

            dispatch({type: APP_SHOW_LOADING_SPINNER, payload: false});

            switch (apiResponse.status || apiResponse.response.status) {

                case 200:

                    dispatch({type: CORE_ROLES_DATA, payload: apiResponse.data});
                    return Promise.resolve(true);

                default:

                    return Promise.reject('');

            }
        }

    };

};

export const permissionsData = () => {

    return async (dispatch) => {

        dispatch({type: APP_SHOW_LOADING_SPINNER, payload: true});

        let apiResponse = await api.permissionsData();
        if (apiResponse) {

            dispatch({type: APP_SHOW_LOADING_SPINNER, payload: false});

            switch (apiResponse.status || apiResponse.response.status) {

                case 200:
                    return Promise.resolve(apiResponse.data);

                default:

                    return Promise.reject('');

            }
        }

    };

};

export const createNewRole = (data) => {

    return async (dispatch) => {

        dispatch({type: APP_SHOW_LOADING_SPINNER, payload: true});

        let apiResponse = await api.createNewRole(data);
        if (apiResponse) {
            dispatch({type: APP_SHOW_LOADING_SPINNER, payload: false});

            switch (apiResponse.status || apiResponse.response.status) {

                case 200:
                    return Promise.resolve(true);

                case 422:
                    return Promise.reject(apiResponse.response.data);

                default:
                    return Promise.reject('');

            }
        }

    };

};

export const roleData = (id) => {

    return async (dispatch) => {
        dispatch({type: APP_SHOW_LOADING_SPINNER, payload: true});

        let apiResponse = await api.roleData(id);
        if (apiResponse) {
            
            dispatch({type: APP_SHOW_LOADING_SPINNER, payload: false});

            switch (apiResponse.status || apiResponse.response.status) {

                case 200:
                    return Promise.resolve(apiResponse.data);
            
                default:
                    return Promise.reject('');

            }
        }

    };

};

export const updateRole = (id, data) => {

    return async (dispatch) => {

        dispatch({type: APP_SHOW_LOADING_SPINNER, payload: true});

        let apiResponse = await api.updateRole(id, data);
        if (apiResponse) {
            dispatch({type: APP_SHOW_LOADING_SPINNER, payload: false});

            switch (apiResponse.status || apiResponse.response.status) {

                case 200:
                    return Promise.resolve(true);

                case 422:
                    return Promise.reject(apiResponse.response.data);

                default:
                    return Promise.reject('');

            }
        }

    };

};

export const destroyRole = (id) => {

    return async (dispatch) => {

        dispatch({type: APP_SHOW_LOADING_SPINNER, payload: true});

        let apiResponse = await api.destroyRole(id);
        if (apiResponse) {
            dispatch({type: APP_SHOW_LOADING_SPINNER, payload: false});

            switch (apiResponse.status || apiResponse.response.status) {

                case 200:
                    return Promise.resolve(true);

                default:
                    return Promise.reject('');

            }
        }

    };

};