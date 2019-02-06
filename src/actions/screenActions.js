import {
    SCREEN_SIZE,
    DO_SNACK,
    DO_DIALOG
} from './types';

export const onScreenChange = (screenSize) => {
    return { type: SCREEN_SIZE, payload: screenSize };
};

export const openSnack = (message, time = 4000) => {
    return (dispatch) => {
        doSnack(dispatch, message, time);
    };
};

export const doSnack = (dispatch, message, time = 4000) => {
    dispatch({ type: DO_SNACK, payload: { open: true, message: message } });
    setTimeout(function () {
        dispatch({ type: DO_SNACK, payload: { open: false, message: '' } });
    }, time);
};

export const setSnack = (dispatch, snack, message, time) => {
    dispatch({ type: DO_SNACK, payload: { open: snack, message: message } });
};

export const openDialog = (message, type, cb = () => {}) => {
    return ({ type: DO_DIALOG, payload: { open: true, message: message, cb: cb, type: type } });
};
export const closeDialog = () => {
    return ({ type: DO_DIALOG, payload: { open: false } });
};
