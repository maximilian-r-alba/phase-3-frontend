import logo from './logo.svg';
import './App.css';
import './Components/Review';
import './Components/LoginPage'
import './Components/NavBar'
import './Components/BookPage'
import {useState, useEffect} from "react";
import {Routes, Route} from "react-router-dom";
import LoginPage from './Components/LoginPage';
import NavBar from './Components/NavBar';
import LandingPage from './Components/LandingPage';
import BookPage from './Components/BookPage';

function App() {

  const [books, setBooks] = useState([])
  useEffect(() => {
    fetch("http://localhost:9292/books")
      .then(r => r.json())
      .then(data => setBooks(data))
  }, [])
 
  const [user, setUser] = useState(null)
    
  return (
    <>
        <h1>Do Robots Read About Electric Sheep</h1>
    <NavBar></NavBar>
    <Routes>
    <Route path="/" element = {user? <h1>WELCOME {user.name}</h1> : <h1>WELCOME</h1>}/>
    {/* <Route path="/books" element = {/<h1>SHOW BOOKS HERE</h1>}/> */}
    <Route path="/books" element = {<BookPage books = {books}/>}/>
    <Route path="/profile" element = {<h1>SHOW PROFILE HERE</h1>}/>

    <Route path="/login" element = { <LoginPage setUser={setUser}></LoginPage> } />
    
    </Routes>
    </>
  );
}

export default App;
