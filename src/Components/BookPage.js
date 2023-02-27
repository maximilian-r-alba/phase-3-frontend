import {useState , useEffect , useContext } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import StarsRating from "./StarsRating";

import ReviewCard from './ReviewCard'
import ReviewForm from "./ReviewForm";
import { UserContext } from "./UserContext";


function BookPage({reviews , setReviews , handleReviewChanges , handleFormContainer}){

    const {id} = useParams()
    const [book, setBook] = useState(undefined)
    const [renderedReviews, setRenderedReviews] = useState(null)


    const user = useContext(UserContext)

    useEffect(() => {
        fetch(`http://localhost:9292/books/${id}/reviews`)
        .then(r => r.json())
        .then(data => setReviews(data))

        fetch(`http://localhost:9292/books/${id}`)
        .then(r => r.json())
        .then(data => setBook(data))
    }, [])
   
    useEffect(() => {
        setRenderedReviews(createReviewsList([...reviews]))
    }, [reviews])

    function createReviewsList(reviewsArr){
        const reviewList = reviewsArr.map((review) => <ReviewCard key={`reviewKey${review.id}`} review={review} handleFormContainer={handleFormContainer} handleReviewChanges={pageHandler}></ReviewCard>)
        return reviewList
    }
   
    function showReviewForm(){
       handleFormContainer(true , <ReviewForm  handleReviewChanges = {pageHandler} handleFormContainer= {handleFormContainer} book_id = {book.id}/>)
    }

    function pageHandler(data, method){
        setReviews(handleReviewChanges(data, method))
        calcRatingonPage(handleReviewChanges(data, method))
    }
    
    function calcRatingonPage(editedReviewsArr){
        const ratings = editedReviewsArr.map((review) => review.rating)
        if(ratings.length>0){
            const average = ((ratings.reduce((sum, current) => sum + current))/(ratings.length)).toFixed(2)
        setBook({...book, rating: average})
        }
        else{
            setBook({...book, rating: undefined})
        }
    }

    return (
        <StyledDiv>
            {book ? 
            <> 
            <img src={book.cover_url} alt="book cover image"></img>

            <div className="author">
                <h1>{book.title}</h1>
                <p >By: {book.author}</p>
                <div>
                <StarsRating key={book.rating} givenRating={book.rating} /> 
                {book.rating ? <p style={{display:'inline'}}>{` ${book.rating} `}({reviews.length})</p> : <p style={{display:'inline'}}>{` unrated`}({reviews.length})</p>}
                </div>
            </div>

            <p>{book.summary}</p>
            {user ? <button onClick={showReviewForm}>Leave a Review</button> : <button disabled>Login to Review</button>}

            <div className="reviews">
                {renderedReviews ? renderedReviews : <p>No reviews have been made</p>}
            </div>
            </> 
            
            : <p>Loading Book</p>}

        </StyledDiv>
       
    )
}

export default BookPage

const StyledDiv = styled.div`
display: grid;

  grid-template-columns: 1fr 1fr 4fr 1fr;
  grid-template-rows: 1fr 1fr 1fr 5fr 1fr auto;
  grid-gap: 20px;

  grid-template-areas: 
  "space space space space"
  "leftsidebar image header rightsidebar"
  "leftsidebar image header rightsidebar"
  "leftsidebar image summary rightsidebar"
  "leftsidebar reviewBtn summary rightsidebar"
  'leftsidebar review review rightsidebar'
  
  ;

div.author{
    grid-area: header;
}
div.reviews{
    grid-area: review;
}

img{ 
  grid-area:image;
  width: 350px;
  height: 100%;
}
p{
    grid-area:summary;
}

button{
    grid-area: reviewBtn;
}
`