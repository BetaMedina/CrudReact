import { Component } from 'react';
import set from 'lodash/set';

/**
 * Experimental component on EventsManager
 * Will be on lib when make more sense and have more code here
 *
 * To bring here:
 * - [ ] loading
 */

class AMFormComponent extends Component {
    constructor (props) {
        super(props);
        this.setEventInput = this.setEventInput.bind(this);
        this.getErrorByField = this.getErrorByField.bind(this);
        this.hasError = this.hasError.bind(this);
    }

    /**
     * Set this.state.input[id] with value from event
     * @param event
     */
    setEventInput (event) {
        const { id, value, name } = event.target;
        const inputKey = id || name;
        this.setInput(inputKey, value);
    }

    setInput (key, value) {
        this.setState(state => {
            key = 'input.' + key;
            set(state, key, value);
            return state;
        });
    }

    /**
     * Return error message on props for specified field
     * @param key
     * @returns {*}
     */
    getErrorByField (key) {
        if (!this.props.error || !this.props.error.body || !this.props.error.body[key]) {
            return '';
        } else {
            return this.props.error.body[key];
        }
    }

    /**
     * Check if had error
     * @param key
     * @returns {*}
     */
    hasError (key) {
        return this.props.error && this.props.error.body && this.props.error.body[key];
    }

    isLoading (loadingArray) {
        return loadingArray.some(loading => loading);
    }

    /**
     * Handle material-ui 3.* selected change
     * Set to props inputChanged
     * @param id
     * @param event
     */
    onSelectedChange (id, event) {
        if (this.props === undefined) {
            return console.log('You missed some .bind(this) on onSelectedChange assignment');
        }
        this.props.inputChanged(id, event.target.value);
    }

    /**
     * Handle input text changes
     * Set to props inputChanged
     * @param id
     * @param event
     */
    onTextChange (event, maxLength) {
        const { id, value } = event.target;

        if (this.props === undefined) {
            return console.log('You missed some .bind(this) on onTextChange assignment');
        }
        if (maxLength) {
            if (value.length <= maxLength) {
                this.props.inputChanged(id, value);
            }
        } else {
            this.props.inputChanged(id, value);
        }
    }
}

export default AMFormComponent;
