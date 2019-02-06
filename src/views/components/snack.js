import React, { Component } from 'react';
import { connect } from 'react-redux';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import { closeDialog } from '../../actions/screenActions';

class Snack extends Component {
    render () {
        // console.log('SNACK:', this.props);
        const actions1 = (
            <DialogActions>
                <Button onClick={() => { this.props.closeDialog(); this.props.dialog.cb(); }} color='primary'>
                    Ok
                </Button>
                <Button onClick={() => { this.props.closeDialog(); }} color='primary' autoFocus>
                    Cancelar
                </Button>
            </DialogActions>
        );
        const actions2 = (
            <DialogActions>
                <Button onClick={() => { this.props.closeDialog(); this.props.dialog.cb(); }} color='primary'>
                    Entendi
                </Button>
            </DialogActions>
        );
        const actions4 = (
            <DialogActions>
                <Button onClick={() => { this.props.closeDialog(); }} color='primary' autoFocus>
                    Voltar
                </Button>
                <Button onClick={() => { this.props.closeDialog(); this.props.dialog.cb(); }} color='primary'>
                    Confirmar
                </Button>
            </DialogActions>
        );
        return (
            <div>
                <Snackbar
                    open={this.props.snack.open}
                    message={this.props.snack.message}
                    action='Fechar'
                    autoHideDuration={this.props.snack.time}
                />
                <Dialog
                    open={this.props.dialog.open && (this.props.dialog.type === '1' || this.props.dialog.type === '3')}
                >
                    <DialogTitle>
                        {this.props.dialog.message}
                    </DialogTitle>
                    {this.props.dialog.type === '3' && <DialogContent>
                        <DialogContentText>Esta ação é irreversível e irá remover os dados permanentemente do servidor.</DialogContentText>
                    </DialogContent>}
                    {actions1}
                </Dialog>

                <Dialog
                    open={this.props.dialog.open && this.props.dialog.type === '2'}
                >
                    <DialogTitle>
                        {this.props.dialog.message}
                    </DialogTitle>
                    {actions2}
                </Dialog>

                <Dialog
                    open={this.props.dialog.open && this.props.dialog.type === '4'}
                >
                    <DialogTitle>
                        {this.props.dialog.message}
                    </DialogTitle>
                    {actions4}
                </Dialog>

            </div>);
    }
}
const mapStateToProps = ({ screenReducer }) => {
    const { snack, dialog } = screenReducer;

    return { snack, dialog };
};

export default connect(mapStateToProps, { closeDialog })(Snack);
