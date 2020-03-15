import { combineReducers } from 'redux';

import UserReducer from './UserReducer';
import AppReducer from './AppReducer';
import CoreReducer from './CoreReducer';
import ReportsReducer from './ReportsReducer';

const rootReducer = combineReducers({
    app: AppReducer,
    user: UserReducer,
    core: CoreReducer,
    reports: ReportsReducer,
});

export default rootReducer;
