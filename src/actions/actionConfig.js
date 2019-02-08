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
        prepareToServer: (item) => {
            if (item.phone_prefix) {
                item.phone_prefix = item.phone_prefix.toString();
            }
            if (item.phone) {
                item.phone = item.phone.toString();
            }
            delete item['address_city'];
            delete item['address_complement'];
            delete item['address_country'];
            delete item['address_district'];
            delete item['address_number'];
            delete item['address_state'];
            delete item['address_street'];
            delete item['address_zip'];
            delete item['cpf_cnpj'];
            delete item['_id'];
            return item;
        },
        prepareToClient: addUnderlineId
    },
    {
        name: 'category',
        endPoint: '/category',
        nestedKey: 'data',
        prepareToServer: removeUnderlineId,
        prepareToClient: addUnderlineId
    },
    {
        name: 'place',
        endPoint: '/place',
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
