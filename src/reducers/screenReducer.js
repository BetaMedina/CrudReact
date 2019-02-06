import {
    SCREEN_SIZE,
    DO_SNACK,
    DO_DIALOG
} from '../actions/types';

const INITIAL_STATE = {
    screenSize: 'big',
    snack: { open: false, message: '' },
    dialog: { open: false, message: '', actions: '' }
};

export default(state = INITIAL_STATE, action) => {
    // console.log('red', action);
    switch (action.type) {
    case SCREEN_SIZE:
        return { ...state, screenSize: action.payload.screenSize };
    case DO_SNACK:
        return { ...state, snack: action.payload };
    case DO_DIALOG:
        return { ...state, dialog: action.payload };
    default:
        return state;
    }
};
