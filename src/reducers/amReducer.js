import _ from 'lodash';
import update from 'immutability-helper';
import { ObjHandler } from '@app-masters/js-lib';
import { endpoints } from '../actions/actionConfig';

const INITIAL_STATE = {
    items: [],
    item: null,
    input: {},
    loading: false,
    loadingCache: false,
    loadingOnline: false,
    error: false
};

const AMReducers = {};

endpoints.map(key => {
    const typeName = key.name.toUpperCase() + '_';
    AMReducers[key.name + 'Reducer'] = (state = _.cloneDeep(INITIAL_STATE), action) => {
        if (!action.type.startsWith(typeName)) {
            return state;
        }
        const actionType = action.type.replace(typeName, '');
        switch (actionType) {
        case 'LOADING':
            return {
                ...state,
                loading: action.payload
            };
        case 'ERROR':
            return {
                ...state,
                error: action.payload
            };
        case 'INPUT_CHANGED': {
            let obj = {};
            obj[action.payload.key] = action.payload.value;
            return update(state,
                { input: { $merge: obj } }
            );
        }
        case 'GET_OBJECT':
            return {
                ...state,
                item: action.payload,
                input: action.payload
            };
        case 'GET_OBJECTS':
            return {
                ...state,
                items: action.payload
            };
        case 'CREATE_OBJECT':
            let { items } = state;
            items = ObjHandler.removeDuplicates([...items, action.payload], 'id');
            return {
                ...state,
                items,
                input: {}
            };
        case 'DELETE_OBJECT':
            return {
                ...state,
                items: state.items.filter(item => action.payload !== item.id)
            };
        case 'UPDATE_OBJECT':
            let obj = action.payload;
            const pos = state.items.findIndex(item => item.id === obj.id);
            return update(state,
                { items: { $splice: [[pos, 1, obj]] }, input: {} }
            );
        case 'NEW_OBJECT':
            return ({ ...state, input: INITIAL_STATE.input, item: INITIAL_STATE.item });
        case 'LOADING_CACHE':
            return {
                ...state,
                loadingCache: action.payload
            };
        case 'LOADING_ONLINE':
            return {
                ...state,
                loadingOnline: action.payload
            };
        case 'SAVE_OBJECT':
            return state;
        case 'VALID':
            return {
                ...state,
                error: action.payload
            };
        default:
            console.warn('The type \'' + action.type + '\' don\'t have a valid case.');
            return state;
        }
    };
});

export default AMReducers;
