import React, {Component} from 'react';
import {connect} from 'react-redux';
import { activateGame, createGameBoard, tileClickAction, firstTIleAction, secondTileAction } from '../actions/index';
import GameRow from '../components/game_row';

// console.log shortcut
function cl(string, variable) {
  console.log(string + ':');
  if (variable) console.log(variable);
}

class GameBoard extends Component {

  generateRandomColorNumber(range, excluded1, excluded2){
    if (excluded1 !== null) range--;
    if (excluded2 !== null) range--;

    let n = Math.floor(Math.random() * (range));
    if (excluded1 !== null && n >= excluded1) n++;
    if (excluded2 !== null && n >= excluded2) n++;
    cl('random number generated: ' + n);
    return n;
  }

  generateGameArray(rows, cells, numberOfColors) {
    const array = [];
    for (let r = 0; r < rows; r++) {
      array.push([]);
      for (let c = 0; c < cells; c++) {

        let exclude1 = null;
        let exclude2 = null;

        // figure out if two of the same color exist vertically right before our current cell, if so, note the color (number)
        if (r >= 2) { // we don't want to check if we'd be going off the board vertically
          if (array[r-1][c].color === array[r-2][c].color) {
            exclude1 = array[r-1][c].color;
          }
        }

        //figure out if two of the same color exist horizontally right before our current cell, if so, note the color (number)
        if (c >= 2) { // we don't want to check if we'd be going off the board horizontally
          if (array[r][c - 1].color === array[r][c - 2].color) {
            exclude2 = array[r][c - 1].color;
          }
        }

        // pass those "exclude" colors into our random number generator
        let color = this.generateRandomColorNumber(numberOfColors, exclude1, exclude2);

        array[r].push({
          color: color,
          clicked: false
        });
      }
    }
    return array;
  }

  startGameHandler() {
    this.props.activateGame();
    this.props.createGameBoard(this.generateGameArray(8, 8, 7));

  }
  handleClick(r,c,numbr){
    console.log(r,c,numbr);
    if(!Object.keys(this.props.first).length){
      let first = {row: r, col: c};
      this.colorOne= numbr;
      this.props.firstTIleAction([first,{incr: 1}]);
    }else{
      let second = {row: r, col: c};
      let withinFirstRow = this.props.first.row;
      let withinFirstCol = this.props.first.col;
      //if the row is not within 0 or 1, second click is now first click
      if(withinFirstRow - r !== 0 && Math.abs(withinFirstRow - r) !== 1 ){
        console.log('too large of a distance');
        return this.props.firstTIleAction([second,{incr:0}]);
        //if the cols are not within 0 or 1, then it's too far of a click to be second click
      }else if(withinFirstCol - c !== 0 && Math.abs(withinFirstCol - c) !== 1){
        console.log('too far apart on the same row');
        return this.props.firstTIleAction([second,{incr:0}]);
      }

      let gameArr = this.props.gameArray;
      console.log('game first click',gameArr[withinFirstRow][withinFirstCol]);
      console.log('game second click',gameArr[r][c]);
      let firstSwap = gameArr[withinFirstRow][withinFirstCol];
      let secondSwap = gameArr[r][c];
      // this.props.secondTileAction(second);
      let doSwitch={second: second, gameArr:{firstSwap: firstSwap.color=numbr, secondSwap: secondSwap.color=this.colorOne}};
      // this.props.secondTileAction(doSwitch); //need to make the gameBoard recognize elmeents 1 and 2 are modded
      //send swapped coords to win condition method 2x
    }
    // this.props.tileClickAction();
  }

  render() {
    cl('inside render game array', this.props.gameArray);

    let rows = [];

    if (this.props.gameArray) {
      rows = this.props.gameArray.map((row, index) => {
        return (
          <GameRow key={index} row={row} position={index} clickable={this.props.preventClick} onC={(r,c,n)=>this.handleClick.bind(this)(r,c,n)} />
        );
      });
    }

    const button = (
      <button onClick={this.startGameHandler.bind(this)}>
        Start Game
      </button>
    );
    //if preventClick = 2 then we begin to check win conditions
    //and if the pieces are not a match, return || if they are, erase em and update state


    return (
      <div className="game-board">
        { (this.props.active) ? rows : button }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    first: state.bejeweled.first,
    second: state.bejeweled.second,
    preventClick: state.bejeweled.preventClick,
    gameArray: state.bejeweled.gameBoard,
    active: state.gameStart.start
  };
}

export default connect(mapStateToProps, { activateGame, createGameBoard, tileClickAction, firstTIleAction, secondTileAction })(GameBoard);