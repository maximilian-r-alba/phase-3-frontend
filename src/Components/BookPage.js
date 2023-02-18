import {useState, useEffect} from "react";
import { createPortal } from "react-dom";
import ReviewCard from './ReviewCard'
import ReviewForm from "./ReviewForm";
import { useParams } from "react-router-dom";
import { UserContext } from "./UserContext";
import { useContext } from "react";

function BookPage({reviews , setReviews , portalSite , handleReviewChanges}){

    const {id} = useParams()
    const [book, setBook] = useState(undefined)
    const [renderedReviews, setRenderedReviews] = useState(null)
    const [viewReviewForm, setViewReviewForm] = useState(false)
    
    const user = useContext(UserContext)

    //get reviews for specified book
    useEffect(() => {
        fetch(`http://localhost:9292/books/${id}/reviews`)
        .then(r => r.json())
        .then(data => setReviews(data))
    }, [])
    //render review cards for reviews when state changes by calling createReviewsList
    useEffect(() => {
        setRenderedReviews(createReviewsList(reviews))
    }, [reviews])

    //get specified book info
    useEffect(() => {
        fetch(`http://localhost:9292/books/${id}`)
        .then(r => r.json())
        .then(data => setBook(data))
    }, [])
   

    //maps reviewsArray with ReviewCard component
    function createReviewsList(reviewsArr){
        const reviewList = reviewsArr.map((review) => <ReviewCard key={`reviewKey${review.id}`} review={review} handleViewForm={handleViewForm} setPassedReview={setPassedReview} handleReviewChanges={handler}></ReviewCard>)
        return reviewList
    }
    
    const [passedReview, setPassedReview] = useState(undefined)

    function handleViewForm(e){
        setViewReviewForm(viewReviewForm => !viewReviewForm)
        setPassedReview(undefined)
    }

    function handler(data, method){
        setReviews(handleReviewChanges(data, method))
        calcRatingonPage(handleReviewChanges(data, method))
    }
    
    //calculate rating on front end state
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
        <>
            {book ? 
            <> 
            
            <h1>{book.title}</h1>
            <img src={book.cover_url} alt="book cover image"></img>
            <p>By: {book.author}</p>
            <p>{book.subgenre}</p>
            <p>{book.summary}</p>
            <p>Rating is {book.rating}</p>

            {user ? <button onClick={handleViewForm}>Leave a Review</button> : <button disabled>Login to Review</button>}

            <div>
                {renderedReviews ? renderedReviews : <p>No reviews have been made</p>}
            </div>
            </> 
            
            : <p>Loading Book</p>}

            {viewReviewForm ? createPortal(<ReviewForm review={passedReview} handleReviewChanges = {handler} handleViewForm = {handleViewForm} book_id = {book.id}/>, portalSite) : <></>}
        </>
       
    )
}

export default BookPage

