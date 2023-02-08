import {useState, useEffect} from "react";
import ReviewCard from './ReviewCard'

function BookPage({book}){

    // useEffect(() => {
    //     fetch(`http:localhost:9292/books/${id}`)
    //     .then(r => r.json())
    //     .then(data => console.log(data))
    // }, [])

    const [reviews, setReviews] = useState([])
    const [renderedReviews, setRenderedReviews] = useState(null)

    useEffect(() => {
        fetch(`http:localhost:9292/books/${id}/reviews`)
        .then(r => r.json())
        .then(data => setReviews(data))
    }, [])
   
    useEffect(() => {
        setRenderedReviews(reviewsList(reviews))
    }, [reviews])

    function reviewsList(reviewsArr){
        const reviewList = reviewsArr.map((review) => <ReviewCard key={review.id} review={review} ></ReviewCard>)
        return reviewList
    }

    return (
        <>
            <h1>{book.title}</h1>
            <img src={book.cover_url} alt="book cover image"></img>
            <p>By: {book.author}</p>
            <p>{book.subgenre}</p>
            <p>{book.summary}</p>

            <div>
                {renderedReviews ? renderedReviews : <p>No reviews have been made</p>}
            </div>
        </>
       
    )
}

export default BookPage

