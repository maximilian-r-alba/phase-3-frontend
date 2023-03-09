import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { createPortal } from 'react-dom';
import styled from 'styled-components';

import NavBar from './Components/NavBar';
import LandingPage from './Components/LandingPage';
import BookForm from './Components/BookForm';
import BrowseBooksPage from './Components/BrowseBooksPage';
import ProfilePage from './Components/ProfilePage'
import BookPage from './Components/BookPage';
import FormContainer from './Components/FormContainer';
import { UserContext } from './Components/UserContext';
import ReviewCard from "./Components/ReviewCard";
import BooksCard from "./Components/BooksCard";

function App() {
  
  const [books, setBooks] = useState(undefined)

  const [user, setUser] = useState(false)

  const [viewForm, setViewForm] = useState(false)
  const [form, setForm] = useState()

  const portalSite = document.getElementById('portalSite')
  const overlayGrab = document.getElementById('overlayDiv')

  const [reviews, setReviews] = useState(undefined)
 
  function createReviewCards(reviewsArray , inUserPage = false){

      const reviewList = reviewsArray.map((review) => <ReviewCard key={`reviewKey${review.id}`} book={review.book} review={review} handleFormContainer={handleFormContainer} handleReviewChanges={handleReviewChanges} inUserPage={inUserPage}></ReviewCard>)
      return reviewList
    
}

function createBookCards(bookArr){
  return bookArr.map((book) => <BooksCard key = {book.id} book={book} />)
}

  function handleFormContainer(viewBool=false, formComponent=null){
    setViewForm(viewBool)
    setForm(formComponent)
}

  function handleBookForm(){
    handleFormContainer(true, <BookForm handleFormContainer={handleFormContainer} setBooks={setBooks}/>)
  }

  function handleReviewChanges(reviewValues , method){
    const reviewID = reviewValues.id
    const filteredReviews = reviews.filter((review) => review.id !== reviewID)
   
    switch (method){

        case 'post':
            const reviewsArrEdit = [reviewValues, ...reviews]
            setReviews(reviewsArrEdit)
            break;

        case 'patch':
            const patchReviewArr = [reviewValues].concat(filteredReviews)
            setReviews(patchReviewArr)
            break;

        case 'delete':
          setReviews(filteredReviews)
          break;
    }
}


  return (
  <PortalSiteStyled id='portalSite'>
 
    <h1>Do Robots Read About Electric Sheep</h1>

    <UserContext.Provider value = {user}>

        <NavBar handleFormContainer= {handleFormContainer} setUser = {setUser}></NavBar>
        {user ? <AddBookButton onClick={handleBookForm}>Add A Book</AddBookButton> : <></>}

        <Routes>
          <Route path="/" element = {<LandingPage books={books} setBooks={setBooks} createBookCards={createBookCards}/>}/>

          <Route path="/books" element = {<BrowseBooksPage books = {books} setBooks={setBooks} createBookCards={createBookCards}/>}/>

          <Route path="/books/:id" element = {<BookPage  reviews={reviews}
          setReviews={setReviews} handleReviewChanges ={handleReviewChanges} handleFormContainer={handleFormContainer} createReviewCards={createReviewCards}/>} />

          <Route path="/profile"  element = {<ProfilePage reviews={reviews}
          setReviews={setReviews} setUser={setUser} handleReviewChanges ={handleReviewChanges} handleFormContainer={handleFormContainer}  createReviewCards={createReviewCards} />}/>

        </Routes>
        
        {viewForm ? createPortal(<FormContainer  form={form} />, portalSite) : <></>}
        {viewForm ? createPortal(<OverlayDiv active={viewForm}></OverlayDiv>, overlayGrab) : <></>}
        
    </UserContext.Provider>
  </PortalSiteStyled>
  );
}

export default App;

const OverlayDiv = styled.div`
    background:black;
    display: ${(props) => !props.active ? 'none' : ''}; 
    position: fixed;  
    top: 0;                  
    right: 0;             
    bottom: 0;
    left: 0;
    opacity: 0.3;
    margin: 0;
`

const PortalSiteStyled = styled.div`
display: relative;
width: 100%;
height: 100%;
*{
  font-family: 'Courier New', Courier, monospace;
}
`
const AddBookButton = styled.button`
background: none;
border: none;
font-size: 20px;
text-decoration: underline;
margin-top: 20px;
margin-left: 70px;
cursor: pointer;
`