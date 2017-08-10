import {
    GET_ALL_BEJEWELD,
    GET_GAME_START,
} from './types';


/**
 * @name activateGame
 * @description - sets the game board state to true so the board loads game array
 * @return action type and payload
 * */
export function activateGame (){
    return{
        type:GET_GAME_START,
        payload: true,
    }
}

