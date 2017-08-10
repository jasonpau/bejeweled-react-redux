import React, { Component } from 'react';
// import Cell from './game_row_cell';

//function receives props telling it to make X objects per array
export default function GameRow(props) {
  console.log('props',props);

    const cells = props.row.map((cell, index) => {
      function handleClick(){
        const rowIndex = props.position;
        const colIndex = index;
        console.log('row',rowIndex);
        console.log('col',colIndex);
      }
      console.log(cell, index);
      return (
        <div key={index} className="game-row-cell" onClick={()=>handleClick()}>
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