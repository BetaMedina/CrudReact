import { AMRedux } from '@app-masters/sync-cache';

let type = {
    // Auth
    AUTH_LOGIN_SUCCESS: 'Auth/LOGIN_SUCCESS',
    AUTH_LOGIN_FAIL: 'Auth/LOGIN_FAIL',
    AUTH_LOGOUT: 'Auth/LOGOUT',

    // Other reducers can consume this actions
    CLEAR_REDUCERS: 'App/CLEAR_REDUCER',
    SAVE_USER: 'App/SAVE_USER',
    REHYDRATE: 'persist/REHYDRATE',
    SET_USER_LOADING: 'App/SET_USER_LOADING',

    // AppReducer
    GET_LOGGED_USER: 'App/GET_LOGGED_USER',
    TOGGLE_DRAWER: 'App/TOGGLE_DRAWER',
    SELECT_ORGANIZER: 'App/SELECT_ORGANIZER',

    // AMActions
    ...AMRedux.actionTypes
};

export { type };
