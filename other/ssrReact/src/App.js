import React, { Component } from 'react';
// import logo from './logo.svg';
// import './App.css';

class App extends Component {
  constructor() {
    super()
    this.state = {
      arr: [1,2,3,4,5] 
    }
  }
  say() {
    alert('tovinping')
  }
  render() {
    return (
      <div className="App">
        <button onClick={this.say}>tovinping</button>
        <ul>
          {this.state.arr.map(item=><li key={item}>{item}</li>)}
        </ul>
      </div>
    );
  }
}

export default App;
