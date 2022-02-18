import { combineReducers } from 'redux';


import { authentication } from './authentication.reducer';
import { forum } from './forum.reducer';

const rootReducer = combineReducers({
    authentication, forum
});

export default rootReducer;