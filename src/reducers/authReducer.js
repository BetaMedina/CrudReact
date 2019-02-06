import { type } from '../actions/actionsTypes';

const INITIAL_STATE = {
    user: null
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
    case type.AUTH_LOGIN_SUCCESS:
        return { ...state, user: action.payload };
    case type.AUTH_LOGIN_FAIL:
        return { ...state, error: action.payload };
    case type.AUTH_LOGOUT:
        return { ...state, user: null };
    default:
        return state;
    }
};
