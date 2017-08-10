import React, {Component} from 'react';
import {connect} from 'react-redux';
import { activateGame, createGameBoard } from '../actions/index';
import GameRow from '../components/game_row';

// console.log shortcut
function cl(string, variable) {
  console.log(string + ':');
  if (variable) console.log(variable);
}

class GameBoard extends Component {

  generateGameArray(rows, cells) {
    const array = [];
    for (let i = 0; i < rows; i++) {
      array.push([]);
      for (let j = 0; j < cells; j++) {
        array[i].push({
          color: null
        });
      }
    }
    return array;
  }

  startGameHandler() {
    this.props.activateGame();
    this.props.createGameBoard(this.generateGameArray(8,8));
  }

  render() {
    cl('inside render game array', this.props.gameArray);

    let rows = [];

    if (this.props.gameArray) {
      rows = this.props.gameArray.map((row, index) => {
        return (
          <GameRow key={index} row={row} position={index}  />
        );
      });
    }

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
    gameArray: state.bejeweled.gameBoard,
    active: state.gameStart.start
  };
}

export default connect(mapStateToProps, { activateGame, createGameBoard })(GameBoard);