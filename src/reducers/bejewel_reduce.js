import {
  GET_ALL_BEJEWELED,
  GET_FIRST_TILE,
  GET_SECOND_TILE,
  NO_MATCH_FOUND,
  RESET_GAME_BOARD,
} from '../actions/types';

const default_state={
  gameBoard:undefined,
  preventClick: 0, //when this gets to 2, preventDefault on clicks
  first: {},
  second: {},
};

export default function (state = default_state,action){
  switch(action.type){
    case GET_ALL_BEJEWELED:
      console.log('get all ',action);
      return {...state, gameBoard: action.payload.gameData};
    case  GET_FIRST_TILE:
      return {...state, preventClick: state.preventClick += action.payload.incr, first: action.payload.first, gameBoard: action.payload.newGameArr};
    case GET_SECOND_TILE:
      console.log('second action',action.payload);
      return {
        ...state,
        preventClick: state.preventClick += action.payload.incr,
        second: action.payload.second,
        gameBoard: action.payload.newGameArr,
      };
    case NO_MATCH_FOUND:
      console.log('no match');
      return {
        ...state,
        preventClick: action.payload.click,
        first: action.payload.first,
        second: action.payload.second,
        gameBoard: action.payload.gameBoard,
      };
    case RESET_GAME_BOARD:
      return {
        ...state,
        preventClick: action.payload.reset.click,
        first: action.payload.reset.first,
        second: action.payload.reset.second,
        gameBoard: action.payload.reset.newGameArr
      };
    default:
      return default_state;
  }
}