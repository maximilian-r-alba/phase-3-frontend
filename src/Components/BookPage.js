import {useState, useEffect} from "react";
import ReviewCard from './ReviewCard'
import { useParams } from "react-router-dom";

function BookPage(){

    const {id} = useParams()
    const [book, setBook] = useState(undefined)
    const [reviews, setReviews] = useState([])
    const [renderedReviews, setRenderedReviews] = useState(null)
    
    useEffect(() => {
        fetch(`http://localhost:9292/books/${id}/reviews`)
        .then(r => r.json())
        .then(data => setReviews(data))
    }, [])
   

    useEffect(() => {
        fetch(`http://localhost:9292/books/${id}`)
        .then(r => r.json())
        .then(data => setBook(data))
    }, [])
   

    useEffect(() => {
        setRenderedReviews(createReviewsList(reviews))
    }, [reviews])

    function createReviewsList(reviewsArr){
        const reviewList = reviewsArr.map((review) => <ReviewCard key={`reviewKey${review.id}`} review={review} ></ReviewCard>)
        return reviewList
    }
    
    return (
        <>
            {book ? <> <h1>{book.title}</h1>
            <img src={book.cover_url} alt="book cover image"></img>
            <p>By: {book.author}</p>
            <p>{book.subgenre}</p>
            <p>{book.summary}</p>
            <p>Rating is {book.rating}</p>

            <div>
                {renderedReviews ? renderedReviews : <p>No reviews have been made</p>}
            </div>
            
            </> : <p>Loading Book</p>}
        </>
       
    )
}

export default BookPage

