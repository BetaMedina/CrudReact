import React from 'react';
import Card from '@material-ui/core/Card/Card';
import AppBar from '@material-ui/core/AppBar/AppBar';
import Toolbar from '@material-ui/core/Toolbar/Toolbar';
import Typography from '@material-ui/core/Typography/Typography';
import Button from '@material-ui/core/Button/Button';
import CardContent from '@material-ui/core/CardContent/CardContent';
import { withTheme } from '@material-ui/core/styles';

// import Flavor from '../../flavor';

class TitleComponent extends React.Component {
    render () {
        const props = this.props;
        const { theme } = props;
        const contrastTextColor = theme.palette.getContrastText(theme.palette.primary.light);
        return (
            <Card style={{ marginBottom: 10 }}>
                <AppBar position='static' style={{ backgroundColor: theme.palette.primary.light }}>
                    <Toolbar variant='regular'>
                        <div style={{ display: 'flex', flex: 1, justifyContent: 'space-between' }}>
                            <Typography
                                variant='h5'
                                style={{ color: contrastTextColor }}>
                                {props.title}
                            </Typography>
                            {props.action &&
                            <Button variant='contained' color='secondary' onClick={props.action}>
                                {props.actionIcon} {props.actionLabel}
                            </Button>}
                        </div>
                    </Toolbar>
                </AppBar>
                {props.children &&
                <CardContent>
                    {props.children}
                </CardContent>}
            </Card>
        );
    }
};

export default withTheme()(TitleComponent);
