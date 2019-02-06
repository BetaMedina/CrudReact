import { persistCombineReducers } from 'redux-persist';
import storage from 'redux-persist/es/storage';
import { type } from '../actions/actionsTypes';

import authReducer from './authReducer';
import screenReducer from './screenReducer';
import drawerReducer from './drawerReducer';
import appReducer from './appReducer';
import amReducer from './amReducer';
// import { AMRedux } from '@app-masters/sync-cache';

const persistConfig = {
    key: 'root',
    storage,
    // redux-persist will not watch these reducers
    blacklist: [
        'navigationReducer',
        'authReducer',
        'consultReducer',
        ...Object.keys(amReducer)
    ]
};

const reducerConfig = {
    // list of reducers that will not be clear in CLEAR REDUCER action
    keep: ['navigationReducer', '_persist']
};

const rootReducers = persistCombineReducers(persistConfig,
    Object.assign(amReducer, {
        drawerReducer,
        screenReducer,
        appReducer,
        auth: authReducer
    })
);

const reducers = (state, action) => {
    if (action.type === type.CLEAR_REDUCERS) {
        let nextState = {};
        reducerConfig.keep.map(key => {
            nextState[key] = state[key];
        });
        state = nextState;
    }
    return rootReducers(state, action);
};

export default reducers;
