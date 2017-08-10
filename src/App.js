import React, { Component } from 'react';
import GameBoard from './containers/game_board';

class App extends Component {

  render() {
    return (
      <div className="app">
        <GameBoard/>
      </div>
    );
  }
}

export default App;
