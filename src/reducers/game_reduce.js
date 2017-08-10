import {GET_GAME_START} from '../actions/types';

const default_state={
    start: false,
};

export default function(state = default_state, action){
    switch (action.type){
        case GET_GAME_START:
            return {...state, start: action.payload}
    }
    return state
}