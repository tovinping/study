import logo from './logo.svg';
import {info} from './Components/Dialog'
import {message} from 'antd'
import AComponent from './A'
import './App.css';

function App() {
  const handClick = () => {
    console.log('TANG==');
    // info(<AComponent />);
    message.info(<AComponent />)
  }
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        {/* <AComponent /> */}
        <button onClick={handClick}>showDialog</button>
      </header>
    </div>
  );
}

export default App;
