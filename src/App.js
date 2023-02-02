import logo from './logo.svg';
import './App.css';
import './Components/Review';
import './Components/LoginPage'
import {useState, useEffect} from "react";
import {Routes, Route} from "react-router-dom";
import LoginPage from './Components/LoginPage';

function App() {

 
  const [user, setUser] = useState(null)
    
  return (
    <div className="App">
      <h1>Do Robots Read About Electric Sheep</h1>
      {!user? <LoginPage setUser={setUser}></LoginPage> : <h1>hello {user.name}</h1> }
      
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
    </div>
  );
}

export default App;
