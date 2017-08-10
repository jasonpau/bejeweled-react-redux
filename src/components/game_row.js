import React, { Component } from 'react';
// import Cell from './game_row_cell';

//function receives props telling it to make X objects per array
export default function GameRow(props) {
    //const num = props;
  console.log(props);

    const cells = props.row.map((cell, index) => {

      console.log(cell, index);
      return (
        <div key={index} className={cell.color}>
          cell
        </div>
      )
    });

    return(
        <div className="game-row">
          { cells }
        </div>
    )
}