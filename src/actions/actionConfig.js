/* eslint-disable no-debugger */
import { AMRedux } from '@app-masters/sync-cache';

const removeUnderlineId = (item) => {
    delete item._id;
    return item;
};

const addUnderlineId = (item) => {
    item._id = item.id;
    return item;
};

const endpoints = [
    {
        name: 'user',
        endPoint: '/user',
        nestedKey: 'data',
        prepareToServer: removeUnderlineId,
        prepareToClient: addUnderlineId
    },
    {
        name: 'category',
        endPoint: '/category',
        nestedKey: 'data',
        prepareToServer: removeUnderlineId,
        prepareToClient: addUnderlineId
    }
].map(item => {
    if (!item.class) {
        item.class = '';
    }
    return item;
});

AMRedux.setup(endpoints); // Config redux before use the reducers

export { endpoints };
