
import './App.css';
// import ProfilePage from './Components/ProfilePage'
import {useState, useEffect} from "react";
import {Routes, Route} from "react-router-dom";
import LoginPage from './Components/LoginPage';
import NavBar from './Components/NavBar';
import LandingPage from './Components/LandingPage';
import BookForm from './Components/BookForm';
import BrowseBooksPage from './Components/BrowseBooksPage';
import ProfilePage from './Components/ProfilePage'
import BookPage from './Components/BookPage';

import { UserContext } from './Components/UserContext';

function App() {
  
  //maybe move books var to browsepage, unless showing preview of books
  const [books, setBooks] = useState([])
 
  const [user, setUser] = useState(false)

  const [viewForm, setViewForm] = useState(false)

  function handleViewForm (e) {
    setViewForm(!viewForm)
  }

  return (

    <>
    <h1>Do Robots Read About Electric Sheep</h1>
    <NavBar user = {user} setUser = {setUser}></NavBar>

    {user ? <button onClick={handleViewForm}>Add Book</button> : <></>}
    {viewForm ? <BookForm books={books} setBooks={setBooks}/> : <></>}
    <UserContext.Provider value = {user}>
      <Routes>
        <Route path="/" element = {<LandingPage user={user} />}/>
        <Route path="/books" element = {<BrowseBooksPage books = {books} setBooks={setBooks}/>}/>
        <Route path="/books/:id" element = {<BookPage />} />
        <Route path="/profile" element = {<ProfilePage user={user} />}/>
        <Route path="/login" element = {<LoginPage setUser={setUser}></LoginPage>} />
      </Routes>
    </UserContext.Provider>
   
    </>
  );
}

export default App;
