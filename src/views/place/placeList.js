import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import ActionDelete from '@material-ui/icons/Delete';
import ActionEdit from '@material-ui/icons/Edit';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Add from '@material-ui/icons/Add';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import { CardContent, Card } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import { listener } from '../../store';
import { openDialog, openSnack } from '../../actions/screenActions';
import AppActions from '../../actions';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import TitleComponent from '../components/titleComponent';
class PlaceList extends Component {
    constructor (props) {
        super(props);
        this.doInsert = this.doInsert.bind(this);
        this.onUserDeleteObject = this.onUserDeleteObject.bind(this);
        listener.on(AppActions.type['USER_DELETE_OBJECT'], this.onUserDeleteObject);
    }

    componentDidMount () {
        this.props.getObjects();
    }

    // Render methods:
    renderBig () {
        return (
            <Fragment>
                <TitleComponent
                    title={'Lugares'}
                    action={() => this.doInsert()}
                    actionLabel={'INCLUIR'}
                    actionIcon={<Add />} />
                <Card>
                    <CardContent>
                        {this.renderContent()}
                    </CardContent>
                </Card>
            </Fragment>
        );
    }

    renderTable () {
        const { items } = this.props;
        let tableRows = items.map((item, key) => {
            return (
                <TableRow key={key}>
                    <TableCell>{item.title}</TableCell>
                    <TableCell>{item.address}</TableCell>
                    <TableCell />
                    <TableCell style={{ width: 40 }}>
                        <ActionEdit style={style.actionButton} color='action'
                        onClick={(e) => this.doEdit(e, item)} />
                        <ActionDelete style={style.actionButton} color='action'
                            onClick={(e) => { this.doDelete(e, item); }} />
                    </TableCell>
                </TableRow>
            );
        });

        return (
            <Table onClick={() => console.log()}>
                <TableHead>
                    <TableRow>
                        <TableCell>Titulo</TableCell>
                        <TableCell>Address</TableCell>
                        <TableCell />
                        <TableCell style={{ width: 40 }} />
                    </TableRow>
                </TableHead>
                <TableBody>
                    {tableRows}
                </TableBody>
            </Table>);
    }

    renderSmall () {
        return (
            <Card>
                <Typography variant='h4'>Usuários</Typography>
                <AppBar position='static'>
                    <Toolbar variant='regular'>
                        <Button variant='contained' onClick={() => this.doInsert()}>
                            <Add /> INCLUIR
                        </Button>
                    </Toolbar>
                    <Divider />
                </AppBar>
                <CardContent>
                    {this.renderContent()}
                </CardContent>
            </Card>
        );
    }

    renderList () {
        let listItems = this.props.items.map((item) => {
            return (
                <ListItem
                    style={{ overflow: 'hidden' }}
                    onClick={(e) => this.doEdit(e, item)}
                    secondaryText={item.title}
                    rightIcon={<ActionDelete color='action' onClick={(e) => this.doDelete(e, item)} />}
                    key={item._id}
                />
            );
        });

        return (
            <List>
                {listItems}
            </List>
        );
    }

    renderContent () {
        if (this.props.loading) {
            return (<Loading />);
        } else {
            if (this.props.screenSize === 'small') {
                return this.renderList();
            } else {
                return this.renderTable();
            }
        }
    }

    render () {
        if (this.props.screenSize === 'small') {
            return this.renderSmall();
        } else {
            return this.renderBig();
        }
    }

    // Action methods:
    doInsert () {
        this.props.push('/lugares/new/');
    }

    doEdit (e, item) {
        // e.stopPropagation();]
        this.props.history.push(`/lugares/${item.id}`);
    }

    doDelete (e, item) {
        e.stopPropagation();
        // Dialog
        this.props.openDialog(`Deseja remover ${item.title} (${item.slug}) ?`, '3', () => this.props.deleteObject(item.id));
    }

    // Listener methods:
    onUserDeleteObject () {
        this.props.openSnack('Usuário removido com sucesso');
        this.props.getObjects();
    }

    
}

let style = {
    actionButton: {
        marginLeft: 10
    }
};

const Loading = () =>
    (<div style={{ textAlign: 'center', padding: 25 }}>
        <CircularProgress size={50} thickness={3} />
    </div>);

const mapStateToProps = ({ screenReducer, placeReducer }) => {
    const { screenSize } = screenReducer;
    const { items, loading } = placeReducer;
    // const {user} = auth;
    return { screenSize, items, loading };
};

export default connect(mapStateToProps,
    {
        getObjects: AppActions.place.getObjects,
        deleteObject: AppActions.place.deleteObject,
        openDialog,
        openSnack,
        push
    })(PlaceList);
