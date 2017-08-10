import {
    GET_ALL_BEJEWELED,
    GET_TILE_ACTION,
} from '../actions/types';

const default_state={
    gameBoard:undefined,
    preventClick: 0, //when this gets to 2, preventDefault on clicks
};

export default function(state = default_state,action){
    console.log('bejeweled reduce');
    switch(action.type){
        case GET_ALL_BEJEWELED:
            console.log('get all', action);
            return {...state, gameBoard: action.payload.gameData};
        case GET_TILE_ACTION:
            console.log('action pay');
            return {...state, preventClick: action.payload.incr};
       default:
            return default_state;
    }
}