/* eslint-disable no-debugger */
import { AMRedux } from '@app-masters/sync-cache';
import moment from 'moment';

const removeUnderlineId = (item) => {
    delete item._id;
    return item;
};

const addUnderlineId = (item) => {
    item._id = item.id;
    return item;
};

const prepareDate = (date) => {
    const momentDate = moment(date);
    if (date && momentDate.isValid()) {
        return momentDate.format('YYYY-MM-DD HH:mm') + ':00';
    } else {
        return null;
    }
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
        name: 'types',
        endPoint: '/type',
        nestedKey: 'data',
        prepareToServer: removeUnderlineId,
        prepareToClient: addUnderlineId
    },
    {
        name: 'messageTemplate',
        endPoint: '/message_template',
        nestedKey: 'data',
        prepareToServer: (item) => {
            delete item._id;
            delete item.description;
            return item;
        }
    },
    {
        name: 'organizer',
        endPoint: '/organizer',
        nestedKey: 'data',
        prepareToServer: removeUnderlineId
    },
    {
        name: 'plugin',
        endPoint: '/plugin',
        nestedKey: 'data',
        prepareToServer: removeUnderlineId,
        validateObject: (obj) => {
            if (obj.api_keys) {
                try {
                    JSON.parse(obj.api_keys);
                    return null;
                } catch (e) {
                    window.alert('JSON inválido nos dados de autenticação');
                    return true;
                }
            }
        }
    },
    {
        name: 'price',
        endPoint: '/price',
        nestedKey: 'data',
        prepareToServer: (item) => {
            item.value = parseFloat(Math.round(Number(item.value) * 100) / 100).toFixed(2);
            delete item._id;
            return item;
        }
    },
    {
        name: 'place',
        endPoint: '/place',
        nestedKey: 'data',
        prepareToServer: removeUnderlineId
    },
    {
        name: 'session',
        endPoint: '/session',
        nestedKey: 'data',
        prepareToServer: removeUnderlineId
    },
    {
        name: 'category',
        endPoint: '/category',
        nestedKey: 'data',
        prepareToServer: removeUnderlineId
    },
    {
        name: 'content',
        endPoint: '/content',
        nestedKey: 'data',
        prepareToServer: (item) => {
            const generatedFields = ['_id', 'comments_count', 'files_count'];
            for (const field of generatedFields) {
                delete item[field];
            }
            return item;
        }
    },
    {
        name: 'file',
        endPoint: '/file',
        nestedKey: 'data',
        prepareToServer: (item) => {
            delete item.active;
            delete item._id;
            return item;
        }
    },
    {
        name: 'discount',
        endPoint: '/discount',
        nestedKey: 'data',
        prepareToServer: (item) => {
            item.expire_at = prepareDate(item.expire_at);
            delete item._id;
            return item;
        }
    },
    {
        name: 'place',
        endPoint: '/place',
        nestedKey: 'data',
        prepareToServer: removeUnderlineId
    },
    {
        name: 'category',
        endPoint: '/category',
        nestedKey: 'data',
        prepareToServer: (item) => {
            delete item._id;
            return item;
        },
        prepareToClient: addUnderlineId
    },
    {
        name: 'event',
        endPoint: '/event',
        nestedKey: 'data',
        prepareToClient: (item) => {
            const fields = ['starts_at', 'finish_at', 'subscription_starts_at', 'subscription_finish_at'];
            for (let field of fields) {
                if (item[field]) {
                    item[field] = moment(item[field]).format('YYYY-MM-DDTHH:mm');
                }
            }
            item._id = item.id;
            return item;
        },
        prepareToServer: (item) => {
            const fields = ['starts_at', 'finish_at', 'subscription_starts_at', 'subscription_finish_at'];
            for (let field of fields) {
                item[field] = prepareDate(item[field]);
            }
            delete item._id;
            delete item.Place;
            delete item.slug;
            delete item.prices;
            delete item.capacity_left;
            delete item.users;
            console.log(item);
            return item;
        }
    },
    {
        name: 'eventUser',
        endPoint: '/event/{_eventId}/users',
        nestedKey: 'data',
        prepareToServer: removeUnderlineId
    },
    {
        name: 'eventPrice',
        endPoint: '/event/{_eventId}/prices',
        nestedKey: 'data',
        prepareToServer: (item) => {
            delete item._id;
            item.expire_at = prepareDate(item.expire_at);
            return item;
        }
    },
    {
        name: 'eventSession',
        endPoint: '/event/{_eventId}/sessions',
        nestedKey: 'data',
        prepareToServer: removeUnderlineId
    },
    {
        name: 'contentFile',
        endPoint: '/content/{_contentId}/files',
        nestedKey: 'data',
        prepareToServer: removeUnderlineId
    },
    {
        name: 'subscription',
        endPoint: '{_eventRoute}',
        nestedKey: 'data',
        prepareToServer: removeUnderlineId,
        prepareToClient: (item) => {
            item.user.formatedPhone = item.user && (item.user.phone_prefix || '').toString() + (item.user.phone || '').toString();
            return item;
        }
    },
    {
        name: 'instructor',
        endPoint: '/teacher',
        nestedKey: 'data',
        prepareToServer: removeUnderlineId
    }
].map(item => {
    if (!item.class) {
        item.class = '';
    }
    return item;
});

AMRedux.setup(endpoints); // Config redux before use the reducers

export { endpoints };
