import { AMRedux } from '@app-masters/sync-cache';
import { endpoints } from './actionConfig';
import { type } from './actionsTypes';
import * as screenActions from './screenActions';
import * as appActions from './appActions';

const Actions = AMRedux.actions;

const AppActions = { ...Actions, endpoints, type, screenActions, appActions };

export default AppActions;
