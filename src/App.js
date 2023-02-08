
import './App.css';
import './Components/LoginPage'
import './Components/NavBar'
import './Components/BookPage'
import {useState, useEffect} from "react";
import {Routes, Route} from "react-router-dom";
import LoginPage from './Components/LoginPage';
import NavBar from './Components/NavBar';
import LandingPage from './Components/LandingPage';
import BookForm from './Components/BookForm';
import BrowseBooksPage from './Components/BrowseBooksPage';


function App() {
  
  //maybe move books fetch and var to page, unless showing preview of books
  const [books, setBooks] = useState([])
 
  const [user, setUser] = useState(null)
    console.log('in app' , books)
  return (
    <>
        <h1>Do Robots Read About Electric Sheep</h1>
    <NavBar></NavBar>
    <BookForm books={books} setBooks={setBooks}/>
    <Routes>
    <Route path="/" element = {<LandingPage user={user} />}/>
    {/* <Route path="/books" element = {/<h1>SHOW BOOKS HERE</h1>}/> */}
    <Route path="/books" element = {<BrowseBooksPage books = {books} setBooks={setBooks}/>}/>
    <Route path="/profile" element = {<h1>SHOW PROFILE HERE</h1>}/>

    <Route path="/login" element = { <LoginPage setUser={setUser}></LoginPage> } />
    
    </Routes>
    </>
  );
}

export default App;
