import {useState, useEffect} from "react";
import ReviewCard from './ReviewCard'

function BookPage({book}){

    useEffect(() => {
        fetch(`http:localhost:9292/books/${id}`)
        .then(r => r.json())
        .then(data => console.log(data))
    }, [])

    useEffect(() => {
        fetch(`http:localhost:9292/books/${id}/reviews`)
        .then(r => r.json())
        .then(data => console.log(data))
    }, [])
   
    function reviewsList(reviews){
        reviewList = reviews.map((review) => <ReviewCard key={review.id} review={review} ></ReviewCard>)
    }

    return (
        <>
            <h1>{book.title}</h1>
            <img src={book.cover_url} alt="book cover image"></img>
            <p>By: {book.author}</p>
            <p>{book.subgenre}</p>
            <p>{book.summary}</p>

            <div>
                {/* reviews here */}
            </div>
        </>
       
    )
}

export default BookPage

