import {REMEMBER_TOKEN} from './../redux/ActionTypes';


export default {

    /**
     * Get remember token from local storage
     */
    getRememberToken() {
        return localStorage.getItem(REMEMBER_TOKEN);
    },

    /**
     * destroy remember token from local storage
     */
    destroyRememberToken() {
        return localStorage.removeItem(REMEMBER_TOKEN);
    },
};