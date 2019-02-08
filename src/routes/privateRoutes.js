import React from 'react';
import { Route } from 'react-router';

import {
    Main,
    Dashboard
} from '../views';

/**
 * Cria o CRUD na rota {path} a partir da pasta {folder} e os arquivos {folder}List e {folder}Form
 * @param path Route Path
 * @param folder Files folder inside /views
 * @return {React.Component}
 */
const CRUD = (path, folder) => {
    // Formata as strings para evitar conflito
    path = '/' + path.replace('/', '');
    folder = folder.replace('/', '');
    // Importa List e Form da pasta especificada
    const listView = require(`../views/${folder}/${folder}List`).default;
    const formView = require(`../views/${folder}/${folder}Form`).default;
    // Retorna as rotas / e /:id para {folder} especificado
    return <React.Fragment>
        <Route exact path={path} component={listView} />
        <Route exact path={`${path}/:id`} component={formView} />
    </React.Fragment>;
};

const PrivateRoutes = () => (
    <Route path='/'>
        <Main>
            <Route exact path='/' component={Dashboard} />
            {CRUD('/usuarios', 'user')}
            {CRUD('/categorias', 'category')}
            {CRUD('/lugares', 'place')}
        </Main>
    </Route>
);

export default PrivateRoutes;
