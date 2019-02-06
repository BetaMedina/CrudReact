/* global localStorage */
import { Http, Rollbar } from '@app-masters/js-lib';
import { type } from './actionsTypes';

export const getLoggedUser = (userId) => {
    return (dispatch) => {
        const data = localStorage.getItem('loggedUser');
        const user = JSON.parse(data);
        if (user) {
            dispatch({ type: type.GET_LOGGED_USER, payload: user });
            dispatch(getOrganizerFromUser(user));
        }
        Http.get('/user/' + userId).then((response) => {
            localStorage.setItem('loggedUser', JSON.stringify(response.data));
            dispatch({ type: type.GET_LOGGED_USER, payload: response.data });
            dispatch(getOrganizerFromUser(response.data));
        }).catch((error) => {
            console.log(error);
            dispatch({ type: type.GET_LOGGED_USER, payload: null });
        });
    };
};

export const selectOrganizer = (organizer) => {
    return (dispatch) => {
        localStorage.setItem('selectedOrganizer', JSON.stringify(organizer));
        Http.setEndpointParam('{_organizerId}', organizer.id);
        dispatch({ type: type.SELECT_ORGANIZER, payload: organizer });
    };
};

export const getOrganizerFromUser = (user) => {
    return (dispatch, getState) => {
        const selectedOrganizer = getState().appReducer.selectedOrganizer;
        if (selectedOrganizer) {
            return null;
        } else {
            let organizer = null;
            const { organizers } = user;
            if (!organizers) {
                Rollbar.warning('User without organizers on admin');
            } else {
                organizer = organizers[0];
                dispatch(selectOrganizer(organizer));
            }
        }
    };
};
