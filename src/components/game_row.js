import React, { Component } from 'react';
// import { tileClickAction } from '../actions/index';
// import Cell from './game_row_cell';

//function receives props telling it to make X objects per array
export default function GameRow(props) {

    const cells = props.row.map((cell, index) => {
      function handleClick(e){
        if (props.clickable===2) {
          return e.preventDefault();
        }else if (cell.clicked) {
          return e.preventDefault();
        }else {
          const rowIndex = props.position;
          const colIndex = index;
          //click on a square, it highlights, counter should go up one...logic should run on second click
          props.onC(rowIndex, colIndex, cell.color);
        }
      }
      return (
          <div key={index} className='game-row-cell' onClick={handleClick}>
            <div className={"gem color-" + cell.color} />
          </div>
      )
    });

    return(
        <div className="game-row">
          { cells }
        </div>
    )
}