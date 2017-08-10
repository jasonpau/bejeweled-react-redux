import React, { Component } from 'react';
// import Cell from './game_row_cell';

//function receives props telling it to make X objects per array
export default function GameRow(props) {

    const cells = props.row.map((cell, index) => {
      return (
        <div key={index} className={'game-row-cell color-' + cell.color}>

        </div>
      )
    });

    return(
        <div className="game-row">
          { cells }
        </div>
    )
}