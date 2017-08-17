import React, {Component} from 'react';
import {connect} from 'react-redux';
import { activateGame, createGameBoard, tileClickAction } from '../actions/index';
import GameRow from '../components/game_row';

// console.log shortcut
let clOn = true;
function cl(string, variable) {
  if (clOn === false) return;
  console.log(string + ':');
  if (variable) console.log(variable);
}

class GameBoard extends Component {
  constructor(){
    super();

    this.matchedCells = [];
  }

  checkForMatches(originRow, originCell) {
    const { gameArray } = this.props;

    const originColor = gameArray[originRow][originCell].color;
    cl('origin row', originRow);
    cl('originCell', originCell);
    cl('originColor', originColor);

    let possibleVerticalMatchCells = [[originRow,originCell]];
    let possibleHorizontalMatchCells = [[originRow,originCell]];

    let verticalMatchedCells = [];
    let horizontalMatchedCells = [];

    // vertical
    for (let r = originRow; r >= 0; r--) {
      if (r === originRow) continue;
      if (gameArray[r][originCell].color === originColor) {
        possibleVerticalMatchCells.push([r,originCell]);
      } else {
        break;
      }
    }
    for (let r = originRow; r <= gameArray.length; r++) {
      if (r === originRow) continue;
      if (gameArray[r][originCell].color === originColor) {
        possibleVerticalMatchCells.push([r,originCell]);
      } else {
        break;
      }
    }
    if (possibleVerticalMatchCells.length >= 3) {
      verticalMatchedCells = verticalMatchedCells.concat(possibleVerticalMatchCells);
      cl('we have a vertical match!');
    } else {
      cl('no matches vertically...');
    }

    // horizontal
    for (let c = originCell; c >= 0; c--) {
      if (c === originCell) continue;
      if (gameArray[originRow][c].color === originColor) {
        possibleHorizontalMatchCells.push([originRow,c]);
      } else {
        break;
      }
    }
    for (let c = originCell; c <= gameArray[originRow].length; c++) {
      if (c === originCell) continue;
      if (gameArray[originRow][c].color === originColor) {
        possibleHorizontalMatchCells.push([originRow,c]);
      } else {
        break;
      }
    }
    if (possibleHorizontalMatchCells.length >= 3) {
      horizontalMatchedCells = horizontalMatchedCells.concat(possibleHorizontalMatchCells);
      cl('we have a horizontal match!');
    } else {
      cl('no matches horizontally...');
    }

    // combine the vertical and horizontal arrays
    const tempMatchedCells = verticalMatchedCells.concat(horizontalMatchedCells);
    console.log('temp matched:', tempMatchedCells);

    // remove duplicate cells if needed (e.g. duplicate origins)
    this.matchedCells = tempMatchedCells.filter((element, index, self) => {
      return index === self.indexOf(element);
    });
    console.log('this.matchedcells:',this.matchedCells);
  }

  generateRandomColorNumber(range, excluded1, excluded2){
    if (excluded1 !== null) range--;
    if (excluded2 !== null) range--;
    let n = Math.floor(Math.random() * (range));
    if (excluded1 !== null && n >= excluded1) n++;
    if (excluded2 !== null && n >= excluded2) n++;
    return n;
  }

  generateGameArray(rows, cells, numberOfColors) {
    const array = [];
    for (let r = 0; r < rows; r++) {
      array.push([]);
      for (let c = 0; c < cells; c++) {

        let exclude1 = null;
        let exclude2 = null;

        // figure out if two of the same color exist vertically right before our current cell,
        // if so, note the color (number) so we can exclude it when we generate this current cell's number
        if (r >= 2) { // we don't want to check if we'd be going off the board vertically
          if (array[r-1][c].color === array[r-2][c].color) {
            exclude1 = array[r-1][c].color;
          }
        }

        // figure out if two of the same color exist horizontally right before our current cell,
        // if so, note the color (number) so we can exclude it when we generate this current cell's number
        if (c >= 2) { // we don't want to check if we'd be going off the board horizontally
          if (array[r][c - 1].color === array[r][c - 2].color) {
            exclude2 = array[r][c - 1].color;
          }
        }

        // pass the "exclude" colors into our random number generator if we have any (otherwise they're null)
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
  handleClick(){
    debugger;
    console.log('kid did it');
     this.props.tileClickAction();
  }
  handleLogic(row,col){
    console.log('handle logic',row);
    console.log('handle logic',col);
  }

  render() {
    cl('inside render game array', this.props.gameArray);

    let rows = [];

    if (this.props.gameArray) {
      rows = this.props.gameArray.map((row, index) => {
        return (
          <GameRow key={index} row={row} position={index} clickable={this.props.preventClick} onC={()=>this.handleClick.bind(this)()} />
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
    nums: state.bejeweled.nums,
    preventClick: state.bejeweled.preventClick,
    gameArray: state.bejeweled.gameBoard,
    active: state.gameStart.start
  };
}

export default connect(mapStateToProps, { activateGame, createGameBoard, tileClickAction })(GameBoard);