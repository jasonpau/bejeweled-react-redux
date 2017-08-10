import {
    GET_ALL_BEJEWELED,
    GET_TILE_ACTION
} from '../actions/types';

const default_state={
    gameBoard:undefined,
    preventClick: 0, //when this gets to 2, preventDefault on clicks
};

export default function(state = default_state,action){
    switch(action.type){
        case GET_ALL_BEJEWELED:
            return {...state, gameBoard:action.payload.gameData};
        case GET_TILE_ACTION:
            return {...state, preventClick: state.preventClick += action.payload.increment};
       default:
            return default_state;
    }
}