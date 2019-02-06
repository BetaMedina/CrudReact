import ReduxThunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import listen from 'redux-action-listeners';
import { ActionEmitter } from '@app-masters/redux-lib';
import { AMStorage } from '@app-masters/js-lib';
import reducers from './reducers';
import history from './history';
// import logger from 'redux-logger';

let objListener = new ActionEmitter();
let storage = new AMStorage(window.localStorage);

const store = createStore(
    reducers,
    {},
    applyMiddleware(
        ReduxThunk,
        listen(objListener),
        // logger,
        routerMiddleware(history)
    )
);
objListener.setMaxListeners(100);
export { store, storage };
export const listener = objListener;
