import {
    TOGGLE_DRAWER
} from '../actions/types';

const INITIAL_STATE = {
    drawer_open: false
};

export default(state = INITIAL_STATE, action) => {
    // console.log(action);
    switch (action.type) {
    case TOGGLE_DRAWER:
        return { ...state, drawer_open: !state.drawer_open };
    default:
        return state;
    }
};
