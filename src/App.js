
import './App.css';
// import ProfilePage from './Components/ProfilePage'
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
 
  const [user, setUser] = useState(false)

  useEffect(() => {
    setBook(JSON.parse(bookJSON))
  },[])

  
  const [book, setBook] = useState(null)
  const book1 = {title: "The Gunslinger", cover_url: "http:asdfasfdasdf.com", author: "Stephen King", subgenre: "Fantasy", summary:""}
  const bookJSON = "{\"id\":1,\"name\":\"The Last Temptation\",\"subgenre\":\"Biography/Autobiography\",\"author\":\"Dixie Grady\",\"rating\":1.0,\"cover_url\":\"https://loremflickr.com/640/480/book,title,cover\",\"summary\":\"[\\\"Sint in iusto. Alias quia adipisci. Autem quos sit.\\\"]\",\"fiction?\":true}"



  return (

    <>
    <h1>hello world</h1>
{ book ? <> <h1>{book.title}</h1> 
            <p>By: {book.author}</p>
            <p>{book.subgenre}</p>
            <p>{book.summary}</p> </> : <></>}

            {/* <div>
                {renderedReviews ? renderedReviews : <p>No reviews have been made</p>}
            </div>  */}
        </>
    // <>
    //     <h1>Do Robots Read About Electric Sheep</h1>
    // <NavBar></NavBar>
    // <BookForm books={books} setBooks={setBooks}/>
    // <Routes>
    // <Route path="/" element = {<LandingPage user={user} />}/>
    // <Route path="/books" element = {<BrowseBooksPage books = {books} setBooks={setBooks}/>}/>
    // { user ? <Route path="/profile" element = {<ProfilePage user={user} />}/> : <></>}

    // <Route path="/login" element = { !user ? <LoginPage setUser={setUser}></LoginPage> : <button onClick={setUser(null)}>Logout</button>} />
    
    // </Routes>
    // </>
  );
}

export default App;
