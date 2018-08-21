import React, { Component } from 'react';
import './App.css';
import Today from './Today';
import History from './History';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-title">Krypto</header>
        <Today />
        <History />
      </div>
    );
  }
}

export default App;
