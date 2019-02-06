import { type } from './actionsTypes';

export const onToggleDrawer = (prev) => {
    return { type: type.TOGGLE_DRAWER, payload: !prev };
};
