import React, {Component} from 'react';
import {connect} from 'react-redux';
import { activateGame, createGameBoard, tileClickAction, firstTIleAction, secondTileAction, noMatchesFound } from '../actions/index';
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
    debugger;
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
    for (let r = originRow; r <= gameArray.length - 1; r++) {
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
    for (let c = originCell; c <= gameArray[originRow].length - 1; c++) {
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

    // remove duplicate cells if needed (e.g. duplicate origins), and add the
    this.matchedCells = this.removeDuplicateArrays(this.matchedCells.concat(this.removeDuplicateArrays(tempMatchedCells)));
    console.log('this.matchedcells:',this.matchedCells);
  }

  // removed duplicate inner arrays from our main array, and return the new filtered array
  removeDuplicateArrays(arrayOfArrays){
    // join the inner arrays into a single string so our indexOf is able to find duplicates
    const joinedArray = arrayOfArrays.map((elem) => { return elem.join(',') });

    let filteredArray = joinedArray.filter((element, index, self) => {
      return index === self.indexOf(element);
    });

    // split our inner strings back out into arrays
    return filteredArray.map((elem) => {
      let stringArray =  elem.split(',');
      return [parseInt(stringArray[0]), parseInt(stringArray[1])];
    });
  }

  // generate a random number between 0 and the max, and optionally exclude two numbers
  generateRandomColorNumber(max, excluded1, excluded2){
    // swap the order so it's always smaller first
    if (excluded1 > excluded2) {
      const temp = excluded1;
      excluded1 = excluded2;
      excluded2 = temp;
    }
    // if we have duplicates, set the second to null;
    if (excluded1 === excluded2) excluded2 = null;
    if (excluded1 !== null) max--;
    if (excluded2 !== null) max--;
    let n = Math.floor(Math.random() * (max));
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

  handleClick(r,c,cNum){
    console.log(r,c,cNum);
    const mutateArr = this.props.gameArray.slice(); //we will send this to reducer

    if (!Object.keys(this.props.first).length) {
      let first = {row: r, col: c};
      this.colorOne= cNum;
      let firstSwap = mutateArr[r][c]; //the object we need to mutate as well

      let objClicked = Object.assign({}, firstSwap, {clicked: true});
      mutateArr[r][c] = objClicked;
      this.props.firstTIleAction([first,{incr: 1}, mutateArr]);
    } else {
      let second = {row: r, col: c};
      let withinFirstRow = this.props.first.row;
      let withinFirstCol = this.props.first.col;
      //if the row is not within 0 or 1, second click is now first click
      if (withinFirstRow - r !== 0 && Math.abs(withinFirstRow - r) !== 1 ) {
        this.colorOne = cNum;
        let oldObjClicked = Object.assign({}, mutateArr[withinFirstRow][withinFirstCol],{clicked: false});
        let newObjClicked  = Object.assign({}, mutateArr[r][c], {clicked: true});
        mutateArr[withinFirstRow][withinFirstCol] = oldObjClicked;
        mutateArr[r][c] = newObjClicked;
        return this.props.firstTIleAction([second,{incr:0}, mutateArr]);
        //if the cols are not within 0 or 1, then it's too far of a click to be second click
      } else if (withinFirstCol - c !== 0 && Math.abs(withinFirstCol - c) !== 1){
        this.colorOne = cNum;
        let oldObjClicked = Object.assign({}, mutateArr[withinFirstRow][withinFirstCol],{clicked: false});
        let newObjClicked  = Object.assign({}, mutateArr[r][c], {clicked: true});
        mutateArr[withinFirstRow][withinFirstCol] = oldObjClicked;
        mutateArr[r][c] = newObjClicked;
        return this.props.firstTIleAction([second,{incr:0}, mutateArr]);
      }

      //copy array you want to mutate indirectly
      let firstSwap = mutateArr[withinFirstRow][withinFirstCol]; //the object we need to mutate as well
      let secondSwap = mutateArr[r][c]; //the second object we need to mutate

      let objSwapOne = Object.assign({}, firstSwap,{color: cNum}); //this may be needless at this point, but here we set the new value to obj
      let objSwapTwo = Object.assign({}, secondSwap,{color: this.colorOne, clicked: true});//this enables color switch

      let firstArr = mutateArr[withinFirstRow]; //set the obj in the array row to the new value
      firstArr[withinFirstCol] = objSwapOne;
      let secondArr = mutateArr[r];
      secondArr[c] = objSwapTwo;
      console.log('mut,',mutateArr);
      const moveCompleted = { second: second, newGameArr: mutateArr };

      this.props.secondTileAction(moveCompleted);

      this.checkForMatches(withinFirstRow,withinFirstCol);
      this.checkForMatches(r,c);
      //this.swapColorsBack();
      console.log('sec',this.props.second);
    }
  }

  swapColorsBack(){
      
    //send back an array to make as new state

  }

  render() {
    cl('inside render game array', this.props.gameArray);

    let rows = [];

    if (this.props.gameArray) {
      console.log('props gA is true',this.props.gameArray);
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

export default connect(mapStateToProps, { activateGame, createGameBoard, tileClickAction, firstTIleAction, secondTileAction, noMatchesFound })(GameBoard);