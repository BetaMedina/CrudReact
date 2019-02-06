import './actions';
import React, { Component } from 'react';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { Provider } from 'react-redux';
import Router from './routes/router.js';
import { Rollbar, AppBootstrap, LaravelErrorHandler, Http } from '@app-masters/js-lib';
import { storage, store } from './store';
import { AMActions, AMCache, AMCacheActions } from '@app-masters/redux-lib';
import { MuiPickersUtilsProvider } from 'material-ui-pickers';
import packag from './../package.json';
import envs from './config';
import './assets/css/styles.css';
import MomentUtils from '@date-io/moment';
import { adminTheme } from './theme';

class App extends Component {
    componentWillMount () {
        try {
            let callbacks = {
                onMinVersionNotSatifies: (version) => {
                    window.alert('Você deve atualizar sua versão agora! Por favor recarregue a página, se a mensagem continuar, limpe o cache do navegador.');
                },
                onNewVersion: (version, isNew) => {
                    if (isNew) {
                        window.alert('Bem vindo à nova versão!');
                    }
                },
                onUncaughtError: (errorObj) => {
                    if (errorObj && errorObj.body && errorObj.body.error) {
                        window.alert(errorObj.body.error);
                        Rollbar.critical(errorObj.body.error, errorObj);
                    } else if (errorObj && errorObj.body && errorObj.body.field) {
                        Rollbar.critical('Invalid field on admin!', errorObj);
                        window.alert('Um campo inválido está sendo enviado para o servidor. Os programadores foram avisados.');
                    } else if (!errorObj || !errorObj.body || Object.keys(errorObj).length < 1) {
                        Rollbar.error(errorObj);
                        window.alert('Houve um erro inesperado e os programadores responsáveis já foram avisados.');
                    }
                }
            };
            Http.setErrorHandler(LaravelErrorHandler);
            AppBootstrap.setup('admin', packag, envs, storage, callbacks, process.env.REACT_APP_ENV);
            console.log('process.env', process.env);
            // Http.setHeaderParam('service-id', process.env.service_id);
            AMActions.setup(storage, callbacks);
            AMCache.setStorage(storage);
            AMCacheActions.onUncaughtError(callbacks.onUncaughtError);
        } catch (e) {
            Rollbar.log(e);
            window.alert('Houve um erro inesperado e os programadores responsáveis já foram avisados.');
        }
    }

    render () {
        return (
            <Provider store={store}>
                <MuiThemeProvider theme={adminTheme}>
                    <MuiPickersUtilsProvider utils={MomentUtils}>
                        <Router />
                    </MuiPickersUtilsProvider>
                </MuiThemeProvider>
            </Provider>
        );
    }
}

export default App;
