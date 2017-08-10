import React, {Component} from 'react';
import {connect} from 'react-redux';
import { activateGame } from '../actions/index';

function cl(string, variable){
  console.log(string + ':');
  if(variable) console.log(variable);
}

class GameBoard extends Component {

  startGameHandler(){
    cl('we clicked the button!', this);
  }


  render() {
    cl('right inside gameboard render');


    const rows = (
      <div>
        Hey the game is active! Yeah buddy! Now we're cookin' with diesel!
      </div>
    );

    const button = (
      <button onClick={this.startGameHandler.bind(this)}>
        Start Game
      </button>
    );

    return (
      <div className="game-board">
        { (this.props.active) ? rows : button }
      </div>
    );



  }
}

function mapStateToProps(state) {
  return {
    active: state.gameStart.start
  };
}

export default connect(mapStateToProps, { activateGame })(GameBoard);