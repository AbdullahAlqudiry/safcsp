import {CORE_ROLES_DATA, CORE_GROUPS_DATA, CORE_USERS_DATA} from '../ActionTypes';


const INITIAL_STATE = {
    groupsData: {
        data: []
    },
    usersData: {
        data: []
    },
    rolesData: [],
};


export default (state = INITIAL_STATE, action) => {

    switch (action.type) {

        case CORE_ROLES_DATA:
            return {...state, rolesData: action.payload};

        case CORE_GROUPS_DATA:
            return {...state, groupsData: action.payload};

        case CORE_USERS_DATA:
            return {...state, usersData: action.payload};

        default:
            return state;

    }
};
