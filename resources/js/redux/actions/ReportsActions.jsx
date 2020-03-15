import api from './../../API/Reports';
import {APP_SHOW_LOADING_SPINNER, REPORTS_DATA} from './../ActionTypes';

export const reportsData = (pageID, search) => {

    return async (dispatch) => {

        dispatch({type: APP_SHOW_LOADING_SPINNER, payload: true});

        let apiResponse = await api.reportsData(pageID, search);
        if (apiResponse) {
            dispatch({type: APP_SHOW_LOADING_SPINNER, payload: false});

            switch (apiResponse.status || apiResponse.response.status) {

                case 200:

                    dispatch({type: REPORTS_DATA, payload: apiResponse.data});
                    return Promise.resolve(true);
            
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

export const createNewReport = (data) => {

    return async (dispatch) => {

        dispatch({type: APP_SHOW_LOADING_SPINNER, payload: true});
        
        let apiResponse = await api.createNewReport(data);
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


export const reportData = (id) => {

    return async (dispatch) => {

        dispatch({type: APP_SHOW_LOADING_SPINNER, payload: true});

        let apiResponse = await api.reportData(id);
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


export const updateReport = (id, data) => {

    return async (dispatch) => {

        dispatch({type: APP_SHOW_LOADING_SPINNER, payload: true});

        let apiResponse = await api.updateReport(id, data);
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

export const destroyReport = (id) => {

    return async (dispatch) => {

        dispatch({type: APP_SHOW_LOADING_SPINNER, payload: true});

        let apiResponse = await api.destroyReport(id);
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