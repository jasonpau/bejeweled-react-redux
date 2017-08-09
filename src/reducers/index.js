import {combineReducers} from 'redux';
import bejewelReducer from './bejewel_reduce'

const rootReducer = combineReducers({
    bejeweled: bejewelReducer,
});

export default rootReducer;