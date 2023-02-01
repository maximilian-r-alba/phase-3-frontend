import logo from './logo.svg';
import './App.css';
import './Components/Review.js';
import {UseState , UseEffect} from "react";
import {Routes, Route} from "react-router-dom";

function App() {

  const user = UseState({name: null, avatar_url: null, bio: null, loggedIn: false})

  UseEffect (
    fetch("http://localhost:9292/users")
    .then(r => r.json())
    .then(data => console.log(data))
  ,[])

  fetch("http://localhost:9292/")
  .then((r) => r.json())
  .then((data) => console.log(data));

  return (
    <div className="App">
      <header className="App-header">
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
      </header>
    </div>
  );
}

export default App;
