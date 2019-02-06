import React, { Component } from 'react';
import { connect } from 'react-redux';

class RequireRole extends Component {
    render () {
        if (!this.props.roles || this.props.roles.indexOf(this.props.user.role) > -1) {
            return this.props.children;
        } else {
            return null;
        }

    }

}

const mapStateToProps = ({auth}) => {
    const {user} = auth.user;
    return {user};
};

export default connect(mapStateToProps, {})(RequireRole);
