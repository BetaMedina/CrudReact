/* global localStorage */

import { type } from '../actions/actionsTypes';

const INITIAL_STATE = {
    loggedUser: null,
    selectedOrganizer: JSON.parse(localStorage.getItem('selectedOrganizer'))
};

export default(state = INITIAL_STATE, action) => {
    switch (action.type) {
    case type.GET_LOGGED_USER:
        return { ...state, loggedUser: action.payload };
    case type.AUTH_LOGOUT:
        return { ...state, loggedUser: null };
    case type.SELECT_ORGANIZER:
        return { ...state, selectedOrganizer: action.payload };
    default:
        return state;
    }
};
