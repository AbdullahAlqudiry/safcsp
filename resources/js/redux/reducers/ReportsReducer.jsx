import {REPORTS_DATA} from '../ActionTypes';


const INITIAL_STATE = {
    reportsData: {
        data: []
    },
};


export default (state = INITIAL_STATE, action) => {

    switch (action.type) {

        case REPORTS_DATA:
            return {...state, reportsData: action.payload};
            
        default:
            return state;

    }
};
