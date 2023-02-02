import {useState, useEffect} from "react";
import "./BooksCard.js";

function BrowseBooksPage(){

    const [allBooks, setAllBooks] = useState([])
    const [bookCards, setBookCards] = useState([])
    
    function renderCards(books){
        cards = books.map((book) => {
            <BooksCard book = {book} />
        })

        setBookCards(cards)
    }
     
    useEffect(() => {
        fetch('http://localhost:9292/books')
            .then(r => r.json())
            .then(data => {
                setAllBooks(data)
                renderCards(data)
            })
    }, [])

    return (
        <>
            <h1>SHOW BOOKS HERE</h1>
            {bookCards}
        </>
       
    )
}

export default BrowseBooksPage