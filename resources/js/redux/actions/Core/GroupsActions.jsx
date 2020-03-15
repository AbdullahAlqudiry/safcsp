import api from './../../../API/Core/Groups';
import {APP_SHOW_LOADING_SPINNER, CORE_GROUPS_DATA} from './../../ActionTypes';


export const groupsData = (pageID, search) => {

    return async (dispatch) => {

        dispatch({type: APP_SHOW_LOADING_SPINNER, payload: true});

        let apiResponse = await api.groupsData(pageID, search);
        if (apiResponse) {
            
            dispatch({type: APP_SHOW_LOADING_SPINNER, payload: false});

            switch (apiResponse.status || apiResponse.response.status) {

                case 200:

                    dispatch({type: CORE_GROUPS_DATA, payload: apiResponse.data});
                    return Promise.resolve(true);
            
                default:

                    return Promise.reject('');

            }
        }

    };

};

export const createNewGroup = (data) => {

    return async (dispatch) => {

        dispatch({type: APP_SHOW_LOADING_SPINNER, payload: true});

        let apiResponse = await api.createNewGroup(data);
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

export const groupData = (id) => {

    return async (dispatch) => {

        dispatch({type: APP_SHOW_LOADING_SPINNER, payload: true});

        let apiResponse = await api.groupData(id);
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

export const updateGroup = (id, data) => {

    return async (dispatch) => {

        dispatch({type: APP_SHOW_LOADING_SPINNER, payload: true});

        let apiResponse = await api.updateGroup(id, data);
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

export const destroyGroup = (id) => {

    return async (dispatch) => {

        dispatch({type: APP_SHOW_LOADING_SPINNER, payload: true});

        let apiResponse = await api.destroyGroup(id);
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

export const removeUserFromGroup = (id, userID) => {

    return async (dispatch) => {

        dispatch({type: APP_SHOW_LOADING_SPINNER, payload: true});

        let apiResponse = await api.removeUserFromGroup(id, userID);
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
