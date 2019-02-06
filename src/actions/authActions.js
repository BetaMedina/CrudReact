import { type } from './actionsTypes';
import { Http } from '@app-masters/js-lib';
import { getOrganizerFromUser } from './appActions';

export const onLoginSuccess = (data) => dispatch => {
    if (data.user.role === 'user') {
        window.localStorage.removeItem('auth');
        window.alert('Usuário não autorizado');
        // window.location.reload();
        return;
    }

    Http.setAuthorization(data.token);
    Http.setEndpointParam('{_userId}', data.user.id);
    dispatch({ type: type.AUTH_LOGIN_SUCCESS, payload: data });
    dispatch({ type: type.GET_LOGGED_USER, payload: data.user });
    dispatch(getOrganizerFromUser(data.user));
};

export const logoutUser = () => {
    return (dispatch) => {
        Http.reset();
        window.localStorage.clear();
        dispatch({ type: type.AUTH_LOGOUT });
    };
};
