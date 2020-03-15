import api from './../../API/User';
import {APP_SHOW_LOADING_SPINNER, REMEMBER_TOKEN, USER_HAS_LOGGED, USER_DATA} from './../ActionTypes';


export const userLogin = (credentials) => {

    return async (dispatch) => {

        dispatch({type: APP_SHOW_LOADING_SPINNER, payload: true});

        let apiResponse = await api.userLogin(credentials);
        if (apiResponse) {

            dispatch({type: APP_SHOW_LOADING_SPINNER, payload: false});

            switch (apiResponse.status || apiResponse.response.status) {

                case 200:

                    localStorage.setItem(REMEMBER_TOKEN, apiResponse.data.access_token);
                    dispatch({type: REMEMBER_TOKEN, payload: apiResponse.data.access_token});
                    dispatch({type: USER_HAS_LOGGED, payload: true});

                    return Promise.resolve(true);

                case 422:

                    return Promise.reject(apiResponse.response.data);

                default:

                    return Promise.reject('');

            }
        }

    };

};


export const userData = () => {

    return async (dispatch) => {

        dispatch({type: APP_SHOW_LOADING_SPINNER, payload: true});

        let apiResponse = await api.userData();
        if (apiResponse) {

            dispatch({type: APP_SHOW_LOADING_SPINNER, payload: false});

            switch (apiResponse.status || apiResponse.response.status) {

                case 200:

                    dispatch({type: USER_HAS_LOGGED, payload: true});
                    dispatch({type: USER_DATA, payload: apiResponse.data});

                    return Promise.resolve(true);

                default:
                    dispatch({type: USER_HAS_LOGGED, payload: false});
                    return Promise.reject('');

            }
        }

    };

};


export const updateUserAccount = (data) => {

    return async (dispatch) => {

        dispatch({type: APP_SHOW_LOADING_SPINNER, payload: true});

        let apiResponse = await api.updateUserAccount(data);
        if (apiResponse) {

            dispatch({type: APP_SHOW_LOADING_SPINNER, payload: false});

            switch (apiResponse.status || apiResponse.response.status) {

                case 200:

                    return Promise.resolve(true);

                case 422:

                    return Promise.reject(apiResponse.response.data);

                default:
                    dispatch({type: USER_HAS_LOGGED, payload: false});
                    return Promise.reject('');

            }
        }

    };

};

export const userLogout = () => {

    return async (dispatch) => {

        dispatch({type: APP_SHOW_LOADING_SPINNER, payload: true});

        let apiResponse = await api.userLogout();
        if (apiResponse) {

            dispatch({type: APP_SHOW_LOADING_SPINNER, payload: false});

            switch (apiResponse.status || apiResponse.response.status) {

                case 200:

                    dispatch({type: USER_HAS_LOGGED, payload: false});
                    dispatch({type: USER_DATA, payload: {permissions: []}});
                    return Promise.resolve(true);

                default:
                    dispatch({type: USER_HAS_LOGGED, payload: false});
                    return Promise.reject('');

            }
        }

    };

};