
import './App.css';
import {useState, useEffect} from "react";
import {Routes, Route} from "react-router-dom";
import { createPortal } from 'react-dom';
import LoginPage from './Components/LoginPage';
import NavBar from './Components/NavBar';
import LandingPage from './Components/LandingPage';
import BookForm from './Components/BookForm';
import BrowseBooksPage from './Components/BrowseBooksPage';
import ProfilePage from './Components/ProfilePage'
import BookPage from './Components/BookPage';
import FormContainer from './Components/FormContainer';

import { UserContext } from './Components/UserContext';

function App() {
  
  //maybe move books var to browsepage, unless showing preview of books
  const [books, setBooks] = useState([])
 
  const [user, setUser] = useState(false)

  const [viewForm, setViewForm] = useState(false)
  const [form, setForm] = useState()

  const portalSite = document.getElementById('portalMount')

  const [reviews, setReviews] = useState([])
  console.log(viewForm)

  function handleViewForm (e) {
    console.log('form called')
    
    setViewForm(viewForm => !viewForm)
  }

  function handleBookForm(){
    handleViewForm()
    setForm(<BookForm handleViewForm={handleViewForm} books={books} setBooks={setBooks}/>)
  }

  function handleReviewChanges(reviewValues , method){

    const reviewID = reviewValues.id
    const filteredReviews = reviews.filter((review) => review.id !== reviewID)
    switch (method){

        case 'post':
            const reviewsArrEdit = [reviewValues, ...reviews]
            return reviewsArrEdit;

        case 'patch':
            const patchReviewArr = [reviewValues].concat(filteredReviews)
            return patchReviewArr;

        case 'delete':
            return filteredReviews;
    }
}

  return (

    <>
    <h1>Do Robots Read About Electric Sheep</h1>
  <UserContext.Provider value = {user}>
    <NavBar viewForm={viewForm} setViewForm={setViewForm} setForm={setForm} setUser = {setUser}></NavBar>

    {user ? <button onClick={handleBookForm}>Add Book</button> : <></>}
   
      <Routes>
        <Route path="/" element = {<LandingPage user={user} />}/>
        <Route path="/books" element = {<BrowseBooksPage books = {books} setBooks={setBooks}/>}/>
        <Route path="/books/:id" element = {<BookPage handleReviewChanges ={handleReviewChanges} reviews={reviews}
        setReviews={setReviews} portalSite={portalSite}/>} />
        <Route path="/profile"  element = {<ProfilePage reviews={reviews}
        setReviews={setReviews} handleReviewChanges ={handleReviewChanges} portalSite={portalSite} />}/>
        {/* <Route path="/login" element = {<LoginPage portalSite={portalSite} setUser={setUser}></LoginPage>} /> */}
      </Routes>

    </UserContext.Provider>
    {viewForm ? createPortal(<FormContainer viewForm = {viewForm} form={form} />, portalSite) : <></>}
    </>
  );
}

export default App;
