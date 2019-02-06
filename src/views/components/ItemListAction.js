import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import ActionVisibility from '@material-ui/icons/Visibility';

import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';

class ItemListAction extends Component {
    // constructor (props) {
    //     super(props);
    //     this.onViewItem = this.onViewItem.bind(this);
    // }

    render () {
        return (
            <div>
                {this.renderList(this.props.items)}
            </div>);
    }

    doViewItem (item) {
        this.props.push(`/inscricoes/${item.id}`);
    }

    renderList = (items) => {
        let events = [];
        const statusMap = {
            NOT_CONFIRMED: 'Não Confirmada',
            CONFIRMED: 'Confirmada'
        };

        if (items.length) {
            events = items.map(i => {
                return (
                    <React.Fragment key={i.id}>
                        <TableRow>
                            <TableCell colSpan={2}><b>{i.user.name}</b></TableCell>
                            <TableCell style={{ width: 100, textAlign: 'right' }}>
                                <ActionVisibility color='action' onClick={() => this.doViewItem(i)} />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            {/* <TableCell>{i.price.title}</TableCell>
                            <TableCell>R$ {i.price.value}</TableCell> */}
                            <TableCell>{statusMap[i.status]}</TableCell>
                        </TableRow>
                        <TableRow />
                    </React.Fragment>
                );
            });
        }

        return (
            <React.Fragment>
                <Table>
                    <TableBody>
                        {events}
                    </TableBody>
                </Table>
            </React.Fragment>
        );
    }
}

// export default ItemListAction;
export default connect(() => {}, { push })(ItemListAction);
