import {combineReducers} from 'redux';
import bejewelReducer from './bejewel_reduce';
import gameReducer from './game_reduce';

const rootReducer = combineReducers({
    bejeweled: bejewelReducer,
    gameStart: gameReducer,
});

export default rootReducer;