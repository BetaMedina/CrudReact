import React from 'react';
import {Row, Col} from 'react-flexbox-grid';
import {Chip} from '@material-ui/';
import TextField from '@material-ui/core/TextField';
import _ from 'lodash';

export default ({id, value, tags, onChange, title, allowSpaces}) => {
    value = value || tags;
    const handleRequestDelete = (key) => {
        const filteredTags = value.split(',').filter((t, i) => i !== key).join(',');
        onChange({target: {id, value: filteredTags}});
    };

    const onTextChange = (event) => {
        const {id, value} = event.target;
        const arr = value.split(',');
        const v2 = arr.map((s, index) =>
            (index !== arr.length - 1) ? s.trim() : s).join(',');
        onChange({target: {id, value: v2}});
    };

    const renderTags = _.uniq(
        value &&
        (!allowSpaces ? value.trim() : value).replace(/,/g, '*')
        .split('*'));

    const renderChip = (data, key) => !!data.trim() && <Chip
        key={key}
        onRequestDelete={() => handleRequestDelete(key, this)}
        style={{
            margin: 6
        }}
            >
        {data}
    </Chip>;

    return (
        <div>
            <Row>
                <Col md={12} xs={12} style={{padding: 0}}>
                    <TextField                         label={title}
                        type='text'
                        id={id}
                        onChange={onTextChange}
                        value={renderTags || ''}
                        errorText={!renderTags && 'Campo obrigatório'}
                        fullWidth
                />
                </Col>
            </Row>
            <Row>
                <Col md={12} xs={12}>
                    <div style={{
                        display: 'flex',
                        flexWrap: 'wrap'
                    }}>
                        {renderTags.map(renderChip)}
                    </div>
                </Col>
            </Row>
        </div>);
};
