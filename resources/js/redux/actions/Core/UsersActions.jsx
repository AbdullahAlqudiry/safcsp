import api from './../../../API/Core/Users';
import {APP_SHOW_LOADING_SPINNER, CORE_USERS_DATA} from './../../ActionTypes';

export const usersData = (pageID, search) => {

    return async (dispatch) => {

        dispatch({type: APP_SHOW_LOADING_SPINNER, payload: true});

        let apiResponse = await api.usersData(pageID, search);
        if (apiResponse) {
            dispatch({type: APP_SHOW_LOADING_SPINNER, payload: false});

            switch (apiResponse.status || apiResponse.response.status) {

                case 200:

                    dispatch({type: CORE_USERS_DATA, payload: apiResponse.data});
                    return Promise.resolve(true);
            
                default:

                    return Promise.reject('');

            }
        }

    };

};

export const rolesData = () => {
    
    return async (dispatch) => {

        dispatch({type: APP_SHOW_LOADING_SPINNER, payload: true});

        let apiResponse = await api.rolesData();
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

export const groupsData = () => {

    return async (dispatch) => {

        dispatch({type: APP_SHOW_LOADING_SPINNER, payload: true});

        let apiResponse = await api.groupsData();
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

export const createNewUser = (data) => {

    return async (dispatch) => {

        dispatch({type: APP_SHOW_LOADING_SPINNER, payload: true});

        let apiResponse = await api.createNewUser(data);
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

export const userData = (id) => {

    return async (dispatch) => {

        dispatch({type: APP_SHOW_LOADING_SPINNER, payload: true});

        let apiResponse = await api.userData(id);
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

export const updateUser = (id, data) => {

    return async (dispatch) => {

        dispatch({type: APP_SHOW_LOADING_SPINNER, payload: true});

        let apiResponse = await api.updateUser(id, data);
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


export const destroyUser = (id) => {

    return async (dispatch) => {

        dispatch({type: APP_SHOW_LOADING_SPINNER, payload: true});

        let apiResponse = await api.destroyUser(id);
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

export const removeGroupFromUser = (id, groupID) => {

    return async (dispatch) => {
        dispatch({type: APP_SHOW_LOADING_SPINNER, payload: true});

        let apiResponse = await api.removeGroupFromUser(id, groupID);
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
