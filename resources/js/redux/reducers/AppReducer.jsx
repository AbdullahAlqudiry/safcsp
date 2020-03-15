import {APP_SHOW_LOADING_SPINNER} from '../ActionTypes';


const INITIAL_STATE = {
    showLoadingSpinner: false,
};


export default (state = INITIAL_STATE, action) => {

    switch (action.type) {

        case APP_SHOW_LOADING_SPINNER:
            return {...state, showLoadingSpinner: action.payload};

        default:
            return state;

    }
};
