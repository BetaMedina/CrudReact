import React from 'react';
import { ConnectedRouter } from 'react-router-redux';

import ProtectedRouter from './protectedRouter';
import history from '../history';

const Router = () => {
    return (
        <ConnectedRouter history={history} >
            <ProtectedRouter />
        </ConnectedRouter>
    );
};
export default Router;
