import {useState, useEffect} from "react";
import { createPortal } from "react-dom";
import ReviewCard from './ReviewCard'
import ReviewForm from "./ReviewForm";
import { useParams } from "react-router-dom";
import { UserContext } from "./UserContext";
import { useContext } from "react";

function BookPage({portalSite}){

    const {id} = useParams()
    const [book, setBook] = useState(undefined)
    const [reviews, setReviews] = useState([])
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
        const reviewList = reviewsArr.map((review) => <ReviewCard key={`reviewKey${review.id}`} review={review} handleViewForm={handleViewForm} setPassedReview={setPassedReview}></ReviewCard>)
        return reviewList
    }
    
    const [passedReview, setPassedReview] = useState(undefined)
    function handleViewForm(e){
        setViewReviewForm(viewReviewForm => !viewReviewForm)
        setPassedReview(undefined)
    }

    function postReview(reviewValues){
        fetch(`http://localhost:9292/reviews`, {
            method: 'POST', 
            headers:{'Content-Type': 'application/json'},
            body:JSON.stringify(reviewValues)
        })
        .then(r=> r.json())
        .then(data => setReviews([...reviews, data]))
    }

    function patchReview(reviewValues){
        
        fetch(`http://localhost:9292/reviews/${reviewValues.id}`, {
            method: 'PATCH', 
            headers:{'Content-Type': 'application/json'},
            body:JSON.stringify(reviewValues)
        })
        .then(r=> r.json())
        .then(data => console.log(data))
        editReview(reviewValues)
    }

    function editReview(reviewValues) {
        const reviewID = reviewValues.id
        const filteredReviews = reviews.filter((review) => review.id !== reviewID)
        const reviewsArrEdit = filteredReviews.concat([reviewValues])
        setReviews(reviewsArrEdit)
        calcRatingAfterEdit(reviewsArrEdit)
    }

    function calcRatingAfterEdit(editedReviewsArr){
        const ratings = editedReviewsArr.map((review) => review.rating)
        const average = ((ratings.reduce((sum, current) => sum + current))/(editedReviewsArr.length)).toFixed(2)
 
        setBook({...book, rating: average})
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

            {user ? <button onClick={handleViewForm}>Leave a Review</button> : <button>Login to Review</button>}

            <div>
                {renderedReviews ? renderedReviews : <p>No reviews have been made</p>}
            </div>
            </> 
            
            : <p>Loading Book</p>}

            {viewReviewForm ? createPortal(<ReviewForm review={passedReview} postReview = {postReview} patchReview ={patchReview} handleViewForm = {handleViewForm} book_id = {book.id}/>, portalSite) : <></>}
        </>
       
    )
}

export default BookPage

