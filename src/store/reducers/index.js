import {combineReducers} from 'redux';

import restaurants from './restaurants';
import modal from './modal';
import user from './user';
import kitchens from './kitchens';

const rootReducer = combineReducers({
    // put here your reducers
    restaurants,
    modal,
    user,
    kitchens
});

export default rootReducer;