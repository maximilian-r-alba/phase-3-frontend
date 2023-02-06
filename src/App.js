import logo from './logo.svg';
import './App.css';
import './Components/Review';
import './Components/LoginPage'
import './Components/NavBar'
import './Components/LandingPage'
import {useState, useEffect} from "react";
import {Routes, Route} from "react-router-dom";
import LoginPage from './Components/LoginPage';
import NavBar from './Components/NavBar';
import LandingPage from './Components/LandingPage';

function App() {

  useEffect(() => {
    fetch("http://localhost:9292/books")
      .then(r => r.json())
      .then(data => console.log(data))
  }, [])
 
  const [user, setUser] = useState(null)
    
  return (
    <>
    <h1>Do Robots Read About Electric Sheep</h1>
    <NavBar></NavBar>
    <Routes>
    <Route path="/" element = {<LandingPage user = {user}/>}/>
    <Route path="/books" element = {<h1>SHOW BOOKS HERE</h1>}/>
    <Route path="/profile" element = {<h1>SHOW PROFILE HERE</h1>}/>

    <Route path="/login" element = { <LoginPage setUser={setUser}></LoginPage> } />
    
    </Routes>
    </>
  );
}

export default App;
