import React, { Component } from 'react';
import { Card, TextField } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Http } from '@app-masters/js-lib';

class Login extends Component {
    constructor (props) {
        super(props);
        this.onButtonPress = this.onButtonPress.bind(this);
        this.state = {
            error: {},
            loading: false
        };
    }

    keydownHandler = (e) => {
        e.stopPropagation();
        if (e.key === 'Enter') {
            this.onButtonPress();
        }
    };

    componentDidMount () {
        document.addEventListener('keydown', this.keydownHandler);
    }
    componentWillUnmount () {
        document.removeEventListener('keydown', this.keydownHandler);
    }
    async onButtonPress () {
        const { email, password } = this.props.input;
        this.setState({ error: {}, loading: true });
        try {
            const res = await Http.post('/auth/login', {
                email,
                password
            });
            window.localStorage.setItem('auth', JSON.stringify(res));
            this.props.onLoginSuccess(res);
        } catch (error) {
            console.log(error);
            this.setState({ error });
        }

        this.setState({ loading: false });
    }

    renderButton () {
        if (!this.state.loading) {
            return (
                <Button variant='contained' color='primary' onClick={this.onButtonPress}>
                    Entrar
                </Button>
            );
        } else {
            return (
                <div style={{ textAlign: 'center' }}>
                    <CircularProgress size={40} thickness={5} />
                </div>
            );
        }
    }

    render () {
        return (
            <div>
                <div style={{
                    display: 'flex',
                    paddingTop: '5%',
                    paddingBottom: '10%',
                    alignItems: 'center',
                    justifyContent: 'center'
                }} />
                <Card style={styles.loginContainer}>
                    <TextField
                        label='Email'
                        id='email'
                        fullWidth
                        onChange={(e) => this.props.inputChanged('email', e.target.value)}
                    />
                    <TextField
                        label='Senha'
                        id='password'
                        type='password'
                        fullWidth
                        onChange={(e) => this.props.inputChanged('password', e.target.value)}
                    />
                    {ErrorRenderer(this.state.error)}
                    <div style={styles.containerButtons}>
                        {this.renderButton()}
                    </div>
                </Card>
            </div>
        );
    }
}

const ErrorRenderer = (payload) => (
    <div style={styles.authErrorContainer}>
        <div style={styles.authErrorWrapper}>
            {payload.body && payload.body.error
                ? payload.body.error.map(error => <span key={error} style={{ color: '#ff0033', fontSize: 14 }}>{error}</span>)
                : null}
            {payload.body && payload.body.field
                ? payload.body.field.map(error => <span key={error} style={{ color: '#ff0033', fontSize: 14 }}>{error}</span>)
                : null}
        </div>
    </div>
);

const styles = {
    loginContainer: {
        padding: 20,
        minWidth: 80,
        maxWidth: 400,
        width: '90%',
        height: 'auto',
        position: 'absolute',
        left: 0,
        right: 0,
        margin: 'auto',
        backgroundColor: '#fff'
    },
    containerButtons: {
        textAlign: 'center',
        paddingTop: '20px'
    },
    authErrorContainer: {
        textAlign: 'center',
        marginTop: '1em'
    },
    authErrorWrapper: {
        fontSize: '1.2em',
        width: '100%'
    }
};

export default Login;
