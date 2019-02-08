import React, { Component } from 'react';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { onToggleDrawer } from '../../actions/drawerActions';
import UserIcon from '@material-ui/icons/Person';
import CategoryIcon from '@material-ui/icons/Bookmark';

const onMenuClick = (self, route) => {
    self.props.push(route);
    if (self.props.screenSize === 'small') {
        self.props.onToggleDrawer(self.props.drawerOpen);
    }
};

const ReponsiveDrawer = (props) => {
    return (
        <div style={{ flexShrink: 0 }}>
            <SwipeableDrawer
                variant={props.screenSize === 'small' ? 'temporary' : 'permanent'}
                ModalProps={{
                    keepMounted: true // Better open performance on mobile.
                }}
                open={props.open}
                onClose={props.onClose}
                onOpen={props.onOpen}
            >
                {props.children}
            </SwipeableDrawer>
        </div>
    );
};
class LeftDrawer extends Component {
    render () {
        return (
            <ReponsiveDrawer
                screenSize={this.props.screenSize}
                open={this.props.drawerOpen}
                onClose={() => this.props.onToggleDrawer(this.props.drawerOpen)}
                onOpen={() => this.props.onToggleDrawer(this.props.drawerOpen)}>
                <div style={{ paddingTop: 72, width: 290 }}>
                    <MenuItem onClick={() => onMenuClick(this, '/usuarios')}>
                        <ListItemIcon>
                            <UserIcon />
                        </ListItemIcon>
                        <ListItemText>CRUD padrão [users]</ListItemText>
                    </MenuItem>
                    <MenuItem onClick={() => onMenuClick(this, '/categorias')}>
                        <ListItemIcon>
                            <CategoryIcon />
                        </ListItemIcon>
                        <ListItemText>CRUD categorias</ListItemText>
                    </MenuItem>
                    <MenuItem onClick={() => onMenuClick(this, '/lugares')}>
                        <ListItemIcon>
                            <CategoryIcon />
                        </ListItemIcon>
                        <ListItemText>CRUD places</ListItemText>
                    </MenuItem>
                </div>
            </ReponsiveDrawer>
        );
    }
}

const mapStateToProps = ({ drawerReducer, screenReducer, auth, userReducer, adminReducer }) => {
    const drawerOpen = drawerReducer.drawer_open;
    const { screenSize } = screenReducer;
    // const {user} = auth;
    // const {selectedEnterprise} = adminReducer;
    return { drawerOpen: screenSize !== 'small' || drawerOpen, screenSize };
};

export default connect(mapStateToProps, { push, onToggleDrawer })(LeftDrawer);
