import GET_ALL_BEJEWELED from '../actions/types';

const default_state={
    gameBoard:[
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
    ],
    preventClick: false,
};

export default function(state = default_state,action){
    switch(action.type){
        case GET_ALL_BEJEWELED:
            return {...state,preventClick: action.payload.clickable, gameBoard:action.payload.gameData};
       default:
        return default_state;
    }
}