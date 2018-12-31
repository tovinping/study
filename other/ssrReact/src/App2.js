import React, {Component} from 'react'
export default class App extends Component {
  sayHello() {
    alert('hello')
  }
  render() {
    return (
      <div>
        <button onClick={this.sayHello}>clickMe</button>
        <ul>
          {this.props.list.map(item=><li key={item}>{item}</li>)}
        </ul>
    </div>
    )
  }
}