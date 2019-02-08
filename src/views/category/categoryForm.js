import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Row, Col } from 'react-flexbox-grid';

import { CardContent, Card } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Toolbar from '@material-ui/core/Toolbar';

import { openDialog, openSnack } from '../../actions/screenActions';
import { listener } from '../../store';

import AppActions from '../../actions';
import AMFormComponent from '../components/amFormComponent';
import TitleComponent from '../components/titleComponent';

class CategoryForm extends AMFormComponent {
    constructor (props) {
        super(props);
        this.state = {
            classValue: 0,
            multiSelectable: true,
            formData: {}
        };
        this.save = this.save.bind(this);
        this.onTextChange = this.onTextChange.bind(this);
        this.onSelectedChange = this.onSelectedChange.bind(this);
        this.onUserError = this.onUserError.bind(this);
        this.onUserSaveObject = this.onUserSaveObject.bind(this);
        listener.on(AppActions.type['USER_ERROR'], this.onUserError);
        listener.on(AppActions.type['USER_SAVE_OBJECT'], this.onUserSaveObject);
    }

    componentWillMount () {
        this.props.prepareForm(this.props.match);
    }

    componentWillReceiveProps (props) {
        if (Object.keys(this.state.formData).length === 0) {
            this.setState({ formData: props.input });
        }
    }

    // Render methods:
    render () {
        let title = (this.props.match && this.props.match.params.id !== 'new') ? 'Editar Categorias' : ('Incluir Categorias');
        return (
            <Fragment>
                <TitleComponent title={title} />
                <Card>
                    <CardContent>
                        <Row>
                            <Col style={{ marginBottom: 20 }} />
                        </Row>
                        <Row>
                            <Col style={{ marginBottom: 20 }} md={6} xs={12}>
                                <TextField
                                    required
                                    label='title'
                                    type='text'
                                    id='title'
                                    onChange={this.onTextChange}
                                    value={this.props.input.title || ''}
                                    error={this.hasError('title')}
                                    helperText={this.getErrorByField('title')}
                                    fullWidth />
                            </Col>
                        </Row>
                        <Row>
                            <Col style={{ marginBottom: 20 }} md={12} xs={12}>
                                <TextField
                                    required
                                    label='description'
                                    type='text'
                                    id='description'
                                    onChange={this.onTextChange}
                                    error={this.hasError('description')}
                                    helperText={this.getErrorByField('description')}
                                    value={this.props.input.description || ''}
                                    fullWidth
                                />
                            </Col>
                        </Row>
                    </CardContent>
                    <Toolbar style={{ justifyContent: 'flex-end' }}>
                        <div style={{ textAlign: 'right' }}>
                            {this.renderSave()}
                        </div>
                    </Toolbar>
                </Card>
            </Fragment>
        );
    }

    renderSave () {
        if (!this.props.loading) {
            return (
                <Button variant='contained' color='primary' onClick={this.save}>
                    Salvar
                </Button>
            );
        } else {
            return (<Loading />);
        }
    }

    // Action methods:
    save () {
        const { input } = this.props;

        // Validate
        const validated = this.props.validateObject(input);

        if (!validated.payload.message && validated.payload) {
            // Create ou update? Let saveObject decide
            this.props.saveObject({ ...this.props.input, _id: this.props.input.id });
        } else {
            this.props.openDialog(validated.payload.message, '2');
        }
    }

    // Listener methods
    onUserError (action) {
        if (action.payload) {
            this.props.openDialog(action.payload.message, null, '2');
        }
    }

    onUserSaveObject (action, store) {
        this.props.openSnack('Usuário salvo com sucesso');
        this.props.push('/categorias');
    }
}

const Loading = () =>
    (<div style={{ textAlign: 'center', padding: 25 }}>
        <CircularProgress size={50} thickness={3} />
    </div>);

const mapStateToProps = ({ categoryReducer }) => {
    const { items, input, loading, error } = categoryReducer;
    return { items, input, loading, error: error };
};

export default connect(mapStateToProps,
    {
        newObject: AppActions.category.newObject,
        getObject: AppActions.category.getObject,
        createObject: AppActions.category.createObject,
        saveObject: AppActions.category.saveObject,
        updateObject: AppActions.category.updateObject,
        inputChanged: AppActions.category.inputChanged,
        validateObject: AppActions.category.validateObject,
        prepareForm: AppActions.category.prepareForm,
        openDialog,
        openSnack,
        push
    }
)(CategoryForm);
