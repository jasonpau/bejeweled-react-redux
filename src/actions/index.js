import {
    GET_GAME_START,
    GET_ALL_BEJEWELED,
    GET_TILE_ACTION
} from './types';


/**
 * @name activateGame
 * @description - sets the game board state to true so the board loads game array
 * @return action type and payload
 * */
export function activateGame (){
    return{
        type: GET_GAME_START,
        payload: true,
    }
}
/**
 * @param {Array} arr - receives an array to set the size of the board
 * @description receives an array that will be passed to state to set board size
 *
 * **/
export function createGameBoard (arr){
    return {
        type: GET_ALL_BEJEWELED,
        payload: {gameData: arr}
    }
}

export function tileClickAction (){
    console.log('tile action creation');
    return{
        type: GET_TILE_ACTION,
        payload: {incr: 1}
    }
}



//
// export function asdf() {
//   return{
//     type: GET_ALL_BEJEWELED
//   }
// }
