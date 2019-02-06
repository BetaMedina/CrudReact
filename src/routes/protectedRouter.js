import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import PrivateRoutes from './privateRoutes';
import { push } from 'react-router-redux';

class ProtectedRouter extends Component {
    constructor (props) {
        super(props);
        this.renderRouter = this.renderRouter.bind(this);
    }

    renderRouter () {
        return (
            <PrivateRoutes />
        );
    }

    render () {
        return this.renderRouter();
    }
}

const mapStateToProps = (state) => ({
    user: state.auth.user
});

export default withRouter(connect(mapStateToProps, { push })(ProtectedRouter));
