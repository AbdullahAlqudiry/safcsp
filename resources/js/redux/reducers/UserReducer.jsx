import {USER_HAS_LOGGED, REMEMBER_TOKEN, USER_DATA} from '../ActionTypes';


const INITIAL_STATE = {
    userHasLogged: false,
    rememberToken: localStorage.getItem(REMEMBER_TOKEN) || null,
    userData: {
        permissions: [],
    },
};


export default (state = INITIAL_STATE, action) => {

    switch (action.type) {

        case USER_HAS_LOGGED:
            return {...state, userHasLogged: action.payload};

        case REMEMBER_TOKEN:
            return {...state, rememberToken: action.payload};

        case USER_DATA:
            return {...state, userData: action.payload};

        default:
            return state;

    }
};
