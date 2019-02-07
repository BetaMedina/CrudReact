import React, { Component, Fragment } from 'react';
import TitleComponent from './components/titleComponent';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import { CardContent } from '@material-ui/core';

class Dashboard extends Component {
    render () {
        return (
            <Fragment>
                <Card>
                    <TitleComponent title={'Bem vindo'} />
                    <CardContent>
                        <Typography>
                            Bem vindo ao tutorial de CRUD da App Masters.
                        </Typography>
                        <Typography>
                            Consulte o <a target='_blank' href={'https://github.com/app-masters/crud-tutorial/blob/master/README.md'}>README</a> para saber como executar cada tarefa, mas qualquer dúvida, pergunte ao Baraky.
                        </Typography>
                    </CardContent>
                </Card>
            </Fragment>
        );
    }
}
export default Dashboard;
