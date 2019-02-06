import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Row, Col } from 'react-flexbox-grid';

import { CardContent, Card } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Toolbar from '@material-ui/core/Toolbar';

import { Text } from '@app-masters/js-lib';
import EditorComponent from '../components/editorComponent';

import { openDialog, openSnack } from '../../actions/screenActions';
import { listener } from '../../store';

import AppActions from '../../actions';
import AMFormComponent from '../components/amFormComponent';
import ImageUploaderCloudinary from '../components/imageUploaderCloudinary';
import FormControlLabel from '@material-ui/core/FormControlLabel/FormControlLabel';
import TitleComponent from '../components/titleComponent';
import Switch from '@material-ui/core/Switch/Switch';
import FormHelperText from '@material-ui/core/FormHelperText/FormHelperText';

class UserForm extends AMFormComponent {
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
        if (~this.props.match.path.indexOf('instrutores')) {
            this.onSelectedChange('role', { target: { value: 'instructor' } });
        }
        if (this.props.match && this.props.match.params.id === 'new') {
            this.onSelectedChange('active', { target: { value: true } });
        }
    }

    componentWillReceiveProps (props) {
        if (Object.keys(this.state.formData).length === 0) {
            this.setState({ formData: props.input });
        }
    }

    // Render methods:
    render () {
        let title;
        const isUser = !~this.props.match.path.indexOf('instrutores');
        if (isUser) {
            title = (this.props.match && this.props.match.params.id !== 'new') ? 'Editar Usuário' : ('Incluir Usuário');
        } else {
            title = (this.props.match && this.props.match.params.id !== 'new') ? 'Editar Instrutor' : ('Incluir Instrutor');
        }
        return (
            <Fragment>
                <TitleComponent title={title} />
                <Card>
                    <CardContent>
                        <Row>
                            <Col style={{ marginBottom: 20 }} />
                        </Row>
                        <Row>
                            <Col style={{ marginBottom: 20 }} md={isUser ? 6 : 10} xs={12}>
                                <TextField
                                    required
                                    label='Nome'
                                    type='text'
                                    id='name'
                                    onChange={this.onTextChange}
                                    value={this.props.input.name || ''}
                                    error={this.hasError('name')}
                                    helperText={this.getErrorByField('name')}
                                    fullWidth
                                />
                            </Col>
                            {isUser && <Col style={{ marginBottom: 20 }} md={4} xs={12}>
                                <TextField
                                    label='Tipo'
                                    type='text'
                                    id='type'
                                    select
                                    onChange={(event) => this.onSelectedChange('role', event)}
                                    value={this.props.input.role || 'user'}
                                    error={this.hasError('role')}
                                    helperText={this.getErrorByField('role')}
                                    fullWidth
                                >
                                    <MenuItem value={'user'}>Usuário</MenuItem>
                                    <MenuItem value={'admin'}>Administrador</MenuItem>
                                </TextField>

                            </Col>}
                            <Col style={{ marginBottom: 20 }} md={2} xs={12}>
                                <FormControlLabel
                                    style={{ marginTop: 18 }}
                                    control={
                                        <Switch
                                            checked={this.props.input.active || false}
                                            onChange={() => this.onSelectedChange('active', { target: { value: !this.props.input.active } })}
                                        />
                                    }
                                    label='Ativo'
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col style={{ marginBottom: 20 }} md={4} xs={12}>
                                <TextField
                                    label='Endereço de E-mail'
                                    type='email'
                                    id='email'
                                    required
                                    onChange={this.onTextChange}
                                    error={this.hasError('email')}
                                    helperText={this.getErrorByField('email')}
                                    value={this.props.input.email || ''}
                                    fullWidth
                                />
                            </Col>
                            <Col style={{ marginBottom: 20 }} md={2} xs={12}>
                                <TextField
                                    label='Senha'
                                    type='password'
                                    id='password'
                                    onChange={this.onTextChange}
                                    error={this.hasError('password')}
                                    helperText={this.getErrorByField('password')}
                                    value={this.props.input.password || ''}
                                    fullWidth
                                />
                            </Col>
                            <Col style={{ marginBottom: 20 }} md={2} xs={12}>
                                <TextField
                                    label='DDD'
                                    type='number'
                                    id='phone_prefix'
                                    error={this.hasError('phone_prefix')}
                                    helperText={this.getErrorByField('phone_prefix')}
                                    onChange={(event) => this.onTextChange(event, 2)}
                                    value={this.props.input.phone_prefix || ''}
                                    fullWidth
                                />
                            </Col>
                            <Col style={{ marginBottom: 20 }} md={4} xs={12}>
                                <TextField
                                    label='Telefone'
                                    type='phone'
                                    id='phone'
                                    error={this.hasError('phone')}
                                    helperText={this.getErrorByField('phone')}
                                    onChange={(event) => this.onTextChange(event, 10)}
                                    value={Text.formatPhone(this.props.input.phone || '')}
                                    fullWidth
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col style={{ marginBottom: 20 }} md={12} xs={12}>
                                <EditorComponent
                                    title={'Bio'}
                                    value={this.props.input.bio}
                                    onChange={(value) => this.onTextChange({ target: { id: 'bio', value } })}
                                />
                                {this.hasError('bio') && <FormHelperText error>{this.getErrorByField('bio')}</FormHelperText>}
                            </Col>
                        </Row>
                        <Row>
                            <Col style={{ marginBottom: 20 }} md={4} xs={12}>
                                <ImageUploaderCloudinary
                                    preset={'wideBanner'}
                                    value={this.props.input.banner_url}
                                    onChange={item => {
                                        this.props.inputChanged('banner_url', item);

                                        // It's wrong, very wrong, but that idea is not mine.
                                        // It's a Felipe's idea. Felipe is guilty.
                                        this.setState({ bug: !this.state.bug });
                                    }}
                                    error={this.hasError('banner_url')}
                                    helperText={this.getErrorByField('banner_url')}
                                    title={'Banner'} />
                            </Col>
                            <Col style={{ marginBottom: 20 }} md={4} xs={12}>
                                <ImageUploaderCloudinary
                                    preset={'squarePhoto'}
                                    value={this.props.input.image_url}
                                    onChange={item => {
                                        this.props.inputChanged('image_url', item);

                                        // It's wrong, very wrong, but that idea is not mine.
                                        // It's a Felipe's idea. Felipe is guilty.
                                        this.setState({ bug: !this.state.bug });
                                    }}
                                    error={this.hasError('image_url')}
                                    helperText={this.getErrorByField('image_url')}
                                    title={'Foto'} />
                            </Col>
                            <Col style={{ marginBottom: 20 }} md={4} xs={12}>
                                <ImageUploaderCloudinary
                                    preset={'squareThumb'}
                                    value={this.props.input.thumb_url}
                                    onChange={item => {
                                        this.props.inputChanged('thumb_url', item);

                                        // It's wrong, very wrong, but that idea is not mine.
                                        // It's a Felipe's idea. Felipe is guilty.
                                        this.setState({ bug: !this.state.bug });
                                    }}
                                    error={this.hasError('thumb_url')}
                                    helperText={this.getErrorByField('thumb_url')}
                                    title={'Miniatura'} />
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
        this.props.push('/usuarios');
    }
}

const Loading = () =>
    (<div style={{ textAlign: 'center', padding: 25 }}>
        <CircularProgress size={50} thickness={3} />
    </div>);

const mapStateToProps = ({ userReducer }) => {
    const { items, input, loading, error } = userReducer;
    return { items, input, loading, error: error };
};

export default connect(mapStateToProps,
    {
        newObject: AppActions.user.newObject,
        getObject: AppActions.user.getObject,
        createObject: AppActions.user.createObject,
        saveObject: AppActions.user.saveObject,
        updateObject: AppActions.user.updateObject,
        inputChanged: AppActions.user.inputChanged,
        validateObject: AppActions.user.validateObject,
        prepareForm: AppActions.user.prepareForm,
        openDialog,
        openSnack,
        push
    }
)(UserForm);
