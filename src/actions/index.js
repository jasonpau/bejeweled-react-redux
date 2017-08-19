import {
  GET_GAME_START,
  GET_ALL_BEJEWELED,
  GET_FIRST_TILE,
  GET_SECOND_TILE,
  NO_MATCH_FOUND,
  RESET_GAME_BOARD,
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
/**
 * @name - resetGameBoard
 * @param {Array} arr - receives new gameBoard array to reset the gameBoard state
 * @returns an object to reset all state values
 * **/
export function resetGameBoard(arr){
  const reset = {
    first: {},
    second: {},
    click: 0,
    newGameArr: arr
  };
  return{
    type: RESET_GAME_BOARD,
    payload: {reset}
  }
}

export function firstTIleAction(arr){
  return{
    type: GET_FIRST_TILE,
    payload: {incr: arr[1].incr, first: arr[0], newGameArr: arr[2]}
  }
}

export function secondTileAction(obj){
  return{
    type:GET_SECOND_TILE,
    payload: {incr: 1, second: obj.second, newGameArr: obj.newGameArr},
  }
}

export function noMatchesFound(arr){
  const reset = {
    click: 0,
    first:{},
    second:{},
    newGameArr: arr,
  };
  return {
    type: NO_MATCH_FOUND,
    payload: {click: reset.click, first: reset.first, second: reset.second, gameBoard: reset.newGameArr }
  }
}
