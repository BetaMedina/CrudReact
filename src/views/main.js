import React, { Component } from 'react';
import { connect } from 'react-redux';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import IconMenu from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Snack from './components/snack';
import LeftDrawer from './components/leftDrawer';
import { onScreenChange } from '../actions/screenActions';
import { onToggleDrawer } from '../actions/drawerActions';
import { push } from 'react-router-redux';
import Typography from '@material-ui/core/Typography';
import { withTheme } from '@material-ui/core/styles';
import Hidden from '@material-ui/core/Hidden/Hidden';

class Main extends Component {
    componentDidMount () {
        window.addEventListener('resize', () => {
            this.updateDimensions();
        });
        this.updateDimensions();
    }

    updateDimensions () {
        let w = window;

        let d = document;

        let documentElement = d.documentElement;

        let body = d.getElementsByTagName('body')[0];

        let width = w.innerWidth || documentElement.clientWidth || body.clientWidth;

        let screenSize = width < 768 ? 'small' : width < 960 ? 'medium' : 'big';

        this.props.onScreenChange({ screenSize: screenSize });
    }

    render () {
        const marginLeft = this.props.screenSize === 'small' ? 0 : 294;
        return (
            <div className='App' style={{ display: 'flex' }}>
                <CssBaseline />
                <AppBar position='fixed' style={{ zIndex: 1400 }}>
                    <Toolbar>
                        <div style={{ display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'space-between' }}>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <Hidden smUp>
                                    <IconMenu onClick={() => this.props.onToggleDrawer(this.props.drawerOpen)} />
                                </Hidden>
                                <Typography variant='h5' onClick={() => this.props.push('/')}
                                    style={{ marginLeft: 16, color: this.props.theme.alternateTextColor, cursor: 'pointer' }}>
                                    {'Tutorial de Crud'}
                                </Typography>
                            </div>
                        </div>
                    </Toolbar>
                </AppBar>
                <LeftDrawer />
                <div style={{ marginLeft: marginLeft, flexGrow: 1 }}>
                    <div style={{ margin: 16, marginTop: 80 }}>
                        {this.props.children}
                    </div>
                </div>
                <Snack />
            </div>
        );
    }
};

const mapStateToProps = ({ screenReducer, drawerReducer, crud, adminReducer, auth, appReducer }) => {
    const { screenSize } = screenReducer;
    const { drawer_open: drawerOpen } = drawerReducer;
    const selectedOrganizer = appReducer.selectedOrganizer;
    return { screenSize, drawerOpen, selectedOrganizer };
};

export default connect(
    mapStateToProps,
    {
        push,
        onScreenChange,
        onToggleDrawer
    }
)(withTheme()(Main));
