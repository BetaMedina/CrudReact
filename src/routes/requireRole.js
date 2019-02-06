import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

class RequireRole extends Component {
    render () {
        if (!this.props.user || !this.props.user.role) {
            return (<div />);
        }

        if (this.props.user.role.indexOf(this.props.user.role) < 0) {
            return (<div />);
        }
        // if (!this.props.user || )
        return (<div>{this.props.children}</div>);
    }
}

const mapStateToProps = ({auth}) => {
    const {user} = auth;
    return { user };
};

export default connect(mapStateToProps, {push})(RequireRole);
